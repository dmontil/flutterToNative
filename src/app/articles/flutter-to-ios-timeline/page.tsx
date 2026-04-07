import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "How Long Does It Take a Flutter Developer to Get a Senior iOS Job? (Real Numbers)";
const description =
  "A realistic timeline with milestones, weekly plan, and what recruiters actually evaluate.";
const url = "https://www.fluttertonative.pro/articles/flutter-to-ios-timeline";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "flutter to ios timeline",
    "flutter developer ios job",
    "how long to learn ios as flutter developer",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function FlutterToIosTimeline() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "timeline", label: "Typical timeline" },
    { id: "milestones", label: "Milestones that matter" },
    { id: "weekly-plan", label: "Weekly plan (8 weeks)" },
    { id: "speed-up", label: "How to speed it up" },
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
        name: "Can I switch in under 3 months?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, if you focus on the interview core and translate your Flutter experience instead of learning everything.",
        },
      },
      {
        "@type": "Question",
        name: "What slows most Flutter developers down?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trying to learn all of UIKit, ignoring ARC, and not practicing interview framing in iOS terms.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest path?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SwiftUI + MVVM + ARC + async/await + navigation. Then practice senior interview answers.",
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
      eyebrow="Timeline"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Most senior Flutter devs can reach iOS interview readiness in 8 to 12 weeks.</li>
          <li>The timeline depends on architecture and interview practice, not UI polish.</li>
          <li>Milestones are what recruiters use to validate your readiness.</li>
        </ul>
      </section>

      <section id="timeline">
        <h2 className="text-2xl font-bold mb-3">Typical timeline (realistic range)</h2>
        <div className="rounded-2xl border border-border p-6 text-muted-foreground space-y-2">
          <p><strong>Fast track:</strong> 6 to 8 weeks with focused learning and interview prep.</p>
          <p><strong>Standard track:</strong> 8 to 12 weeks with steady weekly practice.</p>
          <p><strong>Slow track:</strong> 3 to 6 months if learning is unfocused or broad.</p>
        </div>
      </section>

      <section id="milestones">
        <h2 className="text-2xl font-bold mb-3">Milestones that matter to recruiters</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Can explain MVVM and why it fits SwiftUI.</li>
          <li>Can discuss ARC and avoid retain cycles.</li>
          <li>Can design navigation with Coordinators or NavigationStack.</li>
          <li>Can answer concurrency questions (async/await vs GCD).</li>
        </ul>
      </section>

      <section id="weekly-plan">
        <h2 className="text-2xl font-bold mb-3">8-week plan (high signal)</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
          <li>Week 1: Swift basics + SwiftUI fundamentals.</li>
          <li>Week 2: State management in SwiftUI + MVVM.</li>
          <li>Week 3: ARC, memory and retain cycles.</li>
          <li>Week 4: Concurrency (async/await, tasks, actors).</li>
          <li>Week 5: Navigation patterns and Coordinator architecture.</li>
          <li>Week 6: Build a small feature in SwiftUI + MVVM.</li>
          <li>Week 7: Interview practice (system, architecture, Swift).</li>
          <li>Week 8: Mock interviews and answer refinement.</li>
        </ol>
      </section>

      <section id="speed-up">
        <h2 className="text-2xl font-bold mb-3">How to speed it up</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Only learn interview-critical topics.</li>
          <li>Translate Flutter experience instead of relearning basics.</li>
          <li>Practice answers in iOS language from day one.</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook compresses this timeline by focusing only on what matters for senior iOS interviews.
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
            <h3 className="font-semibold">Can I do it in under 2 months?</h3>
            <p className="text-muted-foreground">Yes, if you are focused and interview-driven.</p>
          </div>
          <div>
            <h3 className="font-semibold">What usually slows people down?</h3>
            <p className="text-muted-foreground">Learning too broadly and avoiding ARC and architecture.</p>
          </div>
          <div>
            <h3 className="font-semibold">What matters most for senior interviews?</h3>
            <p className="text-muted-foreground">Architecture, memory, concurrency and decision framing.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
