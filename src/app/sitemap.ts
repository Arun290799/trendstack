export default function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

	return [
		{
			url: baseUrl,
		},
		{
			url: `${baseUrl}/trending-today`,
		},
		{
			url: `${baseUrl}/trending-this-week`,
		},
		{
			url: `${baseUrl}/category/ai`,
		},
		{
			url: `${baseUrl}/category/dev`,
		},
		{
			url: `${baseUrl}/browse`,
		},
		{
			url: `${baseUrl}/list/best-ai-tools-for-developers`,
		},
		{
			url: `${baseUrl}/list/new-ai-tools-this-week`,
		},
		{
			url: `${baseUrl}/list/ai-agents-tools`,
		},
		{
			url: `${baseUrl}/list/frontend-developer-tools`,
		},
		{
			url: `${baseUrl}/list/backend-development-tools`,
		},
		{
			url: `${baseUrl}/list/devops-tools`,
		},
	];
}
