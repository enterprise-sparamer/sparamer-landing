import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Sobre";
const DESCRIPTION =
  "Quem é a Sparamer, princípios de trabalho e dados da empresa. Engenharia de processos, integrações e automações sob medida.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/sobre"),
  },
};

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  letterSpacing: "0.08em",
  color: "var(--color-ink-55)",
  textTransform: "lowercase",
  fontStyle: "normal",
  margin: 0,
};

const hairlineRule: React.CSSProperties = {
  borderTop: "0.5px solid rgba(26, 26, 26, 0.2)",
};

const principios = [
  "Código no seu repositório desde o primeiro commit — sem lock-in.",
  "LGPD e NDA mútuo assinados antes de qualquer linha de código.",
  "Saída a qualquer momento, sem multa de cancelamento ou letrinha miúda.",
  "Auditoria do código e da arquitetura disponível sob solicitação.",
  "Preferência por código próprio bem feito em vez de terceirizar fora do escopo combinado.",
];

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        style={{
          background: "var(--color-cream)",
          color: "var(--color-ink)",
          fontStyle: "normal",
        }}
      >
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 96px) clamp(20px, 4vw, 32px)",
          }}
        >
          {/* ── Section 1 — Header (intro) ─────────────────────── */}
          <section style={{ paddingBottom: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                alignItems: "end",
                gap: "24px",
              }}
              className="sobre-header-grid"
            >
              <div>
                <p style={monoLabel}>sobre</p>
                <h1
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(26px, 3.2vw, 32px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    fontStyle: "normal",
                    margin: "16px 0 14px",
                  }}
                >
                  Quem é a Sparamer.
                </h1>
                <p
                  style={{
                    maxWidth: "460px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--color-ink-78)",
                    fontStyle: "normal",
                    margin: 0,
                  }}
                >
                  Agência brasileira de engenharia de processos, especializada
                  em integrações, automações e bots sob medida. Atendemos
                  empresas que já passaram do limite das ferramentas no-code e
                  precisam de código rodando em produção para continuar
                  crescendo.
                </p>
              </div>

              <div>
                <svg
                  viewBox="0 0 180 120"
                  width="100%"
                  height="auto"
                  aria-hidden="true"
                  style={{ display: "block" }}
                >
                  <line
                    x1="0"
                    y1="70"
                    x2="180"
                    y2="70"
                    stroke="#1A1A1A"
                    strokeOpacity="0.2"
                    strokeWidth="0.8"
                  />
                  <rect x="80" y="22" width="50" height="50" fill="#C9A227" />
                  <circle cx="42" cy="42" r="26" fill="#5A6B3A" />
                  <circle cx="146" cy="92" r="14" fill="#B4503A" />
                  <line
                    x1="140"
                    y1="0"
                    x2="140"
                    y2="70"
                    stroke="#1A1A1A"
                    strokeOpacity="0.35"
                    strokeWidth="0.6"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* ── Section 2 — Time (team) ────────────────────────── */}
          <section style={{ ...hairlineRule, padding: "24px 0" }}>
            <p style={{ ...monoLabel, marginBottom: "22px" }}>time</p>

            <div className="sobre-team-grid">
              {/* Member 1 — founder */}
              <article>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    color: "var(--color-ink-55)",
                    letterSpacing: "0.08em",
                    textTransform: "lowercase",
                    fontStyle: "normal",
                    margin: "0 0 6px",
                  }}
                >
                  fundadora · arquiteta de soluções
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "var(--color-ink)",
                    letterSpacing: "-0.005em",
                    fontStyle: "normal",
                    margin: "0 0 12px",
                  }}
                >
                  Agnes Mary Chaparro Gomez
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--color-ink-78)",
                    fontStyle: "normal",
                    margin: "0 0 14px",
                  }}
                >
                  Venezuelana radicada no Rio, depois de uma temporada no norte
                  da Suécia. Mais de cinco anos construindo automações em Python
                  e na nuvem — pipelines de RH e vendas, integrações de API e
                  arquiteturas sob medida no Google Cloud. Forte em todo o
                  ecossistema Zoho (CRM, Recruit, Projects, People, Analytics,
                  Sigma) e em GCP (Cloud Run, Cloud SQL, Cloud Build, Storage),
                  com a certificação Google Professional Cloud Developer a
                  caminho. Trabalha em português, espanhol, inglês, sueco e
                  francês.
                </p>

              </article>

              {/* Member 2 — David Gamboa */}
              <article>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    color: "var(--color-ink-55)",
                    letterSpacing: "0.08em",
                    textTransform: "lowercase",
                    fontStyle: "normal",
                    margin: "0 0 6px",
                  }}
                >
                  engenheiro de computação · sistemas e dados
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "var(--color-ink)",
                    letterSpacing: "-0.005em",
                    fontStyle: "normal",
                    margin: "0 0 12px",
                  }}
                >
                  David Gamboa
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--color-ink-78)",
                    fontStyle: "normal",
                    margin: "0 0 14px",
                  }}
                >
                  Engenheiro da computação. Experiência em bancos de dados, ERP
                  e construção de sistemas sob medida — a base que sustenta as
                  integrações e os dados de cada projeto.
                </p>

              </article>
            </div>
          </section>

          {/* ── Section 3 — Princípios ─────────────────────────── */}
          <section style={{ ...hairlineRule, padding: "24px 0" }}>
            <p style={{ ...monoLabel, marginBottom: "14px" }}>princípios</p>

            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {principios.map((text, i) => (
                <li
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr",
                    gap: "14px",
                    alignItems: "baseline",
                    padding: "6px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--color-ink-55)",
                      fontStyle: "normal",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      lineHeight: 1.55,
                      color: "var(--color-ink-85)",
                      fontStyle: "normal",
                    }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Section 4 — Empresa (legal/business info) ──────── */}
          <section style={{ ...hairlineRule, paddingTop: "24px" }}>
            <p style={{ ...monoLabel, marginBottom: "16px" }}>empresa</p>

            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                rowGap: "10px",
                columnGap: "18px",
                fontFamily: "var(--font-mono)",
                fontSize: "12.5px",
                margin: 0,
                fontStyle: "normal",
              }}
            >
              <dt style={dtStyle}>razão social</dt>
              <dd style={ddStyle}>
                Luis Alfr Chap Gomez Cons Tecn Informacao Ltda
              </dd>

              <dt style={dtStyle}>cnpj</dt>
              <dd style={ddStyle}>65.977.336/0001-54</dd>

              <dt style={dtStyle}>endereço</dt>
              <dd style={ddStyle}>São Paulo, BR · remoto do Rio</dd>

              <dt style={dtStyle}>contato</dt>
              <dd style={ddStyle}>contato@sparamer.com</dd>
            </dl>
          </section>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Sobre", path: "/sobre" },
            ]),
          ),
        }}
      />

      {/* Page-scoped styles: team/header grid responsive collapse. */}
      <style>{`
        .sobre-team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        @media (max-width: 720px) {
          .sobre-header-grid {
            grid-template-columns: 1fr !important;
          }
          .sobre-team-grid {
            grid-template-columns: 1fr;
            row-gap: 32px;
          }
        }
      `}</style>
    </>
  );
}

const dtStyle: React.CSSProperties = {
  color: "var(--color-ink-50)",
  letterSpacing: "0.05em",
  textTransform: "lowercase",
  fontStyle: "normal",
};

const ddStyle: React.CSSProperties = {
  color: "var(--color-ink-85)",
  margin: 0,
  fontStyle: "normal",
};

