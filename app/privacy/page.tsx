import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for our waitlist and how we handle your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              When you join our waitlist, we collect:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-8 space-y-2">
              <li>Your email address</li>
              <li>The date and time you signed up</li>
              <li>Basic technical information (IP address, browser type) for security purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Analytics Information</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              With your consent, we also collect analytics data through Google Analytics:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-8 space-y-2">
              <li>Pages visited and time spent on each page</li>
              <li>Device and browser information</li>
              <li>Geographic location (country/city level)</li>
              <li>How you arrived at our website (referral source)</li>
              <li>Interactions with our website (button clicks, form submissions)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We use your email address to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Notify you when we launch our product</li>
              <li>Send you product updates and feature announcements</li>
              <li>Provide early access opportunities</li>
            </ul>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We use analytics data to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-8 space-y-2">
              <li>Understand how visitors use our website</li>
              <li>Improve our website design and user experience</li>
              <li>Measure the effectiveness of our marketing efforts</li>
              <li>Make data-driven decisions about our product development</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Data Sharing</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We do not sell, trade, or share your personal information with third parties, except as described in this privacy policy or with your explicit consent.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              <strong>Google Analytics:</strong> When you consent to analytics cookies, anonymized usage data is shared with Google Analytics 
              to help us understand website performance. Google&apos;s privacy policy applies to this data: 
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                Google Privacy Policy
              </a>
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-8 space-y-2">
              <li>Unsubscribe from our emails at any time</li>
              <li>Request a copy of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Update or correct your information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about this Privacy Policy or want to exercise your rights, please contact us at:
              <br />
              <a href="mailto:privacy@yourdomain.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                privacy@yourdomain.com
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
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