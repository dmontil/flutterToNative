import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Skip middleware for static files and API routes that don't need auth
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api/checkout') ||
    req.nextUrl.pathname.startsWith('/api/webhooks') ||
    req.nextUrl.pathname.startsWith('/static') ||
    req.nextUrl.pathname.includes('.')
  ) {
    return res
  }

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient(
      { req, res }
    )

    // Check if we have a session
    const { data: { session } } = await supabase.auth.getSession()

    // Set a cookie that can be shared across subdomains
    if (session?.access_token) {
      const hostname = req.nextUrl.hostname
      
      // Determine the cookie domain
      let cookieDomain = ''
      if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        const parts = hostname.split('.')
        if (parts.length >= 2) {
          cookieDomain = '.' + parts.slice(-2).join('.')
        }
      }

      // Set cross-subdomain session indicator (24 hours duration)
      const sessionIndicator = `sb-session-indicator=true; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${
        cookieDomain ? `; Domain=${cookieDomain}; Secure` : ''
      }`
      
      // Only set if not already present
      if (!req.cookies.get('sb-session-indicator')) {
        res.headers.append('Set-Cookie', sessionIndicator)
      }

      console.log('[Middleware] Session active:', {
        hasSession: !!session,
        hostname,
        cookieDomain: cookieDomain || 'localhost'
      })
    }

    return res
  } catch (error) {
    console.error('[Middleware] Error:', error)
    return res
  }
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
