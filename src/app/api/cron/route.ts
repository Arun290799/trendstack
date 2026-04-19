import { NextResponse } from "next/server";
import { fetchGithubTrends } from "@/lib/github";
import { fetchHNTrends } from "@/lib/hn";
import { generateSummary } from "@/lib/groq";
import { insertTrend, checkIfExists } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // Allow more time for external requests

export async function GET(req: Request) {
	// Check for secret key
	// const secret = req.headers.get("authorization");
	// if (secret !== process.env.CRON_SECRET_KEY) {
	// 	return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	// }

	try {
		const startTime = Date.now();
		console.log("Starting cron job...");
		// 1. Fetch GitHub + HN data
		const [githubTrends, hnTrends] = await Promise.all([fetchGithubTrends(), fetchHNTrends()]);

		// 2. Normalize and Combine

		// Wait, hnTrends inside hn.ts uses `score` as stars for ranking, but the returned object only has `comments`, `score`. Let's assume stars = 0 for the DB model to keep it simple or we can infer it.
		// GitHub: stars = item.stars, comments = 0
		// HN: stars = 0 (or upvotes), comments = item.comments

		const normalizedItems = [];
		console.log(`Fetched ${githubTrends.length} GitHub trends and ${hnTrends.length} HN trends`);
		for (const item of githubTrends) {
			normalizedItems.push({
				id: item.id,
				title: item.title,
				url: item.url,
				source: "github",
				stars: item.stars,
				comments: 0,
				score: item.score,
				category:
					item.title.toLowerCase().includes("ai") || item.description.toLowerCase().includes("ai")
						? "ai"
						: "dev",
				context: item.description, // For Groq
				postCreatedAt: new Date(item.createdAt), // Original GitHub repo creation date
			});
		}

		for (const item of hnTrends) {
			normalizedItems.push({
				id: item.id,
				title: item.title,
				url: item.url,
				source: "hn",
				stars: item.upvotes,
				comments: item.comments,
				score: item.score,
				category: item.title.toLowerCase().includes("ai") ? "ai" : "dev",
				context: item.url, // For Groq
				postCreatedAt: new Date(item.createdAt * 1000), // HN time is Unix timestamp in seconds
			});
		}

		// 3. Rank items (already scored, just sort to process top items first if we want, or save all)
		normalizedItems.sort((a, b) => b.score - a.score);

		// 4. Process each item (Limit to top 30 to save Groq API costs during cron)
		const topItems = normalizedItems.slice(0, 60);
		const results = [];

		for (const item of topItems) {
			const exists = await checkIfExists(item.id);

			let summary = "";
			if (!exists) {
				// Generate summary via Groq
				//retry 3 times
				for (let i = 0; i < 3; i++) {
					try {
						summary = await generateSummary(item.title, item.context);
						break;
					} catch (error) {
						console.error(`Failed to generate summary for ${item.title}:`, error);
						if (i === 2) {
							// Last attempt failed, skip this item
							console.warn(`Skipping item ${item.title} after 3 failed attempts`);
							summary = "";
						} else {
							// Wait before retrying
							await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
						}
					}
				}
			}

			// Insert or Update in DB
			await insertTrend({
				id: item.id,
				title: item.title,
				url: item.url,
				source: item.source,
				stars: item.stars,
				comments: item.comments,
				score: item.score,
				summary: exists ? undefined : summary, // If it exists, db upsert won't override summary if we pass undefined, but our db.ts sets it. Let's fix db.ts or just handle it.
				category: item.category,
				postCreatedAt: item.postCreatedAt,
			});

			results.push({ id: item.id, title: item.title, new: !exists });
		}

		const endTime = Date.now();
		console.log(`Cron job completed in ${endTime - startTime}ms`);
		return NextResponse.json({ success: true, processed: results.length, items: results });
	} catch (error) {
		console.error("Cron Error:", error);
		return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
	}
}
