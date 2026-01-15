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
                    <h1 className="text-2xl font-bold text-center mb-2">Welcome to FlutterToNative.pro</h1>
                    <p className="text-center text-muted-foreground mb-6">
                        Sign in with your email to access premium content
                    </p>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#6366f1',
                                        brandAccent: '#4f46e5',
                                    }
                                }
                            }
                        }}
                        providers={[]}
                        magicLink={true}
                        view="magic_link"
                        showLinks={false}
                        redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/` : '/'}
                        theme="dark"
                        localization={{
                            variables: {
                                magic_link: {
                                    email_input_label: 'Email address',
                                    email_input_placeholder: 'your@email.com',
                                    button_label: 'Send Magic Link',
                                    loading_button_label: 'Sending Magic Link...',
                                    link_text: 'Send a magic link email',
                                    confirmation_text: 'Check your email for the magic link',
                                },
                            },
                        }}
                    />
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>✨ No password needed - we'll email you a magic link</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
