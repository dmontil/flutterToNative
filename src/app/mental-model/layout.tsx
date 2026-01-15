import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flutter vs iOS Mental Model | The Mapping Guide",
    description: "Stop translating code line-by-line. Understand the core differences between Widget/View, Isolate/Task, and Bloc/ViewModel.",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
