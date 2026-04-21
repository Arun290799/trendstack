export interface ScoreableItem {
	id: string;
	title: string;
	summary?: string | null;
	stars: number;
	comments: number;
	postCreatedAt: Date;
	keywords?: string[];
}

export interface ScoringConfig {
	keywords: string[];
	keywordWeight?: number;
}

export function calculateScore(item: ScoreableItem, config: ScoringConfig): number {
	let score = 0;

	// Base popularity
	score += item.stars;
	score += item.comments * 2;

	// Keyword matching - merge page keywords with trend's stored keywords
	const allKeywords = new Set([...config.keywords, ...(item.keywords || [])]);
	const text = `${item.title} ${item.summary || ""}`.toLowerCase();
	const keywordWeight = config.keywordWeight || 50;

	allKeywords.forEach((keyword) => {
		if (text.includes(keyword.toLowerCase())) {
			score += keywordWeight;
		}
	});

	// Recency boost
	const daysOld = (Date.now() - new Date(item.postCreatedAt).getTime()) / (1000 * 60 * 60 * 24);

	if (daysOld < 7) {
		score += 30;
	} else if (daysOld < 30) {
		score += 10;
	}

	// Optional slight randomness to avoid identical ordering
	score += Math.random() * 5;

	return score;
}

export function applyScoring(items: ScoreableItem[], config: ScoringConfig): ScoreableItem[] {
	const scoredItems = items.map((item) => ({
		...item,
		computedScore: calculateScore(item, config),
	}));

	// Sort by computed score (descending)
	scoredItems.sort((a, b) => (b as any).computedScore - (a as any).computedScore);

	// Remove computedScore from final output
	return scoredItems.map(({ computedScore, ...rest }) => rest);
}
