import { fetchNews } from '@/data/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  // Fetch all news to find the specific article
  const newsData = await fetchNews(100, 0); // Fetch more articles to find the specific one
  const article = newsData.articles.find(article => article.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-10 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to News
        </Link>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Article Image */}
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Article Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <time dateTime={article.publishedDate}>
              {article.publishedDate}
            </time>
          </div>

          {/* Article Title */}
          <h1 className="font-helvetica-now text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          {/* Article Summary */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/90 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Read Full Article Button */}
          <div className="mt-8">
            <a
              href={article.readArticleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Read Full Article
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
