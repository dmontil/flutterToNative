"use client";

import { createContext, useContext, useEffect, useState } from "react";
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

    const fetchProfile = async (userId: string) => {
        console.log('[UserProvider] Fetching profile for user:', userId);
        const { data, error } = await supabase
            .from('profiles')
            .select('entitlements')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('[UserProvider] Error fetching profile:', error);
            setEntitlements([]);
        } else if (data) {
            console.log('[UserProvider] Profile data:', data);
            console.log('[UserProvider] Entitlements:', data.entitlements);
            setEntitlements(data.entitlements || []);
        } else {
            console.log('[UserProvider] No profile data found');
            setEntitlements([]);
        }
    };

    useEffect(() => {
        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('[UserProvider] Initial session:', session?.user?.email);
            if (session?.user) {
                setUser(session.user);
                fetchProfile(session.user.id);
            } else {
                setUser(null);
                setEntitlements([]);
            }
            setIsLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('[UserProvider] Auth state changed:', event, session?.user?.email);
                if (session?.user) {
                    setUser(session.user);
                    await fetchProfile(session.user.id);
                } else {
                    setUser(null);
                    setEntitlements([]);
                }
                setIsLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const hasAccess = (entitlement: string) => entitlements.includes(entitlement);

    return (
        <UserContext.Provider value={{ user, entitlements, isLoading, hasAccess }}>
            {children}
        </UserContext.Provider>
    );
}
