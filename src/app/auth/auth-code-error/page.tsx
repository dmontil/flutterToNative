"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { supabase } from '@/lib/supabase-browser';
import { useEffect, useState, Suspense } from 'react';

function AuthCodeErrorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            setErrorMessage(decodeURIComponent(error));
        }
    }, [searchParams]);

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
                <div className="w-full max-w-md p-6 sm:p-8 rounded-xl border border-border bg-card shadow-lg text-center">
                    <div className="mb-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">Authentication Error</h1>
                    <p className="text-center text-muted-foreground mb-4">
                        There was a problem signing you in. The magic link may have expired or been used already.
                    </p>
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                            <p className="text-sm text-red-700">
                                <strong>Error details:</strong> {errorMessage}
                            </p>
                        </div>
                    )}
                    <div className="space-y-3">
                        <Button 
                            onClick={() => router.push('/login')}
                            className="w-full"
                        >
                            Try Again
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => router.push('/')}
                            className="w-full"
                        >
                            Go Home
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={handleLogout}
                            className="w-full text-sm"
                        >
                            Sign Out
                        </Button>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                        <p>💡 Tips:</p>
                        <ul className="text-left mt-2 space-y-1">
                            <li>• Magic links expire after 24 hours</li>
                            <li>• Each link can only be used once</li>
                            <li>• Check you're using the latest email</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthCodeErrorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-muted-foreground">Loading...</p>
                    </div>
                </div>
            </div>
        }>
            <AuthCodeErrorContent />
        </Suspense>
    );
}
