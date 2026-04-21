import { prisma } from "./prisma";

export interface InsertTrendInput {
	id: string;
	title: string;
	url: string;
	source: string;
	stars?: number;
	comments?: number;
	score: number;
	summary?: string;
	category: string;
	postCreatedAt: Date;
	keywords?: string[];
}

export async function insertTrend(data: InsertTrendInput) {
	return prisma.trend.upsert({
		where: { id: data.id },
		update: {
			stars: data.stars || 0,
			comments: data.comments || 0,
			score: data.score,
			...(data.summary ? { summary: data.summary } : {}),
			...(data.keywords ? { keywords: data.keywords } : {}),
		},
		create: {
			id: data.id,
			title: data.title,
			url: data.url,
			source: data.source,
			stars: data.stars || 0,
			comments: data.comments || 0,
			score: data.score,
			summary: data.summary,
			category: data.category,
			keywords: data.keywords || [],
			postCreatedAt: data.postCreatedAt,
		},
	});
}

export async function getTrends(limit: number = 50) {
	const trends = await prisma.trend.findMany({
		take: limit,
		orderBy: { score: "desc" },
	});
	return trends;
}

export async function getTrendsFromToday(limit: number = 50) {
	const now = new Date();
	const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

	const trends = await prisma.trend.findMany({
		where: {
			postCreatedAt: {
				gte: twentyFourHoursAgo,
				lte: now,
			},
		},
		take: limit,
		orderBy: { score: "desc" },
	});

	return trends;
}

export async function getTrendsFromWeek(limit: number = 50) {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const trends = await prisma.trend.findMany({
		where: {
			createdAt: {
				gte: oneWeekAgo,
			},
		},
		take: limit,
		orderBy: { score: "desc" },
	});

	return trends;
}

export async function getTrendsByCategory(category: string, limit: number = 50) {
	console.log("Getting trends by category:", category);
	const trends = await prisma.trend.findMany({
		where: {
			category: category,
		},
		take: limit,
		orderBy: { score: "desc" },
	});
	return trends;
}

export async function checkIfExists(id: string) {
	const count = await prisma.trend.count({
		where: { id },
	});
	return count > 0;
}

export interface FilterOptions {
	category?: string;
	dateFilter?: "today" | "week" | "year";
	minScore?: number;
	maxScore?: number;
	filter?: "recent" | "popular" | "underrated";
	sort?: "score_desc" | "score_asc" | "newest";
	limit?: number;
	offset?: number;
}

export async function getFilteredTrends(options: FilterOptions = {}) {
	const { category, dateFilter, minScore, maxScore, filter, sort = "score_desc", limit = 50, offset = 0 } = options;

	const where: any = {};

	// Category filter
	if (category) {
		where.category = category;
	}

	// Date filter
	if (dateFilter === "today") {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		where.postCreatedAt = { gte: today };
	} else if (dateFilter === "week") {
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		where.postCreatedAt = { gte: oneWeekAgo };
	} else if (dateFilter === "year") {
		const startOfYear = new Date();
		startOfYear.setMonth(0, 1); // January 1st
		startOfYear.setHours(0, 0, 0, 0);
		where.postCreatedAt = { gte: startOfYear };
	}

	// Score range filters
	if (minScore !== undefined || maxScore !== undefined) {
		where.score = {};
		if (minScore !== undefined) {
			where.score.gte = minScore;
		}
		if (maxScore !== undefined) {
			where.score.lte = maxScore;
		}
	}

	// Predefined filters
	if (filter === "popular") {
		where.score = { gt: 300 };
	} else if (filter === "underrated") {
		where.score = { lt: 200 };
	} else if (filter === "recent") {
		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
		where.postCreatedAt = { gte: sevenDaysAgo };
	}

	// Sorting
	const orderBy: any = {};
	if (sort === "score_desc") {
		orderBy.score = "desc";
	} else if (sort === "score_asc") {
		orderBy.score = "asc";
	} else if (sort === "newest") {
		orderBy.postCreatedAt = "desc";
	}

	const trends = await prisma.trend.findMany({
		where,
		take: limit,
		skip: offset,
		orderBy,
	});

	return trends;
}
