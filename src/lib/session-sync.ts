"use client";

import { useEffect, useRef } from 'react';
import { supabase } from './supabase-client';
import { syncSessionToCurrentDomain, setSessionCookie } from './cross-domain-auth';

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
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
                const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
                const storageKey = `sb-${projectRef}-auth-token`;

                // Check localStorage
                const localData = localStorage.getItem(storageKey);

                if (!localData) {
                    const synced = await syncSessionToCurrentDomain();
                    if (synced) return;
                }

                // If we have local data, also set it as a cookie for other subdomains
                if (localData) {
                    try {
                        const sessionData = JSON.parse(localData);
                        
                        // Verify the session is still valid by checking with Supabase
                        const { data: { session }, error } = await supabase.auth.getSession();
                        
                        if (session && !error) {
                            // Set cookie for other subdomains
                            setSessionCookie(sessionData);
                        } else if (error) {
                            localStorage.removeItem(storageKey);
                        }
                    } catch (error) {
                    }
                }

            } catch (err) {
            }
        };

        // Initial sync immediately on mount
        const initialSyncTimer = setTimeout(() => {
            if (!syncAttempted.current) {
                syncSession();
                syncAttempted.current = true;
            }
        }, 100);

        // Set up periodic sync (every 60 seconds instead of 30)
        syncInterval.current = setInterval(() => {
            syncSession();
        }, 60000);

        // Listen for storage changes from other tabs/windows
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key && (e.key.includes('supabase') || e.key.includes('sb-'))) {
                syncSession();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Listen for visibility changes (when user switches back to tab)
        const handleVisibilityChange = () => {
            if (!document.hidden && syncAttempted.current) {
                syncSession();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearTimeout(initialSyncTimer);
            if (syncInterval.current) {
                clearInterval(syncInterval.current);
            }
            window.removeEventListener('storage', handleStorageChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null; // This component doesn't render anything
}