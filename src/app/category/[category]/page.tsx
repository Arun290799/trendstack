import { Metadata } from "next";
import { TrendCard } from "@/components/TrendCard";
import { getTrendsByCategory } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
	params: {
		category: string;
	};
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { category } = await params;
	console.log("category", category);

	const categoryTitles: Record<string, string> = {
		"ai-tools": "AI Tools",
		"dev-tools": "Dev Tools",
		ai: "AI Tools",
		dev: "Dev Tools",
	};

	const title = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);

	return {
		title: `${title} - TrendStack`,
		description: `Discover the latest and most popular ${title.toLowerCase()}, frameworks, and projects. Stay updated with cutting-edge innovations.`,
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;
	console.log("category", category);

	// Map URL-friendly category names to database category values
	const categoryMap: Record<string, string> = {
		"ai-tools": "ai",
		"dev-tools": "dev",
		ai: "ai",
		dev: "dev",
	};

	const dbCategory = categoryMap[category];

	if (!dbCategory) {
		notFound();
	}

	const trends = await getTrendsByCategory(dbCategory, 30);

	const categoryTitles: Record<string, string> = {
		"ai-tools": "AI Tools",
		"dev-tools": "Dev Tools",
		ai: "AI Tools",
		dev: "Dev Tools",
	};

	const title = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);
	const description =
		dbCategory === "ai"
			? `Discover the latest and most popular AI tools, frameworks, and projects. Stay updated with cutting-edge artificial intelligence innovations.`
			: `Explore essential developer tools, libraries, and frameworks. Find the best tools to boost your productivity and streamline your development workflow.`;

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px] animate-in fade-in duration-500">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">{title}</h1>
				<p className="text-[var(--muted-foreground)] text-lg">{description}</p>
			</div>

			{trends.length === 0 ? (
				<div className="text-center py-20 text-[var(--muted)]">
					<p>No {title.toLowerCase()} found. Please check back later.</p>
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
