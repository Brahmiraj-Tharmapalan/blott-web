import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface MainNewsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNewsCard: React.FC<MainNewsCardProps> = ({
  id,
  title,
  imageUrl,
  imageAlt,
}) => {
  return (
    <Link href={`/news/${id}`} className="block">
      <div className="relative text-white overflow-hidden group cursor-pointer transition-transform h-[450px]">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 60vw, (max-width: 800px) 20vw, 30vw"
          />

          {/* Purple gradient overlay with text content */}
          <div className="absolute bottom-0 left-0 right-0 bg-purple-gradient p-6 sm:p-8">
            <h2 className="font-helvetica-now font-bold text-white text-[calc(0.75rem+1vw)]">
              {title}
            </h2>
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
      </div>
    </Link>
  );
};

export default MainNewsCard;
