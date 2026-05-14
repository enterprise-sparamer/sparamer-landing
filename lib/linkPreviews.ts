export type IllustrationKey =
  // Home & navegação
  | "home"
  | "top"
  // Serviços (general + 3 frentes)
  | "servicos"
  | "zoho"
  | "discord"
  | "integracoes"
  | "stack"
  // Método (3 fases)
  | "metodo"
  | "diagnostico-fase"
  | "implementacao"
  | "operacao"
  // Páginas
  | "sobre"
  | "diagnostico"
  | "contato"
  | "whatsapp"
  | "email"
  // Legal (4 artigos + termos)
  | "legal-identificacao"
  | "legal-privacidade"
  | "legal-direitos"
  | "legal-dpo"
  | "legal-termos"
  // Fallback
  | "external";

export type LinkPreview = {
  number: string;
  title: string;
  subtitle: string;
  illustration: IllustrationKey;
  accent: "mostarda" | "ceramica" | "olive";
};

/* ─── Exact path registry ─────────────────────────────────────────── */

const EXACT: Record<string, LinkPreview> = {
  "/": {
    number: "00",
    title: "Início",
    subtitle: "Conectamos sistemas, eliminamos tarefas manuais — sem inflar o time.",
    illustration: "home",
    accent: "mostarda",
  },
  "/sobre": {
    number: "04",
    title: "Quem é a Sparamer",
    subtitle: "Agência brasileira de engenharia de processos. Time pequeno, escopo fechado, código no seu Git.",
    illustration: "sobre",
    accent: "ceramica",
  },
  "/diagnostico": {
    number: "05",
    title: "Diagnóstico gratuito",
    subtitle: "Três perguntas, 60 segundos. Você recebe um plano sob medida — sem custo, sem ligação obrigatória.",
    illustration: "diagnostico",
    accent: "mostarda",
  },
  "/contato": {
    number: "06",
    title: "Falar com a Sparamer",
    subtitle: "WhatsApp ou e-mail direto com quem executa. Resposta em até 24h úteis.",
    illustration: "contato",
    accent: "olive",
  },
  "/legal": {
    number: "07",
    title: "Informações legais",
    subtitle: "Identificação da empresa, aviso de privacidade LGPD, direitos do titular e DPO.",
    illustration: "legal-identificacao",
    accent: "ceramica",
  },
};

/* ─── Query-aware variants of /contato ────────────────────────────── */

const CONTATO_TOPICS: Record<string, LinkPreview> = {
  zoho: {
    number: "06·a",
    title: "Conversar sobre Zoho",
    subtitle: "Implantação, migração e automação no ecossistema Zoho. Comece pelo gargalo real.",
    illustration: "zoho",
    accent: "olive",
  },
  discord: {
    number: "06·b",
    title: "Conversar sobre Discord",
    subtitle: "Bots customizados, onboarding e métricas de retenção. Suporte 24/7 sem queimar gente.",
    illustration: "discord",
    accent: "mostarda",
  },
  integracoes: {
    number: "06·c",
    title: "Conversar sobre integrações",
    subtitle: "Zapier, Make, n8n e código próprio quando faz sentido. APIs com retry e observabilidade.",
    illustration: "integracoes",
    accent: "ceramica",
  },
};

/* ─── Anchors (#section) ──────────────────────────────────────────── */

const ANCHOR: Record<string, LinkPreview> = {
  servicos: {
    number: "01",
    title: "Serviços",
    subtitle: "Três frentes: Zoho, Discord & comunidades, integrações sob medida.",
    illustration: "servicos",
    accent: "mostarda",
  },
  metodo: {
    number: "02",
    title: "Método",
    subtitle: "Diagnóstico → Implementação → Operação. Entregáveis claros em cada gate.",
    illustration: "metodo",
    accent: "mostarda",
  },
  stack: {
    number: "01·s",
    title: "Stack técnica",
    subtitle: "Zoho One, Python, TypeScript, Node, Make, n8n, Stripe, Discord API, Supabase.",
    illustration: "stack",
    accent: "olive",
  },
  main: {
    number: "↑",
    title: "Topo da página",
    subtitle: "Voltar ao início desta página.",
    illustration: "top",
    accent: "mostarda",
  },
};

/* ─── Legal — disambiguate via anchor text ────────────────────────── */

function legalByAnchorText(text?: string): LinkPreview {
  const t = (text || "").trim().toLowerCase();
  if (t.startsWith("termo")) {
    return {
      number: "07·t",
      title: "Termos de serviço",
      subtitle: "Identificação da empresa, condições contratuais, foro e contato comercial.",
      illustration: "legal-termos",
      accent: "ceramica",
    };
  }
  if (t.startsWith("privacid")) {
    return {
      number: "07·p",
      title: "Política de privacidade",
      subtitle: "Aviso LGPD: como tratamos seus dados pessoais, com quais bases e por quanto tempo.",
      illustration: "legal-privacidade",
      accent: "ceramica",
    };
  }
  if (t.includes("direito")) {
    return {
      number: "07·d",
      title: "Direitos do titular",
      subtitle: "Acesso, correção, eliminação, portabilidade. Art. 18 da Lei nº 13.709/2018.",
      illustration: "legal-direitos",
      accent: "ceramica",
    };
  }
  if (t.includes("dpo") || t.includes("encarregad")) {
    return {
      number: "07·e",
      title: "Encarregado de dados",
      subtitle: "Canal oficial com a ANPD: Agnes Gomez — contact@chapi.dev.",
      illustration: "legal-dpo",
      accent: "ceramica",
    };
  }
  return EXACT["/legal"];
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/* ─── Public resolver ─────────────────────────────────────────────── */

export function resolvePreview(rawHref: string, anchorText?: string): LinkPreview | null {
  if (!rawHref) return null;

  // mailto
  if (rawHref.startsWith("mailto:")) {
    const address = rawHref.replace(/^mailto:/, "").split("?")[0] || "contato";
    return {
      number: "06·@",
      title: address,
      subtitle: "E-mail direto. Resposta em até 24h úteis, em português, espanhol ou inglês.",
      illustration: "email",
      accent: "mostarda",
    };
  }

  // tel
  if (rawHref.startsWith("tel:")) {
    const number = rawHref.replace(/^tel:/, "");
    return {
      number: "06·☎",
      title: number,
      subtitle: "Ligue durante horário comercial (UTC−3).",
      illustration: "contato",
      accent: "olive",
    };
  }

  let url: URL;
  try {
    url = new URL(rawHref, typeof window !== "undefined" ? window.location.href : "https://sparamer.com");
  } catch {
    return null;
  }

  const isInternal = typeof window !== "undefined" && url.origin === window.location.origin;

  // External links
  if (!isInternal) {
    const host = url.host.replace(/^www\./, "");
    if (host.includes("wa.me") || host.includes("whatsapp.com")) {
      return {
        number: "06·w",
        title: "WhatsApp",
        subtitle: "Mensagem direta com quem executa. +55 21 99183-0821.",
        illustration: "whatsapp",
        accent: "olive",
      };
    }
    return {
      number: "↗",
      title: anchorText?.trim() || host,
      subtitle: host + (url.pathname !== "/" ? url.pathname : ""),
      illustration: "external",
      accent: "ceramica",
    };
  }

  const path = normalizePath(url.pathname);
  const hash = url.hash.replace(/^#/, "");

  // Anchor on home (or any page)
  if (hash && ANCHOR[hash]) return ANCHOR[hash];

  // /contato?topic=...
  if (path === "/contato") {
    const topic = url.searchParams.get("topic");
    if (topic && CONTATO_TOPICS[topic]) return CONTATO_TOPICS[topic];
    return EXACT["/contato"];
  }

  // /legal — disambiguate by anchor text
  if (path === "/legal") {
    return legalByAnchorText(anchorText);
  }

  if (EXACT[path]) return EXACT[path];

  for (const key of Object.keys(EXACT)) {
    if (key !== "/" && path.startsWith(`${key}/`)) return EXACT[key];
  }

  return {
    number: "—",
    title: anchorText?.trim() || path || "Página",
    subtitle: `sparamer.com${path}${url.hash}`,
    illustration: "external",
    accent: "mostarda",
  };
}
