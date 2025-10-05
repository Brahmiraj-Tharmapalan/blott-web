import { fetchNews } from '@/data/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 300;
export async function generateStaticParams() {
  try {
    const data = await fetchNews(12, 0);
    return data.articles.map((a) => ({ id: a.id }));
  } catch {
    return [];
  }
}

export default async function NewsDetailPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const newsData = await fetchNews(100, 0);
  const article = newsData.articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        Back to News
      </Link>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8 relative w-full h-[400px] sm:h-[500px]">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover rounded-lg"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23222222'/%3E%3C/svg%3E"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
          <span className="font-medium">{article.source}</span>
          <span>•</span>
          <time dateTime={article.publishedDate}>{article.publishedDate}</time>
        </div>

        <h1 className="font-helvetica-now text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {article.title}
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-white/90 leading-relaxed">{article.summary}</p>
        </div>

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
  );
}
