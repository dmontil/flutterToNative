import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flutter to iOS Playbook | Premium Migration Guide for Senior Developers",
  description:
    "Master iOS native development in weeks, not months. Premium guide for senior Flutter engineers transitioning to SwiftUI and UIKit. Architecture patterns, interview prep, and production code examples.",
  keywords: [
    "flutter to ios",
    "flutter to swift",
    "ios migration",
    "swiftui tutorial",
    "ios architecture",
    "ios interview prep",
  ],
  authors: [{ name: "FlutterToNative.pro" }],
  creator: "FlutterToNative.pro",
  publisher: "FlutterToNative.pro",
  category: "Technology",
  openGraph: {
    title: "Flutter to iOS Playbook | Premium Migration Guide",
    description:
      "Premium guide for senior Flutter engineers moving to iOS: SwiftUI, UIKit, ARC, and production architecture.",
    url: "https://ios.fluttertonative.pro",
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
    description:
      "Premium guide for senior Flutter engineers moving to iOS: SwiftUI, UIKit, ARC, and architecture.",
    images: ["/og-image.png"],
    creator: "@fluttertonative",
    site: "@fluttertonative",
  },
};

export default function IOSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
