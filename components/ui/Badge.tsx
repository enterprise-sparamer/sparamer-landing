import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink-15 bg-ink/[0.04] px-3 py-1 text-xs font-medium text-ink-55 backdrop-blur-sm",
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-mostarda-stamp" />}
      {children}
    </span>
  );
}
