import { Metadata } from "next";
import { TrendCard } from "@/components/TrendCard";
import { getTrendsFromToday } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Trending Today - TrendStack",
	description:
		"Discover the hottest trending tools and projects today. Stay updated with the latest developments in AI, development tools, and tech innovations.",
};

export default async function TrendingToday() {
	const trends = await getTrendsFromToday(30);

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px] animate-in fade-in duration-500">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">Trending Today</h1>
				<p className="text-[var(--muted-foreground)] text-lg">
					Discover the hottest tools and projects trending today in the developer community.
				</p>
			</div>

			{trends.length === 0 ? (
				<div className="text-center py-20 text-[var(--muted)]">
					<p>No trends found for today. Please check back later.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{trends.map((trend) => (
						<TrendCard
							key={trend.id}
							id={trend.id}
							title={trend.title}
							summary={trend.summary || "No summary available."}
							source={trend.source as "github" | "hn" | "ai"}
							stars={trend.stars}
							comments={trend.comments}
							url={trend.url}
						/>
					))}
				</div>
			)}
		</div>
	);
}
