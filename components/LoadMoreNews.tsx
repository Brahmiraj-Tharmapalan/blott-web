"use client";

import { useState, useTransition } from "react";
import NewsCard from "./NewsCard";

// Keep a client-safe type (do not import server-only modules)
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
  initialOffset: number; // how many were rendered on the server already
  initialHasMore?: boolean; // whether there are more after initial SSR
  pageSize?: number; // how many to fetch per click
}

export default function LoadMoreNews({ initialOffset, initialHasMore = true, pageSize = 4 }: LoadMoreNewsProps) {
  const [items, setItems] = useState<ClientNewsArticle[]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const loadMore = () => {
    if (!hasMore || isPending) return;
    startTransition(async () => {
      try {
        setError(null);
        const res = await fetch(`/api/news?limit=${pageSize}&offset=${offset}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ClientNewsResponse = await res.json();
        setItems(prev => [...prev, ...data.articles]);
        setOffset(prev => prev + pageSize);
        setHasMore(data.hasMore);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load more");
      }
    });
  };

  if (!hasMore && items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 sm:mt-12">
      {/* Newly loaded items grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {items.map((article) => (
            <div key={article.id} className="col-span-1">
              <NewsCard
                id={article.id}
                title={article.title}
                imageUrl={article.imageUrl}
                imageAlt={article.imageAlt}
                summary={article.summary}
              />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-red-400 text-sm mb-4">{error}</div>
      )}

      {/* Load more button */}
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
