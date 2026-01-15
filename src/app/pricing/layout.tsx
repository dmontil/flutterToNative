import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing | Lifetime Access to Flutter to iOS Playbook",
    description: "One-time payment for the complete migration guide. 30-day money-back guarantee.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
