import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about how we use cookies on our website for analytics and optimization.",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">What Are Cookies?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us understand how you use our site and improve your experience.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">How We Use Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We use cookies for the following purposes:
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Analytics Cookies</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We use Google Analytics to understand how visitors interact with our website. These cookies help us:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                <li>Count the number of visitors to our site</li>
                <li>See which pages are most popular</li>
                <li>Understand how people navigate through our site</li>
                <li>Measure waitlist signup conversion rates</li>
                <li>Improve our website based on usage patterns</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Essential Cookies</h3>
              <p className="text-slate-600 dark:text-slate-300">
                These cookies are necessary for the website to function properly and remember your cookie preferences. 
                They cannot be disabled as they are essential for the site to work.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Cookie Consent</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              When you first visit our website, you&apos;ll see a cookie consent banner. You can choose to:
              <br />
              • <strong>Accept</strong> - Allow all cookies including analytics
              <br />
              • <strong>Reject</strong> - Only essential cookies will be used
              <br />
              <br />
              Your choice is saved and you won&apos;t see the banner again unless you clear your browser data.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You can change your cookie preferences at any time by:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-8 space-y-2">
              <li>Clearing your browser data (this will reset your choice)</li>
              <li>Using your browser settings to block or delete cookies</li>
              <li>Contacting us if you need assistance</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We use Google Analytics, which may set third-party cookies. Google&apos;s privacy policy can be found at:
              <br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                https://policies.google.com/privacy
              </a>
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Updates to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page 
              with an updated revision date.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions about our use of cookies, please contact us at:
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