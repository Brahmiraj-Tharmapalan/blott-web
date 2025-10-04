import MainNewsCard from '@/components/MainNewsCard';
import NewsCard from '@/components/NewsCard';
import { fetchNews, NewsResponse } from '@/data/news';

// Fetch initial news data on the server
async function getInitialNews(): Promise<NewsResponse> {
  try {
    return await fetchNews(7, 0);
  } catch (error) {
    console.error('Error fetching initial news:', error);
    // Return empty data on error
    return {
      articles: [],
      total: 0,
      hasMore: false,
    };
  }
}

export default async function page() {
  // Fetch initial news data on the server
  const initialNews = await getInitialNews();
  const articles = initialNews.articles;

  return (
    <div className="container mx-auto px-4 sm:px-10">
      {/* Header Section */}
      <div className="flex justify-start items-start w-full mb-8 sm:mb-12">
        <div className="flex flex-col text-white w-2/3">
          <div className="font-helvetica-now uppercase text-[calc(1.25rem+2vw)]/8">
            LATEST NEWS
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="font-albra uppercase leading-none text-[calc(0.9rem+2.5vw)]">
              FROM
            </div>
            <div className="flex-1 h-px bg-white/50 hidden sm:block"/>
            <div className="font-helvetica-now uppercase tracking-wide leading-none flex items-center gap-2 whitespace-nowrap">
              <span className="text-[calc(0.95rem+2.5vw)]">THE WORLD</span>
              <sup className="align-super text-[calc(1rem+2vw)]">®</sup>
            </div>
          </div>
        </div>
      </div>

      {/* News Cards Section */}
      <div className="w-full">
        {/* Mobile Layout - Single Column */}
        <div className="block sm:hidden space-y-4">
          {articles.length > 0 && (
            <MainNewsCard
              id={articles[0].id}
              title={articles[0].title}
              imageUrl={articles[0].imageUrl}
              imageAlt={articles[0].imageAlt}
            />
          )}
          {articles.slice(1).map((article) => (
            <NewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              imageAlt={article.imageAlt}
              summary={article.summary}
            />
          ))}
        </div>

        {/* Desktop Layout - Grid with MainNewsCard and NewsCards */}
        <div className="hidden sm:block">
          {/* First Row - MainNewsCard + 2 NewsCards */}
          <div className="grid grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
            {/* Main News Card - First Article (spans 2 columns) */}
            {articles.length > 0 && (
              <div className="col-span-2">
                <MainNewsCard
                  id={articles[0].id}
                  title={articles[0].title}
                  imageUrl={articles[0].imageUrl}
                  imageAlt={articles[0].imageAlt}
                />
              </div>
            )}

            {/* Second Article - Small Card (1 column) */}
            {articles.length > 1 && (
              <div className="col-span-1">
                <NewsCard
                  id={articles[1].id}
                  title={articles[1].title}
                  imageUrl={articles[1].imageUrl}
                  imageAlt={articles[1].imageAlt}
                  summary={articles[1].summary}
                />
              </div>
            )}

            {/* Third Article - Small Card (1 column) */}
            {articles.length > 2 && (
              <div className="col-span-1">
                <NewsCard
                  id={articles[2].id}
                  title={articles[2].title}
                  imageUrl={articles[2].imageUrl}
                  imageAlt={articles[2].imageAlt}
                  summary={articles[2].summary}
                />
              </div>
            )}
          </div>

          {/* Second Row - 4 NewsCards */}
          <div className="grid grid-cols-4 gap-4 lg:gap-6">
            {articles.slice(3, 7).map((article) => (
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
        </div>
      </div>
    </div>
  );
}
