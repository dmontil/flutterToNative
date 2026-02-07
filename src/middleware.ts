import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const IOS_HOST = "ios.fluttertonative.pro";
const ANDROID_HOST = "android.fluttertonative.pro";
const ROOT_HOSTS = new Set(["fluttertonative.pro", "www.fluttertonative.pro"]);

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
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

  // Set cross-subdomain cookie for session sharing
  const hostname = req.nextUrl.hostname
  
  // Determine the cookie domain
  let cookieDomain = ''
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      cookieDomain = '.' + parts.slice(-2).join('.')
    }
  }

  // Set a cross-subdomain session helper cookie
  const sessionHelperCookie = `sb-domain-helper=true; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${
    cookieDomain ? `; Domain=${cookieDomain}; Secure` : ''
  }`
  
  // Only set if not already present
  if (!req.cookies.get('sb-domain-helper')) {
    res.headers.append('Set-Cookie', sessionHelperCookie)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
