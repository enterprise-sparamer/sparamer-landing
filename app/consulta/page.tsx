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
