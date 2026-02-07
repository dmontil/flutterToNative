import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Get the domain for cookie sharing across subdomains
function getCookieDomain(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    const hostname = window.location.hostname;
    
    // For local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return undefined;
    }
    
    // For production: extract the main domain
    // e.g., ios.fluttertonative.pro -> fluttertonative.pro
    const parts = hostname.split('.');
    if (parts.length >= 2) {
        return '.' + parts.slice(-2).join('.'); // .fluttertonative.pro
    }
    
    return undefined;
}

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // Disable auto detection to avoid conflicts
        storage: {
            // Use custom storage that shares cookies across subdomains
            getItem: (key: string) => {
                if (typeof window === 'undefined') return null;
                return localStorage.getItem(key);
            },
            setItem: (key: string, value: string) => {
                if (typeof window === 'undefined') return;
                localStorage.setItem(key, value);
                
                // Also set as cookie with cross-subdomain domain
                const domain = getCookieDomain();
                if (domain) {
                    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; domain=${domain}; SameSite=Lax`;
                }
            },
            removeItem: (key: string) => {
                if (typeof window === 'undefined') return;
                localStorage.removeItem(key);
                
                // Also remove from cookie with cross-subdomain domain
                const domain = getCookieDomain();
                if (domain) {
                    document.cookie = `${key}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                }
            }
        }
    }
});

// Simple sign out function
export const signOut = async () => {
    console.log('[Auth] 🚪 Starting sign out process...');
    console.log('[Auth] 🌍 Environment check:', {
        hasWindow: typeof window !== 'undefined',
        hasLocalStorage: typeof Storage !== 'undefined'
    });
    
    try {
        // Clear local storage first
        if (typeof window !== 'undefined') {
            console.log('[Auth] 🧹 Clearing localStorage...');
            const keysToRemove: string[] = [];
            Object.keys(localStorage).forEach(key => {
                if (key.includes('supabase') || key.includes('sb-')) {
                    keysToRemove.push(key);
                    localStorage.removeItem(key);
                }
            });
            console.log('[Auth] 🗑️ Removed localStorage keys:', keysToRemove);
        } else {
            console.log('[Auth] ⚠️ Window not available, skipping localStorage cleanup');
        }
        
        console.log('[Auth] 📡 Calling supabase.auth.signOut...');
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        
        console.log('[Auth] 📥 SignOut response received:', {
            hasError: !!error,
            errorName: error?.name,
            errorMessage: error?.message
        });
        
        if (error) {
            console.error('[Auth] ❌ Sign out error details:', {
                name: error.name,
                message: error.message,
                status: error.status,
                details: error
            });
            // Even if there's an error, consider it successful for UI purposes
            console.log('[Auth] ⚠️ Treating as successful sign out despite error');
        } else {
            console.log('[Auth] ✅ Sign out successful - no errors');
        }
        
        console.log('[Auth] ✅ Sign out process completed');
        return { error: null };
    } catch (err: any) {
        console.error('[Auth] 💥 Sign out exception caught:', {
            name: err?.name,
            message: err?.message,
            stack: err?.stack
        });
        
        // Handle AbortError gracefully
        if (err?.name === 'AbortError') {
            console.log('[Auth] ⚠️ Sign out aborted (normal during navigation)');
            return { error: null };
        }
        
        console.log('[Auth] ⚠️ Returning success anyway for UI purposes');
        return { error: null };
    }
};
