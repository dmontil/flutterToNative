import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "I'm a Flutter Developer with 5 Years of Experience — Should I Learn SwiftUI or UIKit?";
const description =
  "A decision guide for senior Flutter engineers choosing the right iOS learning path in 2025.";
const url = "https://www.fluttertonative.pro/articles/swiftui-vs-uikit-for-flutter-devs";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "swiftui vs uikit flutter developer",
    "flutter developer learn swiftui or uikit",
    "should flutter dev learn swiftui 2025",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function SwiftUiVsUIKit() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "decision", label: "Decision framework" },
    { id: "when-swiftui", label: "When to choose SwiftUI" },
    { id: "when-uikit", label: "When to learn UIKit" },
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
        name: "Is SwiftUI enough for interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most modern teams, yes. Some UIKit familiarity helps with legacy codebases.",
        },
      },
      {
        "@type": "Question",
        name: "Should I start with UIKit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with SwiftUI to align with current interview expectations, then add UIKit basics.",
        },
      },
      {
        "@type": "Question",
        name: "Which path is faster for Flutter devs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SwiftUI is closer to Flutter's declarative model, so it is faster to learn first.",
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
      eyebrow="Decision"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>SwiftUI is the primary path for modern iOS teams.</li>
          <li>UIKit is still relevant for legacy code and some advanced UI.</li>
          <li>Flutter devs learn SwiftUI faster due to declarative patterns.</li>
        </ul>
      </section>

      <section id="decision">
        <h2 className="text-2xl font-bold mb-3">Decision framework</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>If your target roles are modern teams, start with SwiftUI.</li>
          <li>If the company is legacy-heavy, add UIKit basics after SwiftUI.</li>
          <li>For interviews, SwiftUI + architecture is the core filter.</li>
        </ul>
      </section>

      <section id="when-swiftui">
        <h2 className="text-2xl font-bold mb-3">When to choose SwiftUI</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>You want fastest translation from Flutter.</li>
          <li>The team targets iOS 15+ and modern APIs.</li>
          <li>Interviews emphasize SwiftUI and MVVM.</li>
        </ul>
      </section>

      <section id="when-uikit">
        <h2 className="text-2xl font-bold mb-3">When to learn UIKit</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>The company has a large UIKit codebase.</li>
          <li>You need advanced UI control or custom components.</li>
          <li>Role explicitly lists UIKit as a requirement.</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook shows a SwiftUI-first path with just enough UIKit to pass interviews.
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
            <h3 className="font-semibold">Is SwiftUI enough to get hired?</h3>
            <p className="text-muted-foreground">For many teams, yes. UIKit is a bonus.</p>
          </div>
          <div>
            <h3 className="font-semibold">Will UIKit still matter long-term?</h3>
            <p className="text-muted-foreground">It will remain in legacy systems, but SwiftUI is the future.</p>
          </div>
          <div>
            <h3 className="font-semibold">What should I learn first?</h3>
            <p className="text-muted-foreground">SwiftUI, MVVM, ARC, and navigation.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
