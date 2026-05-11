import type { ReactNode } from "react";

export type ServicoCardProps = {
  number: string;
  title: string;
  subtitle: string;
  painLine: string;
  deliverables: string[];
  svg: ReactNode;
  conversarHref: string;
};

export function ServicoCard({
  number,
  title,
  subtitle,
  painLine,
  deliverables,
  svg,
  conversarHref,
}: ServicoCardProps) {
  return (
    <article className="servico-card">
      <div className="servico-shape">{svg}</div>
      <div className="servico-num">{number}</div>
      <h3 className="servico-title">{title}</h3>
      <p className="servico-subtitle">{subtitle}</p>
      <p className="servico-pain">{painLine}</p>
      <ul className="servico-inclui">
        {deliverables.map((d) => (
          <li key={d}>— {d}</li>
        ))}
      </ul>
      <a className="servico-conversar focus-ring" href={conversarHref}>
        conversar →
      </a>
    </article>
  );
}
