// Pricing model for the /precos page.
//
// Numbers are the verified market-research output (see docs/estrategia-precos.md):
// market-competitive BRL ranges for Brazilian SMBs / scale-ups, senior-led.
// Public display uses "a partir de" (the entry of each tier's range); the rate
// card headlines the *typical* (mid) rate per the agreed price posture.

export type Tier = {
  name: string;
  /** Entry of the tier's range, in BRL — shown as "a partir de". */
  from: number;
  /** Recurring (monthly) instead of a one-off project. */
  recorrente?: boolean;
  scope: string;
  timeline: string;
  deliverables: string[];
  /** Visually highlighted as the recommended option. */
  destaque?: boolean;
};

export type ServiceLine = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  tiers: Tier[];
};

/** Senior rate anchors. `tipico` is the published default (mid posture). */
export const rateCard = {
  hora: { from: 180, tipico: 280, ate: 400 },
  dia: { tipico: 2100, from: 1400, ate: 3000 },
  retainer: { from: 3500, ate: 20000 },
} as const;

export const serviceLines: ServiceLine[] = [
  {
    id: "diagnostico",
    number: "01",
    name: "Diagnóstico de Automação",
    tagline:
      "A porta de entrada. Pago e creditável no projeto — todo trabalho começa por aqui.",
    tiers: [
      {
        name: "Express",
        from: 2500,
        scope: "PME pequena · 1 processo ou área (ex.: pipeline de CRM).",
        timeline: "3–5 dias úteis",
        deliverables: [
          "Relatório de diagnóstico (10–15 pág.) com o mapa do processo atual",
          "Lista priorizada de oportunidades — quick wins × estruturais",
          "Proposta de escopo + faixa de orçamento do projeto",
          "Valor 100% creditável se fechar projeto em até 45 dias",
        ],
      },
      {
        name: "Estratégico",
        from: 6000,
        destaque: true,
        scope: "Scale-up ou PME com múltiplas áreas (CRM + Projects + People…).",
        timeline: "2–3 semanas",
        deliverables: [
          "Diagnóstico completo do ecossistema (CRM, Projects, People, Analytics)",
          "Arquitetura as-is → to-be com diagrama",
          "Roadmap faseado com esforço e ROI por fase",
          "Proposta de implementação por fases · até 50% creditável",
        ],
      },
      {
        name: "Arquitetura Cloud + Zoho",
        from: 15000,
        scope: "Operação que precisa integrar Zoho + GCP, migração ou dados.",
        timeline: "3–4 semanas",
        deliverables: [
          "Blueprint de arquitetura híbrida Zoho + Google Cloud",
          "Plano de integração e fluxo de dados (Deluge + APIs + GCP)",
          "Análise de custo de nuvem e TCO projetado",
          "Roadmap executivo + business case · até 50% creditável",
        ],
      },
    ],
  },
  {
    id: "zoho",
    number: "02",
    name: "Zoho Ecosystem",
    tagline:
      "Implementação e configuração senior-led. Projeto de escopo fixo, do CRM ao Zoho One.",
    tiers: [
      {
        name: "Módulo Único",
        from: 6000,
        scope: "Um módulo Zoho (ex.: CRM): pipeline, campos, permissões, workflows.",
        timeline: "2–4 semanas",
        deliverables: [
          "Setup completo do módulo com configuração de negócio",
          "Migração de dados de planilhas ou sistema legado",
          "Até 5 automações/workflows nativos",
          "Treinamento (2 sessões) + documentação · 30 dias de suporte",
        ],
      },
      {
        name: "Multi-Módulo Integrado",
        from: 30000,
        destaque: true,
        scope: "2–4 módulos conectados (CRM + Projects + People/Recruit + Analytics).",
        timeline: "6–10 semanas",
        deliverables: [
          "Implementação e integração de múltiplos módulos",
          "Automações Deluge customizadas entre módulos",
          "Dashboards e relatórios em Zoho Analytics",
          "Governança de permissões · 60 dias de suporte",
        ],
      },
      {
        name: "Programa Zoho One",
        from: 90000,
        scope: "Scale-up: rollout amplo com integrações externas e governança.",
        timeline: "10–16 semanas",
        deliverables: [
          "Programa de implementação Zoho One faseado",
          "Integrações com sistemas externos (ERP, gateways, GCP)",
          "Customizações avançadas Deluge + funções/API",
          "Analytics + governança de dados · 90 dias de hypercare",
        ],
      },
    ],
  },
  {
    id: "integracoes",
    number: "03",
    name: "Integrações & Automações",
    tagline:
      "Conecta o Zoho ao resto da operação. Python + Deluge + GCP, por integração ou pacote.",
    tiers: [
      {
        name: "Automação Pontual",
        from: 3000,
        scope: "Uma automação de escopo fechado: webhook, função Deluge, sync simples.",
        timeline: "1–2 semanas",
        deliverables: [
          "Automação/integração única implementada e testada",
          "Tratamento de erros e logs estruturados",
          "Documentação técnica",
          "15 dias de garantia",
        ],
      },
      {
        name: "Integração de Sistemas",
        from: 15000,
        destaque: true,
        scope: "Zoho ↔ sistema externo (ERP, e-commerce, gateway, API custom).",
        timeline: "3–6 semanas",
        deliverables: [
          "Integração de API completa com mapeamento de dados",
          "Lógica de negócio em Deluge + middleware Python quando preciso",
          "Monitoramento e tratamento de falhas",
          "Documentação e runbook · 30 dias de suporte",
        ],
      },
      {
        name: "Plataforma / Sigma",
        from: 50000,
        scope: "Extensão Zoho Sigma ou plataforma de automação multi-sistema.",
        timeline: "6–12 semanas",
        deliverables: [
          "Extensão Sigma (frontend + connectors + Deluge) ou plataforma",
          "Backend Python em Cloud Run + Cloud SQL quando aplicável",
          "Ciclo de review e publicação no Marketplace",
          "CI/CD via Cloud Build · 60 dias de suporte",
        ],
      },
    ],
  },
  {
    id: "cloud",
    number: "04",
    name: "Cloud / GCP",
    tagline:
      "Arquitetura, migração e infraestrutura Google Cloud — base sólida para o resto rodar.",
    tiers: [
      {
        name: "Setup Cloud Enxuto",
        from: 10000,
        scope: "PME pequena: GCP básico (Cloud Run + Cloud SQL + Storage) para 1 app.",
        timeline: "4–8 semanas",
        deliverables: [
          "Provisionamento GCP com infraestrutura como código (IaC)",
          "CI/CD via Cloud Build",
          "Deploy em Cloud Run + Cloud SQL",
          "Documentação de operação · handover + 30 dias de suporte",
        ],
      },
      {
        name: "Migração para Nuvem",
        from: 25000,
        destaque: true,
        scope: "On-prem ou outra cloud → GCP, com redesenho para Cloud Run/Cloud SQL.",
        timeline: "8–12 semanas",
        deliverables: [
          "Assessment + plano de migração",
          "Migração de aplicações e dados para o GCP",
          "Observabilidade e segurança configuradas",
          "Otimização de custo de nuvem · runbooks operacionais",
        ],
      },
      {
        name: "Arquitetura Híbrida Cloud + Zoho",
        from: 55000,
        scope: "Scale-up: GCP ↔ ecossistema Zoho + dados, com pipelines e ETL.",
        timeline: "12–16 semanas",
        deliverables: [
          "Arquitetura híbrida GCP ↔ Zoho desenhada e implementada",
          "Pipelines de dados / ETL para Analytics",
          "CI/CD, IaC e governança",
          "Plano de continuidade e custo · 90 dias de hypercare",
        ],
      },
    ],
  },
  {
    id: "discord",
    number: "05",
    name: "Discord & Comunidades",
    tagline:
      "Community-ops sênior, integrada ao seu stack — não um bot solto de prateleira.",
    tiers: [
      {
        name: "Bot Customizado",
        from: 3000,
        scope: "Bot Discord sob medida: comandos, moderação, 1 integração simples.",
        timeline: "1–3 semanas",
        deliverables: [
          "Bot Discord customizado em Python",
          "Hospedagem em Cloud Run + documentação",
          "Comandos e automações definidos no escopo",
          "30 dias de garantia",
        ],
      },
      {
        name: "Discord ↔ Zoho / CRM",
        from: 10000,
        destaque: true,
        scope: "Integração da comunidade com a operação: membros, eventos, leads.",
        timeline: "3–5 semanas",
        deliverables: [
          "Integração bidirecional Discord ↔ Zoho",
          "Automações de onboarding e engajamento de membros",
          "Dashboards de métricas de comunidade",
          "Documentação · 30 dias de suporte",
        ],
      },
      {
        name: "Operação de Comunidade",
        from: 3000,
        recorrente: true,
        scope: "Retainer de community-ops para comunidade ou produto ativo.",
        timeline: "Recorrente · mínimo 3 meses",
        deliverables: [
          "Evolução contínua de bots e automações",
          "Bucket de 10–30 h por mês",
          "Monitoramento e ajustes",
          "Relatório mensal de métricas",
        ],
      },
    ],
  },
];

/** Format a BRL integer as "R$ 6.000" (no cents). */
export function brl(value: number): string {
  return `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
}
