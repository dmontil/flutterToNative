"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, memo } from "react";
import { Menu, X, User, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/auth/user-provider";
import { signOut } from "@/lib/supabase-client";
import { usePlatform } from "@/hooks/use-platform";

// Memoized premium badge to avoid unnecessary re-renders
const PremiumBadge = memo(function PremiumBadge() {
  return (
    <div className="flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full">
      <Crown className="h-3 w-3" />
      <span>PRO</span>
    </div>
  );
});

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocal, setIsLocal] = useState(false);
    const { user, hasAccess } = useUser();
    const { platform, isAndroid, isIos, isSelector, pathname } = usePlatform();
    
    useEffect(() => {
        setIsLocal(
            window.location.host.includes("localhost") || window.location.host.includes("127.0.0.1")
        );
    }, []);
    
    const iosHref = isLocal ? "/ios" : "https://ios.fluttertonative.pro";
    const androidHref = isLocal ? "/android" : "https://android.fluttertonative.pro";

    const base = isAndroid ? "/android" : "";
    
    const navLinks = isSelector ? [] : [
        { href: `${base}/mental-model`, label: "Concepts" },
        { href: `${base}/components-ui`, label: "UI Lab" },
        { href: `${base}/architecture`, label: "Architecture" },
        { href: `${base}/interview`, label: "Interview Prep" },
    ];
    
    const hasPremium = isAndroid ? hasAccess('android_premium') || hasAccess('bundle_premium') : hasAccess('ios_premium') || hasAccess('bundle_premium');

    const handleSignOut = async () => {
        try {
            await signOut();
            window.location.href = "/";
        } catch {
            window.location.href = "/";
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-1">
                    Flutter<span className="text-primary">ToNative</span>.pro
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground items-center">
                    <div className="flex items-center gap-2 rounded-full bg-muted/30 border border-border/60 px-2 py-1">
                        <a
                            href={iosHref}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
                                isIos && !isSelector ? "bg-indigo-500 text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            iOS
                        </a>
                        <a
                            href={androidHref}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
                                isAndroid ? "bg-green-500 text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Android
                        </a>
                    </div>
                    {navLinks.map((link) => {
                        const isActive = pathname?.includes(link.href);
                        return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative",
                                isActive 
                                    ? "text-foreground font-bold" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {link.label}
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current" />
                            )}
                        </Link>
                    );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        {user ? (
                            <>
                                {hasPremium && <PremiumBadge />}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span className="hidden lg:inline">{user.email}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium hover:text-primary">
                                    Sign In
                                </Link>
                                <Link href="/premium">
                                    <Button variant="default" size="sm" className="font-bold">Get Access</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-muted-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "md:hidden absolute top-16 inset-x-0 bg-background border-b border-border shadow-xl transition-all duration-300 origin-top",
                isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            )}>
                <div className="flex flex-col p-6 gap-4">
                    <div className="flex items-center gap-2">
                        <a
                            href={iosHref}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border border-border/60",
                                isIos && !isSelector ? "bg-indigo-500 text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            iOS
                        </a>
                        <a
                            href={androidHref}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border border-border/60",
                                isAndroid ? "bg-green-500 text-white" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            Android
                        </a>
                    </div>
                    {navLinks.map((link) => {
                        const isActive = pathname?.includes(link.href);
                        return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-lg font-medium py-2 border-b border-border/50 relative",
                                isActive ? "text-foreground font-bold" : "text-muted-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                            {isActive && (
                                <span className="absolute -bottom-0 left-0 right-0 h-0.5 bg-current" />
                            )}
                        </Link>
                    );
                    })}
                    <div className="flex flex-col gap-3 pt-4">
                        {user ? (
                            <>
                                {hasPremium && (
                                    <div className="flex items-center justify-center gap-1 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-full">
                                        <Crown className="h-3 w-3" />
                                        <span>PREMIUM ACCESS</span>
                                    </div>
                                )}
                                <div className="text-center py-2 text-sm text-muted-foreground">
                                    {user.email}
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={async () => {
                                        setIsOpen(false);
                                        await handleSignOut();
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 font-medium">
                                    Sign In
                                </Link>
                                <Link href="/premium" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full font-bold">Get Access</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
