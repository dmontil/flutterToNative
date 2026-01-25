"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
    const router = useRouter();
    
    useEffect(() => {
        router.replace("/pricing");
    }, [router]);
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Redirecting to pricing...</p>
        </div>
    );
}