import { Metadata } from "next";
import { TrendCard } from "@/components/TrendCard";
import { getTrendsFromWeek } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Trending This Week - TrendStack",
	description:
		"Explore the most popular tools and projects trending this week. Get insights into what's capturing the attention of the developer community.",
};

export default async function TrendingThisWeek() {
	const trends = await getTrendsFromWeek(30);

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px] animate-in fade-in duration-500">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">
					Trending This Week
				</h1>
				<p className="text-[var(--muted-foreground)] text-lg">
					Explore the most popular tools and projects that have been trending throughout this week.
				</p>
			</div>

			{trends.length === 0 ? (
				<div className="text-center py-20 text-[var(--muted)]">
					<p>No trends found for this week. Please check back later.</p>
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
