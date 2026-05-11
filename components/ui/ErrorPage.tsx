"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { errorNumeral, errorNumeralFallback, cssVar } from "@/lib/tokens";

export type ErrorCode = "400" | "401" | "403" | "404" | "500" | "503" | string;

type CtaAction =
  | { kind: "reload"; label: string }
  | { kind: "link"; label: string; href: string };

type Cta = CtaAction & { variant: "primary" | "ghost" };

export type ErrorPageProps = {
  code: ErrorCode;
  title: string;
  body: string;
  ctas?: Cta[];
  requestId?: string;
};

function defaultCtasFor(code: ErrorCode): Cta[] {
  if (code === "500" || code === "503") {
    return [
      { kind: "reload", label: "tentar novamente ↻", variant: "primary" },
      { kind: "link", label: "voltar para o início", href: "/", variant: "ghost" },
    ];
  }
  return [
    { kind: "link", label: "voltar para o início", href: "/", variant: "primary" },
    { kind: "link", label: "falar com a gente", href: "/contato", variant: "ghost" },
  ];
}

function formatTimestamp(now: Date) {
  try {
    const time = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    }).format(now);
    return `${time} brt`;
  } catch {
    return "—— brt";
  }
}

export function ErrorPage({
  code,
  title,
  body,
  ctas,
  requestId,
}: ErrorPageProps) {
  const resolvedCtas = ctas ?? defaultCtasFor(code);
  const numColor = errorNumeral[code] ?? errorNumeralFallback;

  const [timestamp, setTimestamp] = useState<string | null>(null);
  useEffect(() => {
    setTimestamp(formatTimestamp(new Date()));
  }, []);

  const ref = requestId && requestId.length > 0 ? requestId : "——";

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-15 bg-cream/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <Link
            href="/"
            className="text-[13px] font-medium text-ink-70 transition-colors hover:text-ink focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:[outline-offset:2px]"
          >
            ← início
          </Link>
        </nav>
      </header>

      <main className="relative">
        <section
          className="mx-auto flex flex-col items-center text-center"
          style={{
            maxWidth: "540px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "clamp(80px, 12vh, 160px)",
            paddingBottom: "clamp(80px, 12vh, 160px)",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(140px, 22vw, 240px)",
              fontWeight: 500,
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: numColor,
              paddingBottom: "36px",
            }}
          >
            {code}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.05em",
              margin: 0,
              marginBottom: "20px",
              color: cssVar.ink55,
            }}
          >
            erro {code}
          </p>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: cssVar.ink,
              margin: 0,
              marginBottom: "20px",
              fontStyle: "normal",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.55,
              maxWidth: "440px",
              margin: "0 auto",
              marginBottom: "36px",
              color: cssVar.ink70,
            }}
          >
            {body}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "18px",
              marginBottom: "48px",
            }}
          >
            {resolvedCtas.map((cta, i) => {
              if (cta.kind === "reload") {
                return (
                  <Button
                    key={i}
                    variant={cta.variant}
                    onClick={() => {
                      if (typeof window !== "undefined") window.location.reload();
                    }}
                    tabIndex={i + 1}
                  >
                    {cta.label}
                  </Button>
                );
              }
              return (
                <Button
                  key={i}
                  href={cta.href}
                  variant={cta.variant}
                  tabIndex={i + 1}
                >
                  {cta.label}
                </Button>
              );
            })}
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: cssVar.ink40,
              margin: 0,
            }}
          >
            ref · {ref} · {timestamp ?? "—— brt"}
          </p>
        </section>
      </main>
    </div>
  );
}
