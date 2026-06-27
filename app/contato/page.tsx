import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Contato";
const DESCRIPTION =
  "Fale com a Sparamer por e-mail ou comece pela consulta gratuita. Atendimento em português, espanhol, inglês, sueco e francês, com resposta em até 24h úteis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contato" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/contato"),
  },
};

const EMAIL = "contato@sparamer.com";

const company = [
  {
    label: "Razão social",
    value: "Luis Alfr Chap Gomez Cons Tecn Informacao Ltda",
  },
  { label: "CNPJ", value: "65.977.336/0001-54" },
  {
    label: "Endereço",
    value: "Rua Pais Leme, 215, sala 1713 — Pinheiros, São Paulo / SP — 05424-150",
  },
  { label: "Operação", value: "Remoto · Rio de Janeiro" },
  { label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
];

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        {/* ── Hero / contact split ────────────────────────────── */}
        <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
              {/* Left col */}
              <div className="lg:col-span-5">
                <Eyebrow number="01">Contato</Eyebrow>
                <h1
                  className="mt-8 font-display font-normal tracking-tight text-ink head-cling"
                  style={{
                    fontSize: "clamp(2.25rem, 5vw, 4rem)",
                    lineHeight: "1.05",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Conte o que está travando o seu negócio.{" "}
                  <span className="text-ink-55">
                    A gente responde rápido e sem rodeios.
                  </span>
                </h1>

                <p className="mt-8 max-w-md text-[15px] leading-[1.7] text-ink-55">
                  Sem formulário interminável, sem sequência automatizada de
                  e-mails. E-mail direto com quem realmente vai resolver — ou
                  comece pela consulta gratuita.
                </p>

                <dl className="mt-12 space-y-5 border-t border-ink-15 pt-10">
                  <ContactRow label="Atendimento">
                    <span className="text-ink-55">
                      Português · Español · English · Svenska · Français
                    </span>
                  </ContactRow>
                  <ContactRow label="Horário">
                    <span className="text-ink-55">
                      Horário comercial · UTC−3
                    </span>
                  </ContactRow>
                  <ContactRow label="Resposta típica">
                    <span className="text-ink-55">
                      Em até 24h úteis
                    </span>
                  </ContactRow>
                </dl>
              </div>

              {/* Right col — CTA card */}
              <div className="lg:col-span-7">
                <div className="border border-ink-15 bg-cream p-8 lg:p-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mostarda-strong">
                    Canal mais rápido
                  </p>
                  <h2
                    className="mt-5 font-display font-normal tracking-tight text-ink"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                      lineHeight: "1.1",
                    }}
                  >
                    E-mail.{" "}
                    <span className="text-ink-55">
                      Direto com quem executa.
                    </span>
                  </h2>

                  <p className="mt-6 text-[15px] leading-[1.7] text-ink-55">
                    Escreva uma frase sobre o que precisa resolver. A gente
                    responde em horário comercial e já te direciona o próximo
                    passo.
                  </p>

                  <div className="mt-10">
                    <Button href={`mailto:${EMAIL}`} size="lg">
                      Escrever um e-mail{" "}
                      <span aria-hidden>→</span>
                    </Button>
                  </div>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-6 inline-block font-mono text-[11px] text-ink-55 transition-colors hover:text-ink"
                  >
                    {EMAIL}
                  </a>

                  <div className="hairline my-12" />

                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-40">
                    Prefere começar pelo diagnóstico?
                  </p>
                  <a
                    href="/consulta"
                    className="mt-3 inline-block font-display text-[20px] text-ink underline decoration-ink-15 underline-offset-[6px] transition-colors hover:text-ceramica hover:decoration-ceramica"
                  >
                    Consulta gratuita →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hairline" />

        {/* ── Company reference block ─────────────────────────── */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <Eyebrow number="02">Identificação</Eyebrow>
                <h2
                  className="mt-6 font-display font-normal tracking-tight text-ink"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    lineHeight: "1.1",
                  }}
                >
                  Dados para nota fiscal{" "}
                  <span className="text-ink-55">e contrato.</span>
                </h2>
                <p className="mt-6 text-[14px] leading-[1.7] text-ink-55">
                  Informações completas da empresa para emissão de notas
                  fiscais, contratos e cadastro como fornecedor no seu sistema.
                </p>
              </div>

              <div className="lg:col-span-8">
                <dl className="space-y-5 border-t border-ink-15 pt-10">
                  {company.map((row) => (
                    <ContactRow key={row.label} label={row.label}>
                      {"href" in row && row.href ? (
                        <a
                          href={row.href}
                          className="text-ink transition-colors hover:text-ceramica"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-ink">{row.value}</span>
                      )}
                    </ContactRow>
                  ))}
                </dl>
              </div>
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
              { name: "Contato", path: "/contato" },
            ]),
          ),
        }}
      />
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-6 border-b border-ink-15 pb-4 last:border-0">
      <dt className="eyebrow">{label}</dt>
      <dd className="col-span-2 text-[14px]">{children}</dd>
    </div>
  );
}
