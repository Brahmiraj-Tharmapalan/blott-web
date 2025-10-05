export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-10 py-8">
        <div className="inline-flex items-center gap-2 text-white/50 mb-8">
          <div className="h-5 w-5 rounded-full bg-white/10" />
          <div className="h-4 w-32 bg-white/10 rounded" />
        </div>
        <article className="max-w-4xl mx-auto animate-pulse">
          <div className="mb-8">
            <div className="w-full h-[400px] sm:h-[500px] bg-white/10 rounded-lg" />
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <span className="text-white/30">•</span>
            <div className="h-4 w-28 bg-white/10 rounded" />
          </div>
          <div className="space-y-3 mb-6">
            <div className="h-8 w-3/4 bg-white/10 rounded" />
            <div className="h-8 w-2/3 bg-white/10 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-11/12 bg-white/10 rounded" />
            <div className="h-4 w-10/12 bg-white/10 rounded" />
          </div>
          <div className="mt-8">
            <div className="h-10 w-40 bg-white/10 rounded-lg" />
          </div>
        </article>
      </div>
    </div>
  );
}
