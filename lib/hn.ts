import { calculateScore } from "./ranking";
import { extractHNKeywords } from "./keyword-extraction";

export interface HNTrend {
	id: string;
	title: string;
	url: string;
	comments: number;
	score: number;
	category: string;
	createdAt: number;
	upvotes: number;
	keywords: string[];
}

export async function fetchHNTrends(): Promise<HNTrend[]> {
	try {
		const topStoriesRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
		if (!topStoriesRes.ok) {
			console.error("Failed to fetch HN top stories");
			return [];
		}

		const storyIds: number[] = await topStoriesRes.json();
		const top15Ids = storyIds.slice(0, 30);

		const stories = await Promise.all(
			top15Ids.map(async (id) => {
				const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
				return storyRes.json();
			}),
		);

		return stories
			.filter((story) => story && story.type === "story" && story.url)
			.map((story) => {
				const comments = story.descendants || 0;
				// HN has its own score (upvotes), let's map HN upvotes to "stars" in ranking logic
				const stars = story.score || 0;

				const keywords = extractHNKeywords(story.title || "", story.tags || [], story.url || "");

				return {
					id: `hn-${story.id}`,
					title: story.title,
					url: story.url,
					comments,
					score: calculateScore(stars, 0, comments),
					category: "dev", // Default to dev, AI can be inferred later if needed
					createdAt: story.time || 0,
					upvotes: stars,
					keywords,
				};
			});
	} catch (error) {
		console.error("Failed to fetch HN trends:", error);
		return [];
	}
}
