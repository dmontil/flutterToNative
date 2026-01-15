import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Widget-to-Swift Map | Flutter to SwiftUI",
    description: "A side-by-side code comparison of every major UI component. Column vs VStack, ListView vs List, and more.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
