"use client";

import { useUser } from "@/components/auth/user-provider";

export default function TestAuthPage() {
    const { user, isLoading, entitlements } = useUser();

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
                </div>
            </div>
        </div>
    );
}
