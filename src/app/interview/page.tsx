"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { useSearchParams } from "next/navigation";
import { Cpu, BrainCircuit, AlertTriangle, MessageCircleQuestion, Layers, Zap, Clock } from "lucide-react";
import { CodeComparison } from "@/components/ui/code-comparison";

import { Suspense } from "react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

const INTERVIEW_TOPICS = [
    // Theory (Expanded Resources)
    { title: "Theory: ARC & Memory", id: "theory-arc" },
    { title: "Theory: Value vs Reference", id: "theory-value" },
    { title: "Theory: Concurrency", id: "theory-concurrency" },
    { title: "Theory: Protocol Oriented", id: "theory-pop" },
    { title: "Theory: Closures & Capture", id: "theory-closures" }, // New
    { title: "Theory: Optionals & Nulls", id: "theory-optionals" }, // New
    { title: "Theory: Generics", id: "theory-generics" }, // New
    { title: "Theory: App Lifecycle", id: "theory-lifecycle" }, // New

    // Q&A (The Drill)
    { title: "Q&A: Core Swift", id: "qa-core" },
    { title: "Q&A: SwiftUI & UI", id: "qa-ui" },
    { title: "Q&A: Architecture", id: "qa-arch" },
    { title: "Q&A: Advance Topics", id: "qa-adv" },
    { title: "Q&A: System Design", id: "qa-design" }, // New

    // New Batches (The Mega Pack)
    { title: "Pack: Swift Deep Dive", id: "qa-batch-1" },
    { title: "Pack: SwiftUI Internals", id: "qa-batch-2" },
    { title: "Pack: UIKit & Legacy", id: "qa-batch-3" },
    { title: "Pack: Data & CI/CD", id: "qa-batch-4" },
];



export default function InterviewPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Interview Prep...</div>}>
            <InterviewContent />
        </Suspense>
    );
}

function InterviewContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "theory-arc";
    const { hasAccess, user, entitlements, isLoading } = useUser();
    const isPro = hasAccess('ios_premium');
    
    console.log('[InterviewPage] 🔍 Current state:', {
        hasUser: !!user,
        userEmail: user?.email,
        entitlements,
        isLoading,
        isPro,
        hasAccessResult: hasAccess('ios_premium'),
        currentTopic
    });

    return (
        <DocLayout title="Interview Prep" items={INTERVIEW_TOPICS} productId="ios_playbook" premiumTopics={["theory-pop", "theory-closures", "theory-optionals", "theory-generics", "theory-lifecycle", "qa-core", "qa-ui", "qa-arch", "qa-adv", "qa-design", "qa-batch-1", "qa-batch-2", "qa-batch-3", "qa-batch-4"]}>
            <div className="mb-8 border-b border-border pb-6">
                <h1 className="text-3xl font-bold mb-2 capitalize">{INTERVIEW_TOPICS.find(t => t.id === currentTopic)?.title}</h1>
                <p className="text-muted-foreground">Master the "Filter" Questions</p>
            </div>

            {/* ... THEORY sections (omitted for brevity, assume unchanged) ... */}

            {/* ... content simplified for tool call, I will target specific blocks with multi_replace for safety ... */}

            {/* --- THEORY --- */}
            {currentTopic === "theory-arc" && (
                <ResourceContent
                    icon={<Cpu className="h-8 w-8 text-pink-500" />}
                    title="ARC vs Garbage Collection"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p>
                                <strong>Flutter (GC):</strong> Garbage Collector runs periodically. You don't manage memory manually.
                            </p>
                            <p>
                                <strong>iOS (ARC):</strong> Automatic Reference Counting. Memory is freed <em>instantly</em> when the retain count hits 0.
                            </p>
                            <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20">
                                <h4 className="font-bold text-lg mb-2 text-destructive">The Trap: Retain Cycles</h4>
                                <p className="mb-2">If A holds B, and B holds A, neither is freed. Unlike GC, ARC typically cannot resolve this automatically.</p>
                                <p className="font-mono text-sm bg-black/20 p-2 rounded">
                                    class Parent {'{'} var child: Child? {'}'}<br />
                                    class Child {'{'} <span className="text-pink-400">weak</span> var parent: Parent? {'}'}
                                </p>
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "theory-value" && (
                <ResourceContent
                    icon={<BrainCircuit className="h-8 w-8 text-cyan-500" />}
                    title="Structs vs Classes"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p><strong>Flutter:</strong> Everything is a Class (Reference Type).</p>
                            <p><strong>Swift:</strong> We prefer Structs (Value Types) for: Models, Views, DTOs.</p>
                            <div className="bg-muted p-6 rounded-lg border border-border">
                                <ul className="list-disc ml-4 space-y-1">
                                    <li><strong>Struct (Value):</strong> Copied on pass. Stack allocated. Fast. Thread-safe(ish).</li>
                                    <li><strong>Class (Reference):</strong> Pointer shared. Heap allocated. Use for Identity (ViewModels).</li>
                                </ul>
                            </div>
                        </div>
                    }
                />
            )}

            {currentTopic === "theory-concurrency" && (
                <ResourceContent
                    icon={<Zap className="h-8 w-8 text-amber-500" />}
                    title="Main Thread & Actors"
                    content={
                        <div className="space-y-6 text-base leading-relaxed">
                            <p><strong>Flutter:</strong> Single Isolate. Event Loop.</p>
                            <p><strong>iOS:</strong> Multithreaded. UI MUST run on <strong>Main Thread</strong>.</p>
                            <div className="bg-muted p-4 rounded-lg">
                                <h4 className="font-bold mb-2">Modern Swift (Swift 6)</h4>
                                <p>Use <code>@MainActor</code> to enforce UI thread safety at compile time. It acts like a "Main Thread Isolate".</p>
                            </div>
                        </div>
                    }
                />
            )}

            <PremiumLock isUnlocked={isPro || (!!user && !isLoading)}>
                {currentTopic === "theory-pop" && (
                    <ResourceContent
                        icon={<Layers className="h-8 w-8 text-emerald-500" />}
                        title="Protocol Oriented Programming"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Swift Protocols can have default implementations via Extensions. This allows "Traits" or "Mixins" behavior without inheritance hell.</p>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-closures" && (
                    <ResourceContent
                        icon={<BrainCircuit className="h-8 w-8 text-purple-500" />}
                        title="Closures & Capture Lists"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p><strong>Flutter:</strong> `VoidCallback` or `Function`. Dart closures capture variables automatically.</p>
                                <p><strong>Swift:</strong> Closures are reference types. If you capture `self` strongly inside a closure owned by `self`, you create a Retain Cycle.</p>

                                <CodeComparison
                                    title="Preventing Leaks"
                                    snippets={[
                                        {
                                            label: "Swift (Leak)", language: "swift", code: `viewModel.onSuccess = {
    self.doSomething() // Strong capture of self! 
}` },
                                        {
                                            label: "Swift (Safe)", language: "swift", code: `viewModel.onSuccess = { [weak self] in
    self?.doSomething() // Weak capture
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
                        title="Optionals vs Null Safety"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p>Very similar to Dart Null Safety, but different syntax.</p>
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border"><th className="py-2">Concept</th><th className="py-2">Dart</th><th className="py-2">Swift</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border/50"><td className="py-2">Nullable</td><td className="font-mono">String?</td><td className="font-mono">String?</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Force Unwrap</td><td className="font-mono">s!</td><td className="font-mono">s! (Crash risk)</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Safe Unwrap</td><td className="font-mono">if (s != null)</td><td className="font-mono">if let s = s</td></tr>
                                        <tr className="border-b border-border/50"><td className="py-2">Default Value</td><td className="font-mono">s ?? "default"</td><td className="font-mono">s ?? "default"</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-generics" && (
                    <ResourceContent
                        icon={<Layers className="h-8 w-8 text-blue-500" />}
                        title="Generics & Opaque Types"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p><strong>Generics (`T`):</strong> Logic is similar. "I work with any type T".</p>
                                <p><strong>Opaque Types (`some View`):</strong> "I return <em>something</em> that conforms to View, but I won't tell you exactly what." Crucial for SwiftUI performance.</p>
                            </div>
                        }
                    />
                )}

                {currentTopic === "theory-lifecycle" && (
                    <ResourceContent
                        icon={<Clock className="h-8 w-8 text-teal-500" />}
                        title="App Lifecycle"
                        content={
                            <div className="space-y-6 text-base leading-relaxed">
                                <p><strong>Flutter:</strong> `WidgetsBindingObserver` (didChangeAppLifecycleState).</p>
                                <p><strong>SwiftUI:</strong> `.onChange(of: scenePhase)`.</p>
                                <p><strong>UIKit (Legacy):</strong> `AppDelegate` / `SceneDelegate` methods (`didBecomeActive`, `willResignActive`). You will allow be asked about these methods.</p>
                            </div>
                        }
                    />
                )}


                {/* --- Q&A: Core --- */}
                {currentTopic === "qa-core" && (
                    <div className="space-y-6">
                        <QAItem
                            q="What is the difference between Array and NSArray?"
                            a="Array is a Swift struct (Value type). NSArray is an Objective-C class (Reference type). Always use Array unless interacting with legacy Obj-C APIs."
                            flutter="Like List (Dart) vs some legacy Java List wrapper."
                        />
                        <QAItem
                            q="What does the 'mutating' keyword mean?"
                            a="Structs are immutable by default. To change a property inside a struct method, you must mark it 'mutating'."
                            flutter="Dart classes are mutable by default. Dart records/final classes are immutable."
                        />
                        <QAItem
                            q="Explain 'Copy on Write' (COW)."
                            a="Swift collections (Array, Dictionary) are Value Types, but they optimize copying. The actual data isn't copied until you *modify* one of the copies."
                            flutter="No direct equivalent in Dart. Dart copies are explicit."
                        />
                        <QAItem
                            q="What is a protocol extension?"
                            a="It allows you to add method implementations to a protocol, effectively providing 'default behavior' to any conforming type."
                            flutter="Dart Mixins."
                        />
                        <QAItem
                            q="What is the difference between 'weak' and 'unowned'?"
                            a="Both prevent retain cycles. 'weak' is Optional (becomes nil if object dies). 'unowned' is Non-Optional (crashes if accessed after object dies)."
                            flutter="WeakReference in Dart."
                        />
                    </div>
                )}

                {/* --- Q&A: UI --- */}
                {currentTopic === "qa-ui" && (
                    <div className="space-y-6">
                        <QAItem
                            q="What is @State vs @StateObject vs @ObservedObject?"
                            a="@State: Local simple value. @StateObject: You OWN the lifecycle (init). @ObservedObject: You watch it, but don't own it (passed in)."
                            flutter="State (local), BlocProvider (Owns), BlocConsumer (Watches)."
                        />
                        <QAItem
                            q="Why do we use 'some View'?"
                            a="It returns an Opaque Type. The compiler knows the concrete type, but hides it from the caller. Essential for complex SwiftUI hierarchies."
                            flutter="Returning 'Widget' abstract class, but specialized by compiler."
                        />
                        <QAItem
                            q="What is the purpose of GeometryReader?"
                            a="To get the size and position of a parent view. Use sparingly as it breaks layout flow."
                            flutter="LayoutBuilder."
                        />
                    </div>
                )}

                {/* --- Q&A: Architecture --- */}
                {currentTopic === "qa-arch" && (
                    <div className="space-y-6">
                        <QAItem
                            q="Explain MVVM in Swift."
                            a="View observes ViewModel. ViewModel holds State (@Published). ViewModel talks to Model/Services. View triggers Intents (Functions) on VM."
                            flutter="Exactly like Bloc/Cubit pattern, but using ObservableObject instead of Streams."
                        />
                        <QAItem
                            q="Why use Protocols for Repositories?"
                            a="To decouple the implementation (API/Database) from the domain logic. Enables 100% Mockability for Unit Tests."
                            flutter="Abstract Classes or Interfaces in Dart."
                        />
                    </div>
                )}

                {/* --- Q&A: Advanced --- */}
                {currentTopic === "qa-adv" && (
                    <div className="space-y-6">
                        <QAItem
                            q="What is the difference between Task and Task.detached?"
                            a="`Task { ... }` inherits the priority and actor context (like MainActor) of the surrounding code. `Task.detached { ... }` does NOT inherit anything. Use `detached` rarely, mostly for background work that must not block the UI."
                            flutter="Similar to `scheduleMicrotask` (inherits) vs `Isolate.run` (detached/fresh)."
                        />
                        <QAItem
                            q="How does Swift handle data races in Swift 6?"
                            a="Swift 6 enforces 'Sendable' checking. Mutable state shared across actors must be thread-safe (Sendable). The compiler will error if you pass a non-Sendable class into a Task."
                            flutter="Dart Isolates don't share memory, so data races are impossible by design."
                        />
                        <QAItem
                            q="Explain 'Swizzling'. Why is it dangerous?"
                            a="Method Swizzling (Objective-C runtime) allows swapping method implementations at runtime. Used by Analytics SDKs (Firebase) to auto-log screen views. Dangerous because it's global, implicit, and can break if multiple SDKs swizzle the same method."
                            flutter="Not possible in Dart (AOT). You use 'Mixins' or explicit wrappers instead."
                        />
                        <QAItem
                            q="What is KVO (Key-Value Observing)?"
                            a="An Obj-C pattern where object A observes property changes in object B. In Swift, we prefer Combine (`@Published`) or `didSet`."
                            flutter="`ValueNotifier` or `StreamController`."
                        />
                        <QAItem
                            q="Embedding: How do you use a UIKit view in SwiftUI?"
                            a="Wrap it in `UIViewRepresentable`. Implement `makeUIView` (create) and `updateUIView` (update properties). Use a `Coordinator` class to handle delegates/events back to SwiftUI."
                            flutter="`PlatformView` (AndroidView/UiKitView)."
                        />

                        <div className="pt-8 mb-4 border-t border-border">
                            <h3 className="text-xl font-bold mb-6 text-indigo-400">The "Extra Mile" Questions</h3>
                            <div className="space-y-6">
                                <QAItem
                                    q="What is the 'defer' keyword?"
                                    a="It defines a block of code that executes just before the current scope exits (returns or throws). Useful for cleanup (closing files, unlocking mutexes)."
                                    flutter="`finally` block in try-catch-finally (but `defer` is per-scope, not per-try)."
                                />
                                <QAItem
                                    q="Explain 'lazy' properties."
                                    a="A property whose initial value is not calculated until the first time it is used. Must be `var`. Useful for expensive setup."
                                    flutter="`late` keyword (lazy initialization)."
                                />
                                <QAItem
                                    q="What is the Result type?"
                                    a="`Result<Success, Failure>` is an enum with two cases. It allows handling success/failure as a value, without immediate throwing. Useful in completion handlers."
                                    flutter="`Either<L, R>` from dartz/fpdart packages."
                                />
                                <QAItem
                                    q="What are KeyPaths?"
                                    a="A way to refer to a property *itself* rather than its value (e.g., `\User.name`). Used in SwiftUI List `id: \.self` or Combine publishers."
                                    flutter="No direct equivalent. Reflection (Mirrors) is too slow. Code gen is used instead."
                                />
                                <QAItem
                                    q="Enums with Associated Values?"
                                    a="Swift Enums can store data. `case failure(Error)`. This makes them incredibly powerful for modeling state (Success/Loading/Error)."
                                    flutter="Freezed unions (`.map`, `.when`). Dart 3 Records/Sealed classes are getting closer."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Q&A: Packs --- */}
                {currentTopic === "qa-batch-1" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Swift Language Deep Dive</h3>
                        <QAItem q="computed vs stored properties?" a="Stored properties save a value. Computed properties calculate a value every time they are accessed." flutter="Same as Dart `get` vs fields." />
                        <QAItem q="extension vs inheritance?" a="Extensions add functionality to EXISTING types (even those you don't own). Inheritance adds to SUBCLASSES only. Swift prefers Composition/Extensions over Inheritance." flutter="Dart `extension` vs `extends`." />
                        <QAItem q="What is a `final` class?" a="A class that cannot be subclassed. Enables compiler optimizations (static dispatch)." flutter="Dart `final` class (Dart 3) or not extending." />
                        <QAItem q="Access Control: open vs public?" a="`public`: accessible from other modules, but CANNOT be subclassed/overridden. `open`: accessible AND subclassable/overridable." flutter="Dart only has `public` (default) and `private` (_)." />
                        <QAItem q="What is `guard`?" a="Early exit. Asserts a condition is true, else exits the scope. Enforces happy path readability." flutter="`if (!condition) return;`" />
                        <QAItem q="What is `defer`?" a="Executes a block when the scope exits. Use it for cleanup." flutter="`try-finally`." />
                        <QAItem q="`Optional` Under the hood?" a="It's just an Enum! `enum Optional<Wrapped> { case none, case some(Wrapped) }`." flutter="Nullable types `T?`." />
                        <QAItem q="`struct` vs `class`?" a="Structs are Value Types (Copy on Write, Stack). Classes are Reference Types (Heap, ARC). Swift prefers Structs." flutter="Everything in Dart is a Class (Reference). Records are closest to Structs." />
                        <QAItem q="What is `Codable`?" a="A typealias for `Encodable & Decodable`. Compiler auto-synthesizes JSON parsing." flutter="`json_serializable` (requires build_runner)." />
                        <QAItem q="What is a `protocol`?" a="Defines a blueprint of methods/properties. Classes/Structs adopt it." flutter="Dart `abstract class` or `interface`." />
                        <QAItem q="`associatedtype` in Protocol?" a="Generic placeholder for Protocols. Used when the protocol implementation decides the type." flutter="Generics `<T>` on interfaces." />
                        <QAItem q="`some` vs `any`?" a="`some View`: Opaque Type (One specific type, compiler knows, user hides). `any View`: Existential Container (Box that can hold ANY type conforming to protocol, slower dynamic dispatch)." flutter="Dart just uses the interface type." />
                        <QAItem q="`@escaping` closure?" a="A closure passed as an argument that is called AFTER the function returns (async). Escapes the stack frame." flutter="All closures in Dart escape by default." />
                        <QAItem q="`autoclosure`?" a="Wraps an expression in a closure automatically. Used in `assert(condition)` so condition isn't evaluated unless needed." flutter="No direct equivalent." />
                        <QAItem q="What is COW (Copy-on-Write)?" a="Optimization for Structs/Arrays. Copies data only when mutated, not when assigned. Performance win." flutter="N/A (Reference types)." />
                    </div>
                )}

                {currentTopic === "qa-batch-2" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 text-sky-400 border-b border-white/10 pb-2">SwiftUI Internals</h3>
                        <QAItem q="What is `@ViewBuilder`?" a="A Result Builder that constructs a view from closure statements. Allows listing views without `,` or `return`." flutter="Similar to returning `List<Widget>` but simpler syntax." />
                        <QAItem q="`Environment` vs `EnvironmentObject`?" a="@Environment: System keys (colorScheme, dismiss). @EnvironmentObject: Custom data model injected high up." flutter="InheritedWidget / Provider." />
                        <QAItem q="Why avoid `AnyView`?" a="It erases type information, killing SwifUI's diffing algorithm performance. Use @ViewBuilder or Generics instead." flutter="Returning Widget is fine in Flutter (dynamic)." />
                        <QAItem q="`State` vs `Binding`?" a="@State: I OWN this data. @Binding: I SHARE this data (reference)." flutter="State vs passing callbacks/controllers." />
                        <QAItem q="Explain Identity (Structural vs Explicit)." a="How SwiftUI tracks views. Explicit: .id(). Structural: Position in code (View Tree). AnyView destroys Structural Identity." flutter="Keys (ValueKey, GlobalKey)." />
                        <QAItem q="`ObservedObject` vs `StateObject`?" a="StateObject: Created ONCE, survives redraws. ObservedObject: Recreated if parent redraws (unless injected)." flutter="StatefullWidget vs Provider." />
                        <QAItem q="PreferenceKeys?" a="Way to pass data UP the tree (Child -> Parent). Used for custom layouts." flutter="NotificationBubbling." />
                        <QAItem q="`GeometryReader`?" a="Access parent size/coordinates. Warning: Breaks layout neutrality (expands to fill)." flutter="LayoutBuilder." />
                        <QAItem q="`ZStack` vs `Overlay`?" a="ZStack: Builds new layer. Overlay: Modifies existing view, inherits bounds." flutter="Stack." />
                        <QAItem q="Transitions?" a="Define how view enters/exits (.transition). Requires explicit animation." flutter="Transition widgets." />
                    </div>
                )}

                {currentTopic === "qa-batch-3" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 text-orange-400 border-b border-white/10 pb-2">UIKit & Legacy</h3>
                        <QAItem q="View Lifecycle?" a="viewDidLoad -> viewWillAppear -> viewDidAppear -> viewWillDisappear." flutter="initState, didChangeDependencies, dispose." />
                        <QAItem q="frame vs bounds?" a="frame: Position in SUPERVIEW's coordinates. bounds: Internal size (0,0, w, h)." flutter="RenderBox size vs paintBounds." />
                        <QAItem q="What is AutoLayout?" a="Constraint-based layout system (equations). leadingAnchor.constraint(equalTo: ...)." flutter="Constraints in Flutter are passed down, but AutoLayout is a solver." />
                        <QAItem q="`layoutSubviews`?" a="Called when view frames change. Place to manually update logic." flutter="performLayout." />
                        <QAItem q="`masksToBounds` vs `clipsToBounds`?" a="Same thing, different layer. UIView.clipsToBounds = CALayer.masksToBounds." flutter="ClipRRect." />
                        <QAItem q="ReuseIdentifier?" a="Used in UITableView / UICollectionView to pool and reuse cells for scrolling performance." flutter="Flutter ListView does this automatically." />
                    </div>
                )}

                {currentTopic === "qa-batch-4" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 text-emerald-400 border-b border-white/10 pb-2">Data, Networking & Tools</h3>
                        <QAItem q="URLSession Configuration?" a="default (disk cache), ephemeral (no cache/RAM only), background (run when app closed)." flutter="Dio options." />
                        <QAItem q="CoreData Stack?" a="NSPersistentContainer -> ManagedObjectContext (scratchpad) -> PersistentStoreCoordinator -> SQLite." flutter="Isar/Hive boxes." />
                        <QAItem q="Snapshot Testing?" a="Rendering view to image and comparing pixels. Popular libs: SnapshotTesting (PointFree)." flutter="golden_test." />
                        <QAItem q="What is Fastlane?" a="Automation tool. Match (signing), Gym (build), Deliver (upload to App Store)." flutter="Same tool, widely used." />
                        <QAItem q="TestFlight?" a="Apple's beta testing platform. Built-in to App Store Connect." flutter="Play Store Internal Track." />
                        <QAItem q="Crashlytics dSYM?" a="Debug Symbol files needed to symbolicate crash reports (make them readable)." flutter="Obfuscation maps." />
                        <QAItem q="App Thinning?" a="App Store Slicing (download only assets for your device), Bitcode (recompile on server), ODR (On-Demand Resources)." flutter="App Bundles / Deferred Components." />
                    </div>
                )}

                {/* --- SYSTEM DESIGN --- */}
                {currentTopic === "qa-design" && (
                    <div className="space-y-8">
                        <div className="bg-indigo-500/10 p-6 rounded-xl border border-indigo-500/20">
                            <h3 className="text-xl font-bold mb-4 text-indigo-400">System Design Strategy</h3>
                            <p>When asked to "Design an Image Loading Library" or "Offline Mode", follow this structure:</p>
                            <ol className="list-decimal ml-6 mt-2 space-y-1">
                                <li><strong>Requirements:</strong> Clarify constraints (caching, placeholders, thread safety).</li>
                                <li><strong>API Design:</strong> What does the function signature look like?</li>
                                <li><strong>Component Diagram:</strong> View &rarr; ViewModel &rarr; Service &rarr; Cache &rarr; Network.</li>
                                <li><strong>Deep Dive:</strong> Pick the hardest part (e.g., Cache Eviction Policy).</li>
                            </ol>
                        </div>

                        <QAItem
                            q="Design: Offline-First Architecture"
                            a="1. Local Database (CoreData/GRDB) is the 'Single Source of Truth'. 2. UI always reads from DB. 3. Repo fetches from API, updates DB. 4. DB change triggers UI update (Reactive). 5. Write operations: queue locally, sync worker uploads when online."
                            flutter="Repository pattern using Hive/Isar as local cache + Dio for network."
                        />
                        <QAItem
                            q="Design: Efficient Image Loading (Like SDWebImage)"
                            a="1. Memory Cache (`NSCache` - auto purges on memory warning). 2. Disk Cache (FileManager). 3. Downsampling (Resize image to view size during decode to save RAM). 4. Deduplication (Don't fetch same URL twice simultaneously)."
                            flutter="CachedNetworkImage package (uses similar strategies)."
                        />
                        <QAItem
                            q="Optimization: The app is dropping frames. How do you debug?"
                            a="1. Use 'Instruments' (Time Profiler) to find Main Thread blockers. 2. Check for 'Offscreen Rendering' (Shadows/CornerRadius). 3. Ensure cell reuse IDs are correct (UIKit). 4. in SwiftUI, check for unnecessary redraws (`let _ = Self._printChanges()`)."
                            flutter="DevTools Performance Overlay."
                        />
                    </div>
                )}
            </PremiumLock>

        </DocLayout >
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
                <MessageCircleQuestion className="text-indigo-500 h-6 w-6 flex-shrink-0" />
                {q}
            </h3>
            <p className="text-foreground/90 mb-4 leading-relaxed">{a}</p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground flex gap-2">
                <span className="font-bold text-sky-500">Dart:</span>
                {flutter}
            </div>
        </div>
    )
}
