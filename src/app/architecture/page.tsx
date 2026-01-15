"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { Folder, FileCode, TestTube, Layers, ArrowRight, Zap, Shield } from "lucide-react";
import { CodeComparison } from "@/components/ui/code-comparison";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

const ARCHITECTURE_TOPICS = [
    { title: "The Pattern: MVVM + Clean", id: "arch-pattern" },
    { title: "Folder Structure", id: "arch-folder" },
    { title: "Navigation: Coordinator", id: "arch-coordinator" },
    { title: "Modularization (SPM)", id: "arch-modularization" },
    { title: "Advanced DI", id: "arch-di" },
];

export default function ArchitecturePage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Architecture...</div>}>
            <ArchitectureContent />
        </Suspense>
    );
}

function ArchitectureContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "arch-pattern";
    const { hasAccess } = useUser();
    const isPro = hasAccess('ios_premium');

    const topic = ARCHITECTURE_TOPICS.find(t => t.id === currentTopic) || ARCHITECTURE_TOPICS[0];

    return (
        <DocLayout title="Architecture Hub" items={ARCHITECTURE_TOPICS} premiumTopics={["arch-folder", "arch-coordinator", "arch-modularization", "arch-di"]}>
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{topic.title}</h1>
                <p className="text-xl text-muted-foreground">
                    Building scalable iOS apps. Flutter patterns vs Senior iOS Architecture.
                </p>
            </div>

            {currentTopic === "arch-pattern" && (
                <section className="mb-20 space-y-12 animate-in fade-in duration-700">
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">MVVM + Clean Architecture: The Industry Standard</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            In Flutter, <strong>BLoC</strong> relies on asynchronous streams to push state. In native iOS, while we have Combine/AsyncSequence, the community has converged on <strong>MVVM (Model-View-ViewModel)</strong> because it leverages SwiftUI's native <span className="text-indigo-400 font-semibold">Reactive Data Binding</span> mechanism.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-xl flex flex-col">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Layers className="text-indigo-500 h-5 w-5" /> The ViewModel Rationale
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                Unlike a BLoC that "emits" states, an iOS ViewModel "is" the state. It exposes <code>@Published</code> properties that the View observes directly.
                            </p>
                            <ul className="space-y-4 text-sm mt-auto">
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Unidirectional Flow:</strong> Actions flow Up, Data flows Down.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Decoupled Logic:</strong> The VM doesn't know about UIKit or SwiftUI.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Testability:</strong> You can test business logic without a simulator.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-2xl flex flex-col justify-center">
                            <h3 className="font-bold text-xl mb-4 text-indigo-400 italic">Senior Tip: Passive Views</h3>
                            <p className="text-base leading-relaxed text-foreground/90">
                                A common junior mistake is putting logic in <code>body</code>. The View should be <strong>Passive</strong>: it just renders what the VM says. If you have an <code>if</code> statement based on a calculation, that calculation belongs in the ViewModel.
                            </p>
                        </div>
                    </div>

                    <CodeComparison
                        title="State Binding: BLoC vs MVVM"
                        snippets={[
                            {
                                label: "Flutter (BLoC)",
                                language: "dart",
                                code: `class CounterBloc extends Bloc<Event, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
  }
}`
                            },
                            {
                                label: "Swift (MVVM)",
                                language: "swift",
                                code: `class CounterViewModel: ObservableObject {
    @Published var count = 0
    
    func increment() {
        count += 1 // UI updates automatically
    }
}`
                            }
                        ]}
                    />

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-red-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-red-400">Common Mistake #1</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Putting business logic in the View. If you see <code>if</code> statements calculating values in <code>body</code>, that's a red flag.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-amber-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-amber-400">Common Mistake #2</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Using <code>@ObservedObject</code> when you should use <code>@StateObject</code>. This causes the VM to be recreated on every redraw.
                            </p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-emerald-400" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-emerald-400">Pro Benefit</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                With proper MVVM, your unit tests run in <strong>milliseconds</strong> because you don't need a simulator. Test coverage goes from 20% to 80%+.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Want the Full Architecture Playbook?</h3>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            Unlock <strong>Folder Structure</strong>, <strong>Coordinator Pattern</strong>, <strong>SPM Modularization</strong>, and <strong>Advanced DI</strong> strategies used by senior iOS teams at scale.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Layer-First vs Feature-First comparison
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Complete folder structure examples
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Navigation without circular dependencies
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10">
                                ✓ Build time optimization with SPM
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <PremiumLock isUnlocked={isPro}>
                {currentTopic === "arch-folder" && (
                    <section className="mb-20 space-y-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-2xl font-bold text-white mb-4">The "Why" Behind the Layers</h2>
                            <p className="text-muted-foreground text-lg">
                                Structure isn't just about filing files; it's about <strong>Dependency Inversion</strong>. The Domain layer should NEVER know about the Data layer.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10 font-mono text-sm text-gray-300 shadow-2xl overflow-x-auto min-h-[400px]">
                                <FolderNode name="App" isOpen>
                                    <FolderNode name="Domain (The Core)" isOpen>
                                        <FolderNode name="Entities">
                                            <FileNode name="User.swift" />
                                        </FolderNode>
                                        <FolderNode name="Interfaces">
                                            <FileNode name="LoginRepository.swift" />
                                        </FolderNode>
                                        <FolderNode name="UseCases">
                                            <FileNode name="LoginUseCase.swift" />
                                        </FolderNode>
                                    </FolderNode>
                                    <FolderNode name="Data (The Infrastructure)" isOpen>
                                        <FolderNode name="Repositories">
                                            <FileNode name="LoginRepositoryImpl.swift" />
                                        </FolderNode>
                                        <FolderNode name="Network">
                                            <FileNode name="AuthAPI.swift" />
                                        </FolderNode>
                                    </FolderNode>
                                    <FolderNode name="Presentation (The UI)" isOpen>
                                        <FolderNode name="Features">
                                            <FolderNode name="Login" isOpen>
                                                <FileNode name="LoginView.swift" />
                                                <FileNode name="LoginViewModel.swift" />
                                                <FileNode name="LoginCoordinator.swift" />
                                            </FolderNode>
                                        </FolderNode>
                                    </FolderNode>
                                </FolderNode>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 border-l-4 border-emerald-500 bg-emerald-500/5">
                                    <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-xs">Domain Layer</h4>
                                    <p className="text-sm text-muted-foreground italic">"What the app does."</p>
                                    <p className="text-sm mt-2">Pure Swift. No dependencies. Contains the <span className="text-white">Truth</span> of your business rules.</p>
                                </div>
                                <div className="p-6 border-l-4 border-blue-500 bg-blue-500/5">
                                    <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-widest text-xs">Data Layer</h4>
                                    <p className="text-sm text-muted-foreground italic">"How data is fetched."</p>
                                    <p className="text-sm mt-2">Where JSON, SQLite and Firebase live. It <span className="text-white">implements</span> the protocols defined in Domain.</p>
                                </div>
                                <div className="p-6 border-l-4 border-purple-500 bg-purple-500/5">
                                    <h4 className="font-bold text-purple-400 mb-2 uppercase tracking-widest text-xs">Presentation Layer</h4>
                                    <p className="text-sm text-muted-foreground italic">"How data is shown."</p>
                                    <p className="text-sm mt-2">Where SwiftUI and UI logic reside. Highly volatile and easily swappable.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-coordinator" && (
                    <section className="mb-20 space-y-8">
                        <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ArrowRight className="h-24 w-24 text-indigo-500 rotate-45" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Navigating like a Pro: Coordinator Pattern</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                In Flutter, <code>Navigator.push</code> is easy. In a complex iOS app, hardcoding <code>NavigationLink</code> leads to circular dependencies. The Coordinator handles "where to go next", making Views completely modular.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-xl px-2">The Workflow:</h4>
                                <ol className="space-y-4">
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">01</span>
                                        <span><strong>Trigger:</strong> View sends a delegate message to the VM or direct to Coordinator.</span>
                                    </li>
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">02</span>
                                        <span><strong>Logic:</strong> Coordinator decides which View to instantiate (e.g. Auth vs Home).</span>
                                    </li>
                                    <li className="bg-card p-4 rounded-xl border border-border flex gap-4">
                                        <span className="text-indigo-500 font-black">03</span>
                                        <span><strong>Execution:</strong> Coordinator pushes to the <code>UINavigationController</code>.</span>
                                    </li>
                                </ol>
                            </div>
                            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 font-mono text-xs">
                                <div className="text-indigo-400 mb-2">// The Coordinator Contract</div>
                                <pre className="text-slate-300">
                                    {`protocol Coordinator: AnyObject {
    var navigation: UINavigationController { get }
    func start()
}

class AppCoordinator: Coordinator {
    func showDetail(item: Item) {
        let vm = DetailVM(item: item)
        let vc = UIHostingController(
            rootView: DetailView(vm: vm)
        )
        navigation.push(vc, animated: true)
    }
}`}
                                </pre>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-modularization" && (
                    <section className="mb-20 space-y-12">
                        <div className="prose prose-invert max-w-none text-center">
                            <h2 className="text-3xl font-bold text-white mb-6">Foundations of Modular Apps</h2>
                            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                                Compilation times in Swift are notoriously slow. Modularization with <strong>Swift Package Manager (SPM)</strong> is the only way to scale past a few developers.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Feature Modules",
                                    color: "border-sky-500",
                                    icon: <Layers className="text-sky-500" />,
                                    text: "Encapsulate whole flows (e.g. Payment, CoreAuth). Can be developed in isolation."
                                },
                                {
                                    title: "UI Components",
                                    color: "border-purple-500",
                                    icon: <Layers className="text-purple-500" />,
                                    text: "A design system module. Shared across the whole app. No dependencies allowed here."
                                },
                                {
                                    title: "Utilities & Network",
                                    color: "border-amber-500",
                                    icon: <Layers className="text-amber-500" />,
                                    text: "The bottom layer. Shared DTOs, Networking wrappers, and low-level helpers."
                                }
                            ].map((m, i) => (
                                <div key={i} className={`p-8 bg-card border-t-4 ${m.color} rounded-2xl shadow-lg`}>
                                    <div className="mb-4">{m.icon}</div>
                                    <h4 className="font-bold text-lg mb-2">{m.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-card border border-border p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
                            <h4 className="text-2xl font-bold mb-6 relative z-10 text-white">Why Senior Architecture Matters?</h4>
                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-5">
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Build only what you changed:</strong> SPM caching allows for incremental builds, saving minutes per day.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Enforce encapsulation:</strong> Modules prevent "spaghetti imports" by enforcing public/private boundaries.</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Independent test targets:</strong> Run unit tests for a specific feature in seconds, not minutes.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs shrink-0 mt-1">✔</div>
                                        <p className="text-base text-muted-foreground leading-relaxed"><strong>Ownership & Scalability:</strong> Teams can own specific modules without stepping on each other's git commits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-border">
                            <div className="prose prose-invert max-w-none mb-10 text-center">
                                <h3 className="text-2xl font-bold">Choosing your Path: Layer-First vs Feature-First</h3>
                                <p className="text-muted-foreground">The most common question for senior transitions.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 bg-card border border-border rounded-2xl hover:border-indigo-500/50 transition-colors">
                                    <h4 className="font-bold text-xl mb-4 text-indigo-400">Layer-First</h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Modularize by technical layer: <code>CoreNetwork</code>, <code>Database</code>, <code>UIComponents</code>.
                                    </p>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex gap-2">Pros: Simple consistency, reuse is forced.</li>
                                        <li className="flex gap-2">Cons: One change requires updating 3+ modules. Slows down feature teams.</li>
                                    </ul>
                                </div>
                                <div className="p-8 bg-card border border-border rounded-2xl hover:border-sky-500/50 transition-colors">
                                    <h4 className="font-bold text-xl mb-4 text-sky-400">Feature-First</h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Modularize by user value: <code>SearchFeature</code>, <code>CheckoutFeature</code>.
                                    </p>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex gap-2">Pros: High velocity, team autonomy, clean deletions.</li>
                                        <li className="flex gap-2">Cons: Risks duplicated logic if <code>SharedUtilities</code> isn't managed well.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-di" && (
                    <section className="mb-20">
                        <CodeComparison
                            title="Pure DI vs Container"
                            snippets={[
                                {
                                    label: "Factory Pattern (Pure DI)",
                                    language: "swift",
                                    code: `// Composition Root
final class AppFactory {
    static func makeHome() -> HomeView {
        let repo = AuthRepositoryImpl()
        let viewModel = HomeViewModel(repository: repo)
        return HomeView(viewModel: viewModel)
    }
}`,
                                    description: "Simplest, type-safe, no libraries needed. Perfect for modular apps."
                                },
                                {
                                    label: "Swinject (Container)",
                                    language: "swift",
                                    code: `// Using Swinject library
let container = Container()
container.register(AuthRepository.self) { _ in AuthRepositoryImpl() }
container.register(HomeViewModel.self) { r in 
    HomeViewModel(repo: r.resolve(AuthRepository.self)!) 
}

let viewModel = container.resolve(HomeViewModel.self)!`,
                                    description: "Like GetIt in Flutter. Runtime resolution (unstable if missing registration)."
                                }
                            ]}
                        />
                    </section>
                )}
            </PremiumLock>

        </DocLayout>
    );
}

function FolderNode({ name, isOpen = false, children }: { name: string, isOpen?: boolean, children?: React.ReactNode }) {
    return (
        <div className="ml-4">
            <div className="flex items-center gap-2 py-1 text-blue-400">
                <Folder className="h-4 w-4" />
                <span>{name}</span>
            </div>
            {isOpen && <div className="ml-2 border-l border-white/10 pl-2">{children}</div>}
        </div>
    );
}

function FileNode({ name }: { name: string }) {
    return (
        <div className="ml-4 flex items-center gap-2 py-1 text-gray-400">
            <FileCode className="h-4 w-4" />
            <span>{name}</span>
        </div>
    );
}
