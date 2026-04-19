import Link from "next/link";
import { ExternalLink, Heart, MessageSquare } from "lucide-react";
import { Badge } from "./Badge";

export interface TrendCardProps {
	id: string;
	title: string;
	summary: string;
	source: "github" | "hn" | "ai";
	stars?: number;
	comments?: number;
	url: string;
}

export function TrendCard({ title, summary, source, stars, comments, url }: TrendCardProps) {
	const sourceLabel = {
		github: "GitHub",
		hn: "Hacker News",
		ai: "AI Trending",
	};

	return (
		<div className="group relative flex flex-col p-5 bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200">
			<Link href={url} target="_blank" rel="noopener noreferrer" className="block relative z-10">
				<h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-primary transition-colors mb-2">
					{title}
				</h3>
			</Link>

			<p className="text-[var(--muted)] text-sm mb-4 flex-1">{summary}</p>

			<div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]/50 relative z-10">
				<div className="flex items-center gap-4 text-xs font-medium text-[var(--muted)]">
					{stars !== undefined && (
						<div className="flex items-center gap-1.5">
							<Heart className="w-4 h-4" />
							<span>{stars.toLocaleString()}</span>
						</div>
					)}
					{comments !== undefined && (
						<div className="flex items-center gap-1.5">
							<MessageSquare className="w-4 h-4" />
							<span>{comments.toLocaleString()}</span>
						</div>
					)}
				</div>

				<Badge variant={source} className="shrink-0">
					{sourceLabel[source]}
				</Badge>
			</div>

			{/* Absolute link overlay for the entire card except interactive elements inside */}
			<Link
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute inset-0 z-0"
				aria-label={`Visit ${title}`}
			/>
		</div>
	);
}
