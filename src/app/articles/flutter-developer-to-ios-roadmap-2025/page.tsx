import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "Flutter Developer to iOS Engineer: The Complete Transition Roadmap for 2025";
const description =
  "A senior-focused roadmap that translates Flutter experience into iOS-ready skills, interviews, and architecture.";
const url = "https://www.fluttertonative.pro/articles/flutter-developer-to-ios-roadmap-2025";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "flutter developer to ios",
    "flutter to native ios",
    "how to become ios developer from flutter",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function FlutterToIosRoadmap() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "roadmap", label: "The 4-step roadmap" },
    { id: "learn-first", label: "What to learn first" },
    { id: "translation", label: "Flutter to iOS translation" },
    { id: "mistakes", label: "Common mistakes" },
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
        name: "Do I need a full iOS bootcamp to switch from Flutter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A targeted roadmap that translates Flutter experience into iOS concepts is faster and more interview-relevant than a general bootcamp.",
        },
      },
      {
        "@type": "Question",
        name: "What matters most for senior iOS interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Architecture (MVVM, navigation), memory (ARC), concurrency (async/await), and SwiftUI fundamentals.",
        },
      },
      {
        "@type": "Question",
        name: "Is UIKit required in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SwiftUI is now the default for many teams, but some UIKit familiarity helps. It is not the main filter for senior interviews.",
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
      eyebrow="Roadmap"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>The fastest path is translation, not relearning from scratch.</li>
          <li>The senior filter focuses on architecture, ARC, and concurrency.</li>
          <li>SwiftUI is the core UI skill; UIKit is supportive, not central.</li>
          <li>Interview framing is as important as technical knowledge.</li>
        </ul>
      </section>

      <section id="roadmap">
        <h2 className="text-2xl font-bold mb-3">The 4-step transition roadmap</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
          <li>
            <strong>Rewire your mental model.</strong> Flutter controls UI and lifecycle. iOS runs on a real OS
            lifecycle with explicit state ownership.
          </li>
          <li>
            <strong>Learn the senior interview core.</strong> Swift, SwiftUI, ARC, async/await, MVVM and navigation are
            the highest ROI skills.
          </li>
          <li>
            <strong>Translate architecture.</strong> BLoC to MVVM, Navigator to Coordinators, Provider to DI and
            Environment.
          </li>
          <li>
            <strong>Practice native answers.</strong> Speak in iOS terms and explain tradeoffs like a native engineer.
          </li>
        </ol>
      </section>

      <section id="learn-first">
        <h2 className="text-2xl font-bold mb-3">What to learn first (and what to ignore)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border p-5">
            <h3 className="font-bold mb-2">High priority</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Swift basics + SwiftUI</li>
              <li>ARC and memory management</li>
              <li>Concurrency (async/await)</li>
              <li>MVVM + Observables</li>
              <li>Coordinator-based navigation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <h3 className="font-bold mb-2">Can postpone</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Deep UIKit APIs</li>
              <li>Advanced animations</li>
              <li>Rare system frameworks</li>
              <li>Legacy Objective-C</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="translation">
        <h2 className="text-2xl font-bold mb-3">Flutter to iOS translation (fast map)</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left p-3">Flutter</th>
                <th className="text-left p-3">iOS Native</th>
                <th className="text-left p-3">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3">BLoC / Cubit</td>
                <td className="p-3">MVVM + Observable State</td>
                <td className="p-3">Standard senior pattern in iOS teams</td>
              </tr>
              <tr>
                <td className="p-3">Navigator</td>
                <td className="p-3">Coordinators / NavigationStack</td>
                <td className="p-3">Scales navigation and reduces coupling</td>
              </tr>
              <tr>
                <td className="p-3">Dart GC</td>
                <td className="p-3">ARC</td>
                <td className="p-3">Memory bugs are your responsibility</td>
              </tr>
              <tr>
                <td className="p-3">Isolates</td>
                <td className="p-3">GCD / async-await</td>
                <td className="p-3">Different concurrency model</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="mistakes">
        <h2 className="text-2xl font-bold mb-3">Common mistakes that slow the switch</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Trying to learn everything instead of the interview core.</li>
          <li>Explaining Flutter in interviews instead of iOS decisions.</li>
          <li>Ignoring memory management and lifecycle.</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          If you want the full bridge (roadmap, translations, interview answers), the Playbook gives it to you in a
          structured sequence.
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
            <h3 className="font-semibold">Do I need a full bootcamp?</h3>
            <p className="text-muted-foreground">
              No. A targeted roadmap is faster and aligns with how iOS teams interview seniors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Is UIKit still required?</h3>
            <p className="text-muted-foreground">
              It helps, but SwiftUI and architecture are the main filters.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">What should I prioritize first?</h3>
            <p className="text-muted-foreground">
              Swift, SwiftUI, ARC, async/await and MVVM.
            </p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
