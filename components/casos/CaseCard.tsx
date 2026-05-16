import Link from "next/link";
import type { Case } from "@/types/cases";
import { FRENTE_ACCENT, FRENTE_LABEL } from "@/lib/casos-constants";
import { CaseTransformation } from "./CaseTransformation";

interface CaseCardProps {
  caso: Case;
  index: number;
  total: number;
}

export function CaseCard({ caso, index, total }: CaseCardProps) {
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");
  const accent = FRENTE_ACCENT[caso.frente];

  return (
    <article
      className="caso-card"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Link href={`/casos/${caso.slug}`} className="caso-card__link">
        <header className="caso-card__head">
          <div className="caso-card__bar" aria-hidden="true" />
          <div className="caso-card__head-meta">
            <span className="caso-card__frente">
              {FRENTE_LABEL[caso.frente]}
            </span>
            <span className="caso-card__index">
              Nº {num}
              <span className="caso-card__index-of"> / {totalStr}</span>
            </span>
          </div>
        </header>

        <div className="caso-card__body">
          <div className="caso-card__numeral" aria-hidden="true">
            {num}
          </div>

          <div className="caso-card__content">
            <h3 className="caso-card__title">{caso.titulo}</h3>

            <p className="caso-card__cliente">
              {caso.cliente.descricao} · {caso.cliente.porte} ·{" "}
              {caso.cliente.ano}
            </p>

            {caso.resultados[0] && (
              <CaseTransformation
                resultado={caso.resultados[0]}
                frente={caso.frente}
                size="card"
              />
            )}

            <ul className="caso-card__stack">
              {caso.stack.map((tech) => (
                <li key={tech} className="caso-card__chip">
                  {tech.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="caso-card__cta">
          <span className="caso-card__cta-label">VER CASO COMPLETO</span>
          <span className="caso-card__cta-arrow" aria-hidden="true">
            ▶
          </span>
        </footer>
      </Link>
    </article>
  );
}
