// Types for waitlist form data
export interface WaitlistFormData {
  email: string;
  agreeToEmails: boolean;
}

// Types for n8n webhook integration
export interface N8nWebhookRequest {
  email: string;
  product: string; // Product name - customize this for your product
}

export interface N8nWebhookResponse {
  success: boolean;
  message: string;
}

// API route request/response types
export interface WaitlistApiRequest {
  email: string;
  agreeToEmails: boolean;
}

export interface WaitlistApiResponse {
  success: boolean;
  message: string;
  data?: {
    email: string;
    timestamp: string;
  };
}

// Error response types
export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: string;
}

// Form state types
export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  successMessage: string | null;
}

// Validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Toast notification types
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Confirmation page types
export interface ConfirmationPageProps {
  token?: string;
  email?: string;
  status: 'pending' | 'success' | 'error' | 'expired';
}

// Analytics event types
export interface WaitlistAnalyticsEvents {
  signup_started: {
    source?: string;
    timestamp: string;
  };
  signup_completed: {
    email_domain: string;
    timestamp: string;
    source?: string;
  };
  signup_failed: {
    error_type: string;
    error_message: string;
    timestamp: string;
  };
  confirmation_clicked: {
    email_domain: string;
    timestamp: string;
  };
  confirmation_completed: {
    email_domain: string;
    timestamp: string;
  };
}

// Rate limiting types
export interface RateLimitInfo {
  remaining: number;
  reset: number;
  limit: number;
}

// Environment variables type safety
export interface WaitlistEnvVars {
  N8N_WEBHOOK_URL: string;
  N8N_WEBHOOK_SECRET?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;
  RATE_LIMIT_WINDOW?: string;
}

// HTTP client configuration
export interface HttpClientConfig {
  timeout: number;
  retries: number;
  retryDelay: number;
}

// Error codes for specific handling
export enum WaitlistErrorCodes {
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  WEBHOOK_ERROR = 'WEBHOOK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Form validation schema type
export interface FormValidationSchema {
  email: {
    required: boolean;
    pattern: RegExp;
    maxLength: number;
  };
  agreeToEmails: {
    required: boolean;
  };
}