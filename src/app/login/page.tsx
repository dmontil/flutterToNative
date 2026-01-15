"use client";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navbar } from "@/components/ui/navbar";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
                <div className="w-full max-w-md p-8 rounded-xl border border-border bg-card shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={["google", "github"]}
                        redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
                        theme="dark"
                    />
                </div>
            </div>
        </div>
    );
}
