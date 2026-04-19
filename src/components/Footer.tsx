import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] py-8 mt-12">
      <div className="container mx-auto px-4 max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>© {new Date().getFullYear()} TrendStack. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
