import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About - TrendStack",
	description:
		"Learn about TrendStack - your daily source for trending projects, tools, and innovations from GitHub, Hacker News, and AI communities.",
	openGraph: {
		title: "About TrendStack",
		description:
			"Discover what powers TrendStack and how we help you stay updated with the latest trends in technology.",
		type: "website",
	},
};

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="prose prose-gray dark:prose-invert max-w-none">
				<h1 className="text-3xl font-bold mb-6">About TrendStack</h1>

				<div className="space-y-6">
					<section>
						<h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
						<p className="text-lg leading-relaxed">
							TrendStack is your comprehensive platform for discovering the latest and most popular trends
							in technology. We aggregate trending content from multiple sources including GitHub
							repositories, Hacker News discussions, and AI-powered innovations to provide you with a
							single, unified view of what's happening in the tech world.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
						<div className="space-y-4">
							<div>
								<h3 className="text-xl font-medium mb-2">🚀 Real-time Trending Data</h3>
								<p>
									Our platform continuously monitors and updates trending content every 3 hours,
									ensuring you always have access to the most current and relevant information.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-medium mb-2">📊 Multi-Source Aggregation</h3>
								<p>
									We combine data from GitHub (most starred repositories), Hacker News (top stories),
									and AI communities to give you a comprehensive view of technology trends across
									different platforms.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-medium mb-2">🎯 Smart Categorization</h3>
								<p>
									Trends are automatically categorized into AI Tools and Developer Tools, making it
									easy to find content relevant to your interests and expertise.
								</p>
							</div>

							<div>
								<h3 className="text-xl font-medium mb-2">⚡ Performance Metrics</h3>
								<p>
									Each trend includes engagement metrics like stars, likes, and comments, helping you
									quickly assess the popularity and community interest in each project or discussion.
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-3">Contact & Feedback</h2>
						<p>
							We're constantly improving TrendStack and value your feedback. If you have suggestions,
							feature requests, or encounter any issues, please don't hesitate to reach out through our
							GitHub repository or community channels.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
