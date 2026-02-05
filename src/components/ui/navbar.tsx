"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/auth/user-provider";
import { signOut } from "@/lib/supabase-client";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const pathname = usePathname();
    const isAndroid = pathname?.startsWith("/android");
    const isSelector = pathname === "/";
    const base = isAndroid ? "/android" : "";
    const isLocal = typeof window !== "undefined" && (
        window.location.host.includes("localhost") || window.location.host.includes("127.0.0.1")
    );
    const iosHref = isLocal ? "/ios" : "https://ios.fluttertonative.pro";
    const androidHref = isLocal ? "/android" : "https://android.fluttertonative.pro";

    const navLinks = isSelector ? [] : [
        { href: `${base}/mental-model`, label: "Concepts" },
        { href: `${base}/components-ui`, label: "UI Lab" },
        { href: `${base}/architecture`, label: "Architecture" },
        { href: `${base}/interview`, label: "Interview Prep" },
    ];

    const handleSignOut = async () => {
        console.log('[Navbar] 🚪 Sign out button clicked');
        console.log('[Navbar] 👤 Current user:', user?.email);
        
        try {
            console.log('[Navbar] 🚀 Starting sign out process...');
            const result = await signOut();
            console.log('[Navbar] 📥 Sign out result:', result);
            
            // Always force a full page reload for sign out
            console.log('[Navbar] 🔄 Force reloading page to complete sign out...');
            window.location.href = "/";
            
        } catch (error) {
            console.error('[Navbar] 💥 Sign out exception:', {
                name: error?.name,
                message: error?.message,
                error
            });
            console.log('[Navbar] 🔄 Force reloading despite error...');
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
                <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2 rounded-full bg-muted/30 border border-border/60 px-2 py-1">
                        <a
                            href={iosHref}
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors",
                                !isAndroid && !isSelector ? "bg-indigo-500 text-white" : "text-muted-foreground hover:text-foreground"
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{user.email}</span>
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
                                    <Button variant="default" size="sm" className="font-bold">Get Premium</Button>
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
                                !isAndroid && !isSelector ? "bg-indigo-500 text-white" : "text-muted-foreground hover:text-foreground"
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium py-2 border-b border-border/50"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-4">
                        {user ? (
                            <>
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
                                    <Button className="w-full font-bold">Get Premium</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
