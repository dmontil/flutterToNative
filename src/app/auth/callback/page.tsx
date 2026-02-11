"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your login...");

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session) {
        router.replace("/pricing");
        return;
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN" && session) {
            subscription.unsubscribe();
            router.replace("/pricing");
          }
        }
      );

      setTimeout(() => {
        setStatus("Something went wrong. Redirecting to login...");
        setTimeout(() => router.replace("/login"), 2000);
      }, 10000);
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}
