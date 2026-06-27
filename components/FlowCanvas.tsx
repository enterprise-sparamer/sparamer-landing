import { cn } from "@/lib/cn";

// A small mock of the visual node editor — Gatilho → Condição → Ação.
// CSS-only animation (staggered fade-in + flowing connector dashes) so it
// always renders, with no JS/hydration dependency. Shared by the /discord
// hero and the homepage product band.
export function FlowCanvas({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-x-auto rounded-2xl border border-ink-15 p-6 sm:p-8",
        className,
      )}
      style={{
        backgroundColor: "var(--color-cream)",
        backgroundImage: "radial-gradient(var(--color-ink-15) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="flex min-w-[520px] items-stretch gap-3 sm:gap-4">
        <div className="fade-in flex-1">
          <FlowNode color="#7C5CBF" kind="Gatilho" label="/sorteio" />
        </div>
        <Connector className="fade-in-delay-1" />
        <div className="fade-in-delay-2 flex-1">
          <FlowNode color="#3B6FB0" kind="Condição" label="tem cargo VIP?" />
        </div>
        <Connector className="fade-in-delay-3" />
        <div className="fade-in-delay-4 flex-1">
          <FlowNode color="#4F6231" kind="Ação" label="enviar embed + sortear" />
        </div>
      </div>
    </div>
  );
}

function FlowNode({ color, kind, label }: { color: string; kind: string; label: string }) {
  return (
    <div className="h-full rounded-xl border border-ink-15 bg-cream p-4 shadow-[0_1px_0_rgba(26,26,26,0.04)] transition duration-200 hover:-translate-y-1 hover:border-olive motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex items-center gap-2">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        <span className="font-mono text-[11px] tracking-[0.08em] text-ink-55">{kind}</span>
      </div>
      <p className="mt-2.5 font-sans text-[14px] font-medium tracking-tight text-ink">{label}</p>
    </div>
  );
}

function Connector({ className }: { className?: string }) {
  return (
    <div className={cn("flex shrink-0 items-center", className)} aria-hidden>
      <svg width="34" height="16" viewBox="0 0 34 16" fill="none">
        <line
          x1="0"
          y1="8"
          x2="26"
          y2="8"
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          className="animate-flow motion-reduce:animate-none"
        />
        <path
          d="M 24 4 L 30 8 L 24 12"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
