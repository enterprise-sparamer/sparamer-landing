import Link from "next/link";
import { getHomeCases } from "@/lib/cases";
import { CaseCard } from "./CaseCard";

export function CasosSection() {
  const casos = getHomeCases();
  if (casos.length === 0) return null;

  return (
    <section
      id="casos"
      aria-labelledby="casos-heading"
      className="casos-section"
    >
      <header className="casos-header">
        <div className="mono-label">casos recentes</div>
        <h2 id="casos-heading" className="casos-h2">
          O que já construímos.
        </h2>
        <p className="casos-lead">
          Três projetos reais — clientes anonimizados, números preservados.
        </p>
      </header>

      <div className="casos-grid">
        {casos.map((caso) => (
          <CaseCard key={caso.id} caso={caso} variant="home" />
        ))}
      </div>

      <div className="casos-footer">
        <Link href="/casos" className="case-card__cta focus-ring">
          ver todos os casos <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
