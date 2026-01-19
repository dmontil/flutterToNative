import { CheckCircle2, Circle, AlertCircle, Clock, ArrowRight, Lightbulb, Shield } from "lucide-react";
import Link from "next/link";

export function MigrationRoadmapContent() {
    return (
        <div className="space-y-16">
            {/* Introduction */}
            <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground text-xl leading-relaxed">
                    Migrating from Flutter to native iOS isn't just about learning SwiftUI syntax—it's about understanding a completely different ecosystem, toolchain, and development philosophy. This roadmap breaks down the journey into clear phases with realistic timelines and common pitfalls to avoid.
                </p>
            </div>

            {/* Timeline Overview */}
            <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Realistic Timeline</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-indigo-400">4</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Weeks</h3>
                        <p className="text-sm text-muted-foreground">Junior Flutter dev → Junior iOS dev</p>
                    </div>
                    <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-purple-400">3</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Months</h3>
                        <p className="text-sm text-muted-foreground">Build production-ready apps with MVVM</p>
                    </div>
                    <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-pink-400">6</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Months</h3>
                        <p className="text-sm text-muted-foreground">Mid-level iOS engineer with strong architecture skills</p>
                    </div>
                    <div className="text-center">
                        <div className="h-20 w-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-orange-400">12</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Months</h3>
                        <p className="text-sm text-muted-foreground">Senior iOS engineer ready for tech lead roles</p>
                    </div>
                </div>
            </div>

            {/* Phase 1: Foundations */}
            <PhaseCard
                phase={1}
                title="Foundations (Weeks 1-2)"
                duration="2 weeks"
                color="indigo"
            >
                <div className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-lg font-bold text-white mb-4">🎯 Goals</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>Set up Xcode and understand the iOS development environment</li>
                            <li>Learn Swift basics: value vs reference types, optionals, protocols</li>
                            <li>Build your first SwiftUI app (counter, todo list)</li>
                            <li>Understand @State, @Binding, and basic state management</li>
                        </ul>
                    </div>

                    <ChecklistSection
                        title="Week 1 Checklist"
                        items={[
                            { text: "Install Xcode and create your first project", done: false },
                            { text: "Complete Swift Tour (1-2 hours)", done: false },
                            { text: "Learn about value types (structs) vs reference types (classes)", done: false },
                            { text: "Build a Counter app with @State", done: false },
                            { text: "Understand optional unwrapping (if let, guard let)", done: false },
                        ]}
                    />

                    <ChecklistSection
                        title="Week 2 Checklist"
                        items={[
                            { text: "Learn SwiftUI layout: VStack, HStack, ZStack, Spacer", done: false },
                            { text: "Build a Todo List app with List and ForEach", done: false },
                            { text: "Implement @Binding between parent and child views", done: false },
                            { text: "Add navigation with NavigationStack", done: false },
                            { text: "Learn about protocol-oriented programming", done: false },
                        ]}
                    />

                    <PitfallCard
                        title="Common Mistakes in Phase 1"
                        pitfalls={[
                            {
                                mistake: "Using classes for Views",
                                impact: "SwiftUI Views are structs (value types). Using classes breaks SwiftUI's diffing algorithm.",
                                fix: "Always use struct for SwiftUI Views. Only use class for ViewModels."
                            },
                            {
                                mistake: "Not understanding optionals",
                                impact: "Force unwrapping (!) causes crashes. Flutter devs used to null safety get confused.",
                                fix: "Use if let, guard let, or optional chaining (?.) for safe unwrapping."
                            },
                            {
                                mistake: "Trying to use hot reload",
                                impact: "iOS doesn't have Flutter's hot reload. Frustration builds quickly.",
                                fix: "Use Xcode Previews for rapid iteration. It's not hot reload, but it helps."
                            }
                        ]}
                    />
                </div>
            </PhaseCard>

            {/* Phase 2: State Management & Architecture */}
            <PhaseCard
                phase={2}
                title="State Management & Architecture (Weeks 3-4)"
                duration="2 weeks"
                color="purple"
            >
                <div className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-lg font-bold text-white mb-4">🎯 Goals</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>Learn @StateObject, @ObservedObject, @EnvironmentObject</li>
                            <li>Implement your first MVVM pattern</li>
                            <li>Understand @Published and ObservableObject</li>
                            <li>Handle async/await properly with Task</li>
                        </ul>
                    </div>

                    <ChecklistSection
                        title="Week 3 Checklist"
                        items={[
                            { text: "Create your first ViewModel with ObservableObject", done: false },
                            { text: "Learn when to use @StateObject vs @ObservedObject", done: false },
                            { text: "Implement @Published properties", done: false },
                            { text: "Build a Login screen with ViewModel", done: false },
                            { text: "Handle loading states and error messages", done: false },
                        ]}
                    />

                    <ChecklistSection
                        title="Week 4 Checklist"
                        items={[
                            { text: "Learn async/await in Swift", done: false },
                            { text: "Implement network calls with URLSession", done: false },
                            { text: "Add [weak self] to prevent memory leaks", done: false },
                            { text: "Use @EnvironmentObject for dependency injection", done: false },
                            { text: "Build a complete CRUD app with MVVM", done: false },
                        ]}
                    />

                    <PitfallCard
                        title="Common Mistakes in Phase 2"
                        pitfalls={[
                            {
                                mistake: "Using @ObservedObject when you should use @StateObject",
                                impact: "ViewModel gets recreated on every view redraw, losing state.",
                                fix: "Use @StateObject for ViewModels you create, @ObservedObject for ViewModels passed in."
                            },
                            {
                                mistake: "Forgetting [weak self] in closures",
                                impact: "Memory leaks! Unlike Flutter's GC, Swift uses ARC. Retain cycles are common.",
                                fix: "Always use [weak self] in closures that outlive the ViewModel (network calls, timers)."
                            },
                            {
                                mistake: "Putting business logic in Views",
                                impact: "Untestable code. Views become massive and hard to maintain.",
                                fix: "Keep Views passive. All logic should live in the ViewModel."
                            }
                        ]}
                    />
                </div>
            </PhaseCard>

            {/* Phase 3: Production-Ready Architecture */}
            <PhaseCard
                phase={3}
                title="Production-Ready Architecture (Months 2-3)"
                duration="2 months"
                color="pink"
                isPremium={true}
            >
                <div className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-lg font-bold text-white mb-4">🎯 Goals</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>Implement Clean Architecture (Domain → Data → Presentation)</li>
                            <li>Master the Coordinator pattern for navigation</li>
                            <li>Set up proper folder structure</li>
                            <li>Write unit tests for ViewModels and UseCases</li>
                        </ul>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Shield className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-indigo-400 mb-2">Premium Content</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This phase covers advanced architecture patterns used by senior iOS teams. Unlock the full playbook for detailed implementation guides.
                                </p>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Unlock Full Roadmap
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 opacity-60 blur-sm pointer-events-none">
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <h5 className="font-semibold mb-2">Month 2</h5>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Clean Architecture layers</li>
                                <li>• Repository pattern</li>
                                <li>• UseCase implementation</li>
                                <li>• Dependency Injection setup</li>
                            </ul>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <h5 className="font-semibold mb-2">Month 3</h5>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Coordinator pattern</li>
                                <li>• Testing strategy</li>
                                <li>• CI/CD setup</li>
                                <li>• App Store deployment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PhaseCard>

            {/* Phase 4: Advanced & Scalability */}
            <PhaseCard
                phase={4}
                title="Advanced & Scalability (Months 4-6)"
                duration="3 months"
                color="orange"
                isPremium={true}
            >
                <div className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <h4 className="text-lg font-bold text-white mb-4">🎯 Goals</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>Modularize your app with Swift Package Manager (SPM)</li>
                            <li>Implement advanced DI patterns (Swinject or pure DI)</li>
                            <li>Optimize build times and app performance</li>
                            <li>Contribute to iOS open-source projects</li>
                        </ul>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <Shield className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-indigo-400 mb-2">Premium Content</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Learn how to scale iOS apps to enterprise level with modularization, advanced DI, and build optimization.
                                </p>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Unlock Advanced Topics
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </PhaseCard>

            {/* Resources Section */}
            <div className="mt-16 space-y-8">
                <h2 className="text-3xl font-bold text-white">Essential Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <ResourceCard
                        title="Official Documentation"
                        icon="📚"
                        resources={[
                            { name: "Swift.org", url: "https://swift.org/documentation/" },
                            { name: "SwiftUI Tutorials", url: "https://developer.apple.com/tutorials/swiftui" },
                            { name: "Human Interface Guidelines", url: "https://developer.apple.com/design/human-interface-guidelines/" },
                        ]}
                    />
                    <ResourceCard
                        title="Community Learning"
                        icon="🎓"
                        resources={[
                            { name: "Hacking with Swift", url: "https://hackingwithswift.com" },
                            { name: "100 Days of SwiftUI", url: "https://hackingwithswift.com/100/swiftui" },
                            { name: "Swift by Sundell", url: "https://swiftbysundell.com" },
                        ]}
                    />
                </div>
            </div>

            {/* Final CTA */}
            <div className="mt-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 p-10 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 text-white">Ready to Go Deeper?</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    This roadmap gives you the high-level path, but the devil is in the details. Get access to complete implementation guides, code examples, and expert insights used by senior iOS engineers.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
                    >
                        Get the Full Playbook
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/architecture?topic=arch-pattern"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
                    >
                        Explore MVVM Guide
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PhaseCard({
    phase,
    title,
    duration,
    color,
    isPremium = false,
    children
}: {
    phase: number;
    title: string;
    duration: string;
    color: string;
    isPremium?: boolean;
    children: React.ReactNode;
}) {
    const colorClasses = {
        indigo: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20",
        purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
        pink: "from-pink-500/10 to-pink-600/5 border-pink-500/20",
        orange: "from-orange-500/10 to-orange-600/5 border-orange-500/20",
    };

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border p-8 rounded-2xl relative`}>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl font-bold text-white/20">#{phase}</span>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {isPremium && (
                    <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs font-medium text-indigo-400">
                        PREMIUM
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}

function ChecklistSection({ title, items }: { title: string; items: { text: string; done: boolean }[] }) {
    return (
        <div className="bg-card border border-border p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-4">{title}</h4>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PitfallCard({
    title,
    pitfalls
}: {
    title: string;
    pitfalls: { mistake: string; impact: string; fix: string }[];
}) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <h4 className="font-bold text-lg text-red-400">{title}</h4>
            </div>
            <div className="space-y-4">
                {pitfalls.map((pitfall, i) => (
                    <div key={i} className="bg-card/50 p-4 rounded-lg border border-red-500/10">
                        <h5 className="font-semibold text-sm mb-2 text-red-300">❌ {pitfall.mistake}</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                            <strong>Impact:</strong> {pitfall.impact}
                        </p>
                        <p className="text-xs text-emerald-400">
                            <strong>✅ Fix:</strong> {pitfall.fix}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResourceCard({
    title,
    icon,
    resources
}: {
    title: string;
    icon: string;
    resources: { name: string; url: string }[];
}) {
    return (
        <div className="bg-card border border-border p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{icon}</span>
                <h4 className="font-bold text-lg">{title}</h4>
            </div>
            <ul className="space-y-3">
                {resources.map((resource, i) => (
                    <li key={i}>
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-2 group"
                        >
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            {resource.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
