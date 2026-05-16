interface CasosHeroProps {
  total: number;
  year?: number;
}

export function CasosHero({ total, year = 2026 }: CasosHeroProps) {
  return (
    <section className="casos-hero" aria-labelledby="casos-hero-title">
      <div className="casos-hero__strip">
        <span className="casos-hero__strip-item">CATÁLOGO</span>
        <span className="casos-hero__strip-rule" aria-hidden="true" />
        <span className="casos-hero__strip-item">
          Nº {String(total).padStart(2, "0")}
        </span>
        <span className="casos-hero__strip-rule" aria-hidden="true" />
        <span className="casos-hero__strip-item">{year}</span>
      </div>

      <div className="casos-hero__grid">
        <h1 className="casos-hero__title" id="casos-hero-title">
          <span className="casos-hero__line casos-hero__line--1">CASOS</span>
          <span className="casos-hero__line casos-hero__line--2">
            CONSTRUÍDOS<span className="casos-hero__period">.</span>
          </span>
        </h1>

        <div className="casos-hero__art" aria-hidden="true">
          <span className="casos-hero__shape casos-hero__shape--square" />
          <span className="casos-hero__shape casos-hero__shape--circle" />
          <span className="casos-hero__shape casos-hero__shape--bar" />
        </div>
      </div>

      <p className="casos-hero__lead">
        Projetos reais. Clientes anonimizados. Números preservados.
      </p>
    </section>
  );
}
