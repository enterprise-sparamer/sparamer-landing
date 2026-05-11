import { ServicoCard, type ServicoCardProps } from "./ServicoCard";

const services: ServicoCardProps[] = [
  {
    number: "01",
    title: "Zoho Ecosystem",
    subtitle: "consultoria e implantação Zoho",
    painLine:
      "CRM virou planilha glorificada e ninguém confia mais nos dados? A gente coloca o Zoho para trabalhar pelo seu time.",
    deliverables: [
      "implantação e migração sem perder histórico",
      "automação de workflows entre CRM, Books e Desk",
      "dashboards executivos em tempo real",
    ],
    conversarHref: "/contato?topic=zoho",
    svg: (
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label="Mini-composição constructivista representando Zoho Ecosystem"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="60" cy="60" r="42" fill="var(--color-olive)" />
        <line
          x1="0"
          y1="60"
          x2="200"
          y2="60"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Discord & Comunidades",
    subtitle: "bots, onboarding e engajamento",
    painLine:
      "A comunidade cresceu mais rápido que o seu time? Estruturamos bots e fluxos que entregam suporte 24/7 sem queimar gente.",
    deliverables: [
      "bots customizados em Node.js e Python",
      "onboarding automatizado, cargos e níveis de XP",
      "métricas de retenção e engajamento da comunidade",
    ],
    conversarHref: "/contato?topic=discord",
    svg: (
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label="Mini-composição constructivista representando Discord & Comunidades"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="70"
          y="20"
          width="80"
          height="80"
          fill="var(--color-mostarda)"
        />
        <circle cx="160" cy="34" r="18" fill="var(--color-olive)" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Integrações & Automações",
    subtitle: "solution architecture sob medida",
    painLine:
      "Seu time copia e cola entre cinco ferramentas todo dia? A gente conecta os sistemas e devolve horas (e clareza) para o seu negócio.",
    deliverables: [
      "Zapier, Make, n8n e código próprio quando faz sentido",
      "REST APIs e webhooks com retry e observabilidade",
      "bancos de dados, filas e infraestrutura em cloud",
    ],
    conversarHref: "/contato?topic=integracoes",
    svg: (
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label="Mini-composição constructivista representando Integrações & Automações"
        preserveAspectRatio="xMidYMid meet"
      >
        <line
          x1="90"
          y1="0"
          x2="90"
          y2="120"
          stroke="var(--color-ink)"
          strokeWidth="1"
        />
        <circle cx="145" cy="60" r="42" fill="var(--color-ceramica)" />
      </svg>
    ),
  },
];

const chips = [
  "zoho one",
  "discord api",
  "stripe",
  "make",
  "n8n",
  "zapier",
  "python",
  "typescript",
  "node",
  "docker",
  "cloudflare workers",
  "railway",
  "supabase",
];

export function ServicosSection() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="servicos-section"
    >
      <header className="servicos-header">
        <div className="mono-label">o que fazemos</div>
        <h2 id="servicos-heading" className="servicos-h2">
          Três frentes. Um único objetivo: sua empresa rodando melhor.
        </h2>
        <p className="servicos-subtitle">
          escopo claro, preço transparente, entrega previsível.
        </p>
      </header>

      <div className="servicos-grid">
        {services.map((s) => (
          <ServicoCard key={s.number} {...s} />
        ))}
      </div>

      <div id="stack" className="stack-row">
        <div className="mono-label">stack</div>
        <div className="stack-chips">
          {chips.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
