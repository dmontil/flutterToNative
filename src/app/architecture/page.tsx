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
                    <section className="mb-20 space-y-16">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Production-Grade Folder Architecture</h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                Moving from Flutter's <code>lib/</code> to a battle-tested iOS structure isn't just about organizing files—it's about <strong>enforcing architectural boundaries</strong> that prevent regression and enable team scaling.
                            </p>
                        </div>

                        {/* The Enterprise Structure */}
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                                    Production Structure (100k+ LOC)
                                </h3>
                                <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10 font-mono text-sm text-gray-300 shadow-2xl overflow-x-auto min-h-[600px]">
                                    <FolderNode name="YourApp" isOpen>
                                        <FolderNode name="Core" isOpen>
                                            <FolderNode name="Domain" isOpen>
                                                <FolderNode name="Entities">
                                                    <FileNode name="User.swift" />
                                                    <FileNode name="Product.swift" />
                                                    <FileNode name="Order.swift" />
                                                </FolderNode>
                                                <FolderNode name="Repositories">
                                                    <FileNode name="UserRepository.swift" />
                                                    <FileNode name="ProductRepository.swift" />
                                                </FolderNode>
                                                <FolderNode name="UseCases">
                                                    <FileNode name="LoginUseCase.swift" />
                                                    <FileNode name="SearchProductsUseCase.swift" />
                                                    <FileNode name="PlaceOrderUseCase.swift" />
                                                </FolderNode>
                                                <FolderNode name="Errors">
                                                    <FileNode name="AppError.swift" />
                                                    <FileNode name="ValidationError.swift" />
                                                </FolderNode>
                                            </FolderNode>
                                            <FolderNode name="Data" isOpen>
                                                <FolderNode name="Network">
                                                    <FolderNode name="Base">
                                                        <FileNode name="NetworkClient.swift" />
                                                        <FileNode name="APIEndpoint.swift" />
                                                        <FileNode name="AuthInterceptor.swift" />
                                                    </FolderNode>
                                                    <FolderNode name="Services">
                                                        <FileNode name="AuthService.swift" />
                                                        <FileNode name="ProductService.swift" />
                                                    </FolderNode>
                                                    <FolderNode name="DTOs">
                                                        <FileNode name="UserDTO.swift" />
                                                        <FileNode name="ProductDTO.swift" />
                                                    </FolderNode>
                                                </FolderNode>
                                                <FolderNode name="Storage" isOpen>
                                                    <FolderNode name="Database">
                                                        <FileNode name="CoreDataStack.swift" />
                                                        <FileNode name="UserEntity.xcdatamodeld" />
                                                    </FolderNode>
                                                    <FolderNode name="Cache">
                                                        <FileNode name="ImageCache.swift" />
                                                        <FileNode name="DiskCache.swift" />
                                                    </FolderNode>
                                                    <FolderNode name="Keychain">
                                                        <FileNode name="TokenStorage.swift" />
                                                    </FolderNode>
                                                </FolderNode>
                                                <FolderNode name="Repositories" isOpen>
                                                    <FileNode name="UserRepositoryImpl.swift" />
                                                    <FileNode name="ProductRepositoryImpl.swift" />
                                                </FolderNode>
                                            </FolderNode>
                                        </FolderNode>
                                        <FolderNode name="Features" isOpen>
                                            <FolderNode name="Authentication" isOpen>
                                                <FolderNode name="Login">
                                                    <FileNode name="LoginView.swift" />
                                                    <FileNode name="LoginViewModel.swift" />
                                                    <FileNode name="LoginCoordinator.swift" />
                                                </FolderNode>
                                                <FolderNode name="SignUp">
                                                    <FileNode name="SignUpView.swift" />
                                                    <FileNode name="SignUpViewModel.swift" />
                                                </FolderNode>
                                                <FolderNode name="ForgotPassword">
                                                    <FileNode name="ForgotPasswordView.swift" />
                                                    <FileNode name="ForgotPasswordViewModel.swift" />
                                                </FolderNode>
                                                <FileNode name="AuthCoordinator.swift" />
                                            </FolderNode>
                                            <FolderNode name="Home" isOpen>
                                                <FolderNode name="Dashboard">
                                                    <FileNode name="DashboardView.swift" />
                                                    <FileNode name="DashboardViewModel.swift" />
                                                </FolderNode>
                                                <FolderNode name="Components">
                                                    <FileNode name="StatsCard.swift" />
                                                    <FileNode name="QuickActions.swift" />
                                                </FolderNode>
                                                <FileNode name="HomeCoordinator.swift" />
                                            </FolderNode>
                                            <FolderNode name="Search" isOpen>
                                                <FileNode name="SearchView.swift" />
                                                <FileNode name="SearchViewModel.swift" />
                                                <FileNode name="SearchResultsView.swift" />
                                                <FileNode name="SearchCoordinator.swift" />
                                            </FolderNode>
                                        </FolderNode>
                                        <FolderNode name="Shared" isOpen>
                                            <FolderNode name="UI" isOpen>
                                                <FolderNode name="Components">
                                                    <FileNode name="LoadingView.swift" />
                                                    <FileNode name="ErrorView.swift" />
                                                    <FileNode name="CustomButton.swift" />
                                                </FolderNode>
                                                <FolderNode name="Extensions">
                                                    <FileNode name="View+Extensions.swift" />
                                                    <FileNode name="Color+Extensions.swift" />
                                                </FolderNode>
                                                <FolderNode name="Modifiers">
                                                    <FileNode name="LoadingModifier.swift" />
                                                    <FileNode name="ErrorModifier.swift" />
                                                </FolderNode>
                                            </FolderNode>
                                            <FolderNode name="Utils">
                                                <FileNode name="DateFormatter+Extensions.swift" />
                                                <FileNode name="String+Validation.swift" />
                                                <FileNode name="Logger.swift" />
                                            </FolderNode>
                                            <FolderNode name="Constants">
                                                <FileNode name="AppConstants.swift" />
                                                <FileNode name="APIConstants.swift" />
                                            </FolderNode>
                                        </FolderNode>
                                        <FolderNode name="Resources" isOpen>
                                            <FolderNode name="Fonts">
                                                <FileNode name="SFPro-Regular.otf" />
                                            </FolderNode>
                                            <FolderNode name="Images">
                                                <FileNode name="Assets.xcassets" />
                                            </FolderNode>
                                            <FolderNode name="Localizable">
                                                <FileNode name="Localizable.strings" />
                                                <FileNode name="Localizable.stringsdict" />
                                            </FolderNode>
                                        </FolderNode>
                                        <FileNode name="AppDelegate.swift" />
                                        <FileNode name="SceneDelegate.swift" />
                                        <FileNode name="AppCoordinator.swift" />
                                        <FileNode name="DependencyContainer.swift" />
                                    </FolderNode>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 p-6 rounded-2xl">
                                    <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                        Critical: Dependency Flow Rules
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <p className="text-muted-foreground leading-relaxed">
                                            <strong>Domain</strong> → No dependencies (pure Swift)
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            <strong>Data</strong> → Can depend on Domain only
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            <strong>Features</strong> → Can depend on Domain + Shared
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            <strong>Shared</strong> → Only Foundation/SwiftUI
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 border-l-4 border-emerald-500 bg-emerald-500/5 rounded-lg">
                                        <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-xs">Core/Domain Layer</h4>
                                        <p className="text-sm text-muted-foreground italic mb-2">"Pure business logic"</p>
                                        <p className="text-sm leading-relaxed">Contains <strong>Entities</strong> (your main models), <strong>Repository interfaces</strong> (what data you need), and <strong>UseCases</strong> (what the app does). Zero framework dependencies.</p>
                                    </div>

                                    <div className="p-6 border-l-4 border-blue-500 bg-blue-500/5 rounded-lg">
                                        <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-widest text-xs">Core/Data Layer</h4>
                                        <p className="text-sm text-muted-foreground italic mb-2">"How data flows in/out"</p>
                                        <p className="text-sm leading-relaxed"><strong>Repository implementations</strong>, <strong>API clients</strong>, <strong>Database models</strong>, <strong>Cache strategies</strong>. This layer implements the contracts defined in Domain.</p>
                                    </div>

                                    <div className="p-6 border-l-4 border-purple-500 bg-purple-500/5 rounded-lg">
                                        <h4 className="font-bold text-purple-400 mb-2 uppercase tracking-widest text-xs">Features Layer</h4>
                                        <p className="text-sm text-muted-foreground italic mb-2">"User-facing flows"</p>
                                        <p className="text-sm leading-relaxed">Each feature is <strong>self-contained</strong>: Views, ViewModels, and Coordinator for navigation. Features can communicate through Domain layer only.</p>
                                    </div>

                                    <div className="p-6 border-l-4 border-amber-500 bg-amber-500/5 rounded-lg">
                                        <h4 className="font-bold text-amber-400 mb-2 uppercase tracking-widest text-xs">Shared Layer</h4>
                                        <p className="text-sm text-muted-foreground italic mb-2">"Cross-cutting concerns"</p>
                                        <p className="text-sm leading-relaxed"><strong>UI components</strong>, <strong>extensions</strong>, <strong>utilities</strong> that are used across features. Keep this thin—too much shared code creates coupling.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Staff Engineer Insights */}
                        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-6 text-white">Staff Engineer Insights: Scale Decisions</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-green-400 mb-3">✅ When to Feature-First</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Team size > 5 developers</li>
                                            <li>• Multiple release trains</li>
                                            <li>• Features can be toggled off</li>
                                            <li>• Clear product ownership</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-blue-400 mb-3">🔄 Migration Strategy</h4>
                                        <ol className="space-y-2 text-sm text-muted-foreground">
                                            <li>1. Start with Core/Domain</li>
                                            <li>2. Extract one feature at a time</li>
                                            <li>3. Move Data layer last</li>
                                            <li>4. Use SPM for strict boundaries</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-amber-400 mb-3">⚠️ Anti-Patterns to Avoid</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• God objects in Shared/</li>
                                            <li>• ViewModels depending on other VMs</li>
                                            <li>• Direct database access from Features</li>
                                            <li>• Business logic in extensions</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-purple-400 mb-3">📊 KPIs to Track</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Build time < 2min (incremental)</li>
                                            <li>• Module coupling score</li>
                                            <li>• Test coverage per layer</li>
                                            <li>• Dependency graph depth</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold text-white mb-4">Real-World Impact: Before vs After</h4>
                                <div className="grid md:grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <p className="text-red-400 font-semibold mb-2">❌ Monolithic Structure</p>
                                        <ul className="space-y-1 text-muted-foreground">
                                            <li>• Full rebuild: 8-12 minutes</li>
                                            <li>• Merge conflicts in 40%+ PRs</li>
                                            <li>• Cannot deploy features independently</li>
                                            <li>• Shared mutable state everywhere</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-green-400 font-semibold mb-2">✅ Modular Architecture</p>
                                        <ul className="space-y-1 text-muted-foreground">
                                            <li>• Incremental builds: 30-90 seconds</li>
                                            <li>• Teams work independently</li>
                                            <li>• Feature flags at module level</li>
                                            <li>• Clear ownership and boundaries</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced: Testing Strategy */}
                        <div className="bg-card border border-border p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6">Testing Strategy by Layer</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl">
                                    <h4 className="font-bold text-emerald-400 mb-3">Domain Layer</h4>
                                    <div className="text-sm space-y-2 text-muted-foreground">
                                        <p><strong>Unit Tests (90%+)</strong></p>
                                        <p>• UseCases logic</p>
                                        <p>• Entity validation</p>
                                        <p>• Business rules</p>
                                        <p className="text-emerald-400 text-xs">⚡ ~milliseconds</p>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl">
                                    <h4 className="font-bold text-blue-400 mb-3">Data Layer</h4>
                                    <div className="text-sm space-y-2 text-muted-foreground">
                                        <p><strong>Integration Tests</strong></p>
                                        <p>• Repository implementations</p>
                                        <p>• API contract tests</p>
                                        <p>• Database migrations</p>
                                        <p className="text-blue-400 text-xs">⚡ ~seconds</p>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl">
                                    <h4 className="font-bold text-purple-400 mb-3">UI Layer</h4>
                                    <div className="text-sm space-y-2 text-muted-foreground">
                                        <p><strong>UI Tests (selective)</strong></p>
                                        <p>• Critical user flows</p>
                                        <p>• ViewModel state binding</p>
                                        <p>• Navigation paths</p>
                                        <p className="text-purple-400 text-xs">⚡ ~minutes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-coordinator" && (
                    <section className="mb-20 space-y-16">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Navigation at Scale: Advanced Coordinator Pattern</h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                Moving from Flutter's imperative <code>Navigator.push()</code> to iOS requires rethinking navigation as a <strong>first-class architectural concern</strong>. The Coordinator pattern solves circular dependencies, enables deep linking, and scales to enterprise-level complexity.
                            </p>
                        </div>

                        {/* Core Pattern Introduction */}
                        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 p-10 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ArrowRight className="h-24 w-24 text-indigo-500 rotate-45" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 relative z-10">Why Coordinators? The Flutter vs iOS Navigation Problem</h3>
                            
                            <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                                <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-red-400 mb-4">❌ Flutter's Centralized Approach</h4>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p>• <code>Navigator.pushNamed('/details')</code> from anywhere</p>
                                        <p>• Global routing table in main.dart</p>
                                        <p>• Views know about other views</p>
                                        <p>• Hard to test navigation logic</p>
                                        <p>• Difficult to handle complex flows</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-green-400 mb-4">✅ iOS Coordinator Benefits</h4>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p>• Views are completely decoupled</p>
                                        <p>• Navigation logic is centralized per flow</p>
                                        <p>• Easy to unit test navigation</p>
                                        <p>• Supports complex business logic routing</p>
                                        <p>• Deep linking becomes trivial</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Coordinator Architecture */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 text-white">Enterprise-Grade Coordinator Hierarchy</h3>
                            
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Code Example */}
                                <div>
                                    <h4 className="font-bold text-xl mb-4 text-indigo-400">The Complete Pattern</h4>
                                    <div className="bg-[#0b0e14] p-6 rounded-2xl border border-white/10 font-mono text-sm shadow-2xl">
                                        <div className="text-emerald-400 mb-4">// 1. Base Coordinator Protocol</div>
                                        <pre className="text-gray-300 mb-6 whitespace-pre-wrap">
{`protocol Coordinator: AnyObject {
    var childCoordinators: [Coordinator] { get set }
    var navigationController: UINavigationController { get }
    var parentCoordinator: Coordinator? { get set }
    
    func start()
    func childDidFinish(_ child: Coordinator)
}`}
                                        </pre>
                                        
                                        <div className="text-blue-400 mb-4">// 2. App-Level Coordinator</div>
                                        <pre className="text-gray-300 mb-6 whitespace-pre-wrap">
{`final class AppCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    let navigationController: UINavigationController
    weak var parentCoordinator: Coordinator?
    
    private let authService: AuthService
    private let deepLinkHandler: DeepLinkHandler
    
    func start() {
        checkAuthenticationStatus()
    }
    
    private func checkAuthenticationStatus() {
        if authService.isLoggedIn {
            showMainFlow()
        } else {
            showAuthenticationFlow()
        }
    }
    
    private func showAuthenticationFlow() {
        let authCoordinator = AuthCoordinator(
            navigationController: navigationController
        )
        authCoordinator.parentCoordinator = self
        authCoordinator.onAuthComplete = { [weak self] in
            self?.childDidFinish(authCoordinator)
            self?.showMainFlow()
        }
        addChild(authCoordinator)
        authCoordinator.start()
    }
}`}
                                        </pre>

                                        <div className="text-purple-400 mb-4">// 3. Feature Coordinator</div>
                                        <pre className="text-gray-300 whitespace-pre-wrap">
{`final class ShoppingCoordinator: Coordinator {
    var onPurchaseComplete: ((Order) -> Void)?
    
    func showProductDetails(_ product: Product) {
        let detailsVM = ProductDetailsVM(
            product: product,
            useCase: productUseCase
        )
        detailsVM.onAddToCart = { [weak self] in
            self?.showCart()
        }
        let detailsView = ProductDetailsView(viewModel: detailsVM)
        let vc = UIHostingController(rootView: detailsView)
        navigationController.pushViewController(vc, animated: true)
    }
    
    func showCheckout() {
        let checkoutCoordinator = CheckoutCoordinator(
            navigationController: navigationController
        )
        checkoutCoordinator.onComplete = { [weak self] order in
            self?.onPurchaseComplete?(order)
            self?.childDidFinish(checkoutCoordinator)
        }
        addChild(checkoutCoordinator)
        checkoutCoordinator.start()
    }
}`}
                                        </pre>
                                    </div>
                                </div>

                                {/* Architecture Diagram */}
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold text-xl mb-4 text-white">Coordinator Hierarchy</h4>
                                        <div className="bg-card border border-border p-6 rounded-2xl">
                                            <div className="space-y-4 font-mono text-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-4 w-4 rounded bg-indigo-500"></div>
                                                    <span className="text-white font-bold">AppCoordinator</span>
                                                    <span className="text-muted-foreground text-xs">(Root navigation logic)</span>
                                                </div>
                                                <div className="ml-6 space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-3 w-3 rounded bg-emerald-500"></div>
                                                        <span className="text-emerald-400">AuthCoordinator</span>
                                                        <span className="text-muted-foreground text-xs">(Login, Signup, Reset)</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-3 w-3 rounded bg-blue-500"></div>
                                                        <span className="text-blue-400">MainTabCoordinator</span>
                                                        <span className="text-muted-foreground text-xs">(Tab navigation)</span>
                                                    </div>
                                                    <div className="ml-6 space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-2 w-2 rounded bg-purple-400"></div>
                                                            <span className="text-purple-400">HomeCoordinator</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-2 w-2 rounded bg-amber-400"></div>
                                                            <span className="text-amber-400">ShoppingCoordinator</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-2 w-2 rounded bg-pink-400"></div>
                                                            <span className="text-pink-400">ProfileCoordinator</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-3 w-3 rounded bg-red-500"></div>
                                                        <span className="text-red-400">OnboardingCoordinator</span>
                                                        <span className="text-muted-foreground text-xs">(First-time users)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl">
                                        <h4 className="font-bold text-amber-400 mb-3">🎯 Staff Engineer Insight</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Each coordinator owns a <strong>logical navigation domain</strong>. Don't create coordinators for every view—create them for every <strong>user journey</strong> that has complex business logic or multiple possible paths.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Topics */}
                        <div className="space-y-12">
                            {/* Deep Linking */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                                        Deep Linking Architecture
                                    </h3>
                                    
                                    <div className="bg-[#0b0e14] p-6 rounded-2xl border border-white/10 font-mono text-sm">
                                        <div className="text-sky-400 mb-4">// Deep Link Routing</div>
                                        <pre className="text-gray-300 whitespace-pre-wrap">
{`enum DeepLink {
    case product(id: String)
    case userProfile(userId: String)
    case checkout(cartId: String)
    case resetPassword(token: String)
}

extension AppCoordinator {
    func handle(deepLink: DeepLink) {
        switch deepLink {
        case .product(let id):
            // 1. Ensure user is authenticated
            guard authService.isLoggedIn else {
                pendingDeepLink = deepLink
                showAuthenticationFlow()
                return
            }
            
            // 2. Navigate to main flow
            showMainFlow()
            
            // 3. Find shopping coordinator
            let shoppingCoord = findCoordinator(
                ShoppingCoordinator.self
            )
            
            // 4. Load and show product
            shoppingCoord?.showProduct(withId: id)
            
        case .checkout(let cartId):
            // Similar flow...
        }
    }
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-card border border-border rounded-xl">
                                        <h4 className="font-bold text-white mb-4">Deep Link Flow Strategy</h4>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex gap-3">
                                                <span className="text-sky-500 font-bold">1.</span>
                                                <span className="text-muted-foreground">Parse the URL into a structured <code>DeepLink</code> enum</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-sky-500 font-bold">2.</span>
                                                <span className="text-muted-foreground">Check prerequisites (authentication, onboarding)</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-sky-500 font-bold">3.</span>
                                                <span className="text-muted-foreground">Navigate to the correct coordinator hierarchy</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="text-sky-500 font-bold">4.</span>
                                                <span className="text-muted-foreground">Execute the final navigation within the feature</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl">
                                        <h4 className="font-bold text-green-400 mb-3">✅ Benefits Over Flutter</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Type-safe routing with enums</li>
                                            <li>• Business logic validation before navigation</li>
                                            <li>• Easy to test routing logic in isolation</li>
                                            <li>• Clear error handling for invalid links</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Memory Management & Lifecycle */}
                            <div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    Memory Management & Lifecycle
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-card border border-border p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-4">Coordinator Cleanup Pattern</h4>
                                        <div className="bg-[#0b0e14] p-4 rounded-lg border border-white/10 font-mono text-xs">
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// Parent coordinator cleanup
func childDidFinish(_ child: Coordinator) {
    // Remove strong reference
    childCoordinators.removeAll { $0 === child }
    
    // Clean up navigation stack if needed
    if let navController = child.navigationController,
       navController !== self.navigationController {
        navController.dismiss(animated: true)
    }
    
    // Notify parent if this coordinator is done
    if shouldFinishSelf {
        parentCoordinator?.childDidFinish(self)
    }
}

// Child coordinator lifecycle
class FeatureCoordinator {
    func finishFlow(with result: Result) {
        onComplete?(result)
        parentCoordinator?.childDidFinish(self)
    }
}`}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl">
                                            <h4 className="font-bold text-red-400 mb-3">🚨 Common Memory Leaks</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Forgetting to remove child coordinators</li>
                                                <li>• Strong reference cycles in completion closures</li>
                                                <li>• Not dismissing modal navigation controllers</li>
                                                <li>• Observers not being removed</li>
                                            </ul>
                                        </div>

                                        <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl">
                                            <h4 className="font-bold text-green-400 mb-3">✅ Best Practices</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• Always use <code>[weak self]</code> in closures</li>
                                                <li>• Call <code>childDidFinish</code> when flows complete</li>
                                                <li>• Use protocol-based communication</li>
                                                <li>• Test coordinator lifecycles with memory graphs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testing Strategy */}
                            <div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    Testing Coordinators
                                </h3>

                                <div className="bg-[#0b0e14] p-6 rounded-2xl border border-white/10">
                                    <div className="grid lg:grid-cols-2 gap-8 font-mono text-sm">
                                        <div>
                                            <div className="text-emerald-400 mb-4">// Testing Navigation Logic</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`class MockNavigationController: UINavigationController {
    var pushedViewControllers: [UIViewController] = []
    var presentedViewController: UIViewController?
    
    override func pushViewController(
        _ viewController: UIViewController, 
        animated: Bool
    ) {
        pushedViewControllers.append(viewController)
        super.pushViewController(viewController, animated: false)
    }
}

class ShoppingCoordinatorTests: XCTestCase {
    var sut: ShoppingCoordinator!
    var mockNavController: MockNavigationController!
    
    func test_showProduct_pushesCorrectViewController() {
        // Given
        let product = Product.sample
        
        // When
        sut.showProduct(product)
        
        // Then
        XCTAssertEqual(mockNavController.pushedViewControllers.count, 1)
        
        let pushedVC = mockNavController.pushedViewControllers.first 
            as? UIHostingController<ProductDetailsView>
        XCTAssertNotNil(pushedVC)
    }
}`}
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-blue-400 mb-4">// Testing Deep Links</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`class DeepLinkTests: XCTestCase {
    func test_productDeepLink_navigatesToCorrectProduct() {
        // Given
        let appCoordinator = AppCoordinator(
            navigationController: mockNavController,
            authService: mockAuthService
        )
        mockAuthService.isLoggedIn = true
        
        // When
        let deepLink = DeepLink.product(id: "123")
        appCoordinator.handle(deepLink: deepLink)
        
        // Then
        // Verify the correct navigation happened
        let shoppingCoordinator = appCoordinator
            .findChild(ShoppingCoordinator.self)
        XCTAssertNotNil(shoppingCoordinator)
        XCTAssertEqual(
            shoppingCoordinator?.currentProductId, 
            "123"
        )
    }
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance & Scale Insights */}
                        <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-red-500/5 border border-purple-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-8 text-white">Staff Engineer Performance Insights</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-purple-400 mb-4">📊 Scale Metrics to Track</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div className="flex justify-between">
                                                <span>Navigation depth</span>
                                                <span className="text-white">< 5 levels</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Coordinator count</span>
                                                <span className="text-white">< 15 active</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Memory per coordinator</span>
                                                <span className="text-white">< 1MB</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Navigation response time</span>
                                                <span className="text-white">< 100ms</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-amber-400 mb-4">⚡ Performance Optimizations</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Lazy-load coordinators for complex flows</li>
                                            <li>• Cache coordinator instances for frequently accessed flows</li>
                                            <li>• Use weak references for parent relationships</li>
                                            <li>• Implement coordinator pooling for modal flows</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-green-400 mb-4">🏗️ When to Introduce Coordinators</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <p><strong>Start Simple:</strong> Begin with basic navigation in ViewModels</p>
                                            <p><strong>Introduce at:</strong> 3+ interconnected views in a flow</p>
                                            <p><strong>Must-have when:</strong> Complex business logic determines navigation</p>
                                            <p><strong>Enterprise-level:</strong> Multiple teams, feature flags, A/B testing</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-blue-400 mb-4">🎯 Team Collaboration Benefits</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Clear ownership boundaries between teams</li>
                                            <li>• Parallel development of different flows</li>
                                            <li>• Easy integration testing of user journeys</li>
                                            <li>• Simplified code reviews for navigation logic</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-modularization" && (
                    <section className="mb-20 space-y-16">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Enterprise Swift Package Manager Architecture</h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                Flutter's monorepo model works great for <strong>small teams</strong>. At scale, iOS requires strategic <strong>module boundaries</strong> with SPM to prevent developer velocity from grinding to a halt. This is where senior iOS knowledge becomes indispensable.
                            </p>
                        </div>

                        {/* The Scaling Problem */}
                        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-6 text-white">The Swift Compilation Wall</h3>
                            
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-red-400 mb-4">❌ Monolithic Codebase Problems</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div className="flex justify-between">
                                                <span>50k LOC</span>
                                                <span className="text-white">2-4 min builds</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>100k LOC</span>
                                                <span className="text-red-400">8-12 min builds</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>200k+ LOC</span>
                                                <span className="text-red-500 font-bold">15+ min builds</span>
                                            </div>
                                            <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                                                <p className="text-red-400 text-xs">Developer experience breakdown: 40+ builds/day = 6+ hours waiting</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-amber-400 mb-3">⚠️ Team Coordination Issues</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• 5+ developers working on same files</li>
                                            <li>• Merge conflicts in shared utilities</li>
                                            <li>• Cannot deploy features independently</li>
                                            <li>• Testing entire app for simple changes</li>
                                            <li>• Impossible to enforce API boundaries</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-green-400 mb-4">✅ SPM Modular Benefits</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div className="flex justify-between">
                                                <span>Feature modules</span>
                                                <span className="text-green-400">30-90s builds</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Incremental compilation</span>
                                                <span className="text-green-400">5-15s builds</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Parallel module builds</span>
                                                <span className="text-green-400">2-4x faster CI</span>
                                            </div>
                                            <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                                                <p className="text-green-400 text-xs">Developer experience: 90% reduction in build wait time</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-blue-400 mb-3">🎯 Architecture Enforcement</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Compile-time dependency checking</li>
                                            <li>• Clear public API boundaries</li>
                                            <li>• Teams own specific modules</li>
                                            <li>• Feature flags at module level</li>
                                            <li>• Independent testing & deployment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Module Architecture */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 text-white">Production-Grade Module Architecture</h3>
                            
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* SPM Package Structure */}
                                <div>
                                    <h4 className="font-bold text-xl mb-4 text-indigo-400">Package.swift Configuration</h4>
                                    <div className="bg-[#0b0e14] p-6 rounded-2xl border border-white/10 font-mono text-sm shadow-2xl">
                                        <div className="text-emerald-400 mb-4">// Package.swift - Feature Module</div>
                                        <pre className="text-gray-300 mb-6 whitespace-pre-wrap">
{`// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "ShoppingFeature",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "ShoppingFeature", targets: ["ShoppingFeature"]),
        .library(name: "ShoppingFeatureTesting", targets: ["ShoppingFeatureTesting"])
    ],
    dependencies: [
        // Core Dependencies
        .package(path: "../CoreDomain"),
        .package(path: "../CoreNetwork"), 
        .package(path: "../UIComponents"),
        
        // External Dependencies
        .package(url: "https://github.com/Alamofire/Alamofire", from: "5.0.0")
    ],
    targets: [
        .target(
            name: "ShoppingFeature",
            dependencies: [
                "CoreDomain",
                "CoreNetwork", 
                "UIComponents",
                "Alamofire"
            ],
            path: "Sources"
        ),
        .target(
            name: "ShoppingFeatureTesting",
            dependencies: ["ShoppingFeature"],
            path: "Testing"
        ),
        .testTarget(
            name: "ShoppingFeatureTests",
            dependencies: [
                "ShoppingFeature",
                "ShoppingFeatureTesting"
            ],
            path: "Tests"
        )
    ]
)`}
                                        </pre>

                                        <div className="text-blue-400 mb-4">// Module Structure</div>
                                        <div className="text-gray-300 font-mono text-xs">
                                            <div className="space-y-1">
                                                <div>📦 ShoppingFeature/</div>
                                                <div className="ml-4">📁 Sources/ShoppingFeature/</div>
                                                <div className="ml-8 text-purple-400">├── Views/</div>
                                                <div className="ml-8 text-purple-400">├── ViewModels/</div>
                                                <div className="ml-8 text-purple-400">├── Models/</div>
                                                <div className="ml-8 text-purple-400">└── ShoppingCoordinator.swift</div>
                                                <div className="ml-4">📁 Testing/ShoppingFeatureTesting/</div>
                                                <div className="ml-8 text-emerald-400">├── Mocks/</div>
                                                <div className="ml-8 text-emerald-400">├── Fixtures/</div>
                                                <div className="ml-8 text-emerald-400">└── TestHelpers/</div>
                                                <div className="ml-4">📁 Tests/ShoppingFeatureTests/</div>
                                                <div className="ml-8 text-blue-400">├── ViewModelTests/</div>
                                                <div className="ml-8 text-blue-400">├── CoordinatorTests/</div>
                                                <div className="ml-8 text-blue-400">└── IntegrationTests/</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Module Dependency Graph */}
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold text-xl mb-4 text-white">Enterprise Dependency Graph</h4>
                                        <div className="bg-card border border-border p-6 rounded-2xl">
                                            <div className="space-y-4 font-mono text-sm">
                                                <div className="text-center">
                                                    <div className="inline-block p-3 bg-indigo-500/20 rounded-lg border border-indigo-500">
                                                        <span className="text-indigo-400 font-bold">MainApp</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-center gap-4">
                                                    <div className="p-2 bg-emerald-500/20 rounded border border-emerald-500">
                                                        <span className="text-emerald-400">AuthFeature</span>
                                                    </div>
                                                    <div className="p-2 bg-blue-500/20 rounded border border-blue-500">
                                                        <span className="text-blue-400">ShoppingFeature</span>
                                                    </div>
                                                    <div className="p-2 bg-purple-500/20 rounded border border-purple-500">
                                                        <span className="text-purple-400">ProfileFeature</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center gap-4">
                                                    <div className="p-2 bg-amber-500/20 rounded border border-amber-500">
                                                        <span className="text-amber-400">CoreDomain</span>
                                                    </div>
                                                    <div className="p-2 bg-sky-500/20 rounded border border-sky-500">
                                                        <span className="text-sky-400">CoreNetwork</span>
                                                    </div>
                                                    <div className="p-2 bg-pink-500/20 rounded border border-pink-500">
                                                        <span className="text-pink-400">UIComponents</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center">
                                                    <div className="p-2 bg-gray-500/20 rounded border border-gray-500">
                                                        <span className="text-gray-400">Foundation / SwiftUI</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl">
                                        <h4 className="font-bold text-amber-400 mb-3">🎯 Critical Dependency Rules</h4>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p>• <strong>Features never depend on other Features</strong></p>
                                            <p>• <strong>Core modules cannot depend on Feature modules</strong></p>
                                            <p>• <strong>UI Components have zero business logic dependencies</strong></p>
                                            <p>• <strong>Domain layer cannot import UIKit/SwiftUI</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Strategies */}
                        <div className="space-y-12">
                            {/* Feature-First vs Layer-First */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-white">Staff-Level Decision: Modularization Strategy</h3>
                                
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 rounded-2xl">
                                        <h4 className="font-bold text-xl mb-4 text-indigo-400 flex items-center gap-3">
                                            <div className="h-3 w-3 rounded bg-indigo-500"></div>
                                            Layer-First Modularization
                                        </h4>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="text-sm space-y-2">
                                                <p className="text-white font-medium">When to use:</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Team size < 8 developers</li>
                                                    <li>• Heavy infrastructure/platform focus</li>
                                                    <li>• Shared components are core value</li>
                                                    <li>• Technical teams (DevOps, Platform)</li>
                                                </ul>
                                            </div>

                                            <div className="bg-[#0b0e14] p-4 rounded-lg border border-white/10 font-mono text-xs">
                                                <div className="space-y-1 text-gray-300">
                                                    <div>CoreNetwork (HTTP, Auth)</div>
                                                    <div>CoreDatabase (CoreData, SQLite)</div>
                                                    <div>UIComponents (Design System)</div>
                                                    <div>CoreUtilities (Extensions, Helpers)</div>
                                                    <div>CoreDomain (Business Models)</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div className="space-y-2">
                                                <p className="text-green-400 font-medium">✅ Pros</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Clear separation of concerns</li>
                                                    <li>• Reusability enforced</li>
                                                    <li>• Easy to understand</li>
                                                    <li>• Good for platform teams</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-red-400 font-medium">❌ Cons</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Features span multiple modules</li>
                                                    <li>• Slows feature development</li>
                                                    <li>• Hard to remove features</li>
                                                    <li>• Circular dependency risks</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-gradient-to-br from-sky-500/10 to-sky-600/5 border border-sky-500/20 rounded-2xl">
                                        <h4 className="font-bold text-xl mb-4 text-sky-400 flex items-center gap-3">
                                            <div className="h-3 w-3 rounded bg-sky-500"></div>
                                            Feature-First Modularization
                                        </h4>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="text-sm space-y-2">
                                                <p className="text-white font-medium">When to use:</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Team size > 8 developers</li>
                                                    <li>• Product-focused organization</li>
                                                    <li>• Multiple release trains</li>
                                                    <li>• Feature teams with PMs</li>
                                                </ul>
                                            </div>

                                            <div className="bg-[#0b0e14] p-4 rounded-lg border border-white/10 font-mono text-xs">
                                                <div className="space-y-1 text-gray-300">
                                                    <div>AuthenticationFeature</div>
                                                    <div>ShoppingFeature</div>
                                                    <div>PaymentFeature</div>
                                                    <div>ProfileFeature</div>
                                                    <div>NotificationsFeature</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div className="space-y-2">
                                                <p className="text-green-400 font-medium">✅ Pros</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Team autonomy</li>
                                                    <li>• Fast feature development</li>
                                                    <li>• Easy feature removal</li>
                                                    <li>• Clear ownership</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-red-400 font-medium">❌ Cons</p>
                                                <ul className="space-y-1 text-muted-foreground">
                                                    <li>• Risk of code duplication</li>
                                                    <li>• Shared utilities bloat</li>
                                                    <li>• Harder to refactor across</li>
                                                    <li>• Requires strong governance</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Build Optimization Strategies */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-white">Build Performance Optimization</h3>
                                
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="p-6 bg-card border border-border rounded-xl">
                                            <h4 className="font-bold text-white mb-4">📊 Build Metrics to Monitor</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Clean build time</span>
                                                    <span className="text-white">< 3 minutes</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Incremental build</span>
                                                    <span className="text-green-400">< 30 seconds</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Module count</span>
                                                    <span className="text-white">8-15 modules</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Dependency depth</span>
                                                    <span className="text-white">< 4 levels</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Test execution</span>
                                                    <span className="text-green-400">< 2 minutes</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl">
                                            <h4 className="font-bold text-emerald-400 mb-4">⚡ Performance Techniques</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li>• <strong>Binary frameworks:</strong> Pre-compiled modules for stable APIs</li>
                                                <li>• <strong>Module caching:</strong> Shared build artifacts between developers</li>
                                                <li>• <strong>Parallel compilation:</strong> Independent module builds</li>
                                                <li>• <strong>Thin modules:</strong> Keep modules focused and small</li>
                                                <li>• <strong>Interface segregation:</strong> Multiple small protocols vs huge ones</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-[#0b0e14] p-6 rounded-2xl border border-white/10">
                                        <h4 className="font-bold text-white mb-4">Xcode Build Configuration</h4>
                                        <div className="font-mono text-xs text-gray-300">
                                            <div className="text-purple-400 mb-3">// xcconfig optimization</div>
                                            <pre className="whitespace-pre-wrap">
{`// BuildOptimizations.xcconfig
SWIFT_COMPILATION_MODE = singlefile
SWIFT_OPTIMIZATION_LEVEL = -O
ENABLE_BITCODE = NO

// Module-specific settings
SWIFT_ENABLE_INCREMENTAL_COMPILATION = YES
SWIFT_ENABLE_BATCH_MODE = YES
COMPILER_INDEX_STORE_ENABLE = NO

// Dependency management
DEAD_CODE_STRIPPING = YES
STRIP_INSTALLED_PRODUCT = YES

// Parallel builds
ENABLE_PARALLEL_BUILDS = YES
MAX_PARALLEL_BUILD_TASKS = 8`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testing Strategy */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-white">Module Testing Architecture</h3>

                                <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10">
                                    <div className="grid lg:grid-cols-2 gap-8 font-mono text-sm">
                                        <div>
                                            <div className="text-emerald-400 mb-4">// Module Test Structure</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// ShoppingFeatureTests/
import XCTest
@testable import ShoppingFeature
import ShoppingFeatureTesting // Test utilities

class ProductViewModelTests: XCTestCase {
    var sut: ProductViewModel!
    var mockRepository: MockProductRepository!
    var mockCoordinator: MockShoppingCoordinator!
    
    override func setUp() {
        super.setUp()
        mockRepository = MockProductRepository()
        mockCoordinator = MockShoppingCoordinator()
        sut = ProductViewModel(
            repository: mockRepository,
            coordinator: mockCoordinator
        )
    }
    
    func test_loadProduct_setsLoadingState() {
        // Given
        let productId = "123"
        mockRepository.shouldDelayResponse = true
        
        // When
        sut.loadProduct(id: productId)
        
        // Then
        XCTAssertTrue(sut.isLoading)
        XCTAssertNil(sut.errorMessage)
    }
}`}
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-blue-400 mb-4">// Cross-Module Integration</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// IntegrationTests/
import XCTest
import ShoppingFeature
import CoreDomain
import CoreNetworkTesting

class ShoppingIntegrationTests: XCTestCase {
    
    func test_completeShoppingFlow() {
        // Given
        let coordinator = ShoppingCoordinator(
            navigationController: MockNavigationController(),
            repository: TestProductRepository()
        )
        
        // When
        coordinator.start()
        coordinator.showProduct(id: "test-product")
        coordinator.addToCart()
        
        // Then
        let navigationStack = coordinator
            .navigationController
            .viewControllers
        
        XCTAssertEqual(navigationStack.count, 3)
        
        let cartVC = navigationStack.last 
        XCTAssertTrue(cartVC is CartViewController)
    }
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Migration Strategy */}
                        <div className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-blue-500/5 border border-purple-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-8 text-white">Enterprise Migration Playbook</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-purple-400 mb-4">🎯 Phase 1: Foundation (Weeks 1-3)</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Audit existing codebase dependencies</li>
                                            <li>• Create core infrastructure modules first</li>
                                            <li>• Setup CI/CD for multi-module builds</li>
                                            <li>• Establish module ownership guidelines</li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-indigo-400 mb-4">🔄 Phase 2: Feature Extraction (Weeks 4-8)</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Extract one feature module at a time</li>
                                            <li>• Start with least coupled features</li>
                                            <li>• Refactor shared code into utilities</li>
                                            <li>• Update CI/CD for parallel testing</li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-blue-400 mb-4">⚡ Phase 3: Optimization (Weeks 9-12)</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Measure and optimize build times</li>
                                            <li>• Implement binary framework caching</li>
                                            <li>• Setup module-specific feature flags</li>
                                            <li>• Train teams on module best practices</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-amber-400 mb-4">📊 Success KPIs</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Build time reduction</span>
                                                <span className="text-green-400">60-80%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Developer satisfaction</span>
                                                <span className="text-green-400">8+/10</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Feature delivery velocity</span>
                                                <span className="text-green-400">+40%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Merge conflict reduction</span>
                                                <span className="text-green-400">70%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-red-400 mb-4">🚨 Common Migration Pitfalls</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Over-modularizing too early (start simple)</li>
                                            <li>• Creating circular dependencies</li>
                                            <li>• Not updating CI/CD for modules</li>
                                            <li>• Lack of clear ownership model</li>
                                            <li>• Ignoring build performance impact</li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-green-400 mb-4">✅ Staff Engineer Best Practices</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Start with domain boundaries, not technical ones</li>
                                            <li>• Measure everything: builds, tests, deployment</li>
                                            <li>• Automate dependency graph validation</li>
                                            <li>• Create migration tooling for teams</li>
                                            <li>• Document module contracts clearly</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {currentTopic === "arch-di" && (
                    <section className="mb-20 space-y-16">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6">Enterprise Dependency Injection Architecture</h2>
                            <p className="text-muted-foreground text-xl leading-relaxed">
                                Flutter's <strong>GetIt</strong> service locator works well for prototypes. In enterprise iOS development, you need <strong>compile-time safety</strong>, modular boundaries, and testing strategies that scale across teams. This is where strategic DI architecture decisions separate senior from staff engineers.
                            </p>
                        </div>

                        {/* Strategic Decision Framework */}
                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-6 text-white">Staff Engineer Decision Framework</h3>
                            
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-yellow-400 mb-4">🏗️ Pure DI (Composition Root)</h4>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p className="text-white font-medium">Best for:</p>
                                        <ul className="space-y-1">
                                            <li>• Teams < 15 developers</li>
                                            <li>• Monolithic or few modules</li>
                                            <li>• High type safety requirements</li>
                                            <li>• Performance-critical applications</li>
                                        </ul>
                                        <div className="pt-3 border-t border-white/10">
                                            <p className="text-green-400 font-medium">Compile-time safety ✅</p>
                                            <p className="text-green-400 font-medium">Zero runtime overhead ✅</p>
                                            <p className="text-red-400 font-medium">Manual wiring complexity ❌</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-blue-400 mb-4">📦 Container DI (Swinject)</h4>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p className="text-white font-medium">Best for:</p>
                                        <ul className="space-y-1">
                                            <li>• Teams > 15 developers</li>
                                            <li>• Many feature modules</li>
                                            <li>• Dynamic configuration needs</li>
                                            <li>• A/B testing infrastructure</li>
                                        </ul>
                                        <div className="pt-3 border-t border-white/10">
                                            <p className="text-green-400 font-medium">Easy wiring ✅</p>
                                            <p className="text-green-400 font-medium">Dynamic resolution ✅</p>
                                            <p className="text-red-400 font-medium">Runtime failures ❌</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-black/30 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-purple-400 mb-4">🔄 Hybrid Approach</h4>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <p className="text-white font-medium">Enterprise reality:</p>
                                        <ul className="space-y-1">
                                            <li>• Core dependencies: Pure DI</li>
                                            <li>• Feature modules: Container</li>
                                            <li>• A/B tests: Factory pattern</li>
                                            <li>• Development tools: Service locator</li>
                                        </ul>
                                        <div className="pt-3 border-t border-white/10">
                                            <p className="text-green-400 font-medium">Best of both worlds ✅</p>
                                            <p className="text-amber-400 font-medium">Complexity trade-off ⚠️</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Real-World Implementation Strategies */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 text-white">Enterprise Implementation Patterns</h3>

                            <div className="space-y-8">
                                {/* Pure DI Implementation */}
                                <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10">
                                    <h4 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded bg-emerald-500"></div>
                                        Enterprise Pure DI Architecture
                                    </h4>
                                    
                                    <div className="grid lg:grid-cols-2 gap-8 font-mono text-sm">
                                        <div>
                                            <div className="text-emerald-400 mb-4">// Modular Composition Root</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// DependencyContainer.swift
protocol DependencyContainer {
    var authRepository: AuthRepository { get }
    var userRepository: UserRepository { get }
    var networkService: NetworkService { get }
}

final class AppDependencyContainer: DependencyContainer {
    lazy var networkService: NetworkService = {
        URLSessionNetworkService(
            session: URLSession.shared,
            baseURL: Config.apiBaseURL
        )
    }()
    
    lazy var authRepository: AuthRepository = {
        KeychainAuthRepository(
            networkService: networkService,
            keychain: KeychainWrapper.standard
        )
    }()
    
    lazy var userRepository: UserRepository = {
        CoreDataUserRepository(
            context: persistentContainer.viewContext,
            networkService: networkService
        )
    }()
    
    private lazy var persistentContainer = {
        CoreDataStack(modelName: "UserModel")
    }()
}

// Feature-specific containers
protocol AuthDependencies {
    var authRepository: AuthRepository { get }
    var userRepository: UserRepository { get }
}

extension AppDependencyContainer: AuthDependencies {}`}
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-blue-400 mb-4">// Factory Pattern with Environment</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// ViewFactory.swift
final class ViewFactory {
    private let dependencies: DependencyContainer
    private let environment: AppEnvironment
    
    init(dependencies: DependencyContainer, 
         environment: AppEnvironment) {
        self.dependencies = dependencies
        self.environment = environment
    }
    
    func makeLoginView() -> LoginView {
        let viewModel = LoginViewModel(
            authRepository: dependencies.authRepository,
            analytics: environment.analytics,
            featureFlags: environment.featureFlags
        )
        return LoginView(viewModel: viewModel)
    }
    
    func makeHomeView() -> HomeView {
        let viewModel = HomeViewModel(
            userRepository: dependencies.userRepository,
            authRepository: dependencies.authRepository
        )
        return HomeView(viewModel: viewModel)
    }
}

// Environment abstraction
struct AppEnvironment {
    let analytics: AnalyticsService
    let featureFlags: FeatureFlags
    let logger: Logger
    
    static let production = AppEnvironment(
        analytics: FirebaseAnalytics(),
        featureFlags: RemoteFeatureFlags(),
        logger: OSLogger()
    )
    
    static let testing = AppEnvironment(
        analytics: NoOpAnalytics(),
        featureFlags: StaticFeatureFlags(),
        logger: ConsoleLogger()
    )
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* Container DI Implementation */}
                                <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10">
                                    <h4 className="text-xl font-bold mb-6 text-sky-400 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded bg-sky-500"></div>
                                        Enterprise Container DI with Swinject
                                    </h4>
                                    
                                    <div className="grid lg:grid-cols-2 gap-8 font-mono text-sm">
                                        <div>
                                            <div className="text-sky-400 mb-4">// Modular Registration</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// DIAssembly.swift
import Swinject

protocol Assembly {
    func assemble(container: Container)
}

// Core services assembly
final class CoreAssembly: Assembly {
    func assemble(container: Container) {
        container.register(NetworkService.self) { _ in
            URLSessionNetworkService()
        }.inObjectScope(.container)
        
        container.register(AuthRepository.self) { resolver in
            KeychainAuthRepository(
                networkService: resolver.resolve(NetworkService.self)!
            )
        }.inObjectScope(.container)
        
        container.register(UserRepository.self) { resolver in
            CoreDataUserRepository(
                networkService: resolver.resolve(NetworkService.self)!
            )
        }
    }
}

// Feature module assemblies
final class AuthAssembly: Assembly {
    func assemble(container: Container) {
        container.register(LoginViewModel.self) { resolver in
            LoginViewModel(
                authRepository: resolver.resolve(AuthRepository.self)!,
                analytics: resolver.resolve(AnalyticsService.self)!
            )
        }
        
        container.register(SignupViewModel.self) { resolver in
            SignupViewModel(
                authRepository: resolver.resolve(AuthRepository.self)!,
                userRepository: resolver.resolve(UserRepository.self)!
            )
        }
    }
}`}
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-purple-400 mb-4">// Dynamic Configuration</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// DIContainer.swift
final class DIContainer {
    static let shared = DIContainer()
    private let assembler: Assembler
    
    private init() {
        assembler = Assembler([
            CoreAssembly(),
            AuthAssembly(),
            ShoppingAssembly(),
            PaymentAssembly()
        ])
        
        setupEnvironmentSpecificServices()
    }
    
    private func setupEnvironmentSpecificServices() {
        if Config.environment == .production {
            assembler.register(AnalyticsService.self) { _ in
                FirebaseAnalyticsService()
            }
            assembler.register(Logger.self) { _ in
                CloudLogger()
            }
        } else {
            assembler.register(AnalyticsService.self) { _ in
                NoOpAnalyticsService()
            }
            assembler.register(Logger.self) { _ in
                ConsoleLogger()
            }
        }
    }
    
    func resolve<T>(_ type: T.Type) -> T {
        guard let service = assembler.resolver.resolve(type) else {
            fatalError("Failed to resolve \\(type)")
        }
        return service
    }
}

// Feature flag support
extension DIContainer {
    func configureFeatureFlags(_ flags: [String: Bool]) {
        // Dynamic reconfiguration based on A/B tests
        flags.forEach { flag, enabled in
            switch flag {
            case "newPaymentFlow":
                if enabled {
                    assembler.register(PaymentService.self) { _ in
                        NewPaymentService()
                    }
                }
            default:
                break
            }
        }
    }
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* Testing Strategy */}
                                <div className="bg-[#0b0e14] p-8 rounded-2xl border border-white/10">
                                    <h4 className="text-xl font-bold mb-6 text-amber-400 flex items-center gap-3">
                                        <div className="h-3 w-3 rounded bg-amber-500"></div>
                                        Enterprise Testing Architecture
                                    </h4>
                                    
                                    <div className="grid lg:grid-cols-2 gap-8 font-mono text-sm">
                                        <div>
                                            <div className="text-amber-400 mb-4">// Test Dependency Injection</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// TestDependencyContainer.swift
final class TestDependencyContainer: DependencyContainer {
    let mockAuthRepository = MockAuthRepository()
    let mockUserRepository = MockUserRepository()
    let mockNetworkService = MockNetworkService()
    
    var authRepository: AuthRepository { mockAuthRepository }
    var userRepository: UserRepository { mockUserRepository }
    var networkService: NetworkService { mockNetworkService }
}

// Test case integration
class LoginViewModelTests: XCTestCase {
    var sut: LoginViewModel!
    var testContainer: TestDependencyContainer!
    
    override func setUp() {
        super.setUp()
        testContainer = TestDependencyContainer()
        
        sut = LoginViewModel(
            authRepository: testContainer.authRepository,
            analytics: NoOpAnalyticsService(),
            featureFlags: StaticFeatureFlags()
        )
    }
    
    func test_login_success() async {
        // Given
        testContainer.mockAuthRepository.loginResult = .success(
            User.sample
        )
        
        // When
        await sut.login(email: "test@test.com", password: "password")
        
        // Then
        XCTAssertTrue(sut.isLoggedIn)
        XCTAssertNil(sut.errorMessage)
    }
}`}
                                            </pre>
                                        </div>

                                        <div>
                                            <div className="text-green-400 mb-4">// Integration Test Helpers</div>
                                            <pre className="text-gray-300 whitespace-pre-wrap">
{`// TestHelpers.swift
final class IntegrationTestContainer {
    static func makeTestApp() -> AppCoordinator {
        let testContainer = TestDependencyContainer()
        let testEnvironment = AppEnvironment.testing
        
        let coordinator = AppCoordinator(
            dependencies: testContainer,
            environment: testEnvironment
        )
        
        return coordinator
    }
}

// UI Test support
class LoginFlowUITests: XCTestCase {
    func test_completeLoginFlow() {
        let app = XCUIApplication()
        
        // Inject test dependencies through launch arguments
        app.launchArguments = [
            "-test-mode",
            "-mock-auth-success",
            "-skip-onboarding"
        ]
        
        app.launch()
        
        // Test the complete flow
        app.buttons["Login"].tap()
        app.textFields["Email"].typeText("test@test.com")
        app.textFields["Password"].typeText("password")
        app.buttons["Submit"].tap()
        
        XCTAssertTrue(app.staticTexts["Welcome"].exists)
    }
}

// Performance testing
class DIPerformanceTests: XCTestCase {
    func test_containerResolutionPerformance() {
        let container = DIContainer.shared
        
        measure {
            for _ in 0..<1000 {
                _ = container.resolve(AuthRepository.self)
            }
        }
        
        // Should complete in < 0.01 seconds for 1000 resolutions
    }
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Migration Strategy */}
                        <div>
                            <h3 className="text-2xl font-bold mb-8 text-white">Migration Strategies & Performance</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl">
                                        <h4 className="font-bold text-orange-400 mb-4">🔄 Migration Paths</h4>
                                        <div className="space-y-4 text-sm text-muted-foreground">
                                            <div>
                                                <p className="text-white font-medium">Service Locator → Pure DI:</p>
                                                <ul className="space-y-1 text-xs">
                                                    <li>1. Identify dependency boundaries</li>
                                                    <li>2. Create composition roots per module</li>
                                                    <li>3. Replace global access with injection</li>
                                                    <li>4. Remove service locator calls</li>
                                                </ul>
                                            </div>
                                            
                                            <div>
                                                <p className="text-white font-medium">Pure DI → Container:</p>
                                                <ul className="space-y-1 text-xs">
                                                    <li>1. Introduce container for new features</li>
                                                    <li>2. Create assembly modules</li>
                                                    <li>3. Gradually migrate existing factories</li>
                                                    <li>4. Maintain hybrid approach if needed</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl">
                                        <h4 className="font-bold text-red-400 mb-4">🚨 Common Enterprise Pitfalls</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• <strong>Circular dependencies:</strong> Use interfaces/protocols</li>
                                            <li>• <strong>Heavy object creation:</strong> Lazy initialization + scoping</li>
                                            <li>• <strong>Container bloat:</strong> Feature-specific assemblies</li>
                                            <li>• <strong>Missing registrations:</strong> Compile-time verification</li>
                                            <li>• <strong>Memory leaks:</strong> Weak references in closures</li>
                                            <li>• <strong>Testing complexity:</strong> Injectable test doubles</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-card border border-border rounded-xl">
                                        <h4 className="font-bold text-white mb-4">📊 Performance Benchmarks</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Pure DI resolution</span>
                                                <span className="text-green-400">0.001ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Swinject container</span>
                                                <span className="text-amber-400">0.1-0.5ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Service locator</span>
                                                <span className="text-red-400">1-5ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">App startup impact</span>
                                                <span className="text-green-400">< 50ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Memory overhead</span>
                                                <span className="text-green-400">< 1MB</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl">
                                        <h4 className="font-bold text-emerald-400 mb-4">✅ Staff Engineer Best Practices</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• <strong>Start simple:</strong> Pure DI until complexity demands containers</li>
                                            <li>• <strong>Modular boundaries:</strong> Each module owns its dependencies</li>
                                            <li>• <strong>Environment abstraction:</strong> Separate concerns from DI</li>
                                            <li>• <strong>Compile-time safety:</strong> Protocols > runtime resolution</li>
                                            <li>• <strong>Performance monitoring:</strong> Track resolution times</li>
                                            <li>• <strong>Testing strategy:</strong> Injectable mocks > global state</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Scaling Insights */}
                        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 p-10 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-8 text-white">Staff Engineer Team Scaling Insights</h3>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-indigo-400 mb-4">👥 Team Size Impact</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div><strong>2-5 devs:</strong> Pure DI, manual wiring</div>
                                            <div><strong>5-15 devs:</strong> Factory patterns + protocols</div>
                                            <div><strong>15+ devs:</strong> Container DI + assemblies</div>
                                            <div><strong>50+ devs:</strong> Multi-container architecture</div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-purple-400 mb-4">🏗️ Architecture Evolution</h4>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="text-green-400">Phase 1: Single factory</div>
                                            <div className="text-blue-400">Phase 2: Module factories</div>
                                            <div className="text-purple-400">Phase 3: Container assemblies</div>
                                            <div className="text-orange-400">Phase 4: Micro-services DI</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-amber-400 mb-4">⚖️ Complexity Trade-offs</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div><strong>Pure DI:</strong> Simple but manual</div>
                                            <div><strong>Container:</strong> Powerful but runtime</div>
                                            <div><strong>Hybrid:</strong> Flexible but complex</div>
                                            <div><strong>Code-gen:</strong> Fast but tooling</div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-cyan-400 mb-4">🔧 Tooling Strategy</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Dependency graph visualization</li>
                                            <li>• Circular dependency detection</li>
                                            <li>• Performance profiling tools</li>
                                            <li>• Registration validation scripts</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-rose-400 mb-4">📈 Success Metrics</h4>
                                        <div className="space-y-3 text-sm text-muted-foreground">
                                            <div>
                                                <span className="text-white">Build time impact:</span>
                                                <span className="text-green-400 ml-2">< 5%</span>
                                            </div>
                                            <div>
                                                <span className="text-white">Test setup time:</span>
                                                <span className="text-green-400 ml-2">< 100ms</span>
                                            </div>
                                            <div>
                                                <span className="text-white">New feature velocity:</span>
                                                <span className="text-green-400 ml-2">+20%</span>
                                            </div>
                                            <div>
                                                <span className="text-white">Defect detection:</span>
                                                <span className="text-green-400 ml-2">Compile-time</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black/20 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-teal-400 mb-4">🎯 Decision Criteria</h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li>• Team size and experience</li>
                                            <li>• Feature release frequency</li>
                                            <li>• Testing requirements</li>
                                            <li>• Performance constraints</li>
                                            <li>• Maintenance capacity</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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
