"use client";

import { Navbar } from "@/components/ui/navbar";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { AlertCircle, ArrowRight } from "lucide-react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { useUser } from "@/components/auth/user-provider";

export default function AndroidMentalModelPage() {
    const { hasAccess, isLoading } = useUser();
    const isPro = hasAccess('android_premium');

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">The Flutter → Android Mental Model</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        You already build high-quality apps. This guide maps your Flutter instincts to Kotlin, Android OS,
                        and the Compose runtime so you can ship native confidently.
                    </p>
                </div>

                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">1</span>
                        Core UI Concepts
                    </h2>

                    <ComparisonTable
                        title="Rendering & UI Primitives"
                        rightLabel="Android (Kotlin/Compose)"
                        rightColorClass="text-green-500"
                        rows={[
                            { flutter: "Widget", ios: "Composable (Jetpack Compose) / View (XML)", notes: "Composables are functions, not classes. They describe UI declaratively like Flutter Widgets." },
                            { flutter: "build() method", ios: "@Composable function body", notes: "Compose recomposes functions when State changes. No direct build method is needed." },
                            { flutter: "StatelessWidget", ios: "Composable w/ no state", notes: "Pure Composables are effectively stateless when they only depend on inputs." },
                            { flutter: "StatefulWidget", ios: "remember / mutableStateOf", notes: "Compose keeps state via `remember` and `mutableStateOf`." },
                            { flutter: "BuildContext", ios: "CompositionLocal / Ambient", notes: "Compose uses CompositionLocal to pass dependencies down the tree." },
                        ]}
                        className="mb-8"
                    />

                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-6 flex gap-4">
                        <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-amber-500 mb-1">Critical Difference: Lifecycle Ownership</h4>
                            <p className="text-sm text-foreground/80">
                                Flutter owns the UI lifecycle. Android has a real OS lifecycle for Activities/Fragments.
                                Compose respects that lifecycle and can be disposed at any time when configuration changes occur.
                            </p>
                        </div>
                    </div>
                </section>

                <PremiumLock isUnlocked={isLoading ? false : isPro}>
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">2</span>
                            State Management & Logic
                        </h2>

                        <ComparisonTable
                        title="Business Logic"
                        rightLabel="Android (Kotlin/Compose)"
                        rightColorClass="text-green-500"
                        rows={[
                                { flutter: "Cubit / BLoC", ios: "ViewModel (AndroidX)", notes: "Android standard is ViewModel + StateFlow/LiveData." },
                                { flutter: "State Class", ios: "UiState data class", notes: "Compose consumes immutable UiState and recomposes when StateFlow emits." },
                                { flutter: "Stream<State>", ios: "Flow / StateFlow", notes: "Kotlin Flow is the idiomatic reactive stream in Android." },
                                { flutter: "BlocProvider", ios: "Hilt / Koin DI", notes: "Dependency injection at Activity/Composable boundary." },
                                { flutter: "BlocListener", ios: "LaunchedEffect / collect", notes: "Handle navigation and one-off events with SharedFlow or Channel." },
                            ]}
                        />
                    </section>

                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white text-sm">3</span>
                            Concurrency & Threading
                        </h2>

                        <ComparisonTable
                        title="Async Operations"
                        rightLabel="Android (Kotlin/Compose)"
                        rightColorClass="text-green-500"
                        rows={[
                                { flutter: "Isolate", ios: "Coroutine Dispatchers", notes: "Coroutines run on Dispatchers (Main, IO, Default). Heavy work runs on Default/IO." },
                                { flutter: "Future<T>", ios: "suspend functions", notes: "Kotlin suspend is the equivalent of async/await in Dart." },
                                { flutter: "compute()", ios: "withContext(Dispatchers.Default)", notes: "Offload CPU-heavy work to background threads." },
                            ]}
                        />
                    </section>

                    <div className="flex justify-between items-center py-8 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                            Next Section
                        </div>
                        <a href="/android/widget-map" className="flex items-center gap-2 font-bold hover:text-green-500 transition-colors">
                            Widget-to-Compose Map
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Project Structure</h2>
                        <ComparisonTable
                        title="Files & Entry Points"
                        rightLabel="Android (Kotlin/Compose)"
                        rightColorClass="text-green-500"
                        rows={[
                                { flutter: "lib/main.dart", ios: "MainActivity.kt + setContent{}", notes: "Compose UI starts in MainActivity via setContent." },
                                { flutter: "pubspec.yaml", ios: "build.gradle.kts", notes: "Gradle (Kotlin DSL) manages dependencies and build config." },
                                { flutter: "android/ & ios/ folders", ios: "app/ module", notes: "Android is a multi-module Gradle project; `app` is the entry module." },
                                { flutter: "Assets (pubspec)", ios: "res/ + assets/", notes: "Android resources live in res/ (xml, drawables, strings) and assets/." }
                            ]}
                            className="mb-8"
                        />
                    </div>

                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Dependency Management</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-4 text-green-400">Flutter: Pub</h3>
                                <ul className="list-disc ml-4 space-y-2 text-muted-foreground">
                                    <li><strong>pubspec.yaml</strong>: Central declarative file.</li>
                                    <li><strong>pub.dev</strong>: The central repository.</li>
                                    <li><strong>Lockfile</strong>: pubspec.lock.</li>
                                </ul>
                            </div>
                            <div className="bg-card border border-border p-6 rounded-xl">
                                <h3 className="font-bold text-xl mb-4 text-emerald-400">Android: Gradle</h3>
                                <ul className="list-disc ml-4 space-y-2 text-muted-foreground">
                                    <li><strong>Gradle (Kotlin DSL)</strong>: build.gradle.kts per module.</li>
                                    <li><strong>Maven Central</strong>: Primary artifact source.</li>
                                    <li><strong>Version Catalogs</strong>: libs.versions.toml for centralized versions.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-6">Build Environments</h2>
                        <ComparisonTable
                        title="Flavors vs Build Variants"
                        rightLabel="Android (Kotlin/Compose)"
                        rightColorClass="text-green-500"
                        rows={[
                                { flutter: "--flavor dev", ios: "Build Variants (debug/release)", notes: "Android build variants are a matrix of buildTypes + productFlavors." },
                                { flutter: "main_dev.dart", ios: "ProductFlavors + buildConfigField", notes: "Use flavors + buildConfigField for env-specific constants." },
                                { flutter: ".env files", ios: "Gradle + local.properties", notes: "Sensitive values stored in local.properties or CI secrets." }
                            ]}
                            className="mb-8"
                        />
                    </div>
                </PremiumLock>

            </main>
        </div>
    );
}
