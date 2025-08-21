"use client";

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

// Cookie consent management
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      // Show banner if no choice has been made
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    
    // Trigger gtag consent update
    if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We use cookies to analyze website traffic and optimize your experience. 
              By accepting our use of cookies, your data will be aggregated with all other user data.{' '}
              <a 
                href="/cookies" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics component that only loads when consent is given
export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  // Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID
  // Example: 'G-XXXXXXXXXX'
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID';

  if (!hasConsent || GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}

// Utility function to track events (only if consent is given)
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  const consent = localStorage.getItem('cookie-consent');
  
  if (consent === 'accepted' && typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, parameters);
  }
}

// Pre-configured event trackers for waitlist
export const waitlistEvents = {
  signupStarted: () => trackEvent('waitlist_signup_started'),
  signupCompleted: (email: string) => trackEvent('waitlist_signup_completed', {
    'custom_parameters': {
      'email_domain': email.split('@')[1] || 'unknown'
    }
  }),
  signupError: (error: string) => trackEvent('waitlist_signup_error', {
    'error_type': error
  }),
  pageView: (pageName: string) => trackEvent('page_view', {
    'page_name': pageName
  }),
};