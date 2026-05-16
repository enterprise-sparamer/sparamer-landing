import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/components/casos/CaseCard";
import { CasosHero } from "@/components/casos/CasosHero";
import { AntiCasos } from "@/components/casos/AntiCasos";
import { getAllCases, getAntiCases } from "@/lib/cases";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Casos";
const DESCRIPTION =
  "Catálogo de casos construídos. Projetos reais, clientes anonimizados, números preservados.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/casos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/casos"),
  },
};

export default function CasosPage() {
  const casos = getAllCases();
  const antiCasos = getAntiCases();

  return (
    <>
      <Navbar />
      <main id="main" className="casos-page">
        <CasosHero total={casos.length} />

        <section className="casos-grid" aria-label="Catálogo de casos">
          {casos.map((caso, i) => (
            <CaseCard
              key={caso.id}
              caso={caso}
              index={i}
              total={casos.length}
            />
          ))}
        </section>

        <AntiCasos data={antiCasos} />

        <section
          className="casos-final-cta"
          aria-labelledby="casos-final-cta-title"
        >
          <p className="casos-final-cta__hook">Tem um problema parecido?</p>
          <h2
            id="casos-final-cta-title"
            className="casos-final-cta__title"
          >
            VAMOS CONVERSAR.
          </h2>
          <div className="casos-final-cta__actions">
            <Button href="/contato" variant="primary" size="lg">
              COMEÇAR UM PROJETO <span aria-hidden="true">▶</span>
            </Button>
            <Link href="/consulta" className="casos-final-cta__alt">
              OU AGENDE UMA CONSULTA GRATUITA →
            </Link>
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
              { name: "Casos", path: "/casos" },
            ]),
          ),
        }}
      />
    </>
  );
}
