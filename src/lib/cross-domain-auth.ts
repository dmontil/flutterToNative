/**
 * Cross-domain authentication utilities
 * Handles session sharing between main domain and subdomains (ios.fluttertonative.pro, android.fluttertonative.pro)
 */

export function getMainDomain(): string {
    if (typeof window === 'undefined') return '';
    
    const hostname = window.location.hostname;
    
    // For local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'localhost';
    }
    
    // Extract main domain (e.g., ios.fluttertonative.pro -> fluttertonative.pro)
    const parts = hostname.split('.');
    if (parts.length >= 2) {
        return parts.slice(-2).join('.');
    }
    
    return hostname;
}

export function getSessionSyncURL(): string {
    const mainDomain = getMainDomain();
    const protocol = window.location.protocol;
    
    // The sync endpoint should always be on the main domain
    return `${protocol}//${mainDomain}/api/auth/sync-session`;
}

export async function syncSessionToCurrentDomain(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
        const storageKey = `sb-${projectRef}-auth-token`;
        
        // Check if we already have a session in localStorage
        const existingSession = localStorage.getItem(storageKey);
        if (existingSession) {
            console.log('[CrossDomainAuth] ✅ Session already exists in current domain');
            return true;
        }
        
        // Try to get session from cookies (set by other subdomain)
        const cookies = document.cookie.split(';').map(c => c.trim());
        const sessionCookie = cookies.find(c => c.startsWith(`${storageKey}=`));
        
        if (sessionCookie) {
            const sessionData = decodeURIComponent(sessionCookie.split('=')[1]);
            
            // Verify it's valid JSON before storing
            try {
                JSON.parse(sessionData);
                
                // Store the session in localStorage for current subdomain
                localStorage.setItem(storageKey, sessionData);
                console.log('[CrossDomainAuth] ✅ Session synced from cookies to localStorage');
                
                // Trigger a Supabase auth state change instead of full reload
                // This will update the UI without losing navigation state
                setTimeout(() => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                        // Only reload on home page to avoid losing navigation
                        window.location.reload();
                    }
                }, 100);
                
                return true;
            } catch (error) {
                console.warn('[CrossDomainAuth] ⚠️ Invalid session data in cookies', error);
            }
        }
        
        console.log('[CrossDomainAuth] ℹ️ No session found in cookies');
        return false;
        
    } catch (error) {
        console.error('[CrossDomainAuth] ❌ Error syncing session:', error);
        return false;
    }
}

export function setSessionCookie(sessionData: any): void {
    if (typeof window === 'undefined') return;
    
    const mainDomain = getMainDomain();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
    const storageKey = `sb-${projectRef}-auth-token`;
    
    const sessionJson = JSON.stringify(sessionData);
    
    // Set cookie with cross-subdomain domain
    let cookieDomain = '';
    if (mainDomain !== 'localhost') {
        cookieDomain = `.${mainDomain}`;
    }
    
    const cookieValue = `${storageKey}=${encodeURIComponent(sessionJson)}; path=/; SameSite=Lax; Max-Age=86400${cookieDomain ? `; domain=${cookieDomain}; Secure` : ''}`;
    document.cookie = cookieValue;
    
    console.log('[CrossDomainAuth] 🍪 Session cookie set for domain:', cookieDomain || 'localhost');
}

export function clearSessionCookies(): void {
    if (typeof window === 'undefined') return;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
    const storageKey = `sb-${projectRef}-auth-token`;
    
    const mainDomain = getMainDomain();
    let cookieDomain = '';
    if (mainDomain !== 'localhost') {
        cookieDomain = `.${mainDomain}`;
    }
    
    // Clear cookies with and without domain prefix
    document.cookie = `${storageKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${cookieDomain ? `; domain=${cookieDomain}` : ''}`;
    document.cookie = `${storageKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${storageKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${mainDomain || ''}`;
    
    console.log('[CrossDomainAuth] 🧹 Session cookies cleared');
}