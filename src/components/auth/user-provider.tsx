"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
    const [entitlements, setEntitlements] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('entitlements')
            .eq('id', userId)
            .single();

        if (data && !error) {
            setEntitlements(data.entitlements || []);
        } else {
            setEntitlements([]);
        }
    };

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
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
