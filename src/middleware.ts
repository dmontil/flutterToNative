import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IOS_HOST = "ios.fluttertonative.pro";
const ANDROID_HOST = "android.fluttertonative.pro";
const ROOT_HOSTS = new Set(["fluttertonative.pro", "www.fluttertonative.pro"]);

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const { pathname, search } = req.nextUrl;

  // Root domain routing to subdomains
  if (ROOT_HOSTS.has(host)) {
    if (pathname.startsWith("/ios")) {
      const nextPath = pathname.replace(/^\/ios/, "") || "/";
      return NextResponse.redirect(new URL(`${req.nextUrl.protocol}//${IOS_HOST}${nextPath}${search}`));
    }
    if (pathname.startsWith("/android")) {
      return NextResponse.redirect(new URL(`${req.nextUrl.protocol}//${ANDROID_HOST}${pathname}${search}`));
    }
  }

  // Subdomain defaults
  if (host.startsWith("ios.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/ios", req.url));
  }
  if (host.startsWith("android.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/android", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/ios/:path*", "/android/:path*"],
};
