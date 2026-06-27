import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BotBuilderFeature } from "@/components/sections/BotBuilderFeature";
import { Diagnostico } from "@/components/sections/Diagnostico";
import { ServicosSection } from "@/components/sections/ServicosSection";
import { CasosSection } from "@/components/sections/CasosSection";
import { Method } from "@/components/sections/Method";
import { CTAForm } from "@/components/sections/CTAForm";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  professionalServiceJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Engenharia de processos, integrações e automação`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Engenharia de processos, integrações e automação`,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <BotBuilderFeature />
        <Diagnostico />
        <ServicosSection />
        <CasosSection />
        <Method />
        <CTAForm />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd()),
        }}
      />
    </>
  );
}
