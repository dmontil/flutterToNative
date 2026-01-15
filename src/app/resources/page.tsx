"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { useSearchParams } from "next/navigation";
import { Cpu, BrainCircuit, AlertTriangle, BookOpen } from "lucide-react";
import { Suspense } from "react";

const RESOURCE_TOPICS = [
    { title: "ARC & Memory", id: "arc" },
    { title: "Value vs Reference", id: "value-types" },
    { title: "Concurrency", id: "concurrency" },
    { title: "Protocol Oriented", id: "pop" },
];

export default function ResourcesPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Resources...</div>}>
            <ResourcesContent />
        </Suspense>
    );
}

function ResourcesContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "arc";

    return (
        <DocLayout title="Interview Resources" items={RESOURCE_TOPICS}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 capitalize">{currentTopic.replace("-", " ")}</h1>
                <p className="text-muted-foreground">Deep Dive Theory</p>
            </div>

            {currentTopic === "arc" && (
                <ResourceContent
                    icon={<Cpu className="h-8 w-8 text-pink-500" />}
                    title="ARC vs Garbage Collection"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                <strong>Flutter uses a Garbage Collector (GC).</strong> It runs periodically, pauses execution (though briefly), and sweeps unused memory. You barely think about it.
                            </p>
                            <p>
                                <strong>iOS uses Reference Counting (ARC).</strong> Memory is freed <em>instantly</em> when the reference count drops to zero. There is no background sweeper.
                            </p>
                            <div className="bg-muted p-6 rounded-lg border border-border">
                                <h4 className="font-bold text-lg mb-2">The Tricky Part: Retain Cycles</h4>
                                <p className="mb-2">In Flutter, if Parent holds Child and Child holds Parent, the GC eventually figures it out. In iOS, <strong>this is a memory leak</strong>.</p>
                                <p className="font-mono text-sm bg-black/20 p-2 rounded">
                                    class Parent {'{'} var child: Child? {'}'}<br />
                                    class Child {'{'} <span className="text-pink-400">weak</span> var parent: Parent? {'}'}
                                </p>
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "value-types" && (
                <ResourceContent
                    icon={<BrainCircuit className="h-8 w-8 text-cyan-500" />}
                    title="Value Types (Structs) vs Reference Types (Classes)"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                <strong>Flutter/Dart:</strong> Almost everything is a Class (Reference Type). Use `Equatable` to mimic value semantics.
                            </p>
                            <p>
                                <strong>Swift:</strong> We prefer Structs (Model, View, Intent). Check this out:
                            </p>
                            <ul className="list-disc ml-4 space-y-2">
                                <li><strong>Struct:</strong> Copied on assignment. Safe. Thread-safe(ish). Fast (Stack allocated).</li>
                                <li><strong>Class:</strong> Shared instance. Use for ViewModels, Managers, Database connections.</li>
                            </ul>
                            <div className="bg-muted p-6 rounded-lg border border-border mt-4">
                                <h4 className="font-bold text-lg mb-2">When to use what?</h4>
                                <ul className="list-disc ml-4 space-y-1">
                                    <li><strong>Data Model (User, Post):</strong> Struct</li>
                                    <li><strong>View layers (SwiftUI View):</strong> Struct</li>
                                    <li><strong>State Manager (ViewModel):</strong> Class (needs to share state)</li>
                                    <li><strong>Services (APIClient):</strong> Class (singleton/shared)</li>
                                </ul>
                            </div>
                        </div>
                    }
                />
            )}

            {/* Add other sections similarly if needed, or keeping concise for now based on request */}
            {currentTopic === "concurrency" && (
                <ResourceContent
                    icon={<AlertTriangle className="h-8 w-8 text-amber-500" />}
                    title="Concurrency & The Main Thread"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                <strong>Flutter:</strong> Single Isolate by default. Event loop. You can't block the UI thread easily unless you do heavy math in `build()`.
                            </p>
                            <p>
                                <strong>iOS:</strong> Multi-threaded. The UI runs on the <strong>Main Thread</strong>.
                            </p>
                            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-lg">
                                <strong>Golden Rule:</strong> NEVER do blocking work (networking, JSON parsing, image resize) on Main. Always dispatch to background, then update UI on Main.
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "pop" && (
                <ResourceContent
                    icon={<BookOpen className="h-8 w-8 text-emerald-500" />}
                    title="Protocol Oriented Programming (POP)"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                Swift starts with Protocols. Unlike Dart Interfaces, Swift Protocols can have <strong>default implementations</strong> via extensions.
                            </p>
                            <p>
                                <strong>Interview Tip:</strong> Prefer Composition over Inheritance. Use Protocols to define capabilities (`Codable`, `Equatable`, `View`) rather than deep class hierarchies.
                            </p>
                        </div>
                    }
                />
            )}

        </DocLayout>
    );
}

function ResourceContent({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="p-3 bg-muted rounded-xl">{icon}</div>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {content}
        </div>
    );
}
