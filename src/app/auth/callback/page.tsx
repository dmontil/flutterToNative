"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type CheckoutIntent = {
  productId: string;
  currency: string;
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your login...");

  useEffect(() => {
    let sub: { unsubscribe: () => void } | null = null;

    const handleAuth = async () => {
      // Intentar obtener sesión inmediatamente
      const { data: { session: existingSession } } = await supabase.auth.getSession();

      const session = existingSession ?? await new Promise<any>((resolve) => {
        const timeoutId = setTimeout(() => {
          sub?.unsubscribe();
          resolve(null);
        }, 10000);

        const { data } = supabase.auth.onAuthStateChange((event, s) => {
          if (event === "SIGNED_IN" && s) {
            clearTimeout(timeoutId);
            data.subscription.unsubscribe();
            resolve(s);
          }
        });
        sub = data.subscription;
      });

      if (!session) {
        setStatus("Something went wrong. Redirecting to login...");
        setTimeout(() => router.replace("/login"), 2000);
        return;
      }

      // Leer intent de checkout guardado antes del login
      const raw = sessionStorage.getItem("checkout_intent");
      sessionStorage.removeItem("checkout_intent");

      if (raw) {
        try {
          const intent: CheckoutIntent = JSON.parse(raw);
          setStatus("Preparing your checkout...");

          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: intent.productId,
              currency: intent.currency,
            }),
          });

          const data = await response.json().catch(() => null);

          if (data?.url) {
            window.location.assign(data.url);
            return;
          }
        } catch {
          // Si falla el checkout, caer a /pricing
        }
      }

      router.replace("/pricing");
    };

    handleAuth();

    return () => {
      sub?.unsubscribe();
    };
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
