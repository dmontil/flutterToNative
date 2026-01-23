"use client";

import { Navbar } from "@/components/ui/navbar";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { AlertCircle, ArrowRight } from "lucide-react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

export default function MentalModelPage() {
    const { hasAccess, user, entitlements, isLoading } = useUser();
    const isPro = hasAccess('ios_premium');
    
    console.log('[MentalModelPage] 🔍 Current state:', {
        hasUser: !!user,
        userEmail: user?.email,
        entitlements,
        isLoading,
        isPro,
        hasAccessResult: hasAccess('ios_premium')
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">The Flutter → iOS Mental Model</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        As a Senior Flutter Engineer, you already know how to build apps. You just speak a different dialect.
                        This guide maps your existing knowledge to the Apple ecosystem.
                    </p>
                </div>

                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">1</span>
                        Core UI Concepts
                    </h2>

                    <ComparisonTable
                        title="Rendering & Widgets"
                        rows={[
                            { flutter: "Widget", ios: "View (SwiftUI) / UIView (UIKit)", notes: "SwiftUI Views are value types (structs), just like Flutter Widgets are immutable descriptions." },
                            { flutter: "build() method", ios: "body property", notes: "In SwiftUI, `body` is a computed property that returns `some View`. It’s invoked whenever state changes." },
                            { flutter: "StatelessWidget", ios: "View (struct)", notes: "A simple SwiftUI View without @State properties is effectively stateless." },
                            { flutter: "StatefulWidget", ios: "View + @State", notes: "State is held in property wrappers like @State or @StateObject, not a separate State class." },
                            { flutter: "Context (BuildContext)", ios: "Environment / KeyPath", notes: "SwiftUI uses the Environment to pass data down. No direct BuildContext equivalent is needed for tree traversal." },
                        ]}
                        className="mb-8"
                    />

                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-6 flex gap-4">
                        <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-amber-500 mb-1">Critical Difference: The "State" Class</h4>
                            <p className="text-sm text-foreground/80">
                                In Flutter, `StatefulWidget` creates a separate `State` class that persists. In SwiftUI, the `View` struct itself is destroyed and recreated, but the `@State` properties are managed by the runtime and persist outside the struct.
                            </p>
                        </div>
                    </div>
                </section>

                <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">2</span>
                            State Management & Logic
                        </h2>

                        <ComparisonTable
                            title="Business Logic Components"
                            rows={[
                                { flutter: "Cubit / BLoC", ios: "ViewModel (ObservableObject)", notes: "iOS uses MVVM standardly. The ViewModel holds published properties that views observe." },
                                { flutter: "State Class (BlocState)", ios: "Published Properties", notes: "Instead of emitting a new State object, specific properties are marked @Published to trigger UI updates." },
                                { flutter: "Stream<State>", ios: "Combine Publisher / AsyncSequence", notes: "Combine is the closest analogue to RxDart/Streams. Swift Concurrency (Async/Await) is replacing it for simple flows." },
                                { flutter: "BlocProvider", ios: "@StateObject / @EnvironmentObject", notes: "Dependency injection into the view hierarchy." },
                                { flutter: "BlocListener", ios: ".onChange(of:) / .onReceive()", notes: "React to side effects (navigation, snackbars) when value changes." },
                            ]}
                        />
                    </section>

                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm">3</span>
                            Concurrency & Threading
                        </h2>

                        <ComparisonTable
                            title="Async Operations"
                            rows={[
                                { flutter: "Isolate", ios: "Grand Central Dispatch (GCD) / Swift Task", notes: "iOS usually shares memory (managed by ARC), unlike Isolates which do not share memory. Swift 6 Actors isolate state similarly to Isolates." },
                                { flutter: "Future<T>", ios: "Task<T, Error> / async function", notes: "Modern Swift uses async/await syntax almost identical to Dart." },
                                { flutter: "compute() / Isolate.run()", ios: "Task.detached / DispatchQueue.global()", notes: "Offloading intensive work to background threads." },
                            ]}
                        />
                    </section>

                    <div className="flex justify-between items-center py-8 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                            Next Section
                        </div>
                        <a href="/widget-map" className="flex items-center gap-2 font-bold hover:text-indigo-500 transition-colors">
                            Widget-to-Swift Map
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                    {/* --- PROJECT STRUCTURE --- */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Project Structure</h2>
                        <ComparisonTable
                            title="Files & Entry Points"
                            rows={[
                                { flutter: "lib/main.dart", ios: "@main App.swift", notes: "The entry point. SwiftUI uses the @main attribute." },
                                { flutter: "pubspec.yaml", ios: "Project.xcodeproj / Package.swift", notes: "iOS config is often binary (managed by Xcode), though SPM is text-based." },
                                { flutter: "android/ & ios/ folders", ios: "Top level files", notes: "iOS IS the native project. No separate runner folder." },
                                { flutter: "Assets (pubspec defined)", ios: "Assets.xcassets", notes: "iOS has a visual catalog for images, colors, and icons." }
                            ]}
                            className="mb-8"
                        />
                    </div>

                    {/* --- DEPENDENCIES --- */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Dependency Management</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-4 text-indigo-400">Flutter: Pub</h3>
                                <ul className="list-disc ml-4 space-y-2 text-muted-foreground">
                                    <li><strong>pubspec.yaml</strong>: Central declarative file.</li>
                                    <li><strong>pub.dev</strong>: The central repository.</li>
                                    <li><strong>Lockfile</strong>: pubspec.lock.</li>
                                </ul>
                            </div>
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-4 text-sky-400">iOS: The Mix</h3>
                                <ul className="list-disc ml-4 space-y-2 text-muted-foreground">
                                    <li><strong>Swift Package Manager (SPM)</strong>: The modern standard. Defined in `Package.swift` or via Xcode GUI.</li>
                                    <li><strong>CocoaPods</strong>: Old standard. Uses `Podfile` and ruby. Still used by many big libs (Firebase, RN).</li>
                                    <li><strong>Carthage</strong>: Manual binary Framework linking. Rare now.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* --- BUILD VARIANTS --- */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Build Environments</h2>
                        <ComparisonTable
                            title="Flavors vs Schemes"
                            rows={[
                                { flutter: "--flavor dev", ios: "Build Configuration (Debug/Release)", notes: "iOS has strict Debug vs Release modes at the compiler level." },
                                { flutter: "main_dev.dart", ios: "Schemes (Product -> Scheme)", notes: "Schemes define what config to run and what environment vars to set." },
                                { flutter: ".env files", ios: ".xcconfig files", notes: "Use xcconfig to inject variables into Info.plist or Build Settings." }
                            ]}
                            className="mb-8"
                        />
                    </div>
                </PremiumLock>

            </main>
        </div>
    );
}
