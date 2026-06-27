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
  {
    number: "03",
    title: "Cloud / GCP",
    subtitle: "arquitetura e infraestrutura Google Cloud",
    painLine:
      "Deploy manual, servidor caindo e conta de nuvem imprevisível? Montamos uma base sólida no Google Cloud — automatizada, observável e com custo sob controle.",
    deliverables: [
      "Cloud Run, Cloud SQL, Cloud Storage e Cloud Build",
      "infraestrutura como código e CI/CD do commit ao deploy",
      "migração para a nuvem com observabilidade e custo previsível",
    ],
    conversarHref: "/contato?topic=cloud",
    svg: (
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label="Mini-composição constructivista representando Cloud / GCP"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x="56"
          y="34"
          width="84"
          height="16"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <rect x="56" y="58" width="84" height="16" fill="var(--color-mostarda)" />
        <circle cx="156" cy="42" r="14" fill="var(--color-olive)" />
        <line
          x1="0"
          y1="92"
          x2="200"
          y2="92"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

const chips = [
  "zoho one",
  "deluge",
  "discord api",
  "stripe",
  "make",
  "n8n",
  "python",
  "typescript",
  "node",
  "docker",
  "cloud run",
  "cloud sql",
  "cloud build",
  "cloud storage",
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
          Três frentes de consultoria. Um objetivo: sua empresa rodando melhor.
        </h2>
        <p className="servicos-subtitle">
          escopo claro, preço transparente, entrega previsível.
        </p>
        <a href="/precos" className="servicos-precos-link focus-ring">
          ver todos os preços →
        </a>
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
