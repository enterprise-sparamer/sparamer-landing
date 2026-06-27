import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

// CSS-only fade-up entrance (see .fade-in in globals.css). No JS dependency,
// always ends visible, and respects prefers-reduced-motion.
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("fade-in", className)}>{children}</div>;
}
