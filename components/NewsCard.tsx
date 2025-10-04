import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface NewsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  summary?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  imageUrl,
  imageAlt,
  summary,
}) => {
  return (
    <Link href={`/news/${id}`} className="group block">
      <div className="group">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <h3 className="font-helvetica-now font-bold text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-tight mb-3 line-clamp-3">
            {title}
          </h3>
          <div className="inline-flex items-center gap-4 text-sm font-medium transition-colors hover:text-white/80">
              <span className="relative pb-2 transition-all duration-300 before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-white before:scale-x-100 group-hover:before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:content-['']">
                Read Article
              </span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white">
                <ArrowUpRight className="h-3 w-3 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
