import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy - TrendStack",
	description: "TrendStack's privacy policy - we don't collect personal user information.",
	openGraph: {
		title: "Privacy Policy - TrendStack",
		description: "Learn about TrendStack's commitment to privacy.",
		type: "website",
	},
};

export default function PrivacyPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="prose prose-gray dark:prose-invert max-w-none">
				<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

				<div className="space-y-6">
					<section>
						<h2 className="text-2xl font-semibold mb-4">Last Updated</h2>
						<p className="text-gray-600 dark:text-gray-400">November 1, 2024</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
						<p>
							TrendStack is committed to protecting your privacy. We don't collect, store, or process any
							personal user information.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">What We Do</h2>
						<p className="mb-4">We aggregate and display publicly available information from:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>GitHub repositories (public stars, forks, descriptions)</li>
							<li>Hacker News stories (public scores, comments, metadata)</li>
							<li>AI-generated content and summaries</li>
						</ul>
						<p>
							This information is already publicly accessible and we do not create or store any private
							user data.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Technical Information</h2>
						<p>
							We may use standard web technologies like cookies and analytics to improve our service. You
							can control these through your browser settings.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Contact</h2>
						<p>
							If you have questions about this privacy policy, please contact us through our GitHub
							repository.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
