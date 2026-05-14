import Link from "next/link";

const columns = [
  {
    title: "Serviços",
    links: [
      { href: "/#servicos", label: "Consultoria Zoho" },
      { href: "/#servicos", label: "Bots para Discord" },
      { href: "/#servicos", label: "Integrações entre sistemas" },
      { href: "/#servicos", label: "Solution Architecture" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/sobre", label: "Sobre" },
      { href: "/consulta", label: "Consulta gratuita" },
      { href: "/contato", label: "Contato" },
      { href: "/legal", label: "Legal · LGPD" },
    ],
  },
  {
    title: "Conecte",
    links: [
      { href: "https://wa.me/5521991830821", label: "WhatsApp", external: true },
      { href: "mailto:contact@chapi.dev", label: "contact@chapi.dev" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-15 bg-ink text-cream">
      {/* Constructivist accents — bleed across the entire slab */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[18%] z-0 h-[64%] w-[10%] origin-top-left bg-ceramica/90"
        style={{ transform: "rotate(-22deg)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[10%] z-0 h-28 w-28 rounded-full border border-mostarda/35 sm:h-40 sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[12%] bottom-[28%] z-0 h-10 w-10 bg-mostarda sm:h-14 sm:w-14"
      />

      {/* Main columns */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FooterWordmark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              Agência de automação, integrações e engenharia de processos.
              Conectamos sistemas, eliminamos tarefas manuais e ajudamos sua
              empresa a crescer sem inflar o time.
            </p>
            <div className="mt-6 flex flex-col gap-1 font-mono text-xs text-cream/45">
              <span>São Paulo · Brasil</span>
              <span>UTC−3 · Horário de Brasília</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream/55">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-cream transition-colors hover:text-mostarda-stamp"
                        >
                          {link.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-cream transition-colors hover:text-mostarda-stamp"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-cream/45">
            © {year} Sparamer · 65.977.336/0001-54
          </p>
          <div className="flex gap-5 font-mono text-xs text-cream/45">
            <Link href="/legal" className="hover:text-cream">Termos</Link>
            <Link href="/legal" className="hover:text-cream">Privacidade</Link>
          </div>
        </div>
      </div>

      {/* Giant wordmark — same form as the navbar (lowercase sans + mostarda dot), at architectural scale */}
      <div className="relative z-10 overflow-hidden border-t border-cream/15 px-6 pb-6 pt-6 lg:px-10 lg:pb-8 lg:pt-8">
        <div
          aria-label="Sparamer"
          className="select-none whitespace-nowrap font-sans font-medium leading-[0.82] text-cream"
          style={{ fontSize: "clamp(3.5rem, 18vw, 22rem)", letterSpacing: "-0.045em" }}
        >
          sparamer<span className="text-mostarda">.</span>
        </div>

        {/* Bottom register: tagline + coordinates */}
        <div className="mt-4 flex flex-col gap-3 border-t border-cream/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <span>Automação · Integrações · Engenharia de processos</span>
          <span className="tabular-nums">23°33′S · 46°38′W</span>
        </div>
      </div>
    </footer>
  );
}

/* Footer-local wordmark — matches the navbar form, recolored for the ink slab */
function FooterWordmark() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Sparamer — início"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="11" stroke="var(--color-cream)" strokeWidth="1" opacity="0.4" />
        <path
          d="M 12 1 A 11 11 0 0 1 12 23"
          stroke="var(--color-cream)"
          strokeWidth="1.25"
          fill="none"
        />
        <circle cx="12" cy="12" r="2.5" fill="var(--color-cream)" />
      </svg>
      <span className="font-sans text-[15px] font-medium tracking-[-0.01em] lowercase text-cream">
        sparamer<span className="text-mostarda">.</span>
      </span>
    </Link>
  );
}
