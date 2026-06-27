import { Button } from "@/components/ui/Button";
import { FlowCanvas } from "@/components/FlowCanvas";
import { DiscordLogo } from "@/components/DiscordLogo";
import { BUILDER_HREF } from "@/lib/botBuilder";

// Homepage band that marks the Bot Builder as Sparamer's primary product.
export function BotBuilderFeature() {
  return (
    <section
      aria-labelledby="produto-heading"
      className="relative mx-auto max-w-[1200px] px-6 py-16 lg:px-12 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blurple">
              <DiscordLogo className="h-3.5 w-3.5" fill="#ffffff" />
            </span>
            <p className="font-mono text-[12px] tracking-[0.16em] text-blurple">
              Produto principal
            </p>
          </div>
          <h2
            id="produto-heading"
            className="mt-4 font-display font-medium tracking-tight text-ink"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: "1.02", letterSpacing: "-0.03em" }}
          >
            Sparamer Bot Builder
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-ink-70">
            Crie bots de Discord arrastando blocos — editor visual de fluxos, no
            espírito do Zapier, sobre o Google Cloud. Comece grátis; e conte com a
            consultoria quando precisar de algo além do produto.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={BUILDER_HREF} variant="discord" size="lg">
              Começar grátis <span aria-hidden>→</span>
            </Button>
            <a
              href="/discord"
              className="text-[14px] text-ink-70 underline decoration-ink-15 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
            >
              Ver planos e recursos
            </a>
          </div>
        </div>
        <FlowCanvas />
      </div>
    </section>
  );
}
