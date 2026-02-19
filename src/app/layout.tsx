import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flutter to iOS Playbook | Premium Migration Guide for Senior Developers",
  description: "Master iOS native development in weeks, not months. Premium guide for senior Flutter engineers transitioning to iOS. Architecture patterns, SwiftUI, interview prep, and production code examples.",
  keywords: [
    "flutter to ios",
    "flutter to swift",
    "ios migration",
    "swiftui tutorial",
    "flutter engineer",
    "ios development",
    "mobile architecture",
    "swift programming",
    "ios interview prep",
    "flutter native",
  ],
  authors: [{ name: "FlutterToNative.pro" }],
  creator: "FlutterToNative.pro",
  publisher: "FlutterToNative.pro",
  category: "Technology",
  metadataBase: new URL("https://www.fluttertonative.pro"),
  alternates: {
    canonical: "https://www.fluttertonative.pro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Flutter to iOS Playbook | Premium Migration Guide",
    description: "Master iOS native development in weeks, not months. Premium guide for senior Flutter engineers with architecture patterns, SwiftUI tutorials, and interview prep.",
    url: "https://www.fluttertonative.pro",
    siteName: "FlutterToNative.pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flutter to iOS Playbook - Premium Migration Guide for Senior Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter to iOS Playbook | Premium Migration Guide",
    description: "Master iOS native development in weeks, not months. Premium guide for senior Flutter engineers.",
    images: ["/og-image.png"],
    creator: "@fluttertonative",
    site: "@fluttertonative",
  },
  verification: {
    // Add these when you set up Google Search Console, Bing, etc.
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
};

import { UserProvider } from "@/components/auth/user-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { SessionSync } from "@/lib/session-sync";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UserProvider>
          <SessionSync />
          <GoogleAnalytics />
          {children}
        </UserProvider>
        <JsonLd type="website" />
        <JsonLd type="course" />
        <JsonLd type="product" />
      </body>
    </html>
  );
}
