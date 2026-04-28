import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPageConfig } from "@/lib/pages-config";
import { TrendCard } from "@/components/TrendCard";
import { PageLoader } from "@/components/PageLoader";
import { applyScoring } from "@/lib/scoring";

interface Trend {
	id: string;
	title: string;
	url: string;
	stars: number;
	comments: number;
	source: string;
	summary?: string;
}

interface PageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const config = getPageConfig(slug);

	if (!config) {
		return {
			title: "Page Not Found - TrendStack",
			description: "The requested page could not be found.",
		};
	}

	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	return {
		title: config.title,
		description: config.description,
		keywords: config.keywords || ["AI tools", "developer tools", "trending tools", "software development"],
		openGraph: {
			title: config.title,
			description: config.description,
			url: `${baseUrl}/list/${slug}`,
			type: "website",
			siteName: "TrendStack",
		},
		twitter: {
			card: "summary_large_image",
			title: config.title,
			description: config.description,
		},
	};
}

async function fetchTrends(config: any): Promise<Trend[]> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
		const params = new URLSearchParams();

		params.append("category", config.category);

		if (config.filter) {
			params.append("filter", config.filter);
		}

		if (config.dateFilter) {
			params.append("dateFilter", config.dateFilter);
		}

		if (config.sort) {
			params.append("sort", config.sort);
		}

		// Fetch more items if we have keywords for scoring
		const fetchLimit = config.keywords && config.keywords.length > 0 ? 100 : config.limit || 50;
		params.append("limit", fetchLimit.toString());

		const response = await fetch(`${baseUrl}/api/trends?${params.toString()}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			return [];
		}

		const data = await response.json();
		let trends = Array.isArray(data) ? data : [];

		// Apply context-aware scoring if keywords are present
		if (config.keywords && config.keywords.length > 0 && trends.length > 0) {
			trends = applyScoring(trends, {
				keywords: config.keywords,
				keywordWeight: config.keywordWeight || 50,
			});
			// Apply limit after scoring
			trends = trends.slice(0, config.limit || 50);
		}

		return trends;
	} catch (error) {
		console.error("Error fetching trends:", error);
		return [];
	}
}

async function DynamicPageContent({ slug }: { slug: string }) {
	const config = getPageConfig(slug);

	// 404 - Slug not found
	if (!config) {
		return (
			<div className="container mx-auto px-4 py-16 max-w-[1100px]">
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">The requested page could not be found.</p>
					<Link
						href="/"
						className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
					>
						Return Home
					</Link>
				</div>
			</div>
		);
	}

	const trends = await fetchTrends(config);

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="max-w-6xl mx-auto">
				{/* Internal Links */}
				<nav className="mb-8 flex gap-4 flex-wrap text-sm">
					<Link
						href="/trending-today"
						className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					>
						Trending Today
					</Link>
					<span className="text-gray-400">|</span>
					<Link
						href="/category/ai"
						className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					>
						AI Tools
					</Link>
					<span className="text-gray-400">|</span>
					<Link
						href="/category/dev"
						className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					>
						Dev Tools
					</Link>
				</nav>

				{/* H1 Title */}
				<h1 className="text-4xl font-bold mb-6">{config.title}</h1>

				{/* Intro Paragraph */}
				<p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{config.intro}</p>

				{/* Tools List */}
				<div className="mb-8">
					{trends.length === 0 ? (
						<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
							<p className="text-yellow-800 dark:text-yellow-200">
								No tools available at the moment. Please check back later.
							</p>
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

				{/* Outro Paragraph */}
				<p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{config.outro}</p>

				{/* Additional Internal Links */}
				<div className="border-t border-gray-200 dark:border-gray-700 pt-8">
					<h2 className="text-2xl font-semibold mb-4">Explore More</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Link
							href="/browse"
							className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							<h3 className="font-medium mb-1">Browse All Pages</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Explore all curated pages and collections
							</p>
						</Link>
						<Link
							href="/category/ai"
							className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							<h3 className="font-medium mb-1">Trending AI Tools</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">AI-powered development tools</p>
						</Link>
						<Link
							href="/category/dev"
							className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							<h3 className="font-medium mb-1">Trending Dev Tools</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">Essential developer resources</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default async function DynamicPage({ params }: PageProps) {
	const { slug } = await params;
	return (
		<Suspense fallback={<PageLoader />}>
			<DynamicPageContent slug={slug} />
		</Suspense>
	);
}
