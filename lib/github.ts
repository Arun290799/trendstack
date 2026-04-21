import { calculateScore } from "./ranking";
import { extractGitHubKeywords } from "./keyword-extraction";

interface GitHubRepoItem {
	id: number;
	full_name: string;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	description: string | null;
	created_at: string;
	topics: string[];
	language: string | null;
}

interface GitHubSearchResponse {
	items: GitHubRepoItem[];
}

export interface GithubTrend {
	id: string;
	title: string;
	url: string;
	stars: number;
	forks: number;
	score: number;
	description: string;
	category: string;
	createdAt: string;
	keywords: string[];
}

export async function fetchGithubTrends(): Promise<GithubTrend[]> {
	try {
		// Fetch repos created in the last 7 days sorted by stars
		const date = new Date();
		date.setDate(date.getDate() - 7);
		const dateString = date.toISOString().split("T")[0];

		const query = `created:>${dateString} sort:stars-desc`;
		const response = await fetch(
			`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=30`,
			{
				headers: {
					Accept: "application/vnd.github.v3+json",
					...(process.env.GITHUB_TOKEN && {
						Authorization: `token ${process.env.GITHUB_TOKEN}`,
					}),
				},
			},
		);

		if (!response.ok) {
			console.error(`GitHub API error: ${response.statusText}`);
			return [];
		}

		const data: GitHubSearchResponse = await response.json();
		const items = data.items || [];

		return items.map((item: GitHubRepoItem) => {
			const keywords = extractGitHubKeywords(item.topics || [], item.language || "", item.description || "");

			return {
				id: `gh-${item.id}`,
				title: item.full_name, // Include full name for handle/title display
				url: item.html_url,
				stars: item.stargazers_count,
				forks: item.forks_count,
				score: calculateScore(item.stargazers_count, item.forks_count, 0),
				description: item.description || "",
				category: "dev",
				createdAt: item.created_at,
				keywords,
			};
		});
	} catch (error) {
		console.error("Failed to fetch GitHub trends:", error);
		return [];
	}
}
