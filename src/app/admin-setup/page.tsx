"use client";

// @ts-nocheck
import { useState } from "react";
import { useUser } from "@/components/auth/user-provider";
import { supabase } from "@/lib/supabase-browser";

export default function AdminSetupPage() {
    const { user, entitlements } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState("");
    
    const addPremiumEntitlements = async () => {
        if (!user) {
            setMessage("No user logged in");
            return;
        }
        
        setIsUpdating(true);
        setMessage("");
        
        try {
            if (!supabase) {
                throw new Error("Supabase client not available");
            }
            
            // First check if profile exists
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            const newEntitlements = ['ios_premium'];
            
            if (existingProfile) {
                // Update existing profile
                const { error } = await supabase
                    .from('profiles')
                    // @ts-ignore - TypeScript doesn't correctly infer Supabase types
                    .update({ entitlements: newEntitlements })
                    .eq('id', user.id);
                    
                if (error) throw error;
                setMessage("✅ Premium entitlements updated!");
            } else {
                // Create new profile
                const { error } = await supabase
                    .from('profiles')
                    // @ts-ignore - TypeScript doesn't correctly infer Supabase types
                    .insert({
                        id: user.id,
                        entitlements: newEntitlements,
                        created_at: new Date().toISOString()
                    });
                    
                if (error) throw error;
                setMessage("✅ Profile created with premium entitlements!");
            }
            
            // Refresh the page to see changes
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } catch (error: any) {
            console.error("Error updating entitlements:", error);
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Admin Setup - Add Premium Access</h1>
                
                <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Current User:</h2>
                        {user ? (
                            <div className="text-green-600">
                                <p>✅ Logged in as: {user.email}</p>
                                <p>ID: {user.id}</p>
                            </div>
                        ) : (
                            <p className="text-red-600">❌ No user logged in</p>
                        )}
                    </div>

                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Current Entitlements:</h2>
                        <p className="text-blue-600">
                            {entitlements.length > 0 ? entitlements.join(", ") : "No entitlements"}
                        </p>
                    </div>
                    
                    {user && (
                        <div className="p-4 border rounded-lg">
                            <h2 className="font-semibold mb-2">Add Premium Access:</h2>
                            <button
                                onClick={addPremiumEntitlements}
                                disabled={isUpdating}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {isUpdating ? "Updating..." : "Add iOS Premium Entitlements"}
                            </button>
                            
                            {message && (
                                <div className="mt-4 p-3 rounded bg-gray-100">
                                    <p>{message}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}