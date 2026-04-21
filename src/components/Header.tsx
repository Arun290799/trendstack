import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Zap } from "lucide-react";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-[1100px]">
				<div className="flex items-center gap-6">
					<Link href="/" className="flex items-center gap-2 group">
						<div className="bg-primary text-white p-1 rounded-md group-hover:rotate-12 transition-transform">
							<Zap className="w-5 h-5" fill="currentColor" />
						</div>
						<span className="font-bold text-lg tracking-tight">TrendStack</span>
					</Link>
					<nav className="hidden md:flex gap-6">
						<Link
							href="/trending-today"
							className="text-sm font-medium hover:text-primary transition-colors text-foreground"
						>
							Trending Today
						</Link>
						<Link
							href="/trending-this-week"
							className="text-sm font-medium text-muted hover:text-foreground transition-colors"
						>
							Trending This Week
						</Link>
						<Link
							href="/category/ai"
							className="text-sm font-medium text-muted hover:text-foreground transition-colors"
						>
							Trending AI Tools
						</Link>
						<Link
							href="/category/dev"
							className="text-sm font-medium text-muted hover:text-foreground transition-colors"
						>
							Trending Dev Tools
						</Link>
					</nav>
				</div>
				<div className="flex items-center gap-4">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
