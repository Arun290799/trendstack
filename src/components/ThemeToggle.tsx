"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-9 h-9" />;
	}

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun className="h-5 w-5 text-muted hover:text-foreground transition-colors" />
			) : (
				<Moon className="h-5 w-5 text-muted hover:text-foreground transition-colors" />
			)}
		</button>
	);
}
