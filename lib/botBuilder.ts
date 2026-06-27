// Sparamer Bot Builder — product data for the /discord landing.
// Source: Sparamer_Bot_Builder_Propuesta_Tecnica.pdf (v1.0, jun/2026).
// Prices are BRL, set accessible for the Brazilian market (the PDF gives USD
// $0/$5/$15/$40; localized to round reais here).

export const BUILDER_HREF = "/discord/builder";

export type Plan = {
  id: string;
  name: string;
  priceBRL: number; // 0 = free
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  destaque?: boolean;
};

export const plans: Plan[] = [
  {
    id: "gratuito",
    name: "Grátis",
    priceBRL: 0,
    tagline: "Para começar e automatizar o seu primeiro servidor.",
    features: [
      "1 bot · 3 fluxos",
      "Execução por webhook",
      "20 variáveis por bot",
      "50 chamadas de API / hora",
      "Logs por 24 h",
      "Suporte pela comunidade",
    ],
    cta: { label: "Começar grátis", href: BUILDER_HREF },
  },
  {
    id: "basico",
    name: "Básico",
    priceBRL: 19,
    tagline: "Para comunidades ativas com bots interativos.",
    features: [
      "3 bots · 10 fluxos",
      "Webhook + execução programada",
      "100 variáveis por bot",
      "200 chamadas de API / hora",
      "Logs por 7 dias",
      "Suporte por e-mail",
    ],
    cta: { label: "Assinar", href: BUILDER_HREF },
  },
  {
    id: "profissional",
    name: "Profissional",
    priceBRL: 59,
    destaque: true,
    tagline: "Bots 24/7 e lógica avançada com scripts Lua.",
    features: [
      "10 bots · 25 fluxos",
      "Webhook + programado + 24/7",
      "Scripts Lua (sandbox)",
      "500 variáveis por bot",
      "1.000 chamadas de API / hora",
      "Logs por 30 dias · suporte prioritário",
    ],
    cta: { label: "Assinar", href: BUILDER_HREF },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceBRL: 199,
    tagline: "Operação empresarial com SLA e suporte dedicado.",
    features: [
      "Bots e fluxos ilimitados",
      "Todos os modelos de execução + SLA",
      "Scripts Lua + APIs externas",
      "Variáveis ilimitadas",
      "10.000 chamadas de API / hora",
      "Logs por 90 dias · suporte dedicado",
    ],
    cta: { label: "Falar com vendas", href: "/contato?topic=bot-builder" },
  },
];

export type NodeCategory = {
  name: string;
  color: string; // CSS color for the node dot — the product's own editor palette
  examples: string;
};

export const nodeCategories: NodeCategory[] = [
  { name: "Gatilhos", color: "#7C5CBF", examples: "Comando slash, mensagem, membro entra, reação" },
  { name: "Condições", color: "#3B6FB0", examples: "Se/então, verificar cargo, verificar canal" },
  { name: "Ações", color: "#4F6231", examples: "Enviar mensagem, embed, atribuir cargo, banir" },
  { name: "Dados", color: "#C9A227", examples: "Ler variável, salvar variável, API externa" },
  { name: "Controle de fluxo", color: "#C97A2A", examples: "Esperar, loop, bifurcação paralela" },
  { name: "Script Lua", color: "#B4503A", examples: "Bloco de código Lua personalizado" },
];

export type ExecutionModel = {
  name: string;
  desc: string;
  infra: string;
};

export const executionModels: ExecutionModel[] = [
  {
    name: "Webhook",
    desc: "Sob demanda. O bot responde a interações em milissegundos, sem servidor sempre ligado.",
    infra: "Cloud Run",
  },
  {
    name: "Programado",
    desc: "Tarefas agendadas — lembretes, relatórios, rotinas — disparadas no horário certo.",
    infra: "Cloud Tasks",
  },
  {
    name: "Persistente 24/7",
    desc: "Presença contínua via WebSocket para bots que precisam estar sempre online.",
    infra: "GKE Autopilot",
  },
];

// The Lua example from the proposal (section 6).
export const luaExample = `local user = bot.getUser(trigger.user_id)
local level = bot.getData("levels", user.id) or 0

if level >= 10 then
  bot.sendMessage(trigger.channel_id, {
    embed = {
      title = "Parabéns " .. user.username .. "!",
      description = "Você alcançou o nível " .. level,
      color = 0x4F6231
    }
  })
  bot.assignRole(user.id, "veterano_role_id")
else
  bot.sendMessage(trigger.channel_id,
    "Você precisa do nível 10. Nível atual: " .. level)
end`;

export function brl(value: number): string {
  if (value === 0) return "Grátis";
  return `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
}
