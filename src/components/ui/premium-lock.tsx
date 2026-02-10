"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PremiumLockProps {
    isUnlocked: boolean;
    children: React.ReactNode;
    blurAmount?: "sm" | "md" | "lg";
}

export function PremiumLock({ isUnlocked, children, blurAmount = "md" }: PremiumLockProps) {
    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="relative group">
            {/* The Blurred Content */}
            <div
                className={cn(
                    "transition-all duration-500 select-none pointer-events-none",
                    blurAmount === "sm" && "blur-sm opacity-90",
                    blurAmount === "md" && "blur-md opacity-80",
                    blurAmount === "lg" && "blur-xl opacity-60",
                    "grayscale-[0.5]"
                )}
            >
                {children}
            </div>

            {/* The Lock Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-20 bg-gradient-to-b from-transparent via-background/30 to-background/70">
                <div className="bg-card/90 backdrop-blur-md border border-indigo-500/30 p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 transform transition-all hover:scale-105">
                    <div className="h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Pro Content Locked
                    </h3>
                    <p className="text-muted-foreground mt-2 mb-6">
                        Unlock the detailed implementation, source code, and senior interview questions.
                    </p>
                    <Link href="/pricing" className="block w-full">
                        <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 font-bold">
                            Unlock Full Access
                        </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-3">
                        One-time payment. Lifetime access.
                    </p>
                </div>
            </div>
        </div>
    );
}
