"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase-client";

interface UserContextType {
    user: { id: string; email?: string } | null;
    entitlements: string[];
    isLoading: boolean;
    hasAccess: (entitlement: string) => boolean;
}

const UserContext = createContext<UserContextType>({
    user: null,
    entitlements: [],
    isLoading: true,
    hasAccess: () => false,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
    const [entitlements, setEntitlements] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profileFetchedFor, setProfileFetchedFor] = useState<string | null>(null);

    const fetchProfile = useCallback(async function fetchProfile(userId: string, retryCount = 0) {
        if (profileFetchedFor === userId && retryCount === 0) {
            return;
        }
        
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Profile query timeout')), 3000);
            });
            
            const queryPromise = supabase
                .from('profiles')
                .select('entitlements')
                .eq('id', userId)
                .maybeSingle();
            
            const result = await Promise.race([queryPromise, timeoutPromise]) as { data?: any; error?: any };
            const { data, error } = result;

            if (error) {
                console.error('[UserProvider] Profile fetch error:', error.code);
                setEntitlements([]);
            } else if (data) {
                const newEntitlements = data.entitlements || [];
                setEntitlements(newEntitlements);
                setProfileFetchedFor(userId);
            } else {
                setEntitlements([]);
            }
        } catch (error: any) {
            if ((error?.name === 'AbortError' || error?.message === 'Profile query timeout') && retryCount < 2) {
                setTimeout(() => fetchProfile(userId, retryCount + 1), 1000);
                return;
            }
            setEntitlements([]);
        }
    }, [profileFetchedFor]);

    useEffect(() => {
        let mounted = true;

        const handleHashAuth = () => {
            if (typeof window === 'undefined') return;
            
            const hash = window.location.hash;
            
            if (hash && hash.includes('access_token')) {
                try {
                    const hashParams = new URLSearchParams(hash.substring(1));
                    const accessToken = hashParams.get('access_token');
                    const refreshToken = hashParams.get('refresh_token');
                    
                    if (accessToken && refreshToken) {
                        window.history.replaceState({}, document.title, window.location.pathname);
                        
                        supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken
                        }).catch(() => {});
                        
                        try {
                            const payload = JSON.parse(atob(accessToken.split('.')[1]));
                            
                            if (payload.sub && payload.email) {
                                setUser({ id: payload.sub, email: payload.email });
                                setIsLoading(false);
                                fetchProfile(payload.sub);
                            } else {
                                setIsLoading(false);
                            }
                        } catch {
                            setIsLoading(false);
                        }
                    } else {
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                } catch {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        };
        
        handleHashAuth();

        const getInitialSession = async () => {
            try {
                if (!mounted) return;
                
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (!mounted) return;
                
                const { data: { session } } = await supabase.auth.getSession();
                
                if (session?.user) {
                    if (mounted) {
                        setUser(session.user);
                        await fetchProfile(session.user.id);
                        setIsLoading(false);
                    }
                } else {
                    if (mounted) {
                        setUser(null);
                        setEntitlements([]);
                        setProfileFetchedFor(null);
                        setIsLoading(false);
                    }
                }
            } catch {
                if (mounted) {
                    setUser(null);
                    setEntitlements([]);
                    setProfileFetchedFor(null);
                    setIsLoading(false);
                }
            }
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!mounted) return;
                
                try {
                    if (event === 'SIGNED_OUT' || !session?.user) {
                        setUser(null);
                        setEntitlements([]);
                        setProfileFetchedFor(null);
                        setIsLoading(false);
                    } else if (session?.user) {
                        setUser(session.user);
                        
                        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                            if (mounted) {
                                await fetchProfile(session.user.id);
                            }
                        }
                        
                        if (mounted) {
                            setIsLoading(false);
                        }
                    }
                } catch (error: any) {
                    if (error?.name === 'AbortError') {
                        if (mounted) setIsLoading(false);
                        return;
                    }
                    if (mounted) setIsLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchProfile]);

    const hasAccess = (entitlement: string) => entitlements.includes(entitlement);

    return (
        <UserContext.Provider value={{ user, entitlements, isLoading, hasAccess }}>
            {children}
        </UserContext.Provider>
    );
}
