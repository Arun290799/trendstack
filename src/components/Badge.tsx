import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "github" | "hn" | "ai" | "default";
};

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    github: "bg-[#24292f] text-white dark:bg-[#ffffff] dark:text-[#24292f]",
    hn: "bg-[#ff6600] text-white",
    ai: "bg-primary text-white",
    default: "bg-black/5 text-[var(--foreground)] dark:bg-white/10",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide",
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
