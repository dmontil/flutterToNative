"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui/navbar";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Menu, X, ArrowRight, Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/auth/user-provider";
import { supabase } from "@/lib/supabase-client";
import { DocPromotion } from "@/components/ui/doc-promotion";
import { PRODUCTS, type ProductId } from "@/config/products";

interface DocItem {
    title: string;
    id: string; // Used for URL query param ?topic=id
}

interface DocLayoutProps {
    title: string;
    items: DocItem[];
    children: React.ReactNode;
    productId?: ProductId;
    premiumTopics?: string[]; // IDs of topics that require premium access
}

export function DocLayout({ title, items, children, productId = 'ios_playbook', premiumTopics = [] }: DocLayoutProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentTopicId = searchParams.get("topic") || items[0]?.id;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user, hasAccess, isLoading } = useUser();
    const entitlement = PRODUCTS[productId]?.entitlement || "ios_premium";
    const isPro = hasAccess(entitlement);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    const syncRemoteProgress = useCallback(async () => {
        try {
            if (!user) return;
            const { data, error } = await supabase
                .from('user_progress')
                .select('lesson_id')
                .eq('product_id', productId)
                .eq('user_id', user.id);

            if (data && !error) {
                const remoteIds = data.map(rp => rp.lesson_id);

                // Merge local and remote
                setCompletedLessons(prev => {
                    const merged = Array.from(new Set([...prev, ...remoteIds]));
                    // Update localStorage with merged data
                    localStorage.setItem("course_progress", JSON.stringify(merged));
                    return merged;
                });

                // Check if any local progress needs to be pushed to remote
                const localSaved = JSON.parse(localStorage.getItem("course_progress") || "[]");
                const toPush = localSaved.filter((id: string) => !remoteIds.includes(id));

                if (toPush.length > 0) {
                    const inserts = toPush.map((lesson_id: string) => ({
                        user_id: user?.id,
                        lesson_id,
                        product_id: productId
                    }));
                    await supabase.from('user_progress').insert(inserts);
                }
            }
        } catch (e) {
            console.error("Sync error:", e);
        }
    }, [productId, user]);

    // Load progress: Initial local load + Remote sync
    useEffect(() => {
        // 1. Load from localStorage immediately for speed
        try {
            const saved = localStorage.getItem("course_progress");
            if (saved) {
                setCompletedLessons(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to parse local course progress", e);
        }

        // 2. If logged in, fetch from Supabase and merge
        if (user) {
            syncRemoteProgress();
        }
    }, [user, syncRemoteProgress]);

    // Clear completed lessons when user logs out
    useEffect(() => {
        // If user becomes null (logout), clear local progress
        if (user === null) {
            console.log('[DocLayout] 🧹 User logged out, clearing local progress');
            setCompletedLessons([]);
            try {
                localStorage.removeItem("course_progress");
                console.log('[DocLayout] ✅ Local progress cleared');
            } catch (e) {
                console.error('[DocLayout] ❌ Failed to clear local progress', e);
            }
        }
    }, [user]);


    const markComplete = async (id: string) => {
        if (!completedLessons.includes(id)) {
            const newCompleted = [...completedLessons, id];
            setCompletedLessons(newCompleted);

            // 1. Always Save Local
            try {
                localStorage.setItem("course_progress", JSON.stringify(newCompleted));
            } catch (e) {
                console.error("Failed to save local progress", e);
            }

            // 2. Save Remote if logged in
            if (user) {
                try {
                    await supabase.from('user_progress').insert({
                        user_id: user.id,
                        lesson_id: id,
                        product_id: productId
                    });
                } catch (e) {
                    console.error("Failed to save remote progress", e);
                }
            }
        }
    };

    const handleCompleteAndContinue = async () => {
        await markComplete(currentTopicId);

        // Find next lesson
        const currentIndex = items.findIndex(i => i.id === currentTopicId);
        if (currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            router.push(`?topic=${nextItem.id}`);
        }

        window.scrollTo(0, 0);
    };

    // Calculate Progress (Local to current module)
    const moduleCompletedCount = items.filter(item => completedLessons.includes(item.id)).length;
    const progressPercentage = items.length > 0 ? Math.round((moduleCompletedCount / items.length) * 100) : 0;

    // Find Next Lesson Title for button
    const currentIndex = items.findIndex(i => i.id === currentTopicId);
    const isLastLesson = currentIndex === items.length - 1;

    // Close mobile menu when topic changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [currentTopicId]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex flex-1 pt-16">
                {/* Mobile Toggle */}
                <button
                    className="md:hidden fixed top-20 right-4 z-40 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Sidebar */}
                <aside className={cn(
                    "fixed inset-y-0 left-0 z-30 w-72 bg-card border-r border-border pt-20 transition-transform duration-300 md:translate-x-0 md:static md:h-[calc(100vh-4rem)] md:pt-0 overflow-y-auto flex flex-col",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-lg">{title}</h2>
                            <span className="text-xs font-mono text-muted-foreground">{progressPercentage}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {progressPercentage === 100 ? "Course Completed! 🏆" : "Keep going, Senior Dev!"}
                        </p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Course Modules</div>
                        {items.map((item, index) => {
                            const isCompleted = completedLessons.includes(item.id);
                            const isActive = currentTopicId === item.id;

                            return (
                                <Link
                                    key={item.id}
                                    href={`?topic=${item.id}`}
                                    className={cn(
                                        "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-indigo-500/10 text-indigo-600"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={cn(
                                            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] border",
                                            isActive ? "border-indigo-500 text-indigo-500" : "border-muted-foreground/30 text-muted-foreground"
                                        )}>
                                            {index + 1}
                                        </span>
                                        <span className="truncate max-w-[140px]">{item.title}</span>                                    </span>

                                    {isCompleted && (
                                        <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in" />
                                    )}
                                    {!isCompleted && premiumTopics.includes(item.id) && !isPro && !(!!user && !isLoading) && (
                                        <Lock className="h-3.5 w-3.5 text-amber-500/70" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] bg-background/50">
                    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
                        {children}

                        {/* Actionable Footer */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl border border-border/50 shadow-sm">
                                <Trophy className="h-10 w-10 text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Ready for the next step?</h3>
                                <p className="text-muted-foreground mb-6 max-w-md">
                                    Solidify your knowledge by marking this lesson as complete.
                                </p>
                                <Button
                                    size="lg"
                                    onClick={handleCompleteAndContinue}
                                    className="px-8 font-bold gap-2"
                                >
                                    {isLastLesson ? "Finish Course" : "Mark Complete & Continue"}
                                    {!isLastLesson && <ArrowRight className="h-4 w-4" />}
                                </Button>
                            </div>

                            {/* Sales Conversion: Only show if NOT pro or not logged in (logic can be refined later) */}
                            <DocPromotion variant={productId === "android_playbook" ? "android" : "ios"} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
