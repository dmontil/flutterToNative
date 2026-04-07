import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "The 6 iOS Architecture Patterns You Need Before Your First iOS Interview (Flutter Dev Edition)";
const description =
  "The exact architecture patterns iOS teams expect you to know, translated for Flutter devs.";
const url = "https://www.fluttertonative.pro/articles/ios-architecture-patterns-for-flutter-devs";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ios architecture patterns interview",
    "coordinator pattern flutter developer",
    "mvvm clean architecture ios swift",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function IosArchitecturePatterns() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "patterns", label: "The 6 patterns" },
    { id: "why", label: "Why interviewers ask" },
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
        name: "Is MVVM enough for iOS interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVVM is central, but interviewers also expect navigation, DI and modularization knowledge.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need Clean Architecture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always, but knowing the principles helps you justify architecture decisions.",
        },
      },
      {
        "@type": "Question",
        name: "What is the most important pattern?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MVVM and Coordinator navigation are the most commonly expected.",
        },
      },
    ],
  };

  return (
    <ArticleLayout
      title={title}
      description={description}
      updated="Apr 7, 2026"
      readTime="7 min"
      toc={toc}
      jsonLd={jsonLd}
      faqJsonLd={faqJsonLd}
      eyebrow="Architecture"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Interviewers expect you to know MVVM, Coordinators and DI.</li>
          <li>Patterns signal seniority and design judgment.</li>
          <li>Flutter devs can translate existing architecture experience.</li>
        </ul>
      </section>

      <section id="patterns">
        <h2 className="text-2xl font-bold mb-3">The 6 patterns you need</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
          <li><strong>MVVM:</strong> ViewModels drive state for SwiftUI binding.</li>
          <li><strong>Coordinator:</strong> Navigation flow decoupled from views.</li>
          <li><strong>Dependency Injection:</strong> Constructor or environment-based DI.</li>
          <li><strong>Repository:</strong> Data access abstraction for testability.</li>
          <li><strong>Service Layer:</strong> Business logic outside UI.</li>
          <li><strong>Modularization (SPM):</strong> Feature boundaries and reuse.</li>
        </ol>
      </section>

      <section id="why">
        <h2 className="text-2xl font-bold mb-3">Why interviewers ask about patterns</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Patterns show how you scale teams and codebases.</li>
          <li>They prove you can reason beyond UI code.</li>
          <li>They indicate long-term maintainability thinking.</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook breaks these patterns down with Flutter-to-iOS translations and real code examples.
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
            <h3 className="font-semibold">Is MVVM enough by itself?</h3>
            <p className="text-muted-foreground">It is core, but navigation and DI are also expected.</p>
          </div>
          <div>
            <h3 className="font-semibold">Do I need Clean Architecture?</h3>
            <p className="text-muted-foreground">Not always, but understanding the principles helps.</p>
          </div>
          <div>
            <h3 className="font-semibold">Which pattern matters most?</h3>
            <p className="text-muted-foreground">MVVM and Coordinators show senior architecture thinking.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
