"use client";

import { DocLayout } from "@/components/layout/doc-layout";
import { Layers, ArrowRight, Shield, Folder, FileCode } from "lucide-react";
import { CodeComparison } from "@/components/ui/code-comparison";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

const ARCHITECTURE_TOPICS = [
    { title: "The Pattern: MVVM + Clean", id: "arch-pattern" },
    { title: "Folder Structure", id: "arch-folder" },
    { title: "Navigation: NavController", id: "arch-coordinator" },
    { title: "Modularization (Gradle)", id: "arch-modularization" },
    { title: "Advanced DI (Hilt)", id: "arch-di" },
    { title: "War Stories & Failure Modes", id: "arch-war-stories" },
    { title: "Scaling Checklist", id: "arch-checklist" },
    { title: "Data Flow & Offline", id: "arch-data" },
];

export default function AndroidArchitecturePage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Architecture...</div>}>
            <AndroidArchitectureContent />
        </Suspense>
    );
}

function AndroidArchitectureContent() {
    const searchParams = useSearchParams();
    const currentTopic = searchParams.get("topic") || "arch-pattern";
    const { hasAccess, isLoading } = useUser();
    const isPro = hasAccess('android_premium');

    const topic = ARCHITECTURE_TOPICS.find(t => t.id === currentTopic) || ARCHITECTURE_TOPICS[0];

    return (
        <DocLayout
            title="Architecture Hub"
            items={ARCHITECTURE_TOPICS}
            productId="android_playbook"
            premiumTopics={["arch-folder", "arch-coordinator", "arch-modularization", "arch-di", "arch-war-stories", "arch-checklist", "arch-data"]}
        >
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">{topic.title}</h1>
                <p className="text-xl text-muted-foreground">
                    Building scalable Android apps. Flutter patterns vs Senior Android Architecture.
                </p>
            </div>

            {currentTopic === "arch-pattern" && (
                <section className="mb-20 space-y-10 animate-in fade-in duration-700">
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold text-white mb-6">MVVM + Clean Architecture: Android Standard</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Flutter BLoC centralizes state streams. In Android, the stable pattern is
                            <strong> MVVM + Clean</strong>: ViewModel holds UI state, domain defines use cases,
                            and data layer implements repositories.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-xl flex flex-col">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <Layers className="text-green-500 h-5 w-5" /> Why MVVM Works Here
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                Compose recomposes when StateFlow changes. Your ViewModel is the single
                                source of truth for UI state.
                            </p>
                            <ul className="space-y-4 text-sm mt-auto">
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Unidirectional Flow:</strong> UI events in, State out.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Decoupled Logic:</strong> ViewModel doesn't know about Compose.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">✔</div>
                                    <span><strong>Testability:</strong> Pure Kotlin tests without Android runtime.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-2xl flex flex-col justify-center">
                            <h3 className="font-bold text-xl mb-4 text-green-400 italic">Senior Tip: Immutable UiState</h3>
                            <p className="text-base leading-relaxed text-foreground/90">
                                Use a single <code>UiState</code> data class and StateFlow to avoid inconsistent UI.
                                Compose will recompose only what changed.
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
                                label: "Kotlin (MVVM)",
                                language: "kotlin",
                                code: `class CounterViewModel : ViewModel() {
  private val _state = MutableStateFlow(0)
  val state: StateFlow<Int> = _state

  fun increment() { _state.value += 1 }
}`
                            }
                        ]}
                    />
                </section>
            )}

            {currentTopic === "arch-folder" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-10">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Folder className="h-6 w-6 text-green-500" />
                            Practical Folder Structure
                        </h2>
                        <div className="bg-card border border-border p-6 rounded-xl">
                            <pre className="text-sm font-mono text-muted-foreground">{`app/
  ui/
    feature_expense/
      ExpenseScreen.kt
      ExpenseViewModel.kt
  domain/
    model/
    usecase/
    repository/
  data/
    repository/
    remote/
    local/
  di/
    AppModule.kt`}</pre>
                        </div>
                        <p className="text-muted-foreground">
                            Keep <strong>feature UI</strong> isolated while the domain layer stays pure Kotlin.
                            Repositories implement domain contracts in the data layer.
                        </p>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-coordinator" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <ArrowRight className="h-6 w-6 text-green-500" />
                            Navigation with NavController
                        </h2>
                        <CodeComparison
                            title="Navigation Graph"
                            snippets={[
                                {
                                    label: "Flutter",
                                    language: "dart",
                                    code: `Navigator.pushNamed(context, "/details");`
                                },
                                {
                                    label: "Compose",
                                    language: "kotlin",
                                    code: `NavHost(navController, startDestination = "home") {
  composable("home") { HomeScreen(onOpen = { navController.navigate("details") }) }
  composable("details") { DetailsScreen() }
}`
                                }
                            ]}
                        />
                        <p className="text-muted-foreground">
                            NavController is your Coordinator. Keep navigation logic at the edge of UI
                            and pass events upward.
                        </p>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-modularization" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <FileCode className="h-6 w-6 text-green-500" />
                            Gradle Modularization
                        </h2>
                        <p className="text-muted-foreground">
                            Split features into Gradle modules for faster builds, clearer ownership, and
                            fewer dependency tangles.
                        </p>
                        <div className="bg-card border border-border p-6 rounded-xl text-sm text-muted-foreground">
                            <p><strong>Suggested modules:</strong> `:app`, `:feature:expense`, `:core:ui`, `:core:data`</p>
                            <p>Use <code>api</code> vs <code>implementation</code> to control visibility.</p>
                        </div>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-di" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Shield className="h-6 w-6 text-green-500" />
                            Dependency Injection with Hilt
                        </h2>
                        <CodeComparison
                            title="Hilt Module"
                            snippets={[
                                {
                                    label: "Flutter (GetIt)",
                                    language: "dart",
                                    code: `getIt.registerLazySingleton<AuthRepo>(() => AuthRepoImpl());`
                                },
                                {
                                    label: "Kotlin (Hilt)",
                                    language: "kotlin",
                                    code: `@Module
@InstallIn(SingletonComponent::class)
object AppModule {
  @Provides @Singleton
  fun provideAuthRepo(): AuthRepo = AuthRepoImpl()
}`
                                }
                            ]}
                        />
                        <p className="text-muted-foreground">
                            Use constructor injection in ViewModels. Avoid manual service locators.
                        </p>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-war-stories" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold">War Stories & Failure Modes</h2>
                        <div className="bg-card border border-border p-6 rounded-xl space-y-4 text-muted-foreground">
                            <p><strong>State explosion:</strong> multiple ViewModels update the same UI state → inconsistent screens. Fix with single UiState per screen.</p>
                            <p><strong>Leaky singletons:</strong> holding Activity/Context references in object singletons → memory leaks. Fix with DI + application context.</p>
                            <p><strong>Over-modularization:</strong> too many tiny modules → slow builds + dependency hell. Fix by grouping by feature + core modules.</p>
                            <p><strong>Unbounded recomposition:</strong> unstable data classes cause frequent recomposition. Fix with immutable state + stable types.</p>
                        </div>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-checklist" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold">Scaling Checklist (Senior Level)</h2>
                        <ul className="list-disc ml-6 text-muted-foreground space-y-2">
                            <li>UI state is immutable and versioned per screen.</li>
                            <li>All long-running work is in viewModelScope with cancellation.</li>
                            <li>Repository boundaries are enforced via interfaces.</li>
                            <li>Network & DB are fully testable (fake implementations).</li>
                            <li>Feature modules compile independently.</li>
                            <li>Analytics and logging are centralized (no scattered events).</li>
                        </ul>
                    </section>
                </PremiumLock>
            )}

            {currentTopic === "arch-data" && (
                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20 space-y-8">
                        <h2 className="text-2xl font-bold">Data Flow & Offline Strategy</h2>
                        <div className="bg-card border border-border p-6 rounded-xl text-muted-foreground space-y-4">
                            <p><strong>Single Source of Truth:</strong> Room database should be the truth; UI observes Flow from DB.</p>
                            <p><strong>Sync policy:</strong> Repo fetches from network, writes to DB, DB notifies UI.</p>
                            <p><strong>Conflict resolution:</strong> Use timestamps or server versioning for merges.</p>
                            <p><strong>Connectivity:</strong> Degrade gracefully with cached content and queued writes.</p>
                        </div>
                    </section>
                </PremiumLock>
            )}

            <div className="mt-16 bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for the next step?</h3>
                <p className="text-muted-foreground mb-6">
                    Apply these patterns in a real feature build.
                </p>
                <Link href="/android/feature-dive" className="inline-flex items-center gap-2 font-bold hover:text-green-500 transition-colors">
                    Deep Dive: Expense Tracker
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </DocLayout>
    );
}
