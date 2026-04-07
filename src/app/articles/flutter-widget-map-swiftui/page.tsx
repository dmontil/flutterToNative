import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/articles/article-layout";

const title = "Widget Map: Every Flutter Widget and Its SwiftUI Equivalent (Visual Guide)";
const description =
  "A practical mapping table to translate Flutter UI thinking into SwiftUI components.";
const url = "https://www.fluttertonative.pro/articles/flutter-widget-map-swiftui";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "flutter widget equivalent swiftui",
    "flutter to swiftui cheatsheet",
    "container flutter swiftui equivalent",
  ],
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article" },
  twitter: { title, description },
};

export default function WidgetMapSwiftUi() {
  const toc = [
    { id: "quick-summary", label: "Quick summary" },
    { id: "table", label: "Widget map table" },
    { id: "tips", label: "Translation tips" },
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
        name: "Is there a SwiftUI equivalent for every Flutter widget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most Flutter widgets have a SwiftUI equivalent, but some require combining views or modifiers.",
        },
      },
      {
        "@type": "Question",
        name: "Why is this useful for interviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It helps you explain UI in native terms instead of Flutter terms.",
        },
      },
      {
        "@type": "Question",
        name: "Where is the full interactive map?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can access the full map inside the iOS Career Track.",
        },
      },
    ],
  };

  const rows = [
    ["Container", "ZStack + padding + background", "Use modifiers instead of a single widget"],
    ["Row", "HStack", "Horizontal layout"],
    ["Column", "VStack", "Vertical layout"],
    ["Stack", "ZStack", "Layered layout"],
    ["ListView", "List / ScrollView", "Use List for cells, ScrollView for custom"],
    ["GestureDetector", "onTapGesture / gestures", "Modifiers for interactions"],
    ["Padding", "padding()", "Modifier-based spacing"],
    ["Center", "Spacer + frame alignment", "Use alignment with frames"],
    ["Expanded", "frame(maxWidth: .infinity)", "Fill available space"],
    ["SafeArea", "SafeAreaInset / ignoresSafeArea", "Safe area management"],
  ];

  return (
    <ArticleLayout
      title={title}
      description={description}
      updated="Apr 7, 2026"
      readTime="8 min"
      toc={toc}
      jsonLd={jsonLd}
      faqJsonLd={faqJsonLd}
      eyebrow="Reference"
    >
      <section id="quick-summary" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Quick summary (for AI and humans)</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Most Flutter widgets map cleanly to SwiftUI views or modifiers.</li>
          <li>SwiftUI composes UI via modifiers rather than single widget wrappers.</li>
          <li>This table helps you describe UI in iOS-native terms.</li>
        </ul>
      </section>

      <section id="table">
        <h2 className="text-2xl font-bold mb-3">Flutter widget map (SwiftUI equivalents)</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left p-3">Flutter</th>
                <th className="text-left p-3">SwiftUI</th>
                <th className="text-left p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map(([flutter, swiftui, notes]) => (
                <tr key={flutter}>
                  <td className="p-3">{flutter}</td>
                  <td className="p-3">{swiftui}</td>
                  <td className="p-3">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="tips">
        <h2 className="text-2xl font-bold mb-3">Translation tips</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Think in modifiers and composition, not wrapper widgets.</li>
          <li>Prefer VStack/HStack/ZStack over nested Container patterns.</li>
          <li>Use SwiftUI previews for fast iteration like Flutter hot reload.</li>
        </ul>
      </section>

      <section id="cta" className="rounded-2xl border border-border bg-secondary/20 p-6">
        <h2 className="text-xl font-bold mb-3">Next step</h2>
        <p className="text-muted-foreground mb-4">
          The Playbook includes the full interactive Widget Map and deeper UI translations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/ios"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            See iOS Career Track
          </Link>
          <Link
            href="/widget-map"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2"
          >
            See the widget map
          </Link>
        </div>
      </section>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-3">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Is this a complete mapping?</h3>
            <p className="text-muted-foreground">It covers the most-used widgets and patterns.</p>
          </div>
          <div>
            <h3 className="font-semibold">Why not list every widget?</h3>
            <p className="text-muted-foreground">Some widgets require composition rather than direct equivalents.</p>
          </div>
          <div>
            <h3 className="font-semibold">Where is the full guide?</h3>
            <p className="text-muted-foreground">Inside the iOS Career Track.</p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
