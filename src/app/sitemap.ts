export default function sitemap() {
	return [
		{
			url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/trending-today`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/trending-this-week`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/category/ai-tools`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_APP_URL}/category/dev-tools`,
		},
	];
}
