"use server";

import { fetchNews, type NewsResponse } from "@/data/news";
export async function loadMoreNews(limit: number, offset: number): Promise<NewsResponse> {
  const data = await fetchNews(limit, offset, { cache: "no-store" });
  return data;
}
