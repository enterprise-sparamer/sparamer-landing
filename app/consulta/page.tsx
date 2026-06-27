import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Diagnostico } from "@/components/sections/Diagnostico";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Consulta de automação";
const DESCRIPTION =
  "Receba um plano de automação e integrações sob medida para a sua empresa. Três perguntas, sem custo, com resposta por e-mail em até 24h úteis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/consulta" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/consulta"),
  },
};

export default function ConsultaPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        {/* Page-level h1 for the dedicated route; visible only to assistive tech.
            The visible section heading inside <Diagnostico /> is intentionally an h2. */}
        <h1
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Consulta de automação — Sparamer
        </h1>
        <Diagnostico />
        <section className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-12">
          <div className="flex flex-col gap-3 border-t border-ink-15 pt-8 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="max-w-[52ch] text-[14px] leading-[1.6] text-ink-70">
              Esta consulta é gratuita e sem compromisso. Para uma auditoria
              completa do seu ambiente, com escopo e orçamento fechados, veja o{" "}
              <strong className="font-medium text-ink">
                diagnóstico aprofundado
              </strong>{" "}
              — pago e creditável no projeto.
            </p>
            <a
              href="/precos#diagnostico"
              className="servicos-precos-link focus-ring whitespace-nowrap"
            >
              ver planos de diagnóstico →
            </a>
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
              { name: "Consulta", path: "/consulta" },
            ]),
          ),
        }}
      />
    </>
  );
}
