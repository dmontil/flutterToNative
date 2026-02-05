"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseClient, getCurrentSession } from "@/lib/auth";

interface AuthContextType {
  user: { id: string; email?: string } | null;
  entitlements: string[];
  isLoading: boolean;
  hasAccess: (entitlement: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  entitlements: [],
  isLoading: true,
  hasAccess: () => false,
});

export const useAuth = () => useContext(AuthContext);

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasAccess = (entitlement: string) => {
    return entitlements.includes(entitlement);
  };

  const fetchUserProfile = async (userId: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
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
    } catch {
      setEntitlements([]);
    }
  };

  useEffect(() => {
    let mounted = true;
    let subscription: any = null;
    
    const initAuth = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if we have a session
        const session = await getCurrentSession();
        
        if (!mounted) return;
        
        console.log('Initial session:', session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setEntitlements([]);
        }
        
        setIsLoading(false);
        
        // Set up auth listener
        const { data: authSubscription } = supabase.auth.onAuthStateChange(
          async (event: string, session: any) => {
            if (!mounted) return;
            
            console.log('Auth state change:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN' && session?.user) {
              setUser(session.user);
              await fetchUserProfile(session.user.id);
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
              setEntitlements([]);
            }
            
            if (event !== 'TOKEN_REFRESHED') {
              setIsLoading(false);
            }
          }
        );
        
        subscription = authSubscription;
        
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setUser(null);
          setEntitlements([]);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, entitlements, isLoading, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}
