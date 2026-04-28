export default function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const currentDate = new Date();

	return [
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/trending-today`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/trending-this-week`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/category/ai`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/category/dev`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/browse`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/list/best-ai-tools-for-developers`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/list/new-ai-tools-this-week`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/list/ai-agents-tools`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/list/frontend-developer-tools`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/list/backend-development-tools`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/list/devops-tools`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
	];
}
