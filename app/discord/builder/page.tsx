import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

const TITLE = "Construtor — em breve";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "O editor visual do Sparamer Bot Builder está a caminho. Conheça o produto e os planos.",
  alternates: { canonical: "/discord/builder" },
  // Placeholder route — keep it out of the index until the builder ships.
  robots: { index: false, follow: true },
};

export default function BuilderComingSoonPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative z-10 mx-auto flex min-h-[70vh] max-w-[760px] flex-col justify-center px-6 py-32 lg:px-12"
      >
        <p className="font-mono text-[12px] tracking-[0.16em] text-ink-55">
          Sparamer Bot Builder · construtor
        </p>
        <h1
          className="mt-6 font-display font-medium tracking-tight text-ink"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: "1", letterSpacing: "-0.03em" }}
        >
          O construtor visual <span className="text-ink-40">está a caminho.</span>
        </h1>
        <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.6] text-ink-70">
          Estamos finalizando o editor de fluxos arrastáveis. Enquanto ele não
          abre, dá para conhecer o produto inteiro — nós, modelos de execução,
          scripts Lua e planos — e entrar na fila para o lançamento.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/discord" variant="primary" size="lg">
            Ver o Bot Builder <span aria-hidden>→</span>
          </Button>
          <a
            href="/contato?topic=bot-builder"
            className="text-[15px] text-ink-70 underline decoration-ink-15 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
          >
            Avisar-me no lançamento
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
