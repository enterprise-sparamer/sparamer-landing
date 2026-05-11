import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OPEN_GRAPH,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const HoverPreview = dynamic(
  () => import("@/components/HoverPreview").then((m) => m.HoverPreview),
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Engenharia de processos, integrações e automação`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    ...DEFAULT_OPEN_GRAPH,
    title: `${SITE_NAME} — Engenharia de processos, integrações e automação`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F1E8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable}`}
      style={
        {
          "--font-display": "var(--font-sans)",
        } as React.CSSProperties
      }
    >
      <body>
        {/* Global SVG defs — gooey filter for the liquid button blobs.
            Mounted once, referenced via filter: url(#liquid-goo). */}
        <svg
          aria-hidden
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute" }}
        >
          <defs>
            {/* Liquid mercury — strong merge for button blobs at any size,
                soft color-junction for the composition's olive×mustard join. */}
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        {children}
        <HoverPreview />
        <script
          type="application/ld+json"
          // Two top-level nodes; serialized as an array per JSON-LD spec.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
      </body>
    </html>
  );
}
