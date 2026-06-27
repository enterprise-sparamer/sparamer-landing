import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { rateCard, serviceLines, brl, type ServiceLine, type Tier } from "@/lib/precos";

const TITLE = "Preços";
const DESCRIPTION =
  "Faixas de investimento transparentes em BRL para projetos de Zoho, integrações, automações e arquitetura em Google Cloud. Escopo fechado no diagnóstico.";

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

export default function PrecosPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        {/* ── Header ──────────────────────────────────────────── */}
        <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <Eyebrow number="01">Preços</Eyebrow>
            <h1
              className="mt-8 max-w-[18ch] font-display font-normal tracking-tight text-ink head-cling"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: "1.04",
                letterSpacing: "-0.025em",
              }}
            >
              Preço transparente.{" "}
              <span className="text-ink-55">Escopo fechado.</span>
            </h1>
            <p className="mt-8 max-w-[54ch] text-[15px] leading-[1.7] text-ink-70">
              Trabalho sério não cabe em &ldquo;sob consulta&rdquo;. Abaixo estão as
              faixas reais para empresas brasileiras — PMEs e scale-ups. Todo
              projeto começa por um diagnóstico, e o valor final é fechado ali,
              sob medida.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-40">
              Valores em BRL · &ldquo;a partir de&rdquo; · PT · ES · EN · SV · FR
            </p>
          </div>
        </section>

        {/* ── Rate card ───────────────────────────────────────── */}
        <section className="relative pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="grid gap-px overflow-hidden rounded-xl border border-ink-15 bg-ink-15 sm:grid-cols-3">
              <RateCell
                label="Hora · sênior"
                value={brl(rateCard.hora.tipico)}
                note={`faixa ${brl(rateCard.hora.from)}–${brl(rateCard.hora.ate)}`}
              />
              <RateCell
                label="Diária"
                value={brl(rateCard.dia.tipico)}
                note={`faixa ${brl(rateCard.dia.from)}–${brl(rateCard.dia.ate)}`}
              />
              <RateCell
                label="Retainer · operação"
                value={`${brl(rateCard.retainer.from)}/mês`}
                note={`até ${brl(rateCard.retainer.ate)}/mês`}
                prefix="a partir de"
              />
            </div>
            <p className="mt-4 text-[13px] leading-[1.6] text-ink-55">
              Hora avulsa é exceção — o produto são os pacotes de escopo fixo
              abaixo. A diária e a hora valem para consultoria, advisory e
              demandas pontuais.
            </p>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Commercial model strip ──────────────────────────── */}
        <section className="relative py-16 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-55">
              como funciona
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
              <ModelStep
                number="01"
                title="Diagnóstico"
                body="Mapeamos o gargalo real e devolvemos um plano com escopo e investimento fechados. Pago — e creditável no projeto."
              />
              <ModelStep
                number="02"
                title="Implementação"
                body="Projeto de escopo fixo, preço e prazo definidos. Código no seu Git desde o primeiro commit."
              />
              <ModelStep
                number="03"
                title="Operação"
                body="Retainer mensal opcional para evoluir, monitorar e sustentar o que entregamos. Cancele quando quiser."
              />
            </div>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Service lines ───────────────────────────────────── */}
        <section className="relative py-16 lg:py-24">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="flex flex-col gap-20 lg:gap-28">
              {serviceLines.map((line) => (
                <ServiceLineBlock key={line.id} line={line} />
              ))}
            </div>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Diagnostic note (free × paid) ───────────────────── */}
        <section className="relative py-16 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <Eyebrow number="06">Diagnóstico</Eyebrow>
                <h2
                  className="mt-6 font-display font-normal tracking-tight text-ink"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.1" }}
                >
                  Grátis para começar.{" "}
                  <span className="text-ink-55">Pago para aprofundar.</span>
                </h2>
              </div>
              <div className="lg:col-span-8">
                <dl className="space-y-6 border-t border-ink-15 pt-8 text-[15px] leading-[1.7] text-ink-70">
                  <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-55">
                      Grátis · online
                    </dt>
                    <dd>
                      Três perguntas, 60 segundos, e você recebe uma recomendação
                      sob medida no e-mail.{" "}
                      <a
                        href="/consulta"
                        className="text-ink underline decoration-ink-15 underline-offset-[5px] transition-colors hover:text-ceramica hover:decoration-ceramica"
                      >
                        Fazer a consulta gratuita
                      </a>
                      .
                    </dd>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-55">
                      Pago · creditável
                    </dt>
                    <dd>
                      O diagnóstico aprofundado (a partir de {brl(2500)}) audita o
                      seu ambiente a fundo e fecha o escopo do projeto — e o valor
                      volta para você como crédito quando o projeto fecha.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-olive py-20 lg:py-24">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <h2
              className="max-w-[20ch] font-display font-medium tracking-tight text-cream"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)", lineHeight: "1.08" }}
            >
              Comece pelo diagnóstico. O resto vem com escopo fechado.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/consulta" variant="secondary" size="lg">
                Consulta gratuita <span aria-hidden>→</span>
              </Button>
              <a
                href="/contato"
                className="font-sans text-[15px] text-cream underline decoration-cream/40 underline-offset-[6px] transition-colors hover:decoration-cream"
              >
                Falar sobre um projeto
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

/* ─── Pieces ──────────────────────────────────────────────────────── */

function RateCell({
  label,
  value,
  note,
  prefix,
}: {
  label: string;
  value: string;
  note: string;
  prefix?: string;
}) {
  return (
    <div className="bg-cream p-6 lg:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-55">
        {label}
      </p>
      {prefix && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-40">
          {prefix}
        </p>
      )}
      <p
        className={`font-display font-medium tracking-tight text-ink ${prefix ? "mt-1" : "mt-3"}`}
        style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: "1" }}
      >
        {value}
      </p>
      <p className="mt-2 font-mono text-[11px] text-ink-55">{note}</p>
    </div>
  );
}

function ModelStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-ink-15 pt-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[12px] text-ink-40">{number}</span>
        <h3 className="font-display text-[18px] font-medium tracking-tight text-ink">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[14px] leading-[1.65] text-ink-70">{body}</p>
    </div>
  );
}

function ServiceLineBlock({ line }: { line: ServiceLine }) {
  return (
    <div id={line.id} className="scroll-mt-28">
      <header className="grid gap-4 border-b border-ink-15 pb-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] text-ink-40">{line.number}</span>
            <h2
              className="font-display font-medium tracking-tight text-ink"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: "1.08" }}
            >
              {line.name}
            </h2>
          </div>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-ink-70">
            {line.tagline}
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {line.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} topic={line.id} />
        ))}
      </div>
    </div>
  );
}

function TierCard({ tier, topic }: { tier: Tier; topic: string }) {
  return (
    <article
      className={`flex flex-col rounded-xl border bg-cream p-6 transition-colors ${
        tier.destaque ? "border-olive" : "border-ink-15 hover:border-olive"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[17px] font-medium tracking-tight text-ink">
          {tier.name}
        </h3>
        {tier.destaque && (
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-olive">
            recomendado
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-40">
          a partir de
        </p>
        <p
          className="mt-1 font-display font-medium tracking-tight text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", lineHeight: "1" }}
        >
          {brl(tier.from)}
          {tier.recorrente && (
            <span className="text-[14px] font-normal text-ink-55">/mês</span>
          )}
        </p>
        <p className="mt-2 font-mono text-[11px] text-ink-55">{tier.timeline}</p>
      </div>

      <p className="mt-4 text-[13.5px] leading-[1.55] text-ink-70">{tier.scope}</p>

      <ul className="mt-4 flex flex-col gap-2 text-[13px] leading-[1.5] text-ink-70">
        {tier.deliverables.map((d) => (
          <li key={d} className="grid grid-cols-[14px_1fr] gap-2">
            <span aria-hidden className="text-ink-40">
              —
            </span>
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <a
        href={`/contato?topic=${topic}`}
        className="servico-conversar focus-ring mt-6"
      >
        conversar →
      </a>
    </article>
  );
}
