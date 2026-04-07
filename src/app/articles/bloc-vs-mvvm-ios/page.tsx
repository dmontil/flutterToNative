import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "Flutter BLoC vs iOS MVVM: A Practical Comparison for Engineers Who Know Both";
const description =
  "A direct architectural translation with tradeoffs, decision points, and interview framing.";
const url = "https://www.fluttertonative.pro/articles/bloc-vs-mvvm-ios";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "bloc vs mvvm ios",
    "flutter architecture ios equivalent",
    "flutter state management vs ios mvvm",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function BlocVsMvvmIos() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "table", label: "Comparison table" },
    { id: "tradeoffs", label: "Tradeoffs" },
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
        name: "Is MVVM the default pattern in iOS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. MVVM aligns with SwiftUI data binding and is the most common pattern in iOS teams.",
        },
      },
      {
        "@type": "Question",
        name: "Is BLoC wrong for iOS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not wrong, but MVVM fits the iOS ecosystem better and is what interviewers expect.",
        },
      },
      {
        "@type": "Question",
        name: "What should I say in interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Explain why MVVM leverages SwiftUI binding, reduces boilerplate, and supports testability.",
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
      eyebrow="Comparison"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>BLoC is stream-driven; MVVM is binding-driven.</li>
          <li>MVVM fits SwiftUI and is the default interview expectation.</li>
          <li>The key is explaining tradeoffs, not just naming patterns.</li>
        </ul>
      </section>

      <section id="table">
        <h2 className="text-2xl font-bold mb-3">BLoC vs MVVM comparison table</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left p-3">Flutter BLoC</th>
                <th className="text-left p-3">iOS MVVM</th>
                <th className="text-left p-3">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3">Stream-based state</td>
                <td className="p-3">Observable binding</td>
                <td className="p-3">SwiftUI expects binding by design</td>
              </tr>
              <tr>
                <td className="p-3">Event-driven updates</td>
                <td className="p-3">State-driven UI</td>
                <td className="p-3">Simpler UI update flow</td>
              </tr>
              <tr>
                <td className="p-3">More boilerplate</td>
                <td className="p-3">Less boilerplate</td>
                <td className="p-3">Faster feature iteration</td>
              </tr>
              <tr>
                <td className="p-3">Common in Flutter</td>
                <td className="p-3">Common in iOS</td>
                <td className="p-3">Interviewers expect MVVM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="tradeoffs">
        <h2 className="text-2xl font-bold mb-3">Tradeoffs in plain language</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>BLoC offers strong separation but adds ceremony.</li>
          <li>MVVM reduces layers and fits the SwiftUI runtime.</li>
          <li>For iOS teams, MVVM is the shared vocabulary.</li>
        </ul>
      </section>

      <section id="interview">
        <h2 className="text-2xl font-bold mb-3">Interview framing (how to answer)</h2>
        <div className="rounded-2xl border border-border p-6 text-muted-foreground space-y-2">
          <p>"I use MVVM because SwiftUI data binding makes ViewModels the natural source of truth."</p>
          <p>"It keeps UI reactive, simplifies testing, and avoids heavy stream boilerplate."</p>
        </div>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook includes MVVM patterns, interview answers, and migration examples from Flutter.
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
            <h3 className="font-semibold">Do iOS teams use BLoC?</h3>
            <p className="text-muted-foreground">Rarely. MVVM is far more common in iOS.</p>
          </div>
          <div>
            <h3 className="font-semibold">Is MVVM always better?</h3>
            <p className="text-muted-foreground">Not always, but it is the expected pattern for SwiftUI apps.</p>
          </div>
          <div>
            <h3 className="font-semibold">What should I emphasize in interviews?</h3>
            <p className="text-muted-foreground">Why MVVM fits SwiftUI and improves testability.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
