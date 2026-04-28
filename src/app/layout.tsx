import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	title: {
		default: "TrendStack - Trending AI & Developer Tools",
		template: "%s | TrendStack",
	},
	description:
		"Discover the best trending AI tools, developer resources, and tech innovations. Stay updated with the latest tools for software development, AI coding assistants, and automation platforms.",
	keywords: [
		"AI tools",
		"developer tools",
		"trending tools",
		"code generation",
		"AI coding assistant",
		"GitHub trending",
		"developer resources",
		"open source tools",
		"DevOps tools",
		"productivity tools",
	],
	authors: [{ name: "TrendStack" }],
	creator: "TrendStack",
	publisher: "TrendStack",
	verification: {
		google: "koZPZMIKXDUY8Cu5pQpgjfLLFaeljTy-LFb6q5h5LPw",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
		siteName: "TrendStack",
		title: "TrendStack - Trending AI & Developer Tools",
		description:
			"Discover the best trending AI tools, developer resources, and tech innovations. Stay updated with the latest tools for software development.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "TrendStack - Trending AI & Developer Tools",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "TrendStack - Trending AI & Developer Tools",
		description:
			"Discover the best trending AI tools, developer resources, and tech innovations. Stay updated with the latest tools for software development.",
		images: ["/og-image.png"],
		creator: "@trendstack",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="google-site-verification" content="koZPZMIKXDUY8Cu5pQpgjfLLFaeljTy-LFb6q5h5LPw" />
			</head>
			<body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
