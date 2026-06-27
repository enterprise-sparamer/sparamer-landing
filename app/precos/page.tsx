import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { PlanCards } from "@/components/PlanCards";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { rateCard, serviceLines, brl } from "@/lib/precos";

const TITLE = "Preços";
const DESCRIPTION =
  "Sparamer Bot Builder a partir de grátis, e consultoria sob medida em Zoho, integrações e Google Cloud. Preço transparente em BRL.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/precos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/precos"),
  },
};

// One accent per frente — color encodes the discipline, not decoration.
const accent: Record<string, string> = {
  diagnostico: "var(--color-olive-deep)",
  zoho: "var(--color-olive)",
  integracoes: "var(--color-ceramica)",
  cloud: "var(--color-mostarda-strong)",
};

/* Constructivist stage marks — same primitives as the Método section. */
function DiagMark() {
  return (
    <svg viewBox="0 0 88 88" width="80" height="80" aria-hidden="true">
      <circle cx="44" cy="44" r="22" fill="var(--color-cream)" />
      <circle cx="44" cy="44" r="22" fill="none" stroke="var(--color-olive)" strokeWidth="1.5" />
      <circle cx="44" cy="44" r="9" fill="var(--color-olive)" />
    </svg>
  );
}
function ImplMark() {
  return (
    <svg viewBox="0 0 88 88" width="80" height="80" aria-hidden="true">
      <rect x="22" y="22" width="44" height="44" fill="var(--color-mostarda)" />
    </svg>
  );
}
function OperMark() {
  return (
    <svg viewBox="0 0 88 88" width="80" height="80" aria-hidden="true">
      <circle cx="44" cy="44" r="30" fill="var(--color-cream)" />
      <circle
        cx="44"
        cy="44"
        r="30"
        fill="none"
        stroke="var(--color-ceramica)"
        strokeOpacity="0.5"
        strokeWidth="0.75"
        strokeDasharray="3 5"
      />
      <circle cx="44" cy="44" r="18" fill="var(--color-ceramica)" />
    </svg>
  );
}

const flow = [
  { step: "01", name: "Diagnóstico", from: 2500, suffix: "", note: "Pago e creditável no projeto.", mark: <DiagMark /> },
  { step: "02", name: "Implementação", from: 6000, suffix: "", note: "Projeto de escopo fixo, preço e prazo fechados.", mark: <ImplMark /> },
  { step: "03", name: "Operação", from: 3500, suffix: "/mês", note: "Retainer opcional. Cancele quando quiser.", mark: <OperMark /> },
];

export default function PrecosPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        <div className="pr-wrap">
          {/* ── Hero ──────────────────────────────────────────── */}
          <section className="pr-hero">
            <h1 className="pr-h1">
              Preço transparente. <em>Escopo fechado.</em>
            </h1>
            <p className="pr-lead">
              Dois jeitos de trabalhar com a Sparamer: o <strong className="font-medium text-ink">Bot Builder</strong> —
              nosso produto, com planos a partir de grátis — e <strong className="font-medium text-ink">consultoria</strong> sob
              medida, com o número final fechado no diagnóstico.
            </p>
          </section>

          {/* ── Pilar 1 · Produto (primary) ───────────────────── */}
          <section aria-labelledby="pr-prod" className="pt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink-15 pb-6">
              <div>
                <p className="text-[13px] text-ink-55">Produto principal · self-service</p>
                <h2
                  id="pr-prod"
                  className="mt-1 font-display font-medium tracking-tight text-ink"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.05", letterSpacing: "-0.025em" }}
                >
                  Sparamer Bot Builder
                </h2>
              </div>
              <a
                href="/discord"
                className="text-[14px] text-ink underline decoration-ceramica decoration-1 underline-offset-[5px] transition-colors hover:text-ceramica"
              >
                conhecer o produto →
              </a>
            </div>
            <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.6] text-ink-70">
              Crie bots de Discord arrastando blocos — editor visual de fluxos
              sobre o Google Cloud. Comece grátis, suba de plano quando crescer.
            </p>
            <div className="mt-9">
              <PlanCards />
            </div>
          </section>

          {/* ── Pilar 2 · Consultoria ─────────────────────────── */}
          <section aria-labelledby="pr-consult" style={{ marginTop: "clamp(72px, 10vw, 120px)" }}>
            <div className="pr-cat-head" style={{ marginTop: 0 }}>
              <h2 id="pr-consult" className="pr-cat-title">Consultoria sob medida</h2>
              <span className="pr-cat-sub">diagnóstico → projeto → operação</span>
            </div>

            {/* Signature: the engagement flow carries the headline prices. */}
            <div className="pr-flow">
              <div className="pr-rail" aria-hidden="true">
                <span className="pr-rail-dot" />
              </div>
              <div className="pr-flow-grid">
                {flow.map((stage) => (
                  <div className="pr-station" key={stage.step}>
                    <div className="pr-station-mark">{stage.mark}</div>
                    <p className="pr-station-step">
                      <b>{stage.step}</b> · {stage.name}
                    </p>
                    <p className="pr-station-from">a partir de</p>
                    <p className="pr-station-price">
                      {brl(stage.from)}
                      {stage.suffix && <small>{stage.suffix}</small>}
                    </p>
                    <p className="pr-station-note">{stage.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarifas avulsas — reference plate, deliberately secondary. */}
            <div className="pr-tarifas">
              <span className="pr-tarifas-label">
                Tarifas avulsas — quando faz sentido cobrar por tempo
              </span>
              <span className="pr-rate">
                <span className="pr-rate-k">hora</span>
                <span className="pr-rate-v">
                  {brl(rateCard.hora.tipico)}{" "}
                  <span>
                    ({brl(rateCard.hora.from)}–{brl(rateCard.hora.ate)})
                  </span>
                </span>
              </span>
              <span className="pr-rate">
                <span className="pr-rate-k">diária</span>
                <span className="pr-rate-v">{brl(rateCard.dia.tipico)}</span>
              </span>
              <span className="pr-rate">
                <span className="pr-rate-k">retainer</span>
                <span className="pr-rate-v">
                  {brl(rateCard.retainer.from)}
                  <span>/mês +</span>
                </span>
              </span>
            </div>

            {/* Catálogo por frente */}
            <div className="pr-cat-head">
              <h3 className="pr-cat-title" style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.75rem)" }}>
                Catálogo por frente
              </h3>
              <span className="pr-cat-sub">4 frentes · escopo fixo</span>
            </div>

            <div className="pr-cat" style={{ marginTop: "clamp(32px,4vw,48px)" }}>
              {serviceLines.map((line) => (
                <div
                  key={line.id}
                  id={line.id}
                  className="pr-line"
                  style={{ "--acc": accent[line.id], scrollMarginTop: "96px" } as React.CSSProperties}
                >
                  <div className="pr-line-head">
                    <div className="pr-line-mark">
                      <span className="pr-line-chip" aria-hidden="true" />
                      <h3 className="pr-line-name">{line.name}</h3>
                    </div>
                    <p className="pr-line-tag">{line.tagline}</p>
                  </div>

                  <div className="pr-tiers">
                    {line.tiers.map((tier) => (
                      <article
                        key={tier.name}
                        className={`pr-tier${tier.destaque ? " pr-tier--rec" : ""}`}
                      >
                        <div className="pr-tier-top">
                          <span className="pr-tier-name">{tier.name}</span>
                          {tier.destaque && (
                            <span className="pr-tier-rec">recomendado</span>
                          )}
                        </div>
                        <p className="pr-tier-from">a partir de</p>
                        <p className="pr-tier-price">
                          {brl(tier.from)}
                          {tier.recorrente && <span>/mês</span>}
                        </p>
                        <p className="pr-tier-time">{tier.timeline}</p>
                        <p className="pr-tier-scope">{tier.scope}</p>
                        <ul className="pr-tier-list">
                          {tier.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                        <div className="pr-tier-cta">
                          <a
                            href={`/contato?topic=${line.id}`}
                            className="pr-tier-link focus-ring"
                          >
                            conversar →
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Diagnóstico — free × paid */}
            <div className="pr-note">
              <h2 className="pr-note-h">
                Grátis para começar. <em>Pago para aprofundar.</em>
              </h2>
              <div className="pr-note-rows">
                <div className="pr-note-row">
                  <span className="pr-note-k">Grátis · online</span>
                  <span className="pr-note-v">
                    Três perguntas, 60 segundos, e você recebe uma recomendação
                    sob medida no e-mail.{" "}
                    <a href="/consulta">Fazer a consulta gratuita</a>.
                  </span>
                </div>
                <div className="pr-note-row">
                  <span className="pr-note-k">Pago · creditável</span>
                  <span className="pr-note-v">
                    O diagnóstico aprofundado (a partir de {brl(2500)}) audita o
                    seu ambiente a fundo e fecha o escopo — e o valor volta como
                    crédito quando o projeto fecha.
                  </span>
                </div>
              </div>
            </div>

            <p className="pr-foot">
              Planos do Bot Builder em BRL, por mês (o grátis é o próprio
              construtor, sem cartão). Consultoria com valores de referência em
              BRL para o mercado brasileiro — tudo &ldquo;a partir de&rdquo;, com o
              número final fechado no diagnóstico. Atendimento em português,
              espanhol, inglês, sueco e francês.
            </p>
          </section>
        </div>

        {/* ── CTA band (full-bleed) ───────────────────────────── */}
        <section className="pr-cta">
          <div className="pr-cta-inner">
            <h2 className="pr-cta-h">
              Comece grátis no Bot Builder, ou pelo diagnóstico de consultoria.
            </h2>
            <div className="pr-cta-row">
              <Button href="/discord" variant="secondary" size="lg">
                Ver o Bot Builder <span aria-hidden>→</span>
              </Button>
              <a href="/consulta" className="pr-cta-link">
                Consulta gratuita
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Preços", path: "/precos" },
            ]),
          ),
        }}
      />
    </>
  );
}
