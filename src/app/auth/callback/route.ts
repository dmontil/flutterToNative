import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const token = requestUrl.searchParams.get('token')
    const type = requestUrl.searchParams.get('type')
    
    console.log('[Auth Callback] Processing auth callback:', {
      token: token ? 'present' : 'missing',
      type,
      url: requestUrl.toString()
    })
    
    if (token && type) {
      const cookieStore = await cookies()
      
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) => {
                  cookieStore.set(name, value, options)
                })
              } catch (error) {
                console.error('[Auth Callback] Cookie set error:', error)
              }
            },
          },
        }
      )
      
      let result
      
      if (type === 'magiclink') {
        // Verify magic link
        result = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email'
        })
      } else {
        // Handle other token types if needed
        result = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email'
        })
      }
      
      if (result.error) {
        console.error('[Auth Callback] Verification error:', result.error)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=verification_failed`)
      }
      
      console.log('[Auth Callback] Verification successful:', result.data.user?.email)
      return NextResponse.redirect(`${requestUrl.origin}/`)
    }
    
    console.log('[Auth Callback] No token found, redirecting to home')
    return NextResponse.redirect(`${requestUrl.origin}/`)
  } catch (error) {
    console.error('[Auth Callback] Exception:', error)
    return NextResponse.redirect(`${new URL(request.url).origin}/login?error=callback_error`)
  }
}