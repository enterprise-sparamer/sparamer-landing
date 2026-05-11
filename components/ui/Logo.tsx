import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Sparamer"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M 12 1 A 11 11 0 0 1 12 23"
          stroke="var(--color-ink)"
          strokeWidth="1.25"
          fill="none"
        />
        <circle cx="12" cy="12" r="2.5" fill="var(--color-ink)" />
      </svg>
      <span className="font-display text-[15px] font-medium tracking-tight">
        Sparamer
        {/* Decorative typographic dot — static mostarda. Live studio status surfaces in Hero. */}
        <span className="text-mostarda">.</span>
      </span>
    </Link>
  );
}
