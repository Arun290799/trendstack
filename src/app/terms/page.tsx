import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service - TrendStack",
	description: "TrendStack's simple terms of service for using our platform.",
	openGraph: {
		title: "Terms of Service - TrendStack",
		description: "Read TrendStack's terms and conditions.",
		type: "website",
	},
};

export default function TermsPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px]">
			<div className="prose prose-gray dark:prose-invert max-w-none">
				<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

				<div className="space-y-6">
					<section>
						<h2 className="text-2xl font-semibold mb-4">Last Updated</h2>
						<p className="text-gray-600 dark:text-gray-400">November 1, 2024</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Agreement</h2>
						<p>
							By using TrendStack, you agree to these terms. If you don't agree, please don't use our
							service.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">What We Do</h2>
						<p>
							TrendStack displays publicly available information from GitHub, Hacker News, and AI sources.
							We don't create or store original content.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Your Responsibilities</h2>
						<ul className="list-disc pl-6 space-y-2">
							<li>Use the service lawfully</li>
							<li>Don't misuse the platform</li>
							<li>Verify content before using it</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Content</h2>
						<p>
							All content comes from third-party sources. We don't own or control this content and are not
							responsible for its accuracy.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
						<p>
							Our service is provided "as is" without warranties. We don't guarantee uninterrupted service
							or content accuracy.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
						<p>TrendStack is not liable for any damages arising from your use of our service.</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Changes</h2>
						<p>We may update these terms at any time. Continued use means you accept the changes.</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold mb-4">Contact</h2>
						<p>Questions about these terms? Contact us through our GitHub repository.</p>
					</section>
				</div>
			</div>
		</div>
	);
}
