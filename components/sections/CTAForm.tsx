"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Eyebrow } from "../ui/Eyebrow";
import { cn } from "@/lib/cn";

const INBOX = "contato@sparamer.com";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function CTAForm() {
  const [submitted, setSubmitted] = useState(false);
  const [mailtoHref, setMailtoHref] = useState(`mailto:${INBOX}`);
  const reduced = useReducedMotion();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_url")) return;

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = `Sparamer — contato de ${name || "site"}`;
    const lines = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      company ? `Empresa: ${company}` : null,
      "",
      "Contexto:",
      message,
    ].filter((l): l is string => l !== null);

    const href =
      `mailto:${INBOX}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    setMailtoHref(href);
    setSubmitted(true);
    // Open the mail client in a new tab so the user stays on the success view
    // if their device cannot handle the mailto: scheme.
    window.open(href, "_blank", "noopener");
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="relative overflow-hidden bg-mostarda py-20 lg:py-24"
    >
      {/* Paper grain — Hero-inspired */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Top hairline rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-ink)", opacity: 0.15, zIndex: 2 }}
      />

      <motion.div
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-12"
        style={{ zIndex: 2 }}
      >
        {/* Header */}
        <motion.header
          variants={fade}
          className="grid gap-8 border-b border-ink/15 pb-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12"
        >
          <div className="min-w-0">
            <Eyebrow number="06">Contato</Eyebrow>
            <h2
              id="contato-heading"
              className="mt-4 font-display font-medium tracking-tight text-ink"
              style={{
                fontSize: "clamp(1.875rem, 4.4vw, 3.25rem)",
                lineHeight: "1.02",
                letterSpacing: "-0.025em",
              }}
            >
              Vamos transformar o seu<br className="hidden sm:inline" />{" "}
              processo em sistema?
            </h2>
          </div>

          <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-3">
            <ContatoMark />
            <p className="max-w-[28ch] text-[13px] leading-[1.5] text-ink/80 lg:text-right">
              Consulta inicial em até 24h úteis. PT · ES · EN.
            </p>
          </div>
        </motion.header>

        {/* Body */}
        <motion.div
          variants={fade}
          className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left column — coordinates */}
          <aside className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
              Coordenadas
            </p>

            <dl className="mt-5">
              <Row label="E-mail">
                <a
                  href={`mailto:${INBOX}`}
                  className="text-ink underline decoration-ink/40 decoration-1 underline-offset-[5px] transition-colors hover:decoration-ink"
                >
                  {INBOX}
                </a>
              </Row>
              <Row label="Sede">São Paulo · Brasil · UTC−3</Row>
              <Row label="CNPJ">65.977.336/0001-54</Row>
            </dl>

            <p className="mt-6 font-mono text-[11px] leading-[1.6] uppercase tracking-[0.10em] text-ink/55">
              Conversa direta com quem executa.
            </p>
          </aside>

          {/* Right column — form card on cream */}
          <div className="lg:col-span-8">
            <div className="relative border border-ink/20 bg-cream shadow-[0_1px_0_0_rgba(26,26,26,0.04)]">
              <span
                aria-hidden
                className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.20em] text-ink-40"
              >
                FORM-06
              </span>

              <div className="p-6 lg:p-8">
                {submitted ? (
                  <div className="flex flex-col items-start gap-4 py-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-olive text-olive">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12 L 10 17 L 19 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h3
                      className="font-display font-medium tracking-tight text-ink"
                      style={{ fontSize: "1.25rem", lineHeight: "1.2" }}
                    >
                      Mensagem pronta para envio.
                    </h3>
                    <p className="max-w-md text-[14px] leading-[1.6] text-ink-70">
                      Se o cliente de e-mail não abriu sozinho, use o botão
                      abaixo ou escreva direto para{" "}
                      <a
                        href={`mailto:${INBOX}`}
                        className="text-ink underline decoration-olive decoration-1 underline-offset-[5px] hover:text-olive"
                      >
                        {INBOX}
                      </a>
                      .
                    </p>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-2.5 text-[13px] font-medium tracking-tight text-cream transition-colors duration-200 hover:bg-ink focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:[outline-offset:3px]"
                    >
                      Abrir cliente de e-mail
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        width: 1,
                        height: 1,
                        overflow: "hidden",
                      }}
                    >
                      <label htmlFor="company_url">Não preencher</label>
                      <input
                        id="company_url"
                        name="company_url"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Field
                        label="Nome"
                        name="name"
                        placeholder="Nome completo"
                        required
                        autoComplete="name"
                        autoCapitalize="words"
                      />
                      <Field
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="voce@empresa.com"
                        required
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                      />
                    </div>
                    <Field
                      label="Empresa"
                      name="company"
                      placeholder="Opcional"
                      autoComplete="organization"
                      autoCapitalize="words"
                    />

                    <div>
                      <label htmlFor="message" className="mb-2 block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-55">
                          Sobre o seu projeto
                          <span aria-hidden className="text-olive"> *</span>
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Escopo, prazo estimado e contexto técnico."
                        className="w-full resize-none border-b border-ink-15 bg-transparent py-2 text-[14px] leading-[1.6] text-ink placeholder:text-ink-55 transition-colors focus:border-olive focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-ink-15 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-55">
                        Envio via cliente de e-mail
                      </p>
                      <button
                        type="submit"
                        disabled={submitted}
                        aria-disabled={submitted}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full bg-olive px-6 py-2.5 text-[13px] font-medium tracking-tight text-cream transition-colors duration-200",
                          "hover:bg-ink focus-visible:outline-none focus-visible:[outline:2px_solid_var(--color-ink)] focus-visible:[outline-offset:3px] active:scale-[0.98]",
                          "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-olive"
                        )}
                      >
                        Enviar
                        <span aria-hidden>→</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom rule — Hero-inspired tech-stack line */}
        <motion.div
          variants={fade}
          className="mt-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-5"
        >
          <span className="font-mono text-[12px] text-ink/70">
            zoho · discord · stripe · make · n8n · node · python
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
            Sparamer · 2026
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Geometric mark — echoes SistemaComposition primitives ─────────── */

function ContatoMark() {
  return (
    <svg
      viewBox="0 0 120 80"
      role="img"
      aria-label="Composição: círculo oliva, quadrado e linha de transmissão"
      className="block h-auto w-[120px] flex-shrink-0"
    >
      <rect
        x="50"
        y="20"
        width="40"
        height="40"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <circle cx="28" cy="40" r="16" fill="var(--color-olive)" />
      <line
        x1="92"
        y1="40"
        x2="116"
        y2="40"
        stroke="var(--color-ink)"
        strokeWidth="1.25"
      />
      <path
        d="M 110 34 L 118 40 L 110 46"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[72px_1fr] items-baseline gap-3 border-b border-ink/15 py-3 text-[13px] leading-[1.5]">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
        {label}
      </dt>
      <dd className="text-ink/85">{children}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  autoComplete,
  autoCapitalize,
  inputMode,
  spellCheck,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  spellCheck?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-55">
          {label}
          {required && <span aria-hidden className="text-olive"> *</span>}
        </span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        spellCheck={spellCheck}
        className="w-full border-b border-ink-15 bg-transparent py-2 text-[14px] md:text-[14px] text-ink placeholder:text-ink-55 transition-colors focus:border-olive focus:outline-none"
      />
    </div>
  );
}
