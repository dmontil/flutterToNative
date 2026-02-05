"use client";

import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/user-provider";

import { supabase } from "@/lib/supabase-client";
import { FAQSection } from "@/components/ui/faq-section";

export default function PricingPage() {
    const [loadingProduct, setLoadingProduct] = useState<"ios" | "android" | null>(null);
    const router = useRouter();
    const { user } = useUser();

    const onCheckout = async (productId: "ios_playbook" | "android_playbook") => {
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        try {
            setLoadingProduct(productId === "ios_playbook" ? "ios" : "android");
            const { data: { session } } = await supabase.auth.getSession();

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session?.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout error", error);
        } finally {
            setLoadingProduct(null);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-5xl text-center">

                    <div className="mb-12">
                        <span className="animate-pulse px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-bold tracking-wide uppercase border border-red-500/20">
                            Limited Time Launch Offer
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black mt-6 mb-6 tracking-tight">
                            Stop Guessing. <br />
                            Start Coding <span className="text-indigo-500">iOS Native</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The average Senior iOS salary is $150k+. Use your existing Flutter knowledge to bridge the gap in weeks, not months.
                        </p>
                    </div>

                    {/* Pricing Card - iOS */}
                    <div id="ios" className="relative max-w-lg mx-auto bg-card border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <div className="p-8">
                            <h3 className="text-lg font-medium text-muted-foreground">The Complete Playbook</h3>
                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold tracking-tight">$49</span>
                                <span className="text-lg text-muted-foreground line-through">$99</span>
                            </div>
                            <p className="mt-2 text-sm text-green-400 font-medium">One-time payment. Lifetime access.</p>

                            <ul className="mt-8 space-y-4 text-left">
                                {[
                                    "Unlock all 50+ Senior Interview Questions",
                                    "Access Advanced Architecture Deep Dives",
                                    "Full Source Code for 'Add Expense' Feature",
                                    "System Design & Soft Skills Guides",
                                    "Free Updates for Future Content"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    className="w-full h-12 text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
                                    onClick={() => onCheckout("ios_playbook")}
                                    disabled={loadingProduct !== null}
                                >
                                    {loadingProduct === "ios" ? "Processing..." : "Get Instant Access"}
                                </Button>
                                <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1">
                                    <ShieldCheck className="h-3 w-3" /> 30-Day Money-Back Guarantee
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card - Android */}
                    <div id="android" className="relative max-w-lg mx-auto bg-card border-2 border-green-500 shadow-2xl shadow-green-500/20 rounded-2xl overflow-hidden mt-12">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <div className="p-8">
                            <h3 className="text-lg font-medium text-muted-foreground">The Kotlin + Compose Playbook</h3>
                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold tracking-tight">$49</span>
                                <span className="text-lg text-muted-foreground line-through">$99</span>
                            </div>
                            <p className="mt-2 text-sm text-green-400 font-medium">One-time payment. Lifetime access.</p>

                            <ul className="mt-8 space-y-4 text-left">
                                {[
                                    "Compose UI deep dives and production patterns",
                                    "Coroutines, Flow, and structured concurrency",
                                    "Clean Architecture with Hilt DI",
                                    "System design for offline-first Android",
                                    "Free updates for future Kotlin content"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700"
                                    onClick={() => onCheckout("android_playbook")}
                                    disabled={loadingProduct !== null}
                                >
                                    {loadingProduct === "android" ? "Processing..." : "Get Android Access"}
                                </Button>
                                <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1">
                                    <ShieldCheck className="h-3 w-3" /> 30-Day Money-Back Guarantee
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof / Urgency */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center opacity-80">
                        <div>
                            <h4 className="font-bold text-4xl">50+</h4>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Interview Questions</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-4xl">100%</h4>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Swift & UIKit Coverage</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-4xl">24/7</h4>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Lifetime Access</p>
                        </div>
                    </div>

                </div>

                <div className="mt-20">
                    <FAQSection />
                </div>
            </main>
        </div>
    );
}
