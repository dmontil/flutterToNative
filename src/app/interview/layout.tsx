import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "50+ iOS Interview Questions | Flutter to iOS",
    description: "Ace your next iOS interview. Deep dives into ARC, lifecycle, concurrency, and UIKit vs SwiftUI differences.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
