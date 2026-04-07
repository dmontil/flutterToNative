import type { Metadata } from "next";
import { ArticlesGrid } from "@/components/articles/articles-grid";
import { ARTICLES } from "@/lib/articles";
import { Navbar } from "@/components/ui/navbar";

const title = "FlutterToNative Articles";
const description =
  "AI-friendly guides and comparisons for senior Flutter engineers moving to iOS and Android native.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.fluttertonative.pro/articles",
  },
  openGraph: {
    title,
    description,
    url: "https://www.fluttertonative.pro/articles",
    type: "website",
  },
  twitter: {
    title,
    description,
  },
};

export default function ArticlesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ARTICLES.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.fluttertonative.pro${article.href}`,
      name: article.title,
    })),
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Articles</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">FlutterToNative Articles</h1>
            <p className="text-lg text-muted-foreground">
              High-signal guides designed for AI summaries and senior Flutter engineers transitioning to native.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <ArticlesGrid articles={ARTICLES} />
        </div>
      </section>
    </main>
  );
}
