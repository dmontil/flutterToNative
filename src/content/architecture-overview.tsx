import { ArrowRight, CheckCircle2, BookOpen, Code2, Zap, Users } from "lucide-react";
import Link from "next/link";

export const ArchitectureOverviewContent = () => (
  <section className="mb-20 space-y-12 animate-in fade-in duration-700">
    {/* Hero Section */}
    <div className="prose prose-invert max-w-none">
      <h2 className="text-3xl font-bold text-white mb-4">
        Your Roadmap from Flutter to iOS Architecture
      </h2>
      <p className="text-muted-foreground text-xl leading-relaxed mb-8">
        Coming from Flutter, you're used to <strong>BLoC</strong>, <strong>Provider</strong>, or <strong>Riverpod</strong>.
        iOS has its own battle-tested patterns. This guide maps your Flutter knowledge directly to iOS architecture decisions.
      </p>
    </div>

    {/* Architecture Comparison Table */}
    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-500/20 rounded-3xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-white">Flutter → iOS Architecture Translation</h3>
      <div className="grid gap-4">
        {[
          {
            flutter: "BLoC (Business Logic Component)",
            ios: "MVVM (Model-View-ViewModel)",
            why: "MVVM leverages SwiftUI's native @Published binding. No need for streams.",
            confidence: "✅ Direct replacement"
          },
          {
            flutter: "Provider / ChangeNotifier",
            ios: "ObservableObject + @Published",
            why: "SwiftUI's ObservableObject is Provider with less boilerplate.",
            confidence: "✅ Nearly 1:1 mapping"
          },
          {
            flutter: "Riverpod",
            ios: "Combine + Dependency Injection",
            why: "Riverpod's dependency graph → DI Container (Swinject or pure DI)",
            confidence: "⚠️ Requires pattern shift"
          },
          {
            flutter: "GetX",
            ios: "Coordinator Pattern + ViewModel",
            why: "GetX does routing + state. Split into Coordinator (nav) + ViewModel (state)",
            confidence: "⚠️ Architecture redesign needed"
          },
          {
            flutter: "Clean Architecture (layers)",
            ios: "Clean Architecture (same concept!)",
            why: "Domain, Data, Presentation layers work identically in iOS",
            confidence: "✅ Concepts transfer directly"
          },
        ].map((row, idx) => (
          <div key={idx} className="bg-background/60 border border-border rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
            <div className="grid md:grid-cols-3 gap-4 items-start">
              <div>
                <div className="text-xs text-amber-400 font-semibold mb-1">FROM FLUTTER</div>
                <div className="font-mono text-sm text-foreground">{row.flutter}</div>
              </div>
              <div>
                <div className="text-xs text-indigo-400 font-semibold mb-1">TO iOS</div>
                <div className="font-mono text-sm text-indigo-300">{row.ios}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold mb-1">{row.confidence}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{row.why}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Decision Tree */}
    <div>
      <h3 className="text-2xl font-bold mb-6 text-white">Which iOS Architecture Do You Need?</h3>
      <div className="space-y-4">
        <DecisionCard
          question="Are you building a small-to-medium app (< 50 screens)?"
          yes="MVVM + Clean Architecture"
          no="Continue to next question"
          yesReason="MVVM is the iOS standard. Clean Architecture adds testable layers."
          yesIcon={<CheckCircle2 className="h-5 w-5 text-green-400" />}
        />
        <DecisionCard
          question="Do you have multiple teams or need strict module boundaries?"
          yes="MVVM + Coordinator + SPM Modularization"
          no="Stick with MVVM + Clean"
          yesReason="SPM modules enforce boundaries. Coordinator decouples navigation."
          yesIcon={<Users className="h-5 w-5 text-blue-400" />}
        />
        <DecisionCard
          question="Are you dealing with complex navigation flows (e.g., onboarding + auth + main)?"
          yes="Add Coordinator Pattern"
          no="SwiftUI NavigationStack is enough"
          yesReason="Coordinator centralizes navigation logic and prevents ViewModels from knowing routes."
          yesIcon={<Code2 className="h-5 w-5 text-purple-400" />}
        />
        <DecisionCard
          question="Do you need advanced state management (similar to Redux/Riverpod)?"
          yes="Consider TCA (The Composable Architecture)"
          no="MVVM handles most cases"
          yesReason="TCA is Redux-like but has a steep learning curve. Overkill for most apps."
          yesIcon={<Zap className="h-5 w-5 text-yellow-400" />}
        />
      </div>
    </div>

    {/* Key Concepts Comparison */}
    <div className="grid md:grid-cols-2 gap-6">
      <ConceptCard
        title="State Management"
        flutter="BLoC emits states through streams"
        ios="ViewModel exposes @Published properties"
        example="count++ → UI updates automatically"
      />
      <ConceptCard
        title="Dependency Injection"
        flutter="Provider tree or Riverpod providers"
        ios="Constructor injection or DI container"
        example="Pass dependencies explicitly or use Swinject"
      />
      <ConceptCard
        title="Navigation"
        flutter="Navigator.push() with routes"
        ios="NavigationStack or Coordinator pattern"
        example="Centralized routing in Coordinator"
      />
      <ConceptCard
        title="Testing"
        flutter="bloc_test for BLoC, mocktail for deps"
        ios="XCTest for ViewModels, protocol mocks"
        example="Test VMs without simulator (milliseconds)"
      />
    </div>

    {/* Common Pitfalls */}
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-red-400">
        Common Mistakes Flutter Developers Make in iOS
      </h3>
      <div className="space-y-4">
        <PitfallItem
          mistake="Using @ObservedObject instead of @StateObject"
          impact="ViewModel gets recreated on every view redraw → state loss"
          fix="Use @StateObject for view-owned ViewModels"
        />
        <PitfallItem
          mistake="Putting business logic in the View body"
          impact="Impossible to test, violates MVVM"
          fix="Move all logic to ViewModel. View should be passive."
        />
        <PitfallItem
          mistake="Over-using singletons (like GetX's Get.find())"
          impact="Hidden dependencies, hard to test, tight coupling"
          fix="Use constructor injection or proper DI container"
        />
        <PitfallItem
          mistake="Not separating UI state from business state"
          impact="ViewModels become massive, hard to reason about"
          fix="Separate: UIState (loading, error) vs Business State (data)"
        />
      </div>
    </div>

    {/* Learning Path */}
    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        Your 4-Week Learning Path
      </h3>
      <div className="space-y-6 mt-6">
        <WeekCard
          week="Week 1"
          focus="MVVM Fundamentals"
          tasks={[
            "Understand @Published and ObservableObject",
            "Build a simple Counter app with MVVM",
            "Write your first ViewModel unit test",
            "Learn the difference between @State, @StateObject, @ObservedObject"
          ]}
          free={true}
        />
        <WeekCard
          week="Week 2"
          focus="Clean Architecture & Folder Structure"
          tasks={[
            "Implement Domain, Data, Presentation layers",
            "Organize files: Feature-first vs Layer-first",
            "Add repository pattern for data access",
            "Separate Models from ViewModels"
          ]}
          free={false}
        />
        <WeekCard
          week="Week 3"
          focus="Navigation & Coordinator Pattern"
          tasks={[
            "Implement Coordinator for complex flows",
            "Handle deep links and universal links",
            "Decouple navigation from ViewModels",
            "Test navigation logic separately"
          ]}
          free={false}
        />
        <WeekCard
          week="Week 4"
          focus="Modularization & Advanced DI"
          tasks={[
            "Create Swift Package for shared logic",
            "Setup Swinject or pure DI",
            "Optimize build times with SPM",
            "Handle environment-specific configurations"
          ]}
          free={false}
        />
      </div>
    </div>

    {/* CTA to Premium */}
    <div className="mt-12 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 rounded-2xl text-center">
      <h3 className="text-2xl font-bold mb-4 text-white">
        Ready to Master iOS Architecture?
      </h3>
      <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
        Unlock the complete implementation guides for <strong>Folder Structure</strong>,
        <strong> Coordinator Pattern</strong>, <strong>SPM Modularization</strong>, and
        <strong> Advanced DI</strong>. Used by 500+ Flutter developers transitioning to iOS.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <FeatureBadge text="Full folder structure examples" />
        <FeatureBadge text="Coordinator implementation" />
        <FeatureBadge text="SPM setup step-by-step" />
        <FeatureBadge text="DI best practices" />
        <FeatureBadge text="Real-world code samples" />
        <FeatureBadge text="Anti-patterns to avoid" />
      </div>
      <Link href="/pricing">
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 mx-auto">
          Upgrade to Pro <ArrowRight className="h-5 w-5" />
        </button>
      </Link>
    </div>
  </section>
);

// Helper Components
const DecisionCard = ({ question, yes, no, yesReason, yesIcon }: any) => (
  <div className="bg-background/80 border border-border rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
    <div className="font-semibold text-lg mb-4 text-foreground">{question}</div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          {yesIcon}
          <span className="font-semibold text-green-400">YES → {yes}</span>
        </div>
        <p className="text-sm text-muted-foreground">{yesReason}</p>
      </div>
      <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
        <div className="font-semibold text-gray-400 mb-2">NO → {no}</div>
        <p className="text-sm text-muted-foreground">Evaluate next criteria</p>
      </div>
    </div>
  </div>
);

const ConceptCard = ({ title, flutter, ios, example }: any) => (
  <div className="bg-background/60 border border-border rounded-xl p-6">
    <h4 className="font-bold text-lg mb-4 text-white">{title}</h4>
    <div className="space-y-3">
      <div>
        <div className="text-xs text-amber-400 font-semibold mb-1">Flutter</div>
        <div className="text-sm text-muted-foreground">{flutter}</div>
      </div>
      <div>
        <div className="text-xs text-indigo-400 font-semibold mb-1">iOS</div>
        <div className="text-sm text-muted-foreground">{ios}</div>
      </div>
      <div className="pt-2 border-t border-border">
        <div className="text-xs text-green-400 font-semibold mb-1">Example</div>
        <code className="text-sm text-foreground/80">{example}</code>
      </div>
    </div>
  </div>
);

const PitfallItem = ({ mistake, impact, fix }: any) => (
  <div className="flex gap-4 items-start">
    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
      <span className="text-red-400 font-bold text-sm">!</span>
    </div>
    <div className="flex-1">
      <div className="font-semibold text-red-400 mb-1">{mistake}</div>
      <div className="text-sm text-muted-foreground mb-2">{impact}</div>
      <div className="text-sm text-green-400">✓ Fix: {fix}</div>
    </div>
  </div>
);

const WeekCard = ({ week, focus, tasks, free }: any) => (
  <div className={`bg-background/60 border ${free ? 'border-green-500/20' : 'border-amber-500/20'} rounded-xl p-6 relative`}>
    {!free && (
      <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-semibold text-amber-400">
        PRO
      </div>
    )}
    <div className="flex items-baseline gap-3 mb-4">
      <div className={`text-2xl font-bold ${free ? 'text-green-400' : 'text-amber-400'}`}>{week}</div>
      <div className="text-lg font-semibold text-white">{focus}</div>
    </div>
    <ul className="space-y-2">
      {tasks.map((task: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className={`h-4 w-4 ${free ? 'text-green-400' : 'text-amber-400'} shrink-0 mt-0.5`} />
          <span>{task}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FeatureBadge = ({ text }: { text: string }) => (
  <div className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10 text-foreground">
    ✓ {text}
  </div>
);
