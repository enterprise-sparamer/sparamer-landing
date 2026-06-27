import { Button } from "@/components/ui/Button";
import { plans, brl } from "@/lib/botBuilder";

// Bot Builder plan cards — shared by the /discord landing and the /precos page.
export function PlanCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => (
        <article
          key={plan.id}
          className={`flex flex-col rounded-xl border bg-cream p-6 transition duration-200 hover:-translate-y-1 hover:border-blurple motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
            plan.destaque ? "border-blurple" : "border-ink-15"
          }`}
          style={
            plan.destaque
              ? { boxShadow: "inset 0 0 0 1px var(--color-blurple)" }
              : undefined
          }
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
              {plan.name}
            </h3>
            {plan.destaque && (
              <span className="font-sans text-[11.5px] font-medium text-blurple">
                recomendado
              </span>
            )}
          </div>

          <p
            className="mt-4 font-display font-medium tracking-tight text-ink"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)", lineHeight: "1" }}
          >
            {brl(plan.priceBRL)}
            {plan.priceBRL > 0 && (
              <span className="text-[14px] font-normal text-ink-55">/mês</span>
            )}
          </p>
          <p className="mt-3 text-[13.5px] leading-[1.5] text-ink-70">
            {plan.tagline}
          </p>

          <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-[13px] leading-[1.5] text-ink-70">
            {plan.features.map((f) => (
              <li key={f} className="grid grid-cols-[14px_1fr] gap-2">
                <span aria-hidden className="text-blurple">
                  —
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Button
              href={plan.cta.href}
              variant={plan.destaque ? "discord" : "secondary"}
              className="w-full"
            >
              {plan.cta.label}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
