import { NextRequest, NextResponse } from 'next/server';
import { httpClient, HttpError } from '../../../lib/http-client';
import { validateApiRequest, sanitizeEmail } from '../../../lib/validation';
import { 
  WaitlistApiResponse, 
  N8nWebhookRequest, 
  N8nWebhookResponse, 
  ApiErrorResponse,
  WaitlistErrorCodes 
} from '../../../types/waitlist';

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

/**
 * Rate limiting utility
 */
function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);

  // Clean expired records
  if (record && now > record.resetTime) {
    rateLimitStore.delete(key);
  }

  const currentRecord = rateLimitStore.get(key);
  
  if (!currentRecord) {
    // First request
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, reset: now + RATE_LIMIT_WINDOW };
  }

  if (currentRecord.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, reset: currentRecord.resetTime };
  }

  // Increment count
  currentRecord.count++;
  rateLimitStore.set(key, currentRecord);
  
  return { 
    allowed: true, 
    remaining: RATE_LIMIT_MAX - currentRecord.count, 
    reset: currentRecord.resetTime 
  };
}

/**
 * Get client IP address for rate limiting
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * POST /api/waitlist
 * Handles waitlist signup requests
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Invalid JSON in request body',
          code: WaitlistErrorCodes.VALIDATION_ERROR
        },
        { status: 400 }
      );
    }

    // Validate request data
    const validation = validateApiRequest(body);
    if (!validation.success) {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Validation failed',
          code: WaitlistErrorCodes.VALIDATION_ERROR,
          details: JSON.stringify(validation.errors)
        },
        { status: 400 }
      );
    }

    const { email, agreeToEmails } = validation.data!;

    // Check if user agreed to emails
    if (!agreeToEmails) {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Email consent is required to join the waitlist',
          code: WaitlistErrorCodes.VALIDATION_ERROR
        },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          code: WaitlistErrorCodes.RATE_LIMIT_EXCEEDED
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString()
          }
        }
      );
    }

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);

    // Get n8n webhook URL from environment
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL environment variable is not configured');
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Service temporarily unavailable',
          code: WaitlistErrorCodes.SERVER_ERROR
        },
        { status: 500 }
      );
    }

    // Prepare n8n webhook request
    const webhookData: N8nWebhookRequest = {
      email: sanitizedEmail,
      product: 'aiResearcher', // CUSTOMIZE: Change this to your product name
      isAgreedToReceiveMails: agreeToEmails // User consent from the checkbox
    };

    // Call n8n webhook
    try {
      const webhookResponse = await httpClient.post<N8nWebhookResponse>(
        webhookUrl,
        webhookData,
        {
          timeout: 30000, // 30 seconds
          retries: 2,
          headers: {
            'User-Agent': 'Waitlist-App/1.0',
            // Add webhook secret if configured
            ...(process.env.N8N_WEBHOOK_SECRET && {
              'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET
            })
          }
        }
      );

      // Check webhook response
      if (!webhookResponse.success) {
        console.error('n8n webhook returned error:', webhookResponse);
        return NextResponse.json<ApiErrorResponse>(
          {
            success: false,
            error: webhookResponse.message || 'Failed to process signup',
            code: WaitlistErrorCodes.WEBHOOK_ERROR
          },
          { status: 500 }
        );
      }

      // Return success response
      const response: WaitlistApiResponse = {
        success: true,
        message: webhookResponse.message || 'Successfully joined the waitlist!',
        data: {
          email: sanitizedEmail,
          timestamp: new Date().toISOString()
        }
      };

      return NextResponse.json(response, {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString()
        }
      });

    } catch (error) {
      console.error('Error calling n8n webhook:', error);

      // Handle specific HTTP errors
      if (error instanceof HttpError) {
        let errorMessage = 'Failed to join waitlist';
        let statusCode = 500;

        switch (error.code) {
          case WaitlistErrorCodes.EMAIL_ALREADY_EXISTS:
            errorMessage = 'This email is already on the waitlist';
            statusCode = 409;
            break;
          case WaitlistErrorCodes.TIMEOUT_ERROR:
            errorMessage = 'Request timed out. Please try again.';
            statusCode = 408;
            break;
          case WaitlistErrorCodes.RATE_LIMIT_EXCEEDED:
            errorMessage = 'Service temporarily overloaded. Please try again later.';
            statusCode = 429;
            break;
          default:
            errorMessage = error.message || 'Service temporarily unavailable';
        }

        return NextResponse.json<ApiErrorResponse>(
          {
            success: false,
            error: errorMessage,
            code: error.code
          },
          { status: statusCode }
        );
      }

      // Generic error
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: 'Service temporarily unavailable',
          code: WaitlistErrorCodes.SERVER_ERROR
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: 'Internal server error',
        code: WaitlistErrorCodes.SERVER_ERROR
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    },
    { status: 200 }
  );
}