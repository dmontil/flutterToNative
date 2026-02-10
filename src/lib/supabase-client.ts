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

// Custom storage that syncs with cookies for cross-subdomain support
const customStorage = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        
        // First try localStorage
        const localValue = localStorage.getItem(key);
        if (localValue) {
            return localValue;
        }
        
        // If not in localStorage, check cookies (might be set by another subdomain)
        const cookies = document.cookie.split(';').map(c => c.trim());
        const sessionCookie = cookies.find(c => c.startsWith(`${key}=`));
        
        if (sessionCookie) {
            const cookieValue = decodeURIComponent(sessionCookie.split('=')[1]);
            
            // Store it in localStorage for the current subdomain
            try {
                JSON.parse(cookieValue); // Validate JSON
                localStorage.setItem(key, cookieValue);
                return cookieValue;
            } catch (error) {
                return null;
            }
        }
        
        return null;
    },
    setItem: (key: string, value: string) => {
        if (typeof window === 'undefined') return;
        
        // Always store in localStorage
        localStorage.setItem(key, value);
        
        // Also set as cookie with cross-subdomain domain
        const domain = getCookieDomain();
        if (domain) {
            document.cookie = `${key}=${encodeURIComponent(value)}; path=/; domain=${domain}; SameSite=Lax; Max-Age=86400; Secure`;
        } else {
            // For localhost, still set a cookie but without domain
            document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax; Max-Age=86400`;
        }
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        
        localStorage.removeItem(key);
        
        // Also remove from cookie with cross-subdomain domain
        const domain = getCookieDomain();
        if (domain) {
            document.cookie = `${key}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

// Create a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true, // Enable to handle magic link callbacks
        storage: customStorage
    }
});

// Simple sign out function
export const signOut = async () => {
    try {
        if (typeof window !== 'undefined') {
            Object.keys(localStorage).forEach(key => {
                if (key.includes('supabase') || key.includes('sb-')) {
                    localStorage.removeItem(key);
                }
            });
        }
        
        await supabase.auth.signOut({ scope: 'local' });
        return { error: null };
    } catch (err: any) {
        if (err?.name === 'AbortError') {
            return { error: null };
        }
        return { error: null };
    }
};
