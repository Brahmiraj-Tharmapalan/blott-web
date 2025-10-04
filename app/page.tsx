import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 sm:px-10">
    <div className="flex justify-start items-start w-full">
      <div className="flex flex-col text-white w-2/3">
        <div className="font-helvetica-now uppercase text-[calc(1.25rem+2.5vw)] animate-fade animate-once">
          LATEST NEWS
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="font-albra uppercase leading-none text-[calc(0.9rem+2vw)]">
            FROM
          </div>
          <div className="flex-1 h-px bg-white/50 hidden sm:block"/>
          <div className="font-helvetica-now uppercase tracking-wide leading-none flex items-center gap-2 whitespace-nowrap">
            <span className="text-[calc(0.95rem+2vw)]">THE WORLD</span>
            <sup className="align-super text-[calc(1rem+2vw)]">®</sup>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
