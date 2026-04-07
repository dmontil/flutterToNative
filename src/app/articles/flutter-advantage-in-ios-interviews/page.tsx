import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "Why Flutter Developers Actually Have an Advantage in Senior iOS Interviews (And How to Use It)";
const description =
  "Turn your Flutter background into a senior signal instead of a liability.";
const url = "https://www.fluttertonative.pro/articles/flutter-advantage-in-ios-interviews";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "flutter developer ios interview advantage",
    "flutter experience ios job application",
    "flutter to ios career switch tips",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function FlutterAdvantage() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "why-advantage", label: "Why it is an advantage" },
    { id: "how-to-use", label: "How to use it" },
    { id: "signals", label: "Signals interviewers respect" },
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
        name: "Why would Flutter be an advantage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flutter devs often have strong architecture and cross-platform tradeoff experience, which iOS teams value.",
        },
      },
      {
        "@type": "Question",
        name: "How do I present this in interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Translate your decisions into iOS terms and show you understand native constraints.",
        },
      },
      {
        "@type": "Question",
        name: "What is the biggest mistake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Talking about Flutter instead of iOS architecture and memory decisions.",
        },
      },
    ],
  };

  return (
    <ArticleLayout
      title={title}
      description={description}
      updated="Apr 7, 2026"
      readTime="6 min"
      toc={toc}
      jsonLd={jsonLd}
      faqJsonLd={faqJsonLd}
      eyebrow="Positioning"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Flutter experience shows architecture and system thinking.</li>
          <li>You can position it as a senior-strength, not a gap.</li>
          <li>The key is translating your decisions into iOS language.</li>
        </ul>
      </section>

      <section id="why-advantage">
        <h2 className="text-2xl font-bold mb-3">Why Flutter experience is an advantage</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>You have already owned architecture across platforms.</li>
          <li>You understand performance tradeoffs and UI rendering.</li>
          <li>You can communicate cross-team decisions clearly.</li>
        </ul>
      </section>

      <section id="how-to-use">
        <h2 className="text-2xl font-bold mb-3">How to use the advantage in interviews</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
          <li>State the iOS pattern first, then relate Flutter as context.</li>
          <li>Explain tradeoffs like a native engineer (memory, lifecycle, navigation).</li>
          <li>Show you can reason about production constraints.</li>
        </ol>
      </section>

      <section id="signals">
        <h2 className="text-2xl font-bold mb-3">Signals interviewers respect</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Clear architecture decisions (MVVM, Coordinators).</li>
          <li>Memory awareness (ARC, retain cycles).</li>
          <li>Concurrency knowledge (async/await, MainActor).</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook teaches you how to translate Flutter experience into senior iOS answers.
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
            <h3 className="font-semibold">Is Flutter seen as a negative?</h3>
            <p className="text-muted-foreground">Not if you translate it into iOS terms.</p>
          </div>
          <div>
            <h3 className="font-semibold">What should I avoid saying?</h3>
            <p className="text-muted-foreground">Avoid sounding like you only know Flutter.</p>
          </div>
          <div>
            <h3 className="font-semibold">What should I emphasize?</h3>
            <p className="text-muted-foreground">Architecture, memory and decision-making.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
