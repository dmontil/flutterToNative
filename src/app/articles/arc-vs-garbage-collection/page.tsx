import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "ARC vs Garbage Collection: What Every Flutter Developer Must Know Before an iOS Interview";
const description =
  "A senior-level explanation of ARC vs Dart GC, with interview framing and retain-cycle pitfalls.";
const url = "https://www.fluttertonative.pro/articles/arc-vs-garbage-collection";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "arc memory management swift flutter",
    "ios interview flutter developer memory",
    "arc vs dart garbage collection",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function ArcVsGc() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "differences", label: "Key differences" },
    { id: "retain-cycles", label: "Retain cycles" },
    { id: "interview", label: "Interview framing" },
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
        name: "Why is ARC a common interview topic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because memory issues are a common source of crashes and leaks in iOS. Seniors are expected to understand ARC deeply.",
        },
      },
      {
        "@type": "Question",
        name: "How is ARC different from Dart GC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ARC is deterministic reference counting. Dart GC is automatic and periodic. ARC makes memory your responsibility.",
        },
      },
      {
        "@type": "Question",
        name: "What is a retain cycle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A retain cycle happens when two objects hold strong references to each other, preventing deallocation.",
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
      eyebrow="Interview"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Dart GC is automatic; ARC is explicit and deterministic.</li>
          <li>Retain cycles are the #1 memory risk iOS interviewers test.</li>
          <li>Senior iOS engineers must reason about ownership and lifecycle.</li>
        </ul>
      </section>

      <section id="differences">
        <h2 className="text-2xl font-bold mb-3">Key differences: ARC vs GC</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left p-3">Dart GC (Flutter)</th>
                <th className="text-left p-3">ARC (iOS)</th>
                <th className="text-left p-3">Interview implication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3">Automatic, periodic collection</td>
                <td className="p-3">Reference counting, deterministic</td>
                <td className="p-3">You own memory decisions in iOS</td>
              </tr>
              <tr>
                <td className="p-3">Cycles handled by GC</td>
                <td className="p-3">Cycles cause leaks</td>
                <td className="p-3">Retain cycles are critical to explain</td>
              </tr>
              <tr>
                <td className="p-3">Less explicit ownership</td>
                <td className="p-3">Strong/weak/unowned references</td>
                <td className="p-3">Know when to use weak</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="retain-cycles">
        <h2 className="text-2xl font-bold mb-3">Retain cycles (the senior filter)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Two objects hold strong references to each other.</li>
          <li>Deallocation never happens, memory leaks over time.</li>
          <li>Fix with weak references or unowned in closures.</li>
        </ul>
      </section>

      <section id="interview">
        <h2 className="text-2xl font-bold mb-3">Interview framing (what to say)</h2>
        <div className="rounded-2xl border border-border p-6 text-muted-foreground space-y-2">
          <p>Explain ARC as deterministic ownership management.</p>
          <p>Give a retain-cycle example (closure capturing self).</p>
          <p>Show how you prevent it with <code>weak self</code>.</p>
        </div>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook includes ARC explanations and interview-ready answers tailored for Flutter devs.
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
            <h3 className="font-semibold">Is ARC still important with SwiftUI?</h3>
            <p className="text-muted-foreground">Yes. SwiftUI still runs on ARC under the hood.</p>
          </div>
          <div>
            <h3 className="font-semibold">What is the most common memory bug?</h3>
            <p className="text-muted-foreground">Retain cycles in closures or delegate references.</p>
          </div>
          <div>
            <h3 className="font-semibold">What does "weak self" solve?</h3>
            <p className="text-muted-foreground">It prevents closures from retaining the owner.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
