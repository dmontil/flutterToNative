"use client";

import { useEffect, useRef } from 'react';
import { supabase } from './supabase-client';

/**
 * Syncs session across subdomains by checking cookies and localStorage
 * This component runs on mount and periodically checks for session mismatches
 */
export function SessionSync() {
    const syncAttempted = useRef(false);
    const syncInterval = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        const syncSession = async () => {
            try {
                // Get current session from Supabase
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.warn('[SessionSync] Error getting session:', error);
                    return;
                }

                // Extract storage key for debugging
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
                const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
                const storageKey = `sb-${projectRef}-auth-token`;

                // Check localStorage and cookies
                const localData = localStorage.getItem(storageKey);
                const cookies = document.cookie.split(';').map(c => c.trim());

                // Log current state for debugging
                console.log('[SessionSync] Session state:', {
                    hasSession: !!session,
                    hasLocalData: !!localData,
                    cookieCount: cookies.filter(c => c.includes('sb-')).length,
                    currentDomain: window.location.hostname,
                    storageKey
                });

                // If we have a session but no localStorage data, restore from cookies
                if (session && !localData) {
                    console.log('[SessionSync] ✅ Session exists but localStorage missing - this is normal for cross-subdomain navigation');
                    
                    // Manually store the session in localStorage for the current subdomain
                    if (session.access_token) {
                        const sessionData = {
                            access_token: session.access_token,
                            refresh_token: session.refresh_token,
                            expires_at: session.expires_at,
                            user: session.user
                        };
                        
                        localStorage.setItem(storageKey, JSON.stringify(sessionData));
                        console.log('[SessionSync] ✅ Session restored to localStorage');
                        
                        // Trigger a re-render by reloading the user state
                        window.dispatchEvent(new Event('supabase-session-restored'));
                    }
                }

            } catch (err) {
                console.error('[SessionSync] Error syncing session:', err);
            }
        };

        // Initial sync after a short delay to ensure everything is loaded
        const initialSyncTimer = setTimeout(() => {
            if (!syncAttempted.current) {
                syncSession();
                syncAttempted.current = true;
            }
        }, 1000);

        // Set up periodic sync (every 30 seconds)
        syncInterval.current = setInterval(() => {
            syncSession();
        }, 30000);

        // Listen for storage changes from other tabs/windows
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key && e.key.includes('supabase')) {
                console.log('[SessionSync] 🔄 Storage change detected, syncing...');
                syncSession();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Listen for custom restoration event
        const handleSessionRestored = () => {
            console.log('[SessionSync] ✅ Session restored event received');
            // Force a page re-render to update user state
            window.location.reload();
        };

        window.addEventListener('supabase-session-restored', handleSessionRestored);

        return () => {
            clearTimeout(initialSyncTimer);
            if (syncInterval.current) {
                clearInterval(syncInterval.current);
            }
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('supabase-session-restored', handleSessionRestored);
        };
    }, []);

    return null; // This component doesn't render anything
}