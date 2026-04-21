export interface PageConfig {
	title: string;
	description: string;
	intro: string;
	outro: string;
	category: "ai" | "dev";
	filter?: "recent" | "popular" | "underrated";
	dateFilter?: "today" | "week" | "year";
	sort?: "score_desc" | "score_asc" | "newest";
	limit?: number;
	keywords?: string[];
	keywordWeight?: number;
}

export const pagesConfig: Record<string, PageConfig> = {
	// ================= AI CORE =================

	"best-ai-tools-for-developers": {
		title: "Best AI Tools for Developers in 2026 (Top Trending Tools)",
		description:
			"Explore the best AI tools for developers in 2026 including code generation tools, AI coding assistants, debugging tools, and automation platforms. Discover trending AI developer tools to build faster and smarter.",
		intro: "Looking for the best AI tools for developers? This curated list features top AI coding assistants, code generation tools, and automation platforms used by modern engineers. Whether you're building web apps, APIs, or AI-powered products, these tools will boost productivity and efficiency.",
		outro: "AI is transforming software development. Stay updated with the latest AI tools, discover emerging trends, and improve your development workflow using cutting-edge technologies.",
		category: "ai",
		dateFilter: "week",
		sort: "score_desc",
		limit: 30,
		keywords: [
			"ai tools",
			"developer tools",
			"code generation",
			"ai coding assistant",
			"openai",
			"llm",
			"gpt",
			"ai api",
			"automation",
			"machine learning",
			"deep learning",
			"ai workflow",
			"developer productivity",
			"prompt engineering",
			"ai debugging",
			"code completion",
			"chatbot",
			"rag",
			"vector database",
			"fine tuning",
			"ai agents",
			"multi agent systems",
			"ai frameworks",
		],
		keywordWeight: 50,
	},

	"new-ai-tools-this-week": {
		title: "New AI Tools This Week (Latest AI Tools & Startups)",
		description:
			"Discover new AI tools released this week. Explore the latest AI startups, machine learning tools, and developer platforms trending right now.",
		intro: "Stay updated with the newest AI tools launched this week. These tools are shaping the future of artificial intelligence and software development.",
		outro: "Be the first to discover new AI tools before they go mainstream. Check back weekly for fresh updates.",
		category: "ai",
		filter: "recent",
		dateFilter: "week",
		sort: "newest",
		limit: 25,
		keywords: [
			"new ai tools",
			"latest ai tools",
			"recent ai releases",
			"cutting edge ai",
			"innovation",
			"new startups",
			"launch tools",
		],
		keywordWeight: 60,
	},

	// ================= AI SPECIAL =================

	"ai-agents-tools": {
		title: "Best AI Agent Tools & Autonomous Systems (2026)",
		description:
			"Explore the best AI agent frameworks and autonomous AI tools. Build AI agents, automate workflows, and create intelligent systems using the latest technologies.",
		intro: "AI agents are one of the fastest-growing trends in AI. Discover tools that enable autonomous workflows, multi-agent systems, and intelligent automation.",
		outro: "Stay ahead by exploring AI agent tools that are shaping the future of automation and decision-making.",
		category: "ai",
		sort: "score_desc",
		limit: 25,
		keywords: [
			"ai agents",
			"autonomous agents",
			"multi agent systems",
			"agent frameworks",
			"langchain",
			"auto gpt",
			"crew ai",
			"ai workflows",
			"task automation ai",
		],
		keywordWeight: 60,
	},

	// ================= DEV CORE =================

	"frontend-developer-tools": {
		title: "Top Frontend Developer Tools (React, Next.js, UI Libraries)",
		description:
			"Discover the best frontend developer tools, frameworks, and libraries including React, Next.js, and modern UI tools for building fast web applications.",
		intro: "Explore trending frontend tools used to build modern web apps. From UI frameworks to performance tools, stay ahead in frontend development.",
		outro: "Keep your frontend stack updated and build faster, scalable, and responsive applications.",
		category: "dev",
		sort: "score_desc",
		limit: 25,
		keywords: [
			"frontend",
			"react",
			"nextjs",
			"vue",
			"angular",
			"tailwind css",
			"ui components",
			"design system",
			"web performance",
			"typescript",
		],
		keywordWeight: 50,
	},

	"backend-development-tools": {
		title: "Best Backend Development Tools (APIs, Databases, Frameworks)",
		description:
			"Explore essential backend tools including Node.js frameworks, APIs, databases, and scalable infrastructure technologies.",
		intro: "Build scalable backend systems using modern tools and frameworks. Discover APIs, databases, and server-side technologies.",
		outro: "Stay updated with backend development trends and build high-performance systems.",
		category: "dev",
		sort: "score_desc",
		limit: 25,
		keywords: [
			"backend",
			"nodejs",
			"express",
			"fastify",
			"django",
			"flask",
			"golang",
			"microservices",
			"rest api",
			"graphql",
			"postgresql",
			"mongodb",
			"redis",
		],
		keywordWeight: 50,
	},

	// ================= DISCOVERY =================

	"devops-tools": {
		title: "Top DevOps Tools (CI/CD, Docker, Kubernetes, Cloud)",
		description:
			"Discover top DevOps tools including CI/CD platforms, Docker, Kubernetes, and cloud infrastructure tools.",
		intro: "DevOps tools help automate deployment, monitoring, and infrastructure.",
		outro: "Improve your workflow with modern DevOps tools and practices.",
		category: "dev",
		sort: "score_desc",
		limit: 25,
		keywords: ["devops", "ci cd", "docker", "kubernetes", "deployment", "monitoring", "cloud", "aws"],
		keywordWeight: 50,
	},
};

export function getPageConfig(slug: string): PageConfig | null {
	return pagesConfig[slug] || null;
}

export function getAllPageSlugs(): string[] {
	return Object.keys(pagesConfig);
}
