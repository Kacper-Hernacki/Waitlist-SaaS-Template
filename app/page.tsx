"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { waitlistEvents } from "../components/analytics";
import { useToast, toast } from "../components/toast";
import { validateWaitlistForm } from "../lib/validation";
import {
  WaitlistFormData,
  WaitlistApiResponse,
  ApiErrorResponse,
  WaitlistErrorCodes,
} from "../types/waitlist";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Track page view
  useEffect(() => {
    waitlistEvents.pageView("waitlist_home");
  }, []);

  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    defaultValues: {
      agreeToEmails: true, // Default checkbox to checked
    },
  });

  // Form submission handler
  const onSubmit = async (data: WaitlistFormData) => {
    // Clear previous errors
    setApiError(null);
    setIsSubmitting(true);

    // Client-side validation
    const validation = validateWaitlistForm(data);
    if (!validation.success) {
      const firstError = Object.values(validation.errors)[0];
      addToast(toast.error("Validation Error", firstError));
      setIsSubmitting(false);
      return;
    }

    // Track signup started
    waitlistEvents.signupStarted();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          agreeToEmails: data.agreeToEmails,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorResult = result as ApiErrorResponse;

        // Handle specific error codes
        let errorMessage = errorResult.error || "Failed to join waitlist";
        let toastTitle = "Signup Failed";

        switch (errorResult.code) {
          case WaitlistErrorCodes.EMAIL_ALREADY_EXISTS:
            errorMessage =
              "You&apos;re already on our waitlist! Check your email for confirmation.";
            toastTitle = "Already Registered";
            break;
          case WaitlistErrorCodes.RATE_LIMIT_EXCEEDED:
            errorMessage =
              "Too many attempts. Please wait a few minutes before trying again.";
            toastTitle = "Rate Limit Exceeded";
            break;
          case WaitlistErrorCodes.TIMEOUT_ERROR:
            errorMessage =
              "Request timed out. Please check your connection and try again.";
            toastTitle = "Connection Timeout";
            break;
          case WaitlistErrorCodes.VALIDATION_ERROR:
            errorMessage = "Please check your email address and try again.";
            toastTitle = "Invalid Email";
            break;
        }

        setApiError(errorMessage);
        addToast(toast.error(toastTitle, errorMessage, { duration: 8000 }));

        // Track error
        waitlistEvents.signupError(errorResult.code || "unknown_error");

        return;
      }

      // Success
      const successResult = result as WaitlistApiResponse;

      // Track successful signup
      waitlistEvents.signupCompleted(data.email);

      // Show success message
      addToast(
        toast.success(
          "Check your email!",
          successResult.message ||
            "We've sent you a confirmation email. Please click the link to join our waitlist.",
          { duration: 10000 }
        )
      );

      setIsSubmitted(true);
      reset();

      // Clear success state after 30 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 30000);
    } catch (error) {
      console.error("Network error submitting form:", error);

      const errorMessage =
        "Network error. Please check your connection and try again.";
      setApiError(errorMessage);
      addToast(toast.error("Connection Error", errorMessage));

      // Track network error
      waitlistEvents.signupError("network_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* NAVIGATION BAR - Customize with your branding */}
      <nav
        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO PLACEHOLDER - Replace with your actual logo */}
            {/* <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                {/* Logo icon placeholder - Replace with your logo/icon */}
            {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div> */}
            {/* Company name - Replace with your company name */}
            {/* <span className="text-xl font-semibold text-slate-900 dark:text-white">
                  YourLogo
                </span>
              </div>
            </div> */}

            {/* OPTIONAL: Add navigation links if needed for future pages */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Uncomment and customize these links as needed
              <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              */}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION WITH WAITLIST SIGNUP */}
      <main className="flex-1 flex items-center">
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* MAIN HEADLINE - Replace with your value proposition */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              {/* Primary headline - Make it compelling and clear */}
              <span className="block">Replace Doom scrolling</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                with an actual research
              </span>
            </h1>

            {/* SUBHEADING - Explain your value proposition */}
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {/* Replace with your product description - Focus on benefits and target audience */}
              Be the first to experience the revolutionary flow of researching
              the Internet. Capture, Send, Interact with any resource...
            </p>

            {/* WAITLIST SIGNUP FORM */}
            <div className="max-w-md mx-auto">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* EMAIL INPUT FIELD */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isSubmitting || isSubmitted}
                      className={`w-full px-4 py-4 text-lg bg-white dark:bg-slate-800 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.email || apiError
                          ? "border-red-500 dark:border-red-400"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {/* EMAIL VALIDATION ERROR */}
                    {(errors.email || apiError) && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-left">
                        {errors.email?.message || apiError}
                      </p>
                    )}
                  </div>

                  {/* AGREEMENT CHECKBOX */}
                  <div className="flex items-start space-x-3 text-left">
                    <input
                      type="checkbox"
                      id="agreeToEmails"
                      disabled={isSubmitting || isSubmitted}
                      className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-slate-800 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      {...register("agreeToEmails", {
                        required:
                          "You must agree to receive emails to join the waitlist",
                      })}
                    />
                    <label
                      htmlFor="agreeToEmails"
                      className="text-sm text-slate-600 dark:text-slate-300"
                    >
                      {/* Customize this text based on your privacy policy and email preferences */}
                      I agree to receive email updates about product launches,
                      features, and company news. You can unsubscribe at any
                      time.
                    </label>
                  </div>
                  {/* CHECKBOX VALIDATION ERROR */}
                  {errors.agreeToEmails && (
                    <p className="text-sm text-red-600 dark:text-red-400 text-left">
                      {errors.agreeToEmails.message}
                    </p>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Joining Waitlist...
                      </span>
                    ) : (
                      "Join the Waitlist"
                    )}
                  </button>
                </form>
              ) : (
                /* SUCCESS MESSAGE */
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                    Check your email!
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
                    We&apos;ve sent you a confirmation email. Please click the link to complete your waitlist registration.
                  </p>
                </div>
              )}
            </div>

            {/* SOCIAL PROOF / WAITLIST COUNTER - Optional: Add real numbers */}
            {/* <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {/* Avatar placeholders - Replace with real user avatars if available */}
            {/* <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <span className="text-sm font-medium">
                  {/* Update this number with real waitlist count */}
            {/* 2,547+ people already joined
                </span>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
              
              <div className="text-sm">
                {/* Add your launch timeline */}
            {/* 🚀 Launching Q2 2024
              </div>
            </div> */}
          </div>
        </section>
      </main>

      {/* FOOTER - Minimal footer with logo, always at bottom */}
      <footer
        className="mt-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* FOOTER LOGO - Same as header */}
            {/* <div className="flex items-center space-x-2 order-2 sm:order-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">L</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                YourLogo
              </span>
            </div> */}

            {/* FOOTER LINKS - Add as needed */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-600 dark:text-slate-400 order-1 sm:order-2">
              {/* Essential links for waitlist compliance */}
              {/* <div className="flex items-center space-x-6 sm:space-x-8">
                <a
                  href="/privacy"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/cookies"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
                <a
                  href="/contact"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div> */}
              {/* <span className="text-center sm:text-left">
                © {new Date().getFullYear()} YourLogo. All rights reserved.
              </span> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
