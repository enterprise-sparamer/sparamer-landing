import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { CaseTransformation } from "@/components/casos/CaseTransformation";
import { getAllCases, getCaseBySlug } from "@/lib/cases";
import {
  FRENTE_ACCENT,
  FRENTE_LABEL,
} from "@/lib/casos-constants";
import {
  COMPANY,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaseBySlug(slug);
  if (!caso) return {};

  return {
    title: `${caso.titulo} · Casos`,
    description: caso.subtitulo,
    alternates: { canonical: `/casos/${caso.slug}` },
    openGraph: {
      title: caso.titulo,
      description: caso.subtitulo,
      url: absoluteUrl(`/casos/${caso.slug}`),
      type: "article",
    },
  };
}

export default async function CasoDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caso = getCaseBySlug(slug);
  if (!caso) notFound();

  const allCasos = getAllCases();
  const idx = allCasos.findIndex((c) => c.slug === caso.slug);
  const num = String(idx + 1).padStart(2, "0");
  const total = String(allCasos.length).padStart(2, "0");
  const prev = idx > 0 ? allCasos[idx - 1] : null;
  const next = idx < allCasos.length - 1 ? allCasos[idx + 1] : null;
  const accent = FRENTE_ACCENT[caso.frente];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caso.titulo,
    description: caso.subtitulo,
    inLanguage: "pt-BR",
    url: absoluteUrl(`/casos/${caso.slug}`),
    mainEntityOfPage: absoluteUrl(`/casos/${caso.slug}`),
    datePublished: `${caso.cliente.ano}-01-01`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
    about: { "@type": "Thing", name: FRENTE_LABEL[caso.frente] },
    keywords: caso.stack.join(", "),
    isAccessibleForFree: true,
    creator: { "@id": `${SITE_URL}/#organization` },
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: COMPANY.address.country,
        addressLocality: COMPANY.address.city,
      },
    },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Casos", path: "/casos" },
    { name: caso.titulo, path: `/casos/${caso.slug}` },
  ]);

  return (
    <>
      <Navbar />
      <main
        id="main"
        className="caso-page"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        <div className="caso-page__strip">
          <Link href="/casos" className="caso-page__back">
            ← CATÁLOGO
          </Link>
          <span className="caso-page__strip-meta">
            CASO Nº {num} / {total} · {caso.cliente.ano}
          </span>
        </div>

        <header className="caso-page__hero">
          <div className="caso-page__hero-frente">
            <span className="caso-page__hero-bar" aria-hidden="true" />
            <span className="caso-page__hero-frente-label">
              {FRENTE_LABEL[caso.frente]}
            </span>
          </div>

          <div className="caso-page__hero-numeral" aria-hidden="true">
            {num}
          </div>

          <h1 className="caso-page__hero-title">{caso.titulo}</h1>
          <p className="caso-page__hero-sub">{caso.subtitulo}</p>
        </header>

        <section className="caso-page__specs" aria-label="Ficha técnica">
          <dl className="caso-page__specs-grid">
            <div className="caso-page__spec">
              <dt>CLIENTE</dt>
              <dd>{caso.cliente.descricao}</dd>
            </div>
            <div className="caso-page__spec">
              <dt>PORTE</dt>
              <dd>{caso.cliente.porte}</dd>
            </div>
            <div className="caso-page__spec">
              <dt>REGIÃO</dt>
              <dd>{caso.cliente.regiao}</dd>
            </div>
            <div className="caso-page__spec">
              <dt>DURAÇÃO</dt>
              <dd>{caso.duracao_semanas} semanas</dd>
            </div>
            <div className="caso-page__spec">
              <dt>ENGAJAMENTO</dt>
              <dd>{caso.tipo_engajamento}</dd>
            </div>
            <div className="caso-page__spec">
              <dt>ANO</dt>
              <dd>{caso.cliente.ano}</dd>
            </div>
          </dl>
        </section>

        <section
          className="caso-page__section"
          aria-labelledby="contexto-heading"
        >
          <span className="caso-page__section-num" aria-hidden="true">
            01
          </span>
          <h2
            id="contexto-heading"
            className="caso-page__section-title"
          >
            CONTEXTO
          </h2>
          <p className="caso-page__prose">{caso.contexto}</p>
        </section>

        <section
          className="caso-page__section caso-page__section--accent"
          aria-labelledby="diagnostico-heading"
        >
          <span className="caso-page__section-num" aria-hidden="true">
            02
          </span>
          <h2
            id="diagnostico-heading"
            className="caso-page__section-title"
          >
            DIAGNÓSTICO
          </h2>
          <p className="caso-page__prose">{caso.diagnostico}</p>
        </section>

        <section
          className="caso-page__section"
          aria-labelledby="solucao-heading"
        >
          <span className="caso-page__section-num" aria-hidden="true">
            03
          </span>
          <h2
            id="solucao-heading"
            className="caso-page__section-title"
          >
            SOLUÇÃO
          </h2>
          <ol className="caso-page__solucao">
            {caso.solucao.map((step, i) => (
              <li key={i} className="caso-page__solucao-item">
                <span className="caso-page__solucao-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="caso-page__solucao-text">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="caso-page__section caso-page__section--results"
          aria-labelledby="resultados-heading"
        >
          <span className="caso-page__section-num" aria-hidden="true">
            04
          </span>
          <h2
            id="resultados-heading"
            className="caso-page__section-title"
          >
            RESULTADOS
          </h2>
          <div className="caso-page__results">
            {caso.resultados.map((r, i) => (
              <CaseTransformation
                key={i}
                resultado={r}
                frente={caso.frente}
                size="page"
              />
            ))}
          </div>
        </section>

        <section
          className="caso-page__section"
          aria-labelledby="stack-heading"
        >
          <span className="caso-page__section-num" aria-hidden="true">
            05
          </span>
          <h2
            id="stack-heading"
            className="caso-page__section-title"
          >
            STACK
          </h2>
          <ul className="caso-page__stack" aria-label="Tecnologias utilizadas">
            {caso.stack.map((tech) => (
              <li key={tech} className="caso-page__stack-chip">
                {tech.toLowerCase()}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="caso-page__cta"
          aria-labelledby="caso-cta-title"
        >
          <p className="caso-page__cta-hook">Tem um problema parecido?</p>
          <h2 id="caso-cta-title" className="caso-page__cta-title">
            VAMOS CONVERSAR.
          </h2>
          <Button href="/contato" variant="primary" size="lg">
            COMEÇAR UM PROJETO <span aria-hidden="true">▶</span>
          </Button>
        </section>

        <nav className="caso-page__nav" aria-label="Navegação entre casos">
          {prev ? (
            <Link
              href={`/casos/${prev.slug}`}
              className="caso-page__nav-link caso-page__nav-link--prev"
            >
              <span className="caso-page__nav-dir">← CASO ANTERIOR</span>
              <span className="caso-page__nav-title">{prev.titulo}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/casos/${next.slug}`}
              className="caso-page__nav-link caso-page__nav-link--next"
            >
              <span className="caso-page__nav-dir">PRÓXIMO CASO →</span>
              <span className="caso-page__nav-title">{next.titulo}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumb]),
        }}
      />
    </>
  );
}
