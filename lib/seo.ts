import type { Metadata } from "next";

// Single source of truth for the production domain.
// User must confirm this matches the deployed apex before launch.
export const SITE_URL = "https://sparamer.com";

export const SITE_NAME = "Sparamer";
export const SITE_LOCALE = "pt_BR";

// Company facts taken verbatim from app/contato and app/legal.
export const COMPANY = {
  name: SITE_NAME,
  legalName: "Luis Alfr Chap Gomez Cons Tecn Informacao Ltda",
  taxId: "65.977.336/0001-54",
  email: "contact@chapi.dev",
  phone: "+55 21 99183-0281",
  whatsappUrl: "https://wa.me/5521991830281",
  address: {
    streetAddress: "Rua Pais Leme, 215, sala 1713",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    region: "SP",
    postalCode: "05424-150",
    country: "BR",
  },
} as const;

export const DEFAULT_DESCRIPTION =
  "Agência brasileira de engenharia de processos. Integrações, automações e bots sob medida para empresas que precisam de código em produção.";

// Absolute URL helper for canonicals and OG.
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return new URL(clean, SITE_URL).toString();
}

// Re-usable OG defaults. Per-page metadata overrides title/description/url.
export const DEFAULT_OPEN_GRAPH: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: SITE_LOCALE,
  siteName: SITE_NAME,
  url: SITE_URL,
};

// JSON-LD builders. Each returns a plain object suitable for serialization.
type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.svg"),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    taxID: COMPANY.taxId,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${COMPANY.address.streetAddress} — ${COMPANY.address.neighborhood}`,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        availableLanguage: ["pt-BR", "es", "en"],
        areaServed: "BR",
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function professionalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: COMPANY.name,
    url: SITE_URL,
    image: absoluteUrl("/favicon.svg"),
    description: DEFAULT_DESCRIPTION,
    areaServed: { "@type": "Country", name: "Brasil" },
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
