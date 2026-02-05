import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flutter to Android Playbook | Kotlin + Compose Migration Guide",
  description:
    "Master Android native development in weeks, not months. Premium guide for senior Flutter engineers transitioning to Kotlin + Jetpack Compose. Architecture patterns, coroutines, and interview prep.",
  keywords: [
    "flutter to android",
    "flutter to kotlin",
    "android migration",
    "jetpack compose",
    "kotlin coroutines",
    "android architecture",
    "android interview prep",
  ],
  authors: [{ name: "FlutterToNative.pro" }],
  creator: "FlutterToNative.pro",
  publisher: "FlutterToNative.pro",
  category: "Technology",
  openGraph: {
    title: "Flutter to Android Playbook | Kotlin + Compose Migration Guide",
    description:
      "Premium guide for senior Flutter engineers moving to Android: Kotlin, Compose, coroutines, and production architecture.",
    url: "https://android.fluttertonative.pro",
    siteName: "FlutterToNative.pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flutter to Android Playbook - Kotlin + Compose Migration Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter to Android Playbook | Kotlin + Compose Migration Guide",
    description:
      "Premium guide for senior Flutter engineers moving to Android: Kotlin, Compose, coroutines, and architecture.",
    images: ["/og-image.png"],
    creator: "@fluttertonative",
    site: "@fluttertonative",
  },
};

export default function AndroidLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
