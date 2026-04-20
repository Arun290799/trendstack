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
}

export async function insertTrend(data: InsertTrendInput) {
	return prisma.trend.upsert({
		where: { id: data.id },
		update: {
			stars: data.stars || 0,
			comments: data.comments || 0,
			score: data.score,
			...(data.summary ? { summary: data.summary } : {}),
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
	return prisma.trend.findMany({
		where: {
			category: category,
		},
		take: limit,
		orderBy: { score: "desc" },
	});
}

export async function checkIfExists(id: string) {
	const count = await prisma.trend.count({
		where: { id },
	});
	return count > 0;
}
