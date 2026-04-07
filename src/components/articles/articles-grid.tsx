"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type ArticlesGridProps = {
  articles: ArticleMeta[];
};

export function ArticlesGrid({ articles }: ArticlesGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((article) =>
      [article.title, article.description, article.tag].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [articles, query]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">All articles</h2>
          <p className="text-sm text-muted-foreground">
            Search by topic, keyword or format.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <label className="sr-only" htmlFor="article-search">Search articles</label>
          <input
            id="article-search"
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          No articles match your search.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                <span className="rounded-full border border-border px-2 py-0.5">{article.tag}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground">{article.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
