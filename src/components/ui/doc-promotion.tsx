"use client";

import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Variant = "ios" | "android";

const VARIANTS: Record<Variant, {
    accent: string;
    accentBg: string;
    bg: string;
    border: string;
    glow: string;
    button: string;
    label: string;
    title: string;
    description: string;
    cta: string;
    href: string;
}> = {
    ios: {
        accent: "text-indigo-500",
        accentBg: "bg-indigo-500/20",
        bg: "from-indigo-600/10 to-purple-600/10",
        border: "border-indigo-500/20",
        glow: "shadow-indigo-500/20",
        button: "bg-indigo-600 hover:bg-indigo-700",
        label: "Get the Full Experience",
        title: "Unlock the complete iOS Playbook",
        description: "This is just a sneak peek. Unlock 50+ deep-dives, professional architecture, and senior interview blueprints.",
        cta: "Access iOS Premium",
        href: "/pricing#ios",
    },
    android: {
        accent: "text-green-500",
        accentBg: "bg-green-500/20",
        bg: "from-green-600/10 to-emerald-600/10",
        border: "border-green-500/20",
        glow: "shadow-green-500/20",
        button: "bg-green-600 hover:bg-green-700",
        label: "Kotlin + Compose Track",
        title: "Unlock the complete Android Playbook",
        description: "Dive into Compose, coroutines, and real Android architecture patterns built for senior engineers.",
        cta: "Access Android Premium",
        href: "/pricing#android",
    },
};

export function DocPromotion({ variant = "ios" }: { variant?: Variant }) {
    const v = VARIANTS[variant];
    return (
        <div className={`mt-16 p-8 rounded-3xl bg-gradient-to-br ${v.bg} border ${v.border} relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className={`h-24 w-24 ${v.accent}`} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${v.accentBg} ${v.accent} text-xs font-bold uppercase mb-4`}>
                        <Zap className="h-3 w-3" /> {v.label}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{v.title}</h3>
                    <p className="text-muted-foreground max-w-md">
                        {v.description}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <Link href={v.href} className="w-full">
                        <Button size="lg" className={`w-full ${v.button} hover:opacity-90 shadow-xl ${v.glow} font-bold gap-2`}>
                            {v.cta} <ArrowRight className="h-4 w-4" />
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
