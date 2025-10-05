"use client";

import { useState, useTransition } from "react";
import NewsCard from "./NewsCard";
import { loadMoreNews } from "@/app/actions/news";

export type ClientNewsArticle = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
};

export type ClientNewsResponse = {
  articles: ClientNewsArticle[];
  total: number;
  hasMore: boolean;
  error?: string;
};

interface LoadMoreNewsProps {
  readonly initialOffset: number;
  readonly initialHasMore?: boolean;
  readonly pageSize?: number;
}

function mergeArticles(
  prev: ClientNewsArticle[],
  incoming: ClientNewsArticle[],
): ClientNewsArticle[] {
  const seen = new Set(prev.map((p) => p.id));
  const deduped: ClientNewsArticle[] = [];
  for (const a of incoming) {
    if (!seen.has(a.id)) deduped.push(a);
  }
  return [...prev, ...deduped];
}

export default function LoadMoreNews({ initialOffset, initialHasMore = true, pageSize = 4 }: Readonly<LoadMoreNewsProps>) {
  const [items, setItems] = useState<ClientNewsArticle[]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const applyLoadedData = (data: ClientNewsResponse) => {
    setItems((prev) => mergeArticles(prev, data.articles));
    setOffset((prev) => prev + pageSize);
    setHasMore(data.hasMore);
  };

  const performLoad = async () => {
    try {
      setError(null);
      const data = await loadMoreNews(pageSize, offset);
      applyLoadedData(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load more");
    }
  };

  const loadMore = () => {
    if (!hasMore || isPending) return;
    startTransition(performLoad);
  };

  if (!hasMore && items.length === 0) {
    return null;
  }
  return (
    <div className="mt-8 sm:mt-12">
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {items.map((article) => (
            <div key={article.id} className="col-span-1">
              <NewsCard
                id={article.id}
                title={article.title}
                imageUrl={article.imageUrl}
                imageAlt={article.imageAlt}
              />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm mb-4">{error}</div>
      )}

      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading..." : `Load more`}
          </button>
        </div>
      )}
    </div>
  );
}

