import { WaitlistErrorCodes } from '../types/waitlist';

export class HttpError extends Error {
  code: WaitlistErrorCodes;
  status: number;
  details: Record<string, unknown>;

  constructor(
    message: string, 
    code: WaitlistErrorCodes, 
    status: number = 500, 
    details: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export interface HttpClientOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP client with retry logic and proper error handling
 */
export class HttpClient {
  private defaultTimeout = 30000; // 30 seconds
  private defaultRetries = 3;
  private defaultRetryDelay = 1000; // 1 second

  async post<T>(
    url: string, 
    data: unknown, 
    options: HttpClientOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      headers = {}
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          // Wait before retry
          await this.sleep(retryDelay * attempt);
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify(data),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { message: errorText };
          }

          throw new HttpError(
            errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            this.getErrorCodeFromStatus(response.status),
            response.status,
            { response: errorData }
          );
        }

        const result = await response.json();
        return result as T;

      } catch (error) {
        lastError = error as Error;

        // Don't retry on validation errors or client errors
        if (error instanceof HttpError && error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Don't retry on abort signal
        if ((error as Error).name === 'AbortError') {
          throw new HttpError(
            'Request timeout',
            WaitlistErrorCodes.TIMEOUT_ERROR,
            408,
            { timeout, attempt: attempt + 1 }
          );
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break;
        }
      }
    }

    // If we get here, all retries failed
    clearTimeout(timeoutId);
    
    if (lastError instanceof HttpError) {
      throw lastError;
    }

    throw new HttpError(
      lastError?.message || 'Network request failed',
      WaitlistErrorCodes.NETWORK_ERROR,
      500,
      { originalError: lastError?.message, attempts: retries + 1 }
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getErrorCodeFromStatus(status: number): WaitlistErrorCodes {
    switch (status) {
      case 400:
        return WaitlistErrorCodes.VALIDATION_ERROR;
      case 409:
        return WaitlistErrorCodes.EMAIL_ALREADY_EXISTS;
      case 429:
        return WaitlistErrorCodes.RATE_LIMIT_EXCEEDED;
      case 408:
        return WaitlistErrorCodes.TIMEOUT_ERROR;
      case 500:
      case 502:
      case 503:
      case 504:
        return WaitlistErrorCodes.SERVER_ERROR;
      default:
        return WaitlistErrorCodes.UNKNOWN_ERROR;
    }
  }
}

// Singleton instance
export const httpClient = new HttpClient();