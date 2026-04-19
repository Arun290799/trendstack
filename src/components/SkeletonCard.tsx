export function SkeletonCard() {
  return (
    <div className="flex flex-col p-5 bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm animate-pulse">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="h-6 bg-black/5 dark:bg-white/10 rounded w-2/3"></div>
        <div className="h-5 bg-black/5 dark:bg-white/10 rounded w-16 shrink-0"></div>
      </div>
      
      <div className="space-y-2 mb-4 mt-2">
        <div className="h-4 bg-black/5 dark:bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-black/5 dark:bg-white/10 rounded w-4/5"></div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]/50">
        <div className="flex gap-4">
          <div className="h-4 bg-black/5 dark:bg-white/10 rounded w-12"></div>
          <div className="h-4 bg-black/5 dark:bg-white/10 rounded w-12"></div>
        </div>
        <div className="h-4 bg-black/5 dark:bg-white/10 rounded w-4"></div>
      </div>
    </div>
  );
}
