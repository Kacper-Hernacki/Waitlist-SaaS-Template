import { z } from 'zod';
import { WaitlistErrorCodes } from '../types/waitlist';

// Waitlist form validation schema
export const waitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .toLowerCase()
    .trim(),
  agreeToEmails: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must agree to receive emails to join the waitlist'
    })
});

// API request validation schema
export const waitlistApiSchema = z.object({
  email: z.string().email(),
  agreeToEmails: z.boolean()
});

// n8n webhook request schema
export const n8nWebhookSchema = z.object({
  email: z.string().email()
});

// Validation utility functions
export class ValidationError extends Error {
  code: WaitlistErrorCodes;
  details: Record<string, string>;

  constructor(message: string, code: WaitlistErrorCodes, details: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Validates waitlist form data
 */
export function validateWaitlistForm(data: unknown) {
  try {
    return {
      success: true,
      data: waitlistFormSchema.parse(data),
      errors: {}
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      
      return {
        success: false,
        data: null,
        errors
      };
    }
    
    throw new ValidationError(
      'Validation failed',
      WaitlistErrorCodes.VALIDATION_ERROR,
      { message: 'Unknown validation error' }
    );
  }
}

/**
 * Validates API request data
 */
export function validateApiRequest(data: unknown) {
  try {
    return {
      success: true,
      data: waitlistApiSchema.parse(data),
      errors: {}
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      
      return {
        success: false,
        data: null,
        errors
      };
    }
    
    throw new ValidationError(
      'API request validation failed',
      WaitlistErrorCodes.VALIDATION_ERROR,
      { message: 'Invalid request format' }
    );
  }
}

/**
 * Sanitizes email address
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Checks if email domain is valid
 */
export function isValidEmailDomain(email: string): boolean {
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  // Basic domain validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

/**
 * Extracts domain from email for analytics
 */
export function getEmailDomain(email: string): string {
  const domain = email.split('@')[1];
  return domain || 'unknown';
}