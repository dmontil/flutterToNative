"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { useSearchParams } from "next/navigation";
import { Cpu, BrainCircuit, AlertTriangle, BookOpen, MessageCircleQuestion, Layers, Zap, Clock } from "lucide-react";
import { CodeComparison } from "@/components/ui/code-comparison";

import { Suspense } from "react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

const INTERVIEW_TOPICS = [
    { title: "Theory: GC & Memory", id: "theory-gc" },
    { title: "Theory: Value vs Reference", id: "theory-value" },
    { title: "Theory: Concurrency", id: "theory-concurrency" },
    { title: "Theory: Interfaces & Extensions", id: "theory-pop" },
    { title: "Theory: Lambdas & Capture", id: "theory-closures" },
    { title: "Theory: Null Safety", id: "theory-optionals" },
    { title: "Theory: Generics", id: "theory-generics" },
    { title: "Theory: App Lifecycle", id: "theory-lifecycle" },

    { title: "Q&A: Core Kotlin", id: "qa-core" },
    { title: "Q&A: Compose & UI", id: "qa-ui" },
    { title: "Q&A: Architecture", id: "qa-arch" },
    { title: "Q&A: Advanced Topics", id: "qa-adv" },
    { title: "Q&A: System Design", id: "qa-design" },

    { title: "Pack: Kotlin Deep Dive", id: "qa-batch-1" },
    { title: "Pack: Compose Internals", id: "qa-batch-2" },
    { title: "Pack: Views & Legacy", id: "qa-batch-3" },
    { title: "Pack: Data & CI/CD", id: "qa-batch-4" },
];

export default function AndroidInterviewPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Interview Prep...</div>}>
            <AndroidInterviewContent />
        </Suspense>
    );
}

function AndroidInterviewContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "theory-gc";
    const { hasAccess, user, entitlements, isLoading } = useUser();
    const isPro = hasAccess('android_premium');

    console.log('[AndroidInterviewPage] 🔍 Current state:', {
        hasUser: !!user,
        userEmail: user?.email,
        entitlements,
        isLoading,
        isPro,
        hasAccessResult: hasAccess('android_premium'),
        currentTopic
    });

    return (
        <DocLayout
            title="Interview Prep"
            items={INTERVIEW_TOPICS}
            productId="android_playbook"
            premiumTopics={["theory-pop", "theory-closures", "theory-optionals", "theory-generics", "theory-lifecycle", "qa-core", "qa-ui", "qa-arch", "qa-adv", "qa-design", "qa-batch-1", "qa-batch-2", "qa-batch-3", "qa-batch-4"]}
        >
            <div className="mb-8 border-b border-border pb-6">
                <h1 className="text-3xl font-bold mb-2 capitalize">{INTERVIEW_TOPICS.find(t => t.id === currentTopic)?.title}</h1>
                <p className="text-muted-foreground">Master the Android Senior Filter Questions</p>
            </div>

            {currentTopic === "theory-gc" && (
                <ResourceContent
                    icon={<Cpu className="h-8 w-8 text-pink-500" />}
                    title="GC, Heap, and Memory Pressure"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                <strong>Flutter (Dart):</strong> GC-managed heap in the Dart VM. Allocations are cheap but GC spikes can hurt UI.
                            </p>
                            <p>
                                <strong>Android (ART):</strong> GC is also present, but the runtime has stricter memory limits and foreground/background pressure.
                            </p>
                            <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20">
                                <h4 className="font-bold text-lg mb-2 text-destructive">The Trap: Leaking Activities</h4>
                                <p className="mb-2">Long-lived references (static singletons, lambdas, caches) can keep an Activity alive and leak the entire UI tree.</p>
                                <p className="font-mono text-sm bg-black/20 p-2 rounded">
                                    object Cache {'{'} var viewRef: View? = null {'}'}<br />
                                    // Holding a View retains the Activity context.
                                </p>
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "theory-value" && (
                <ResourceContent
                    icon={<BrainCircuit className="h-8 w-8 text-cyan-500" />}
                    title="Data Classes vs Classes"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p><strong>Flutter:</strong> Everything is a class, equality usually via Equatable.</p>
                            <p><strong>Kotlin:</strong> Prefer <code>data class</code> for immutable state and value equality.</p>
                            <div className="bg-muted p-6 rounded-lg border border-border">
                                <ul className="list-disc ml-4 space-y-1">
                                    <li><strong>data class:</strong> value equality, copy(), destructuring.</li>
                                    <li><strong>class:</strong> identity, mutable state, long-lived objects.</li>
                                </ul>
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "theory-concurrency" && (
                <ResourceContent
                    icon={<Zap className="h-8 w-8 text-amber-500" />}
                    title="Coroutines & Dispatchers"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p><strong>Flutter:</strong> Single isolate with async event loop.</p>
                            <p><strong>Android:</strong> Coroutines with Dispatchers. UI must run on <strong>Main</strong>.</p>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-bold mb-2">Rule of Thumb</h4>
                                <p>Use <code>Dispatchers.Main</code> for UI, <code>IO</code> for network/db, and <code>Default</code> for CPU work.</p>
                            </div>
                        </div>
                    }
                />
            )}

            <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                {currentTopic === "theory-pop" && (
                    <ResourceContent
                        icon={<Layers className="h-8 w-8 text-emerald-500" />}
                        title="Interfaces & Extension Functions"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Kotlin interfaces can have default methods. Extensions add behavior without inheritance.</p>
                                <p>Use extension functions to keep Compose code clean and avoid bloating ViewModels.</p>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-closures" && (
                    <ResourceContent
                        icon={<BrainCircuit className="h-8 w-8 text-purple-500" />}
                        title="Lambdas & Capture"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p><strong>Flutter:</strong> Closures capture variables automatically.</p>
                                <p><strong>Kotlin:</strong> Lambdas capture context too, which can leak Activities if stored in singletons.</p>

                                <CodeComparison
                                    title="Avoiding Leaks"
                                    snippets={[
                                        {
                                            label: "Kotlin (Leak)", language: "kotlin", code: `object Bus {
  var callback: (() -> Unit)? = null
}

class Activity {
  fun setup() {
    Bus.callback = { finish() } // captures Activity
  }
}` },
                                        {
                                            label: "Kotlin (Safe)", language: "kotlin", code: `class Activity {
  fun setup() {
    val weak = WeakReference(this)
    Bus.callback = { weak.get()?.finish() }
  }
}` }
                                    ]}
                                />
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-optionals" && (
                    <ResourceContent
                        icon={<AlertTriangle className="h-8 w-8 text-orange-500" />}
                        title="Null Safety"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Kotlin null safety is stricter than Dart in some contexts, especially with platform types.</p>
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border"><th className="py-2">Concept</th><th className="py-2">Dart</th><th className="py-2">Kotlin</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border/50"><td className="py-2">Nullable</td><td className="font-mono">String?</td><td className="font-mono">String?</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Force Unwrap</td><td className="font-mono">s!</td><td className="font-mono">s!! (Crash risk)</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Safe Call</td><td className="font-mono">s?.length</td><td className="font-mono">s?.length</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Default Value</td><td className="font-mono">s ?? "default"</td><td className="font-mono">s ?: "default"</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-generics" && (
                    <ResourceContent
                        icon={<BookOpen className="h-8 w-8 text-indigo-500" />}
                        title="Generics & Variance"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Kotlin generics add <code>in</code>/<code>out</code> variance. This is a common senior interview topic.</p>
                                <p className="bg-muted p-4 rounded-lg font-mono text-sm">
                                    interface Source&lt;out T&gt; {'{'} fun next(): T {'}'}
                                </p>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-lifecycle" && (
                    <ResourceContent
                        icon={<Clock className="h-8 w-8 text-teal-500" />}
                        title="Activity, Fragment, and Compose Lifecycle"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Android lifecycle is explicit. Activities can be destroyed on rotation, low memory, or background.</p>
                                <p>Use <code>rememberSaveable</code> for UI state that must survive configuration changes.</p>
                            </div>
                        }
                    />
                )}

                {currentTopic === "qa-core" && (
                    <div className="space-y-8">
                        <QAItem
                            q="Explain sealed classes vs enums"
                            a="Sealed classes allow a fixed hierarchy with data per case; enums are singletons without data variations. Use sealed for UiState."
                            flutter="Flutter uses sealed classes via Freezed/unions for state."
                        />
                        <QAItem
                            q="What is inline + reified?"
                            a="Inline functions allow reified type parameters so you can access T::class at runtime without passing Class<T>."
                            flutter="Dart has reified generics so you can often access T directly."
                        />
                        <QAItem
                            q="How does Kotlin Flow differ from LiveData?"
                            a="Flow is cold, supports backpressure, and integrates with coroutines. LiveData is lifecycle-aware but limited."
                            flutter="Streams are closer to Flow; use StreamController or Rx."
                        />
                    </div>
                )}

                {currentTopic === "qa-ui" && (
                    <div className="space-y-8">
                        <QAItem
                            q="Explain recomposition"
                            a="Compose re-executes Composables when observed state changes, only updating affected nodes."
                            flutter="Flutter rebuilds widgets; element tree handles diffing."
                        />
                        <QAItem
                            q="remember vs rememberSaveable"
                            a="remember keeps state during recomposition; rememberSaveable survives configuration changes via SavedState."
                            flutter="Similar to keeping state in State vs using RestorationMixin."
                        />
                        <QAItem
                            q="How do you optimize list performance in Compose?"
                            a="Use LazyColumn, stable keys, avoid heavy work in item scope, and prefer derivedStateOf."
                            flutter="Use ListView.builder and const widgets where possible."
                        />
                    </div>
                )}

                {currentTopic === "qa-arch" && (
                    <div className="space-y-8">
                        <QAItem
                            q="Where does validation logic go?"
                            a="In the ViewModel or domain use case, not in Composables."
                            flutter="Same rule: keep logic in BLoC/UseCase."
                        />
                        <QAItem
                            q="How do you structure feature modules?"
                            a="Split by feature: ui, domain, data per module, with core modules for shared utilities."
                            flutter="Similar to feature-first foldering."
                        />
                        <QAItem
                            q="Why use repository pattern?"
                            a="It abstracts data sources, supports offline-first, and decouples UI from networking."
                            flutter="Same as repository + data sources in clean architecture."
                        />
                    </div>
                )}

                {currentTopic === "qa-adv" && (
                    <div className="space-y-8">
                        <QAItem
                            q="How do you handle cancellation?"
                            a="Coroutines are cancellable; use viewModelScope and cooperative cancellation."
                            flutter="Use cancellable operations or dispose streams."
                        />
                        <QAItem
                            q="Explain cold vs hot flows"
                            a="Cold flows start on collection. Hot flows (StateFlow/SharedFlow) emit regardless of collectors."
                            flutter="Broadcast streams are closest to hot flows."
                        />
                        <QAItem
                            q="What is ANR and how to prevent it?"
                            a="ANR happens when main thread is blocked for too long. Offload work and avoid heavy layout passes."
                            flutter="Flutter drops frames but doesn't ANR in the same way."
                        />
                    </div>
                )}

                {currentTopic === "qa-design" && (
                    <div className="space-y-8">
                        <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/20">
                            <h3 className="text-xl font-bold mb-4 text-green-400">System Design Strategy</h3>
                            <p>When asked to design "Offline Mode" or "Image Loader", follow this:</p>
                            <ol className="list-decimal ml-6 mt-2 space-y-1">
                                <li><strong>Requirements:</strong> caching, network constraints, consistency.</li>
                                <li><strong>API Design:</strong> repository interfaces and data contracts.</li>
                                <li><strong>Component Diagram:</strong> UI → VM → Repo → Cache → Network.</li>
                                <li><strong>Deep Dive:</strong> cache eviction, sync strategy.</li>
                            </ol>
                        </div>

                        <QAItem
                            q="Design: Offline-First Architecture"
                            a="1. Room DB as source of truth. 2. UI reads DB via Flow. 3. Repo syncs API and updates DB. 4. Conflicts resolved with timestamps/merge."
                            flutter="Use Hive/Isar with a sync layer."
                        />
                        <QAItem
                            q="Design: Efficient Image Loading"
                            a="1. Memory cache (LruCache). 2. Disk cache. 3. Downsampling. 4. Deduplicate requests."
                            flutter="CachedNetworkImage uses similar strategies."
                        />
                        <QAItem
                            q="Optimization: Dropping frames"
                            a="Use Android Studio profiler, check main thread, reduce overdraw, simplify layouts."
                            flutter="DevTools Performance Overlay."
                        />
                    </div>
                )}

                {currentTopic === "qa-batch-1" && (
                    <div className="space-y-8">
                        <QAItem q="Explain inline classes/value classes" a="Value classes wrap a single value with zero runtime overhead and better type safety." flutter="Dart has extension types/typedefs but not value classes." />
                        <QAItem q="Coroutines vs Threads" a="Coroutines are lightweight and scheduled by the runtime; threads are OS-managed and expensive." flutter="Dart uses isolates instead of threads." />
                        <QAItem q="Why use sealed interfaces?" a="For exhaustive when checks and closed hierarchies." flutter="Freezed unions." />
                    </div>
                )}

                {currentTopic === "qa-batch-2" && (
                    <div className="space-y-8">
                        <QAItem q="What triggers recomposition?" a="State changes in snapshot system, not arbitrary variable changes." flutter="setState triggers rebuild." />
                        <QAItem q="How do you stabilize recomposition?" a="Use remember, derivedStateOf, and stable data classes." flutter="Use const widgets and avoid rebuilds." />
                        <QAItem q="CompositionLocal use cases?" a="Theme, configuration, or global dependencies with explicit scopes." flutter="InheritedWidget equivalents." />
                    </div>
                )}

                {currentTopic === "qa-batch-3" && (
                    <div className="space-y-8">
                        <QAItem q="When do you still use Views?" a="Legacy screens, complex RecyclerView, or third-party SDKs." flutter="Equivalent to using platform views." />
                        <QAItem q="Explain ViewBinding vs DataBinding" a="ViewBinding is type-safe view references; DataBinding adds binding expressions." flutter="Flutter has no direct equivalent." />
                        <QAItem q="RecyclerView optimizations?" a="Use DiffUtil, stable IDs, and avoid nested layouts." flutter="ListView.builder with keys." />
                    </div>
                )}

                {currentTopic === "qa-batch-4" && (
                    <div className="space-y-8">
                        <QAItem q="Room vs SQLDelight?" a="Room is AndroidX standard; SQLDelight offers compile-time SQL and multiplatform support." flutter="Comparable to Drift." />
                        <QAItem q="CI/CD for Android?" a="Use Gradle tasks, build variants, and Play Console internal tracks." flutter="Similar to codemagic/Fastlane." />
                        <QAItem q="How do you manage secrets?" a="Use local.properties or CI secrets, never commit to repo." flutter="Use .env + CI secrets." />
                    </div>
                )}
            </PremiumLock>

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

function QAItem({ q, a, flutter }: { q: string, a: string, flutter: string }) {
    return (
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-bold mb-3 flex gap-3">
                <MessageCircleQuestion className="text-green-500 h-6 w-6 flex-shrink-0" />
                {q}
            </h3>
            <p className="text-foreground/90 mb-4 leading-relaxed">{a}</p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground flex gap-2">
                <span className="font-bold text-sky-500">Flutter:</span>
                {flutter}
            </div>
        </div>
    )
}
