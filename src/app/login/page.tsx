"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Navbar } from "@/components/ui/navbar";
import { supabase } from "@/lib/supabase-client";
import { Suspense, useState, useEffect } from "react";

function LoginForm() {
    const [redirectTo, setRedirectTo] = useState("/auth/callback");

    useEffect(() => {
        setRedirectTo(`${window.location.origin}/auth/callback`);
    }, []);

    return (
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
                                    inputText: '#ffffff',
                                    inputPlaceholder: '#94a3b8',
                                    inputBackground: 'hsl(var(--input))',
                                    inputBorder: 'hsl(var(--border))',
                                    inputBorderFocus: '#6366f1',
                                    inputBorderHover: 'hsl(var(--border))',
                                }
                            }
                        },
                        style: {
                            input: {
                                color: '#ffffff !important',
                                backgroundColor: 'hsl(var(--input)) !important',
                                borderColor: 'hsl(var(--border)) !important',
                            },
                            label: {
                                color: 'hsl(var(--foreground)) !important',
                            },
                            message: {
                                color: 'hsl(var(--muted-foreground)) !important',
                            }
                        }
                    }}
                    providers={[]}
                    magicLink={true}
                    view="magic_link"
                    showLinks={false}
                    redirectTo={redirectTo}
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
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}