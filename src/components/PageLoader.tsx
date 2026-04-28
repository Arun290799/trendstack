export function PageLoader() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="mb-8">
				<div className="h-10 bg-black/5 dark:bg-white/10 rounded w-1/3 mb-4 animate-pulse"></div>
				<div className="h-6 bg-black/5 dark:bg-white/10 rounded w-2/3 animate-pulse"></div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="animate-pulse">
						<div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-5">
							<div className="h-6 bg-black/5 dark:bg-white/10 rounded mb-3"></div>
							<div className="h-4 bg-black/5 dark:bg-white/10 rounded mb-2"></div>
							<div className="h-4 bg-black/5 dark:bg-white/10 rounded w-3/4"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
