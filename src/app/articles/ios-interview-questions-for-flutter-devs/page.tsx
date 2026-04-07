import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "50 iOS Interview Questions Every Flutter Developer Will Be Asked (With Answers)";
const description =
  "Senior-filter questions with compact answers in native iOS language.";
const url = "https://www.fluttertonative.pro/articles/ios-interview-questions-for-flutter-devs";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ios interview questions flutter developer",
    "swift interview questions flutter background",
    "senior ios interview prep flutter",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function IosInterviewQuestions() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "questions", label: "50 questions with answers" },
    { id: "cta", label: "Next step" },
    { id: "faq", label: "FAQ" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "FlutterToNative.pro" },
    publisher: { "@type": "Organization", name: "FlutterToNative.pro" },
    mainEntityOfPage: url,
    inLanguage: "en",
    datePublished: "2026-04-07",
    dateModified: "2026-04-07",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these questions enough for senior interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They cover the most common senior filters. Pair them with architecture practice and SwiftUI fundamentals.",
        },
      },
      {
        "@type": "Question",
        name: "Should I answer in Flutter terms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Use iOS terminology and only mention Flutter as context if it strengthens your answer.",
        },
      },
      {
        "@type": "Question",
        name: "What are the top 3 topics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Architecture, memory (ARC), and concurrency are the most important.",
        },
      },
    ],
  };

  const qa = [
    ["What is ARC?", "Automatic Reference Counting for deterministic memory management."],
    ["What is a retain cycle?", "Two objects strongly reference each other and never deallocate."],
    ["How do you prevent retain cycles?", "Use weak/unowned references, especially in closures."],
    ["What is MVVM?", "A pattern where ViewModels expose state for SwiftUI binding."],
    ["Why MVVM in SwiftUI?", "SwiftUI is reactive and fits ViewModel binding naturally."],
    ["What is async/await?", "Structured concurrency for async operations in Swift."],
    ["When use GCD vs async/await?", "Prefer async/await; use GCD for legacy or low-level work."],
    ["What is a Coordinator?", "A navigation pattern that decouples flows from views."],
    ["Why Coordinators?", "They scale navigation and avoid tight coupling."],
    ["What is @State?", "SwiftUI property wrapper for local view state."],
    ["What is ObservableObject?", "A class that publishes changes to SwiftUI views."],
    ["What is @Published?", "Marks properties that trigger UI updates."],
    ["What is Environment?", "Shared dependencies provided through the view tree."],
    ["What is a value type?", "Structs and enums copied by value, common in Swift."],
    ["What is a reference type?", "Classes are reference types; ARC manages them."],
    ["Explain Swift optionals.", "Type-safe representation of values that may be nil."],
    ["What is protocol-oriented programming?", "Using protocols for composition and abstraction."],
    ["What is SwiftUI diffing?", "SwiftUI updates views based on state changes."],
    ["What is a View?", "A value describing UI; SwiftUI renders it."],
    ["What is Scene?", "Top-level container for app content."],
    ["What is App lifecycle in SwiftUI?", "App struct defines entry point and scenes."],
    ["What is a Task?", "A unit of async work in Swift concurrency."],
    ["What is an Actor?", "A reference type that protects mutable state."],
    ["Explain MainActor.", "Runs UI-related code on the main thread."],
    ["What is Combine?", "Reactive framework used for publishers and subscribers."],
    ["When use Combine in SwiftUI?", "When you need advanced reactive streams."],
    ["What is dependency injection?", "Providing dependencies from the outside for testability."],
    ["Explain URLSession.", "iOS networking API for requests and responses."],
    ["What is Codable?", "Protocol for encoding and decoding JSON."],
    ["What is a Result type?", "Represents success or failure explicitly."],
    ["How to handle errors in Swift?", "Do-catch with Error conforming types."],
    ["What is a retain cycle example?", "ViewModel holding closure that captures self."],
    ["Explain memory leaks.", "Objects not released due to strong references."],
    ["What is SwiftUI NavigationStack?", "Modern navigation container for stack-based flows."],
    ["What is NavigationPath?", "Data-driven navigation state."],
    ["What is UIKit?", "Imperative UI framework used before SwiftUI."],
    ["Why learn UIKit at all?", "Legacy codebases and interoperability."],
    ["Explain @StateObject vs @ObservedObject.", "@StateObject owns lifecycle; @ObservedObject is injected."],
    ["What is @EnvironmentObject?", "Shared observable object in view hierarchy."],
    ["Explain ViewBuilder.", "Builds multiple views in SwiftUI closures."],
    ["What is a Binding?", "Two-way connection between state and view."],
    ["What is @Published used for?", "Emitting changes from ViewModel."],
    ["What is a Memory Graph?", "Xcode tool for finding leaks."],
    ["Explain testability in MVVM.", "ViewModels are testable without UI."],
    ["What is the Coordinator responsibility?", "Own navigation flow and dependencies."],
    ["Explain protocol-based navigation.", "Abstracting navigation with protocols for flexibility."],
    ["What is a Service layer?", "Business logic and data access outside UI."],
    ["What is Clean Architecture?", "Layered separation between domain and presentation."],
    ["Explain Swift Package Manager.", "Native dependency management for iOS."],
    ["What is view identity in SwiftUI?", "How SwiftUI differentiates views to apply updates correctly."],
  ];

  return (
    <ArticleLayout
      title={title}
      description={description}
      updated="Apr 7, 2026"
      readTime="10 min"
      toc={toc}
      jsonLd={jsonLd}
      faqJsonLd={faqJsonLd}
      eyebrow="Checklist"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>These are the most frequent senior filters in iOS interviews.</li>
          <li>Use iOS terminology and explain tradeoffs, not Flutter specifics.</li>
          <li>Architecture, memory and concurrency are the highest ROI topics.</li>
        </ul>
      </section>

      <section id="questions">
        <h2 className="text-2xl font-bold mb-3">50 interview questions with compact answers</h2>
        <div className="space-y-4">
          {qa.map(([question, answer], index) => (
            <div key={question} className="rounded-2xl border border-border p-5">
              <p className="font-semibold">{index + 1}. {question}</p>
              <p className="text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook includes deeper explanations and how to frame these answers like a senior iOS engineer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/ios"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            See iOS Career Track
          </Link>
          <Link
            href="/pricing#ios"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2"
          >
            See pricing and access
          </Link>
        </div>
      </section>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-3">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Should I memorize all answers?</h3>
            <p className="text-muted-foreground">No. Focus on principles and tradeoffs.</p>
          </div>
          <div>
            <h3 className="font-semibold">What topics matter most?</h3>
            <p className="text-muted-foreground">Architecture, ARC and concurrency.</p>
          </div>
          <div>
            <h3 className="font-semibold">How to sound senior?</h3>
            <p className="text-muted-foreground">Explain why you chose a pattern and its tradeoffs.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
