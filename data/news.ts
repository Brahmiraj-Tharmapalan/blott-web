 import 'server-only';
 const FINNHUB_API_URL = 'https://finnhub.io/api/v1/news';
 const FINNHUB_TOKEN = process.env.FINNHUB_TOKEN;

interface FinnhubNewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  readArticleUrl: string;
  source: string;
  publishedDate: string;
  summary: string;
  size?: 'small' | 'medium' | 'large';
}

export interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  hasMore: boolean;
}

type FetchOptions = RequestInit & { next?: { revalidate?: number; tags?: string[] } };

export async function fetchNews(
  limit: number = 10,
  offset: number = 0,
  fetchOptions?: FetchOptions
): Promise<NewsResponse> {
  try {
    if (!FINNHUB_TOKEN) {
      throw new Error('Missing FINNHUB_TOKEN environment variable');
    }

    const url = `${FINNHUB_API_URL}?category=general&token=${FINNHUB_TOKEN}`;

    const defaultOptions: FetchOptions = { next: { revalidate: 300 } };
    const mergedOptions: FetchOptions = {
      ...defaultOptions,
      ...fetchOptions,
      next: {
        ...defaultOptions.next,
        ...(fetchOptions?.next ?? {}),
      },
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }

    const data: FinnhubNewsItem[] = await response.json();

    const mappedData: NewsArticle[] = data
      .slice(offset, offset + limit)
      .map((item, index) => ({
        id: item.id.toString(),
        title: item.headline,
        imageUrl: item.image || '/api/placeholder/400/300',
        imageAlt: `${item.source} news article`,
        readArticleUrl: item.url,
        source: item.source,
        publishedDate: new Date(item.datetime * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        summary: item.summary,
        size: (() => {
          if (index === 0) return 'large';
          if (index < 3) return 'small';
          return 'medium';
        })(),
      }));

    return {
      articles: mappedData,
      total: data.length,
      hasMore: offset + limit < data.length,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news data');
  }
}
