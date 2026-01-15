"use client";

import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function DocPromotion() {
    return (
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="h-24 w-24 text-indigo-500" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase mb-4">
                        <Zap className="h-3 w-3" /> Get the Full Experience
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Unlock the complete Playbook</h3>
                    <p className="text-muted-foreground max-w-md">
                        This is just a sneak peek. Unlock 50+ deep-dives, professional architecture, and senior interview blueprints.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <Link href="/pricing" className="w-full">
                        <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 font-bold gap-2">
                            Access Everything <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ShieldCheck className="h-3.5 w-3.5" /> 30-Day Money-Back Guarantee
                    </div>
                </div>
            </div>
        </div>
    );
}
