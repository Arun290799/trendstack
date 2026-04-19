"use client";

import * as React from "react";
import { FilterTabs } from "@/components/FilterTabs";
import { TrendCard } from "@/components/TrendCard";

export default function Home() {
	const [activeTab, setActiveTab] = React.useState("today");
	const [trends, setTrends] = React.useState<any[]>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchTrends() {
			setLoading(true);
			try {
				let response;

				if (activeTab === "today") {
					response = await fetch("/api/trends?today=true&limit=30");
				} else if (activeTab === "week") {
					response = await fetch("/api/trends?week=true&limit=30");
				} else if (activeTab === "ai") {
					response = await fetch("/api/trends?category=ai&limit=30");
				} else if (activeTab === "dev") {
					response = await fetch("/api/trends?category=dev&limit=30");
				}

				if (response) {
					const data = await response.json();
					setTrends(data);
				}
			} catch (error) {
				console.error("Failed to fetch trends:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchTrends();
	}, [activeTab]);

	const getTitle = () => {
		switch (activeTab) {
			case "today":
				return "Trending Today";
			case "week":
				return "Trending This Week";
			case "ai":
				return "AI Tools";
			case "dev":
				return "Dev Tools";
			default:
				return "Trending Today";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-[1100px] animate-in fade-in duration-500">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">{getTitle()}</h1>
				<FilterTabs activeTab={activeTab} onChange={setActiveTab} />
			</div>

			{loading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className="animate-pulse">
							<div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-5">
								<div className="h-6 bg-[var(--muted)] rounded mb-3"></div>
								<div className="h-4 bg-[var(--muted)] rounded mb-2"></div>
								<div className="h-4 bg-[var(--muted)] rounded w-3/4"></div>
							</div>
						</div>
					))}
				</div>
			) : trends.length === 0 ? (
				<div className="text-center py-20 text-[var(--muted)]">
					<p>No trends found. Please run the cron job to fetch data.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{trends.map((trend) => (
						<TrendCard
							key={trend.id}
							id={trend.id}
							title={trend.title}
							summary={trend.summary || "No summary available."}
							source={trend.source as "github" | "hn" | "ai"}
							stars={trend.stars}
							comments={trend.comments}
							url={trend.url}
						/>
					))}
				</div>
			)}
		</div>
	);
}
