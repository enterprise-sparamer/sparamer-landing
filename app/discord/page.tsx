import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import {
  nodeCategories,
  executionModels,
  luaExample,
  BUILDER_HREF,
} from "@/lib/botBuilder";
import { PlanCards } from "@/components/PlanCards";
import { BotFlowEditor } from "@/components/BotFlowEditor";
import { DiscordLogo } from "@/components/DiscordLogo";
import { Reveal } from "@/components/Reveal";
import { serviceLines, brl } from "@/lib/precos";

const TITLE = "Sparamer Bot Builder — bots de Discord sem código";
const DESCRIPTION =
  "Crie, configure e publique bots de Discord com um editor visual de fluxos — estilo Zapier e Apple Shortcuts — sobre o Google Cloud. Comece grátis.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/discord" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/discord"),
  },
};

export default function DiscordPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1120px] px-6 pb-16 pt-36 lg:px-12 lg:pb-24 lg:pt-44">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blurple shadow-[0_2px_10px_rgba(88,101,242,0.35)]">
                <DiscordLogo className="h-5 w-5" fill="#ffffff" />
              </span>
              <p className="font-mono text-[12px] tracking-[0.16em] text-blurple">
                Sparamer Bot Builder · produto
              </p>
            </div>
            <h1
              className="mt-6 max-w-[16ch] font-display font-medium tracking-tight text-ink"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5.25rem)", lineHeight: "0.96", letterSpacing: "-0.035em" }}
            >
              Bots de Discord, <span className="text-ink-40">arrastando blocos.</span>
            </h1>
            <p className="mt-7 max-w-[54ch] text-[16px] leading-[1.6] text-ink-70">
              Um editor visual de fluxos — no espírito do Zapier e do Apple
              Shortcuts — para criar, configurar e publicar bots de Discord. Roda
              sobre o Google Cloud, com deploy em um clique. Sem servidor para
              manter, sem código obrigatório.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={BUILDER_HREF} variant="discord" size="lg">
                Começar grátis <span aria-hidden>→</span>
              </Button>
              <a
                href="#planos"
                className="text-[15px] text-ink-70 underline decoration-ink-15 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
              >
                Ver planos
              </a>
            </div>

            {/* Interactive editor demo — React Flow (the product's real framework) */}
            <BotFlowEditor className="mt-14" />
          </div>
        </section>

        <div className="hairline" />

        {/* ── Antes / Depois ────────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24">
          <h2
            className="max-w-[20ch] font-display font-medium tracking-tight text-ink"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
          >
            Dois caminhos antigos. <span className="text-ink-40">Um só, agora.</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-ink-15 bg-cream p-7">
              <p className="font-mono text-[12px] tracking-[0.12em] text-ink-55">Antes</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-70">
                Horas escrevendo código em Node.js ou Python, configurando e
                mantendo servidores (VPS), lidando com a API do Discord na mão —
                e pagando hospedagem fixa todo mês. Ou plataformas no-code presas
                a formulários, sem personalização real.
              </p>
            </div>
            <div className="rounded-xl border border-olive bg-cream p-7" style={{ boxShadow: "inset 0 0 0 1px var(--color-olive)" }}>
              <p className="font-mono text-[12px] tracking-[0.12em] text-olive">Com o Bot Builder</p>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink">
                Monta o fluxo em minutos arrastando nós de eventos e ações,
                adiciona lógica avançada com scripts Lua quando precisa, e publica
                em um clique. A infraestrutura escala sozinha no Google Cloud, e
                você paga pelo uso.
              </p>
            </div>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Como funciona — node categories ───────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24">
          <h2
            className="font-display font-medium tracking-tight text-ink"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
          >
            Blocos que se conectam.
          </h2>
          <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-ink-70">
            Cada bot é um grafo de nós. Você arrasta gatilhos, condições e ações,
            conecta tudo visualmente, e desce ao código só quando quer.
          </p>
          <Reveal className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ink-15 bg-ink-15 sm:grid-cols-2 lg:grid-cols-3">
            {nodeCategories.map((cat) => (
              <div key={cat.name} className="bg-cream p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <h3 className="font-display text-[16px] font-medium tracking-tight text-ink">
                    {cat.name}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-70">
                  {cat.examples}
                </p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ── Modelos de execução ───────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-12 lg:pb-24">
          <h2
            className="font-display font-medium tracking-tight text-ink"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
          >
            Três modos de rodar.
          </h2>
          <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-ink-70">
            Você escolhe como cada bot executa — e paga só pelo que usa.
          </p>
          <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
            {executionModels.map((m) => (
              <div
                key={m.name}
                className="flex flex-col rounded-xl border border-ink-15 bg-cream p-7 transition duration-200 hover:-translate-y-1 hover:border-olive motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <h3 className="font-display text-[18px] font-medium tracking-tight text-ink">
                  {m.name}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-ink-70">{m.desc}</p>
                <p className="mt-5 font-mono text-[12px] text-ink-55">{m.infra}</p>
              </div>
            ))}
          </Reveal>
        </section>

        <div className="hairline" />

        {/* ── Lua scripting ─────────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="font-mono text-[12px] tracking-[0.12em] text-ceramica">Para quem quer mais</p>
              <h2
                className="mt-4 font-display font-medium tracking-tight text-ink"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
              >
                Quando o no-code acaba, o Lua começa.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.6] text-ink-70">
                Um nó de script Lua, em sandbox seguro, libera lógica avançada sem
                abrir mão da segurança: limites de tempo e memória, sem acesso ao
                sistema, e a API completa do bot à disposição.
              </p>
            </div>
            <pre
              className="overflow-x-auto rounded-xl border border-ink-15 bg-ink p-6 font-mono text-[12.5px] leading-[1.65] text-cream"
              style={{ tabSize: 2 }}
            >
              <code>{luaExample}</code>
            </pre>
          </div>
        </section>

        {/* ── Por que GCP ───────────────────────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-12 lg:pb-24">
          <div className="rounded-xl border border-ink-15 bg-cream p-7 lg:p-9">
            <p className="font-mono text-[12px] tracking-[0.12em] text-ink-55">
              Sobre o Google Cloud
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              <Why title="Cache que voa">
                Memorystore (Redis) na frente dos dados — respostas em
                milissegundos, mesmo no pico.
              </Why>
              <Why title="Performance sob demanda">
                Cloud Run escala de zero ao volume que precisar e volta, sem
                servidor ocioso.
              </Why>
              <Why title="Escala global">
                Do MVP ao 24/7 em GKE, a mesma plataforma cresce com a sua
                comunidade.
              </Why>
            </div>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Planos ────────────────────────────────────────────── */}
        <section id="planos" className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24" style={{ scrollMarginTop: "96px" }}>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h2
              className="font-display font-medium tracking-tight text-ink"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
            >
              Planos
            </h2>
            <p className="text-[13px] text-ink-55">Comece grátis. Suba quando crescer.</p>
          </div>

          <Reveal className="mt-10">
            <PlanCards />
          </Reveal>
          <p className="mt-6 text-[12.5px] leading-[1.6] text-ink-55">
            Preços em BRL, por mês. O plano grátis é o próprio construtor — sem
            cartão. Precisa de algo sob medida? A consultoria da Sparamer constrói
            com você.{" "}
            <a href="/precos" className="text-ink underline decoration-ink-15 underline-offset-4 hover:text-ceramica hover:decoration-ceramica">
              Ver consultoria
            </a>
            .
          </p>
        </section>

        <div className="hairline" />

        {/* ── Além do produto · consultoria ─────────────────────── */}
        <section className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              className="font-display font-medium tracking-tight text-ink"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)", lineHeight: "1.08", letterSpacing: "-0.025em" }}
            >
              Além do produto, consultoria sob medida.
            </h2>
            <a
              href="/precos"
              className="text-[14px] text-ink underline decoration-ceramica decoration-1 underline-offset-[5px] transition-colors hover:text-ceramica"
            >
              ver preços da consultoria →
            </a>
          </div>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-ink-70">
            O Bot Builder é o nosso produto. Quando o desafio vai além dele, a
            Sparamer constrói com você — no Zoho, em integrações e na arquitetura
            de performance no Google Cloud.
          </p>
          <Reveal className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceLines
              .filter((l) => l.id !== "diagnostico")
              .map((line) => (
                <a
                  key={line.id}
                  href={`/precos#${line.id}`}
                  className="flex flex-col rounded-xl border border-ink-15 bg-cream p-7 transition duration-200 hover:-translate-y-1 hover:border-olive motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <h3 className="font-display text-[18px] font-medium tracking-tight text-ink">
                    {line.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-ink-70">
                    {line.tagline}
                  </p>
                  <span className="mt-5 text-[13px] text-ink-55">
                    a partir de {brl(line.tiers[0].from)}{" "}
                    <span aria-hidden className="text-ceramica">→</span>
                  </span>
                </a>
              ))}
          </Reveal>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-blurple">
          <div className="mx-auto max-w-[1120px] px-6 py-20 lg:px-12 lg:py-24">
            <h2
              className="max-w-[18ch] font-display font-medium tracking-tight text-cream"
              style={{ fontSize: "clamp(1.85rem, 4vw, 3rem)", lineHeight: "1.05", letterSpacing: "-0.025em" }}
            >
              Seu primeiro bot em minutos. De graça.
            </h2>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button href={BUILDER_HREF} variant="secondary" size="lg">
                Abrir o construtor <span aria-hidden>→</span>
              </Button>
              <a
                href="/contato?topic=bot-builder"
                className="text-[15px] text-cream underline decoration-cream/40 underline-offset-[6px] transition-colors hover:decoration-cream"
              >
                Falar com a gente
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
              { name: "Bot Builder", path: "/discord" },
            ]),
          ),
        }}
      />
    </>
  );
}

function Why({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-[16px] font-medium tracking-tight text-ink">{title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-[1.55] text-ink-70">{children}</p>
    </div>
  );
}
