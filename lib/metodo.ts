export type PhaseColor = "olive" | "mostarda" | "ceramica";

export type Phase = {
  number: string;
  color: PhaseColor;
  title: string;
  duration: string;
  investimento: string;
  entregaveis: string[];
  note: string;
};

export const phases: Phase[] = [
  {
    number: "01",
    color: "olive",
    title: "Diagnóstico",
    duration: "1 a 3 semanas",
    investimento: "a partir de R$ 2.500 · creditável no projeto",
    entregaveis: [
      "mapa completo do workflow atual em documento técnico",
      "lista priorizada de gargalos com impacto estimado",
      "arquitetura proposta (diagrama + especificação)",
      "cronograma da fase 02 com escopo e investimento fechados",
    ],
    note: "Você decide se contrata a fase 02 ou segue com o documento na mão. Sem amarras, sem letrinha miúda.",
  },
  {
    number: "02",
    color: "mostarda",
    title: "Implementação",
    duration: "algumas semanas a poucos meses",
    investimento: "projetos a partir de R$ 6.000",
    entregaveis: [
      "sprints semanais com demo no ambiente de staging",
      "código no seu Git desde o primeiro commit",
      "testes automatizados inclusos no entregável",
      "documentação técnica e de operação ao final",
    ],
    note: "Comunicação semanal por Slack ou Discord. Você é o dono do código desde o commit 1.",
  },
  {
    number: "03",
    color: "ceramica",
    title: "Operação",
    duration: "contínuo",
    investimento: "retainer a partir de R$ 3.500/mês",
    entregaveis: [
      "monitoramento ativo dos sistemas em produção",
      "suporte em horário comercial, em dias úteis",
      "resposta a incidentes críticos no mesmo dia útil",
      "hand-off documentado quando você quiser internalizar",
    ],
    note: "Ciclo mensal com renovação automática. Cancele quando quiser, sem multa.",
  },
];

export const compromissos: string[] = [
  "código no seu repositório desde o primeiro commit",
  "LGPD + NDA mútuo assinados antes de qualquer trabalho",
  "ciclo mensal com renovação automática, sem multa de cancelamento",
  "auditoria do código e da arquitetura disponível sob solicitação",
];
