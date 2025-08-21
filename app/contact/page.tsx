import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us about our upcoming product launch or waitlist questions.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Have questions about our upcoming launch? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Email Us</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              For general inquiries and waitlist questions:
            </p>
            <a 
              href="mailto:hello@yourdomain.com" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              hello@yourdomain.com
            </a>
          </div>

          {/* Support */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Support</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Need help or have technical questions:
            </p>
            <a 
              href="mailto:support@yourdomain.com" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              support@yourdomain.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60 mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                When will you launch?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                We&apos;re planning to launch in Q2 2024. Waitlist members will be the first to know when we&apos;re ready!
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Will there be early access?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes! Waitlist members will get early access before our public launch.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                How can I unsubscribe from the waitlist?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Every email we send includes an unsubscribe link, or you can email us directly.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}