"use client";

import { useUser } from "@/components/auth/user-provider";
import { supabase } from "@/lib/supabase-client";
import { useState } from "react";

export default function TestAuthPage() {
    const { user, isLoading, entitlements } = useUser();
    const [grantStatus, setGrantStatus] = useState<string>("");
    const testModeEnabled = process.env.NEXT_PUBLIC_PREMIUM_TEST_MODE === "true";

    const grantPremium = async () => {
        setGrantStatus("Granting premium...");
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data?.session?.access_token) {
                setGrantStatus("No session found. Please log in first.");
                return;
            }

            const res = await fetch("/api/debug/grant-premium", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.session.access_token}`
                },
                body: JSON.stringify({ productId: "ios_playbook" })
            });

            if (!res.ok) {
                setGrantStatus(`Failed: ${res.status}`);
                return;
            }

            setGrantStatus("✅ Premium granted. Refreshing...");
            setTimeout(() => window.location.reload(), 800);
        } catch (e: any) {
            setGrantStatus(`Error: ${e?.message || "unknown"}`);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Auth Persistence Test</h1>
                
                <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Loading State:</h2>
                        <p className={isLoading ? "text-yellow-600" : "text-green-600"}>
                            {isLoading ? "Loading..." : "Loaded"}
                        </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">User State:</h2>
                        {user ? (
                            <div className="text-green-600">
                                <p>✅ User is authenticated</p>
                                <p>ID: {user.id}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        ) : (
                            <p className="text-red-600">❌ No user authenticated</p>
                        )}
                    </div>

                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Entitlements:</h2>
                        <p className="text-blue-600">
                            {entitlements.length > 0 ? entitlements.join(", ") : "No entitlements"}
                        </p>
                    </div>

                    <div className="p-4 border rounded-lg bg-gray-50">
                        <h2 className="font-semibold mb-2">Test Instructions:</h2>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Log in with your email</li>
                            <li>Verify you see authenticated state above</li>
                            <li>Refresh this page (F5 or Cmd+R)</li>
                            <li>You should remain logged in</li>
                            <li>Close and reopen browser tab</li>
                            <li>You should still be logged in</li>
                        </ol>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-50">
                        <h2 className="font-semibold mb-2">Debug Info:</h2>
                        <p className="text-xs font-mono">
                            localStorage: {typeof window !== 'undefined' ? 
                                (window.localStorage.getItem('supabase.auth.token') ? 'Has tokens' : 'No tokens') : 
                                'SSR'
                            }
                        </p>
                    </div>

                    {testModeEnabled && (
                        <div className="p-4 border rounded-lg bg-amber-50">
                            <h2 className="font-semibold mb-2">Premium Test Mode</h2>
                            <p className="text-sm text-muted-foreground mb-3">
                                This is only enabled in non-production environments.
                            </p>
                            <button
                                onClick={grantPremium}
                                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                            >
                                Grant iOS Premium (Test)
                            </button>
                            {grantStatus && (
                                <p className="text-xs mt-3 font-mono">{grantStatus}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
