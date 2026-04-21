// Common stop words to exclude from keyword extraction
const STOP_WORDS = new Set([
	"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
	"by", "from", "as", "is", "was", "are", "were", "be", "been", "being", "have", "has",
	"had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must",
	"can", "this", "that", "these", "those", "it", "its", "they", "them", "their", "there",
	"here", "what", "which", "who", "whom", "when", "where", "why", "how", "all", "each",
	"every", "both", "few", "more", "most", "other", "some", "such", "no", "nor", "not",
	"only", "own", "same", "so", "than", "too", "very", "just", "also", "now", "new",
	"best", "top", "great", "good", "use", "using", "tool", "tools", "app", "apps",
]);

/**
 * Extract keywords from text (title, description, etc.)
 */
export function extractKeywordsFromText(text: string): string[] {
	const words = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
	const keywordMap = new Map<string, number>();

	words.forEach((word) => {
		// Skip stop words and short words
		if (word.length < 3 || STOP_WORDS.has(word)) {
			return;
		}
		
		// Count occurrences
		keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
	});

	// Convert to array and sort by frequency
	const sortedKeywords = Array.from(keywordMap.entries())
		.sort((a, b) => b[1] - a[1])
		.map(([word]) => word);

	return sortedKeywords.slice(0, 10); // Return top 10 keywords
}

/**
 * Extract keywords from GitHub repository data
 */
export function extractGitHubKeywords(
	topics: string[] = [],
	language: string = "",
	description: string = ""
): string[] {
	const keywords = new Set<string>();

	// Add topics (already pre-filtered by GitHub)
	topics.forEach((topic) => {
		keywords.add(topic.toLowerCase());
	});

	// Add language
	if (language) {
		keywords.add(language.toLowerCase());
	}

	// Extract keywords from description
	if (description) {
		const descKeywords = extractKeywordsFromText(description);
		descKeywords.forEach((keyword) => keywords.add(keyword));
	}

	return Array.from(keywords).slice(0, 15);
}

/**
 * Extract keywords from Hacker News story data
 */
export function extractHNKeywords(
	title: string,
	tags: string[] = [],
	url: string = ""
): string[] {
	const keywords = new Set<string>();

	// Extract keywords from title
	const titleKeywords = extractKeywordsFromText(title);
	titleKeywords.forEach((keyword) => keywords.add(keyword));

	// Add tags (if available)
	tags.forEach((tag) => {
		keywords.add(tag.toLowerCase());
	});

	// Extract domain from URL as a keyword
	if (url) {
		try {
			const domain = new URL(url).hostname.replace('www.', '');
			const domainParts = domain.split('.');
			if (domainParts.length > 0) {
				keywords.add(domainParts[0].toLowerCase());
			}
		} catch (e) {
			// Invalid URL, skip
		}
	}

	return Array.from(keywords).slice(0, 15);
}
