import Link from "next/link";
import { pagesConfig } from "@/lib/pages-config";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Browse All Pages - TrendStack",
	description:
		"Explore all curated pages on TrendStack. Browse AI tools, developer tools, and trending resources organized by category.",
	keywords: [
		"browse pages",
		"AI tools",
		"developer tools",
		"trending resources",
		"curated collections",
		"software development",
		"open source tools",
	],
	openGraph: {
		title: "Browse All Pages - TrendStack",
		description:
			"Explore all curated pages on TrendStack. Browse AI tools, developer tools, and trending resources organized by category.",
		url: `${process.env.NEXT_PUBLIC_APP_URL}/browse`,
		type: "website",
	},
};

interface PageGroup {
	title: string;
	pages: { slug: string; config: any }[];
}

export default function BrowsePage() {
	// Group pages by category based on the comments in pages-config
	const pageGroups: PageGroup[] = [
		{
			title: "AI Core Tools",
			pages: [
				{ slug: "best-ai-tools-for-developers", config: pagesConfig["best-ai-tools-for-developers"] },
				{ slug: "new-ai-tools-this-week", config: pagesConfig["new-ai-tools-this-week"] },
			],
		},
		{
			title: "AI Special",
			pages: [{ slug: "ai-agents-tools", config: pagesConfig["ai-agents-tools"] }],
		},
		{
			title: "Developer Tools",
			pages: [
				{ slug: "frontend-developer-tools", config: pagesConfig["frontend-developer-tools"] },
				{ slug: "backend-development-tools", config: pagesConfig["backend-development-tools"] },
			],
		},
		{
			title: "Discovery",
			pages: [{ slug: "devops-tools", config: pagesConfig["devops-tools"] }],
		},
	];

	return (
		<div className="container mx-auto px-4 py-12 max-w-5xl">
			<div className="mb-12">
				<h1 className="text-4xl font-bold mb-4">Browse All Pages</h1>
				<p className="text-lg text-muted-foreground">
					Explore all curated pages on TrendStack. Find the best AI tools, developer resources, and trending
					content organized by category.
				</p>
			</div>

			{pageGroups.map((group) => (
				<div key={group.title} className="mb-12">
					<h2 className="text-2xl font-semibold mb-6 text-foreground">{group.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{group.pages.map(({ slug, config }) => (
							<Link
								key={slug}
								href={`/list/${slug}`}
								className="block p-6 border border-border rounded-lg hover:border-primary transition-colors bg-card"
							>
								<h3 className="text-lg font-semibold mb-2 text-foreground">{config.title}</h3>
								<p className="text-sm text-muted-foreground line-clamp-2">{config.description}</p>
							</Link>
						))}
					</div>
				</div>
			))}

			<div className="mt-16 p-6 bg-muted/50 rounded-lg">
				<h3 className="text-lg font-semibold mb-2">Looking for something specific?</h3>
				<p className="text-muted-foreground mb-4">
					Explore our trending pages or use the category filters to find exactly what you need.
				</p>
				<div className="flex gap-4">
					<Link
						href="/trending-today"
						className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
					>
						Trending Today
					</Link>
					<Link
						href="/category/ai"
						className="inline-flex items-center justify-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
					>
						AI Tools
					</Link>
					<Link
						href="/category/dev"
						className="inline-flex items-center justify-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
					>
						Dev Tools
					</Link>
				</div>
			</div>
		</div>
	);
}
