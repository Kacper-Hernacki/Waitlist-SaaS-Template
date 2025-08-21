import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics, CookieConsent } from "../components/analytics";
import { ToastProvider } from "../components/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Coming Soon | Revolutionary Platform for Modern Teams",
    template: "%s | YourLogo",
  },
  description: "Join the waitlist for the revolutionary platform that will transform how you work. Be among the first to experience the future of productivity.",
  keywords: ["waitlist", "coming soon", "productivity", "platform", "early access", "beta", "launch"],
  authors: [{ name: "YourLogo Team" }],
  creator: "YourLogo",
  publisher: "YourLogo",
  openGraph: {
    title: "Coming Soon | Revolutionary Platform for Modern Teams",
    description: "Join the waitlist for the revolutionary platform that will transform how you work. Be among the first to experience the future of productivity.",
    url: "https://yourdomain.com",
    siteName: "YourLogo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YourLogo - Revolutionary Platform Coming Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | Revolutionary Platform for Modern Teams",
    description: "Join the waitlist for the revolutionary platform that will transform how you work. Be among the first to experience the future of productivity.",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://yourdomain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "YourLogo",
              description: "Join the waitlist for the revolutionary platform that will transform how you work. Be among the first to experience the future of productivity.",
              url: "https://yourdomain.com",
              logo: "https://yourdomain.com/logo.png",
              sameAs: [
                "https://twitter.com/yourtwitterhandle",
                "https://linkedin.com/company/yourcompany",
              ],
            }),
          }}
        />
        <ToastProvider>
          {children}
          <Analytics />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
