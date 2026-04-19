"use client";

import * as React from "react";
import clsx from "clsx";

const tabs = [
	{ id: "today", label: "Today" },
	{ id: "week", label: "This Week" },
	{ id: "ai", label: "AI Tools" },
	{ id: "dev", label: "Dev Tools" },
];

export function FilterTabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
	return (
		<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onChange(tab.id)}
					className={clsx(
						"px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
						activeTab === tab.id
							? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
							: "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/5 dark:hover:bg-white/10",
					)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
