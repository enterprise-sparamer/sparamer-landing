import type { Case } from "@/types/cases";

export const FRENTE_ACCENT: Record<Case["frente"], string> = {
  zoho: "var(--color-olive)",
  discord: "var(--color-mostarda)",
  integracoes: "var(--color-ceramica)",
};

export const FRENTE_FG_ON_ACCENT: Record<Case["frente"], string> = {
  zoho: "var(--color-cream)",
  discord: "var(--color-ink)",
  integracoes: "var(--color-cream)",
};

export const FRENTE_LABEL: Record<Case["frente"], string> = {
  zoho: "ZOHO ECOSYSTEM",
  discord: "DISCORD & COMUNIDADES",
  integracoes: "INTEGRAÇÕES & AUTOMAÇÕES",
};
