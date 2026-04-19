import { NextResponse } from "next/server";
import { getTrends, getTrendsFromToday, getTrendsFromWeek, getTrendsByCategory } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = parseInt(searchParams.get("limit") || "50");
		const today = searchParams.get("today") === "true";
		const week = searchParams.get("week") === "true";
		const category = searchParams.get("category");

		let trends;

		if (today) {
			trends = await getTrendsFromToday(limit);
		} else if (week) {
			trends = await getTrendsFromWeek(limit);
		} else if (category) {
			trends = await getTrendsByCategory(category, limit);
		} else {
			trends = await getTrends(limit);
		}

		return NextResponse.json(trends);
	} catch (error) {
		console.error("Trends API Error:", error);
		return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
	}
}
