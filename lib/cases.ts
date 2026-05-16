import casesData from "@/cases.json";

export type Frente = "zoho" | "discord" | "integracoes";

export type CaseClient = {
  descricao: string;
  porte: string;
  regiao: string;
  ano: number;
  anonimo: boolean;
};

export type CaseResult = {
  metrica: string;
  antes: string;
  depois: string;
};

export type Case = {
  id: string;
  slug: string;
  frente: Frente;
  titulo: string;
  subtitulo: string;
  cliente: CaseClient;
  contexto: string;
  diagnostico: string;
  solucao: string[];
  resultados: CaseResult[];
  stack: string[];
  duracao_semanas: number;
  tipo_engajamento: string;
  destaque_home: boolean;
  ordem_home: number;
};

export type AntiCases = {
  titulo: string;
  subtitulo: string;
  itens: string[];
};

export type CasesData = {
  version: string;
  updated_at: string;
  casos: Case[];
  anti_casos: AntiCases;
};

const data = casesData as unknown as CasesData;

export function getAllCases(): Case[] {
  return data.casos;
}

export function getHomeCases(): Case[] {
  return data.casos
    .filter((c) => c.destaque_home)
    .sort((a, b) => a.ordem_home - b.ordem_home);
}

export function getCaseBySlug(slug: string): Case | null {
  return data.casos.find((c) => c.slug === slug) ?? null;
}

export function getAntiCases(): AntiCases {
  return data.anti_casos;
}

export const FRENTE_LABEL: Record<Frente, string> = {
  zoho: "Zoho Ecosystem",
  discord: "Discord & Comunidades",
  integracoes: "Integrações & Automações",
};
