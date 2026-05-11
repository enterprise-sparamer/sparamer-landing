import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  number,
}: {
  children: React.ReactNode;
  className?: string;
  number?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 eyebrow", className)}>
      {number && (
        <span className="text-mostarda-strong font-mono">[{number}]</span>
      )}
      <span className="h-px w-8 bg-ink-15" />
      <span>{children}</span>
    </div>
  );
}
