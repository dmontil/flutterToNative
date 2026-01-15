"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

export function LeadMagnet() {
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!consent) {
            setError("Please accept the privacy terms.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'homepage_lead_magnet',
                    consent_given: true,
                    target_product: 'ios_playbook'
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit');
            }

            setSubmitted(true);
            setTimeout(() => {
                window.location.href = "/widget-map";
            }, 2000);
        } catch (err: any) {
            console.error("Lead capture error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-12 text-center max-w-2xl mx-auto my-12 animate-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold mb-4">Access Granted! 💎</h3>
                <p className="text-xl text-muted-foreground mb-6">
                    You can now explore the <strong>&quot;Widget-to-Swift Map&quot;</strong> interactive tool.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-bold" asChild>
                        <a href="/widget-map">Open Interactive Map</a>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground italic">
                    Note: If it&apos;s not there, check your spam/promotions folder.
                </p>
            </div>
        );
    }

    return (
        <section id="early-access" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">

                    {/* Visual Mockup */}
                    <div className="flex-1 w-full max-w-md relative animate-in fade-in slide-in-from-left duration-700">
                        <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl opacity-50 rounded-full" />
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20 bg-card">
                            <Image
                                src="/images/lead-magnet-mockup.png"
                                alt="SwiftUI Rosetta Stone Cheat Sheet"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2">
                            <Sparkles className="h-5 w-5" /> Interactive Map
                        </div>
                    </div>

                    {/* Form Component */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-bold uppercase mb-6">
                            <Mail className="h-4 w-4" /> Limited Free Access
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                            The Flutter-to-SwiftUI <br />
                            <span className="text-indigo-500 italic">Bridge Explorer.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Stop guessing. Access our interactive <strong>"Widget-to-Swift Map"</strong> and learn exactly how Flutter concepts map to Apple's native APIs.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your senior dev email"
                                        className="w-full h-14 bg-card border border-border rounded-xl px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    {error && <p className="absolute -bottom-6 left-0 text-xs text-red-500">{error}</p>}
                                </div>
                                <Button size="lg" className="h-14 px-8 font-extrabold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Get Instant Access"
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-start gap-3 text-left">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    required
                                />
                                <label htmlFor="consent" className="text-sm text-muted-foreground leading-snug">
                                    I agree to receive access to the <strong>&quot;Widget-to-Swift Map&quot;</strong> and occasional high-value emails about iOS engineering. You can unsubscribe at any time.
                                </label>
                            </div>
                        </form>
                        <p className="text-xs text-muted-foreground mt-8">
                            Already trusted by 2,000+ Flutter Engineers. No spam, ever.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
