import Link from "next/link";
import { FRENTE_LABEL, type Case } from "@/lib/cases";

type Variant = "home" | "list";

export function CaseCard({ caso, variant }: { caso: Case; variant: Variant }) {
  const href = `/casos/${caso.slug}`;
  const featured = caso.resultados[0];
  const resultsToShow =
    variant === "home" ? caso.resultados.slice(0, 1) : caso.resultados.slice(0, 3);

  return (
    <article className={`case-card case-card--${variant}`}>
      <div className="case-card__meta">
        <span className="case-card__frente">{FRENTE_LABEL[caso.frente]}</span>
        <span className="case-card__dot" aria-hidden="true">·</span>
        <span className="case-card__year">{caso.cliente.ano}</span>
      </div>

      <h3 className="case-card__title">
        <Link href={href} className="case-card__title-link">
          {caso.titulo}
        </Link>
      </h3>

      <p className="case-card__subtitle">{caso.subtitulo}</p>

      {variant === "list" && (
        <dl className="case-card__client">
          <div>
            <dt>porte</dt>
            <dd>{caso.cliente.porte}</dd>
          </div>
          <div>
            <dt>região</dt>
            <dd>{caso.cliente.regiao}</dd>
          </div>
          <div>
            <dt>duração</dt>
            <dd>{caso.duracao_semanas} semanas</dd>
          </div>
          <div>
            <dt>engajamento</dt>
            <dd>{caso.tipo_engajamento}</dd>
          </div>
        </dl>
      )}

      <ul className="case-card__results" aria-label="Resultados">
        {(variant === "home" ? [featured] : resultsToShow).map((r) => (
          <li key={r.metrica} className="case-result">
            <p className="case-result__metric">{r.metrica}</p>
            <p className="case-result__delta">
              <span className="case-result__before">{r.antes}</span>
              <span className="case-result__arrow" aria-hidden="true">→</span>
              <span className="case-result__after">{r.depois}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="case-card__footer">
        <ul className="case-card__stack" aria-label="Stack">
          {caso.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech.toLowerCase()}
            </li>
          ))}
        </ul>
        <Link href={href} className="case-card__cta focus-ring">
          ver caso <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
