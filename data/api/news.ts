import { fetchNews, NewsResponse } from '../news';
export async function getInitialNews(): Promise<NewsResponse> {
  try {
    return await fetchNews(7, 0);
  } catch (error) {
    console.error('Error fetching initial news:', error);
    return {
      articles: [],
      total: 0,
      hasMore: false,
    };
  }
}
