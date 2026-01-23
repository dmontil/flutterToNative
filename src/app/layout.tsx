import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlutterToNative.pro | The Premium Migration Platform",
  description: "Master native mobile development. High-leverage guides for Senior Flutter Engineers transitioning to Native iOS and Android.",
  openGraph: {
    title: "FlutterToNative.pro",
    description: "The premium platform for mobile ecosystem migration. From Flutter to Native.",
    url: "https://fluttertonative.pro",
    siteName: "FlutterToNative.pro",
    images: [
      {
        url: "/og-image.png", // Necesitarás añadir esta imagen a /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter to iOS Playbook",
    description: "From Senior Flutter to Senior iOS Native.",
    images: ["/og-image.png"],
  },
};

import { UserProvider } from "@/components/auth/user-provider";
import "@/lib/env-validation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
