import type { ReactNode } from "react";
import { ArticleToc } from "@/components/articles/article-toc";

type TocItem = {
  id: string;
  label: string;
};

type ArticleLayoutProps = {
  title: string;
  description: string;
  updated: string;
  readTime: string;
  toc: TocItem[];
  children: ReactNode;
  jsonLd?: object;
  faqJsonLd?: object;
  eyebrow?: string;
};

export function ArticleLayout({
  title,
  description,
  updated,
  readTime,
  toc,
  children,
  jsonLd,
  faqJsonLd,
  eyebrow = "Articles",
}: ArticleLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <section className="relative pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{eyebrow}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{description}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>Updated: {updated}</span>
              <span>•</span>
              <span>Read time: {readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article className="space-y-8">{children}</article>
            <aside className="hidden lg:block">
              <ArticleToc items={toc} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
