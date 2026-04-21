import { NextResponse } from "next/server";
import {
	getTrends,
	getTrendsFromToday,
	getTrendsFromWeek,
	getTrendsByCategory,
	getFilteredTrends,
} from "../../../../lib/db";
import { applyScoring, ScoringConfig } from "../../../../lib/scoring";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Legacy params
		const today = searchParams.get("today") === "true";
		const week = searchParams.get("week") === "true";

		// New filtering params
		const category = searchParams.get("category") as "ai" | "dev" | undefined;
		const dateFilter = searchParams.get("dateFilter") as "today" | "week" | "year" | undefined;
		const minScore = searchParams.get("minScore") ? parseInt(searchParams.get("minScore")!) : undefined;
		const maxScore = searchParams.get("maxScore") ? parseInt(searchParams.get("maxScore")!) : undefined;
		const filter = searchParams.get("filter") as "recent" | "popular" | "underrated" | undefined;
		const sort = searchParams.get("sort") as "score_desc" | "score_asc" | "newest" | undefined;
		const limit = parseInt(searchParams.get("limit") || "50");
		const offset = parseInt(searchParams.get("offset") || "0");

		// Dynamic scoring params
		const keywords =
			searchParams
				.get("keywords")
				?.split(",")
				.map((k) => k.trim()) || undefined;
		const keywordWeight = searchParams.get("keywordWeight")
			? parseInt(searchParams.get("keywordWeight")!)
			: undefined;
		const enableScoring = searchParams.get("scoring") === "true";

		let trends;

		// Legacy support
		if (today) {
			trends = await getTrendsFromToday(limit);
		} else if (week) {
			trends = await getTrendsFromWeek(limit);
		} else if (category && !filter && !sort && !minScore && !maxScore && !enableScoring && !dateFilter) {
			// Simple category query without filters
			trends = await getTrendsByCategory(category, limit);
		} else {
			// New filtering system with dateFilter support
			trends = await getFilteredTrends({
				category,
				dateFilter,
				minScore,
				maxScore,
				filter,
				sort,
				limit: enableScoring ? 100 : limit, // Fetch more for scoring, then limit after
				offset,
			});
		}

		// Apply dynamic scoring if requested
		if (enableScoring && keywords && keywords.length > 0) {
			const scoringConfig: ScoringConfig = {
				keywords,
				keywordWeight: keywordWeight || 50,
			};
			trends = applyScoring(trends, scoringConfig);
			// Apply limit after scoring
			trends = trends.slice(0, limit);
		}

		return NextResponse.json(trends);
	} catch (error) {
		console.error("Trends API Error:", error);
		return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
	}
}
