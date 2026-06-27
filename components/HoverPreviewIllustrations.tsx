import type { IllustrationKey, LinkPreview } from "@/lib/linkPreviews";

const ACCENT_VAR: Record<LinkPreview["accent"], string> = {
  mostarda: "var(--color-mostarda)",
  ceramica: "var(--color-ceramica)",
  olive: "var(--color-olive)",
};

type Props = { variant: IllustrationKey; accent: LinkPreview["accent"] };

export function PreviewIllustration({ variant, accent }: Props) {
  const a = ACCENT_VAR[accent];
  return (
    <svg
      viewBox="0 0 200 120"
      className="hover-preview-illustration"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "home" && <Home a={a} />}
      {variant === "top" && <Top a={a} />}
      {variant === "servicos" && <Servicos a={a} />}
      {variant === "zoho" && <Zoho a={a} />}
      {variant === "discord" && <Discord a={a} />}
      {variant === "integracoes" && <Integracoes a={a} />}
      {variant === "stack" && <Stack a={a} />}
      {variant === "metodo" && <Metodo a={a} />}
      {variant === "diagnostico-fase" && <DiagnosticoFase a={a} />}
      {variant === "implementacao" && <Implementacao a={a} />}
      {variant === "operacao" && <Operacao a={a} />}
      {variant === "sobre" && <Sobre a={a} />}
      {variant === "diagnostico" && <Diagnostico a={a} />}
      {variant === "contato" && <Contato a={a} />}
      {variant === "email" && <Email a={a} />}
      {variant === "precos" && <Precos a={a} />}
      {variant === "legal-identificacao" && <LegalIdentificacao a={a} />}
      {variant === "legal-privacidade" && <LegalPrivacidade a={a} />}
      {variant === "legal-direitos" && <LegalDireitos a={a} />}
      {variant === "legal-dpo" && <LegalDPO a={a} />}
      {variant === "legal-termos" && <LegalTermos a={a} />}
      {variant === "external" && <External a={a} />}
    </svg>
  );
}

/* ─── Shared atoms ────────────────────────────────────────────────── */

const INK = "var(--color-ink)";
const CER = "var(--color-ceramica)";
const OLV = "var(--color-olive)";

function Horizon({ y = 92, opacity = 0.12 }: { y?: number; opacity?: number }) {
  return <line x1="14" y1={y} x2="186" y2={y} stroke={INK} strokeOpacity={opacity} strokeWidth="1" />;
}

function Ticks({ x, y, count = 5, gap = 7, len = 5, vertical = false }: { x: number; y: number; count?: number; gap?: number; len?: number; vertical?: boolean }) {
  return (
    <g stroke={INK} strokeOpacity="0.32" strokeWidth="0.9">
      {Array.from({ length: count }).map((_, i) =>
        vertical ? (
          <line key={i} x1={x + i * gap} y1={y} x2={x + i * gap} y2={y + len} />
        ) : (
          <line key={i} x1={x} y1={y + i * gap} x2={x + len} y2={y + i * gap} />
        ),
      )}
    </g>
  );
}

function Plus({ x, y, size = 11, opacity = 0.45 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fontFamily="Georgia, serif" fontSize={size} fill={INK} fillOpacity={opacity} textAnchor="middle">+</text>
  );
}

function Mono({ x, y, children, size = 6.5, opacity = 0.55, anchor = "start" as "start" | "middle" | "end" }: { x: number; y: number; children: string; size?: number; opacity?: number; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fontFamily="var(--font-mono)" fontSize={size} fill={INK} fillOpacity={opacity} letterSpacing="0.14em" textAnchor={anchor}>{children}</text>
  );
}

function Wave({ d, a, opacity = 0.7, w = 1.2 }: { d: string; a: string; opacity?: number; w?: number }) {
  return <path d={d} fill="none" stroke={a} strokeOpacity={opacity} strokeWidth={w} strokeLinecap="round" />;
}

/* ═══════ Variants ════════════════════════════════════════════════ */

/* Home — sparamer monogram: lowercase "s" disc + mostarda dot, anchored to a horizon. */
function Home({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      <circle cx="78" cy="56" r="28" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1" />
      <path d="M 78 28 A 28 28 0 0 1 78 84" fill="none" stroke={INK} strokeWidth="1.25" />
      <text x="78" y="64" fontFamily="var(--font-sans)" fontSize="26" fontWeight="500" fill={INK} textAnchor="middle" letterSpacing="-0.02em">s</text>
      <circle cx="106" cy="62" r="3" fill={a} />
      <Mono x={140} y={34}>SPARAMER</Mono>
      <Mono x={140} y={44} opacity={0.4}>23°33′S</Mono>
      <Mono x={140} y={52} opacity={0.4}>46°38′W</Mono>
      <Ticks x={140} y={60} count={4} gap={5} />
      <Wave d="M 130 102 Q 150 98 170 102 T 188 100" a={a} opacity={0.55} />
    </>
  );
}

/* Top — upward chevron stack pointing to top */
function Top({ a }: { a: string }) {
  return (
    <>
      <Horizon y={100} />
      <path d="M 70 80 L 100 50 L 130 80" fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 70 60 L 100 30 L 130 60" fill="none" stroke={a} strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="100" cy="30" r="3" fill={a} />
      <Ticks x={30} y={36} count={6} gap={8} />
      <Ticks x={164} y={36} count={6} gap={8} />
      <Mono x={100} y={114} anchor="middle">↑ TOPO</Mono>
    </>
  );
}

/* Serviços — three columns labeled 01/02/03 + the heading "três frentes" hint */
function Servicos({ a }: { a: string }) {
  return (
    <>
      <Horizon y={90} />
      {/* col 01 — olive disc */}
      <circle cx="50" cy="56" r="14" fill={OLV} />
      <line x1="30" y1="56" x2="70" y2="56" stroke={INK} strokeOpacity="0.4" strokeWidth="0.75" />
      {/* col 02 — mostarda square */}
      <rect x="86" y="38" width="28" height="36" fill={a} />
      <line x1="100" y1="26" x2="100" y2="90" stroke={INK} strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="2 3" />
      {/* col 03 — ceramica ring */}
      <circle cx="150" cy="56" r="14" fill="none" stroke={CER} strokeWidth="1.5" />
      <circle cx="150" cy="56" r="6" fill={CER} />

      <Mono x={50} y={106} anchor="middle">01</Mono>
      <Mono x={100} y={106} anchor="middle">02</Mono>
      <Mono x={150} y={106} anchor="middle">03</Mono>
      <Plus x={186} y={36} />
    </>
  );
}

/* Zoho — CRM/Books/Desk: three stacked rounded "dashboards" + olive accent (matches services svg) */
function Zoho({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* stacked dashboard cards */}
      <rect x="30" y="34" width="92" height="58" fill={OLV} fillOpacity="0.18" stroke={INK} strokeOpacity="0.45" strokeWidth="1" />
      <rect x="40" y="26" width="92" height="58" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1" />
      <rect x="50" y="18" width="92" height="58" fill="var(--color-cream)" stroke={INK} strokeOpacity="0.75" strokeWidth="1.25" />
      {/* tiny chart inside top card */}
      <polyline points="58,62 70,52 82,58 94,42 106,48 132,38" fill="none" stroke={a} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="132" cy="38" r="2.5" fill={a} />
      {/* dots indicating live data */}
      <circle cx="58" cy="28" r="1.5" fill={INK} fillOpacity="0.35" />
      <circle cx="64" cy="28" r="1.5" fill={INK} fillOpacity="0.35" />
      <circle cx="70" cy="28" r="1.5" fill={INK} fillOpacity="0.35" />

      <Mono x={170} y={36}>CRM</Mono>
      <Mono x={170} y={48}>BOOKS</Mono>
      <Mono x={170} y={60}>DESK</Mono>
    </>
  );
}

/* Discord — comunidade: nó central + cargos/níveis orbitando */
function Discord({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* central server square (echoes services SVG) */}
      <rect x="80" y="44" width="40" height="40" fill={a} />
      <rect x="80" y="44" width="40" height="6" fill={INK} fillOpacity="0.4" />
      {/* orbiting members at different XP levels */}
      <circle cx="36" cy="36" r="6" fill={OLV} />
      <Mono x={36} y={56} anchor="middle" size={6} opacity={0.5}>XP·12</Mono>
      <circle cx="168" cy="38" r="8" fill={OLV} />
      <Mono x={168} y={58} anchor="middle" size={6} opacity={0.5}>XP·47</Mono>
      <circle cx="40" cy="86" r="4" fill={INK} fillOpacity="0.6" />
      <Mono x={40} y={102} anchor="middle" size={6} opacity={0.5}>XP·03</Mono>
      <circle cx="160" cy="92" r="5" fill={CER} />
      <Mono x={160} y={108} anchor="middle" size={6} opacity={0.5}>XP·22</Mono>

      {/* connection hairlines */}
      <g stroke={INK} strokeOpacity="0.25" strokeWidth="0.6" strokeDasharray="2 3">
        <line x1="42" y1="38" x2="80" y2="56" />
        <line x1="162" y1="40" x2="120" y2="56" />
        <line x1="46" y1="84" x2="80" y2="74" />
        <line x1="155" y1="90" x2="120" y2="78" />
      </g>
    </>
  );
}

/* Integrações — node graph: 5 systems → arrows → central hub */
function Integracoes({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* central hub */}
      <circle cx="100" cy="56" r="14" fill={CER} />
      <circle cx="100" cy="56" r="22" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="0.75" strokeDasharray="2 3" />
      <Mono x={100} y={59} anchor="middle" size={7} opacity={0.95}>API</Mono>

      {/* satellite systems */}
      <g fontFamily="var(--font-mono)" fontSize="6.5" fill={INK} fillOpacity="0.7" letterSpacing="0.1em">
        <rect x="14" y="22" width="28" height="14" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="0.9" />
        <text x="28" y="32" textAnchor="middle">ZAP</text>

        <rect x="56" y="14" width="28" height="14" fill={a} fillOpacity="0.9" />
        <text x="70" y="24" textAnchor="middle" fill={INK} fillOpacity="0.9">MAKE</text>

        <rect x="156" y="22" width="28" height="14" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="0.9" />
        <text x="170" y="32" textAnchor="middle">N8N</text>

        <rect x="20" y="78" width="28" height="14" fill={OLV} fillOpacity="0.6" />
        <text x="34" y="88" textAnchor="middle">SQL</text>

        <rect x="148" y="82" width="36" height="14" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="0.9" />
        <text x="166" y="92" textAnchor="middle">WEBHOOK</text>
      </g>

      {/* connections */}
      <g stroke={INK} strokeOpacity="0.4" strokeWidth="0.75">
        <line x1="42" y1="36" x2="86" y2="52" />
        <line x1="70" y1="28" x2="98" y2="42" />
        <line x1="156" y1="36" x2="114" y2="52" />
        <line x1="48" y1="82" x2="88" y2="60" />
        <line x1="148" y1="86" x2="114" y2="62" />
      </g>
    </>
  );
}

/* Stack — tag cloud chips arranged in a grid */
function Stack({ a }: { a: string }) {
  const chips: { x: number; y: number; w: number; label: string; fill?: string; hairline?: boolean }[] = [
    { x: 14, y: 20, w: 36, label: "zoho one", fill: a },
    { x: 54, y: 20, w: 30, label: "python" },
    { x: 88, y: 20, w: 26, label: "node" },
    { x: 118, y: 20, w: 28, label: "make" },
    { x: 150, y: 20, w: 26, label: "n8n" },
    { x: 14, y: 42, w: 30, label: "stripe", fill: OLV },
    { x: 48, y: 42, w: 38, label: "discord api" },
    { x: 90, y: 42, w: 28, label: "docker" },
    { x: 122, y: 42, w: 32, label: "cloud run" },
    { x: 158, y: 42, w: 28, label: "deluge" },
    { x: 14, y: 64, w: 42, label: "typescript" },
    { x: 60, y: 64, w: 34, label: "cloud sql", fill: CER, hairline: true },
    { x: 98, y: 64, w: 26, label: "gcp" },
    { x: 128, y: 64, w: 36, label: "cloud build" },
  ];
  return (
    <>
      <Horizon y={88} />
      {chips.map((c) => (
        <g key={c.label}>
          <rect
            x={c.x}
            y={c.y}
            width={c.w}
            height={12}
            fill={c.fill || "none"}
            stroke={c.fill ? "none" : INK}
            strokeOpacity={c.fill ? 0 : 0.45}
            strokeWidth="0.75"
          />
          <text
            x={c.x + c.w / 2}
            y={c.y + 8.5}
            fontFamily="var(--font-mono)"
            fontSize="5.5"
            fill={c.fill ? "var(--color-cream)" : INK}
            fillOpacity={c.fill ? 1 : 0.7}
            letterSpacing="0.08em"
            textAnchor="middle"
          >
            {c.label}
          </text>
        </g>
      ))}
      <Mono x={14} y={108} opacity={0.4}>STACK SÊNIOR · CÓDIGO PRÓPRIO QUANDO FAZ SENTIDO</Mono>
    </>
  );
}

/* Método — three phases in a row with their actual colors (olive/mostarda/ceramica) */
function Metodo({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      <line x1="50" y1="56" x2="150" y2="56" stroke={INK} strokeOpacity="0.2" strokeWidth="0.75" strokeDasharray="2 3" />

      {/* 01 olive — diagnostico */}
      <circle cx="50" cy="56" r="11" fill="none" stroke={INK} strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="50" cy="56" r="4" fill={OLV} />
      {/* 02 mostarda — implementacao */}
      <rect x="89" y="45" width="22" height="22" fill={a} />
      {/* 03 ceramica — operacao */}
      <circle cx="150" cy="56" r="11" fill={CER} />

      {/* duration labels under each */}
      <Mono x={50} y={86} anchor="middle">DIAGNÓSTICO</Mono>
      <Mono x={50} y={96} anchor="middle" size={5.5} opacity={0.4}>1–3 SEM</Mono>
      <Mono x={100} y={86} anchor="middle">IMPLEMENT.</Mono>
      <Mono x={100} y={96} anchor="middle" size={5.5} opacity={0.4}>SEM–MESES</Mono>
      <Mono x={150} y={86} anchor="middle">OPERAÇÃO</Mono>
      <Mono x={150} y={96} anchor="middle" size={5.5} opacity={0.4}>CONTÍNUO</Mono>

      <Wave d="M 30 110 Q 60 106 100 110 T 170 108" a={a} opacity={0.6} />
    </>
  );
}

/* Diagnostico fase 01 — radar */
function DiagnosticoFase({ a }: { a: string }) {
  return (
    <>
      <circle cx="100" cy="56" r="38" fill="none" stroke={INK} strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="2 4" />
      <circle cx="100" cy="56" r="24" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="100" cy="56" r="12" fill="none" stroke={INK} strokeWidth="1.25" />
      <circle cx="100" cy="56" r="5" fill={a} />
      <line x1="100" y1="32" x2="100" y2="80" stroke={INK} strokeOpacity="0.5" strokeWidth="0.75" />
      <line x1="76" y1="56" x2="124" y2="56" stroke={INK} strokeOpacity="0.5" strokeWidth="0.75" />
      <Horizon y={102} />
      <Mono x={100} y={114} anchor="middle">FASE 01 · DIAGNÓSTICO</Mono>
    </>
  );
}

/* Implementação fase 02 — sprint timeline with deploy markers */
function Implementacao({ a }: { a: string }) {
  return (
    <>
      <Horizon y={56} opacity={0.25} />
      {/* sprint columns */}
      {[30, 60, 90, 120, 150, 180].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="56" x2={x} y2="52" stroke={INK} strokeOpacity="0.5" strokeWidth="0.9" />
          {(i === 1 || i === 3 || i === 5) && <rect x={x - 3} y="60" width="6" height={10 + (i % 3) * 4} fill={a} />}
          {(i === 0 || i === 2 || i === 4) && <rect x={x - 3} y="60" width="6" height={6 + (i % 3) * 3} fill={INK} fillOpacity="0.5" />}
        </g>
      ))}
      {/* deploy markers (above line) */}
      <g>
        <circle cx="60" cy="56" r="3" fill={a} />
        <circle cx="120" cy="56" r="3" fill={a} />
        <circle cx="180" cy="56" r="3" fill={a} />
      </g>
      <Mono x={14} y={28}>SPRINT 01</Mono>
      <Mono x={14} y={38} opacity={0.4}>DEMO · COMMIT · TESTE</Mono>
      <Mono x={100} y={114} anchor="middle">FASE 02 · IMPLEMENTAÇÃO</Mono>
    </>
  );
}

/* Operação fase 03 — heartbeat / uptime */
function Operacao({ a }: { a: string }) {
  return (
    <>
      <Horizon y={56} opacity={0.25} />
      <path d="M 14 56 L 40 56 L 48 36 L 56 76 L 64 46 L 72 56 L 100 56 L 108 30 L 116 80 L 124 50 L 132 56 L 186 56" fill="none" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="56" r="2" fill={INK} />
      <circle cx="72" cy="56" r="2" fill={INK} />
      <circle cx="132" cy="56" r="2" fill={INK} />
      <Mono x={14} y={28} opacity={0.55}>UPTIME · 99.9%</Mono>
      <Mono x={14} y={38} opacity={0.4}>RESPOSTA · MESMO DIA ÚTIL</Mono>
      <Mono x={100} y={114} anchor="middle">FASE 03 · OPERAÇÃO</Mono>
    </>
  );
}

/* Sobre — two members at a table with a tools palette between */
function Sobre({ a }: { a: string }) {
  return (
    <>
      <Horizon y={80} opacity={0.2} />
      {/* Member 1 — Luis (olive) */}
      <circle cx="50" cy="46" r="14" fill={OLV} />
      <Mono x={50} y={76} anchor="middle">AGNES C.</Mono>
      <Mono x={50} y={86} anchor="middle" size={5.5} opacity={0.4}>FUNDADORA</Mono>
      {/* Member 2 — David (ink ring) */}
      <circle cx="150" cy="46" r="14" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="150" cy="46" r="5" fill={INK} />
      <Mono x={150} y={76} anchor="middle">DAVID G.</Mono>
      <Mono x={150} y={86} anchor="middle" size={5.5} opacity={0.4}>ENGENHEIRO</Mono>
      {/* central toolkit — mostarda */}
      <rect x="86" y="32" width="28" height="28" fill={a} />
      <Mono x={100} y={50} anchor="middle" size={7} opacity={0.95}>SP</Mono>
      <Mono x={100} y={76} anchor="middle">SÃO PAULO</Mono>
      <Mono x={100} y={86} anchor="middle" size={5.5} opacity={0.4}>BRASIL · UTC−3</Mono>

      <Mono x={100} y={112} anchor="middle" opacity={0.5}>PT·ES·EN·SV·FR</Mono>
    </>
  );
}

/* Diagnostico (free intake) — 3 question pills + arrow → plan card */
function Diagnostico({ a }: { a: string }) {
  return (
    <>
      <Horizon y={92} />
      {/* 3 question pills */}
      {[20, 38, 56].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y} width="80" height="12" rx="6" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="0.9" />
          <circle cx="22" cy={y + 6} r="2.5" fill={i === 0 ? a : INK} fillOpacity={i === 0 ? 1 : 0.3} />
          <line x1="30" y1={y + 6} x2={86 - i * 6} y2={y + 6} stroke={INK} strokeOpacity={i === 0 ? 0.7 : 0.3} strokeWidth="0.9" />
        </g>
      ))}
      {/* arrow */}
      <path d="M 100 44 L 116 44" stroke={INK} strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M 112 40 L 116 44 L 112 48" fill="none" stroke={INK} strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* plan card */}
      <rect x="122" y="22" width="62" height="46" fill={a} fillOpacity="0.15" stroke={a} strokeWidth="1.25" />
      <line x1="128" y1="30" x2="178" y2="30" stroke={INK} strokeOpacity="0.6" strokeWidth="1" />
      <line x1="128" y1="38" x2="170" y2="38" stroke={INK} strokeOpacity="0.4" strokeWidth="0.75" />
      <line x1="128" y1="46" x2="174" y2="46" stroke={INK} strokeOpacity="0.4" strokeWidth="0.75" />
      <line x1="128" y1="54" x2="162" y2="54" stroke={INK} strokeOpacity="0.4" strokeWidth="0.75" />
      <circle cx="178" cy="62" r="3" fill={a} />

      <Mono x={14} y={84}>3 PERGUNTAS</Mono>
      <Mono x={186} y={84} anchor="end">PLANO SOB MEDIDA</Mono>
      <Mono x={100} y={110} anchor="middle" opacity={0.4}>60 SEGUNDOS · SEM CUSTO</Mono>
    </>
  );
}

/* Contato — two channels (consulta + email) split by hairline */
function Contato({ a }: { a: string }) {
  return (
    <>
      <Horizon y={88} />
      {/* divider */}
      <line x1="100" y1="20" x2="100" y2="78" stroke={INK} strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="2 3" />
      {/* Consulta side — speech bubble */}
      <path d="M 20 30 L 78 30 Q 86 30 86 38 L 86 62 Q 86 70 78 70 L 36 70 L 26 78 L 28 70 Q 20 70 20 62 Z" fill={a} fillOpacity="0.2" stroke={INK} strokeOpacity="0.6" strokeWidth="1.1" />
      <line x1="30" y1="44" x2="74" y2="44" stroke={INK} strokeOpacity="0.6" strokeWidth="0.9" />
      <line x1="30" y1="54" x2="66" y2="54" stroke={INK} strokeOpacity="0.5" strokeWidth="0.9" />
      <Mono x={52} y={104} anchor="middle">CONSULTA</Mono>

      {/* Email side — envelope */}
      <rect x="114" y="30" width="70" height="40" fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="1.1" />
      <path d="M 114 30 L 149 54 L 184 30" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="0.9" />
      <rect x="114" y="30" width="40" height="16" fill={a} fillOpacity="0.9" />
      <Mono x={149} y={104} anchor="middle">E-MAIL</Mono>

      <Mono x={100} y={114} anchor="middle" opacity={0.4}>RESPOSTA EM 24H ÚTEIS</Mono>
    </>
  );
}

/* Preços — three ascending tier bars + R$ mark */
function Precos({ a }: { a: string }) {
  return (
    <>
      <Horizon y={94} />
      <rect x="28" y="58" width="30" height="36" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1" />
      <rect x="72" y="42" width="30" height="52" fill={a} />
      <rect x="116" y="26" width="30" height="68" fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="1.1" />
      <Mono x={43} y={106} anchor="middle" size={5.5}>ENTRY</Mono>
      <Mono x={87} y={106} anchor="middle" size={5.5}>STD</Mono>
      <Mono x={131} y={106} anchor="middle" size={5.5}>PREMIUM</Mono>
      <text x="170" y="42" fontFamily="var(--font-sans)" fontSize="16" fontWeight="500" fill={INK} fillOpacity="0.7" textAnchor="middle">R$</text>
      <circle cx="170" cy="62" r="3" fill={a} />
    </>
  );
}

/* Email — composed message with @ + send caret */
function Email({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* envelope */}
      <rect x="20" y="22" width="120" height="60" fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="1.2" />
      <path d="M 20 22 L 80 60 L 140 22" fill="none" stroke={INK} strokeOpacity="0.55" strokeWidth="1" />
      <rect x="20" y="22" width="60" height="28" fill={a} fillOpacity="0.85" />
      {/* @ glyph inside cream area */}
      <text x="110" y="60" fontFamily="var(--font-sans)" fontSize="18" fontWeight="500" fill={INK} fillOpacity="0.7" textAnchor="middle">@</text>
      {/* send arrow */}
      <path d="M 150 50 L 180 50" stroke={INK} strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 174 44 L 180 50 L 174 56" fill="none" stroke={INK} strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Mono x={100} y={102} anchor="middle">contato@sparamer.com</Mono>
      <Mono x={100} y={112} anchor="middle" opacity={0.4}>PT·ES·EN·SV·FR</Mono>
    </>
  );
}

/* Legal — identificação: a stamped document with CNPJ block */
function LegalIdentificacao({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* document */}
      <rect x="40" y="14" width="92" height="92" fill="var(--color-cream)" stroke={INK} strokeOpacity="0.55" strokeWidth="1.1" />
      <rect x="40" y="14" width="92" height="14" fill={INK} fillOpacity="0.08" />
      <text x="48" y="24" fontFamily="var(--font-mono)" fontSize="6.5" fill={INK} fillOpacity="0.8" letterSpacing="0.16em">RAZÃO SOCIAL</text>
      {/* lines */}
      {[40, 50, 60, 70, 80].map((y) => (
        <line key={y} x1="48" y1={y} x2={y === 80 ? 100 : 120} y2={y} stroke={INK} strokeOpacity="0.32" strokeWidth="0.75" />
      ))}
      {/* stamp */}
      <circle cx="156" cy="64" r="22" fill="none" stroke={a} strokeWidth="1.5" />
      <circle cx="156" cy="64" r="16" fill="none" stroke={a} strokeWidth="0.75" />
      <text x="156" y="62" fontFamily="var(--font-mono)" fontSize="5.5" fill={a} letterSpacing="0.12em" textAnchor="middle">CNPJ</text>
      <text x="156" y="72" fontFamily="var(--font-mono)" fontSize="5.5" fill={a} letterSpacing="0.06em" textAnchor="middle">336/0001</text>
      <Mono x={100} y={114} anchor="middle">SPARAMER · SÃO PAULO</Mono>
    </>
  );
}

/* Legal — privacidade: a lock + hashed key fragments (LGPD) */
function LegalPrivacidade({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* lock body */}
      <rect x="76" y="50" width="48" height="40" fill={a} fillOpacity="0.15" stroke={INK} strokeOpacity="0.7" strokeWidth="1.25" />
      <path d="M 86 50 L 86 38 Q 86 26 100 26 Q 114 26 114 38 L 114 50" fill="none" stroke={INK} strokeOpacity="0.65" strokeWidth="1.25" />
      <circle cx="100" cy="68" r="3.5" fill={a} />
      <line x1="100" y1="72" x2="100" y2="80" stroke={INK} strokeOpacity="0.7" strokeWidth="1.25" strokeLinecap="round" />
      {/* hashed data fragments around it */}
      <g fontFamily="var(--font-mono)" fontSize="5.5" fill={INK} fillOpacity="0.35" letterSpacing="0.06em">
        <text x="18" y="32">3a9f·2c1e</text>
        <text x="18" y="52">b7d4·8e02</text>
        <text x="18" y="72">c91a·44ff</text>
        <text x="142" y="32">7e2b·d10c</text>
        <text x="142" y="52">a005·31aa</text>
        <text x="142" y="72">9b6e·c842</text>
      </g>
      <Mono x={100} y={106} anchor="middle">LGPD · LEI 13.709/2018</Mono>
    </>
  );
}

/* Legal — direitos: 8 rights as numbered tally marks */
function LegalDireitos({ a }: { a: string }) {
  const rights = ["CONFIRM.", "ACESSO", "CORREÇÃO", "ANONIMIZ.", "PORTAB.", "ELIMINAÇÃO", "INFO.", "REVOGAÇÃO"];
  return (
    <>
      <Horizon />
      {rights.map((label, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 18 + col * 44;
        const y = 24 + row * 34;
        return (
          <g key={label}>
            <rect x={x} y={y} width="38" height="22" fill={i === 0 ? a : "none"} stroke={INK} strokeOpacity="0.5" strokeWidth="0.9" />
            <text x={x + 19} y={y + 10} fontFamily="var(--font-mono)" fontSize="5" fill={i === 0 ? "var(--color-cream)" : INK} fillOpacity={i === 0 ? 1 : 0.4} letterSpacing="0.12em" textAnchor="middle">{`0${i + 1}`}</text>
            <text x={x + 19} y={y + 18} fontFamily="var(--font-mono)" fontSize="5" fill={i === 0 ? "var(--color-cream)" : INK} fillOpacity={i === 0 ? 1 : 0.75} letterSpacing="0.05em" textAnchor="middle">{label}</text>
          </g>
        );
      })}
      <Mono x={100} y={106} anchor="middle">ART. 18 · LGPD</Mono>
    </>
  );
}

/* Legal — DPO: contact card for the encarregado */
function LegalDPO({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* business card */}
      <rect x="26" y="18" width="148" height="76" fill="var(--color-cream)" stroke={INK} strokeOpacity="0.55" strokeWidth="1.1" />
      <line x1="40" y1="40" x2="160" y2="40" stroke={a} strokeWidth="1.5" />
      <text x="40" y="34" fontFamily="var(--font-mono)" fontSize="6" fill={INK} fillOpacity="0.55" letterSpacing="0.18em">ENCARREGADO · DPO</text>
      <text x="40" y="56" fontFamily="var(--font-sans)" fontSize="13" fontWeight="500" fill={INK}>Agnes Chaparro</text>
      <text x="40" y="72" fontFamily="var(--font-mono)" fontSize="6.5" fill={INK} fillOpacity="0.7" letterSpacing="0.06em">contato@sparamer.com</text>
      <text x="40" y="84" fontFamily="var(--font-mono)" fontSize="6" fill={INK} fillOpacity="0.45" letterSpacing="0.12em">CANAL OFICIAL · ANPD</text>
      {/* seal */}
      <circle cx="150" cy="68" r="12" fill="none" stroke={a} strokeWidth="1.25" />
      <circle cx="150" cy="68" r="4" fill={a} />
      <Mono x={100} y={110} anchor="middle" opacity={0.4}>LEI Nº 13.709/2018</Mono>
    </>
  );
}

/* Legal — termos: signed contract with handshake (cross + hairline) */
function LegalTermos({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      {/* contract */}
      <rect x="36" y="16" width="92" height="92" fill="var(--color-cream)" stroke={INK} strokeOpacity="0.55" strokeWidth="1.1" />
      <text x="44" y="28" fontFamily="var(--font-mono)" fontSize="6.5" fill={INK} fillOpacity="0.8" letterSpacing="0.16em">CONTRATO</text>
      <line x1="44" y1="34" x2="80" y2="34" stroke={a} strokeWidth="1.25" />
      {/* clause lines */}
      {[44, 52, 60, 68, 76].map((y) => (
        <line key={y} x1="44" y1={y} x2={y === 76 ? 100 : 118} y2={y} stroke={INK} strokeOpacity="0.32" strokeWidth="0.75" />
      ))}
      {/* signature scribble */}
      <path d="M 44 92 Q 56 84 68 92 T 92 92 T 116 90" fill="none" stroke={INK} strokeOpacity="0.7" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="44" y1="100" x2="118" y2="100" stroke={INK} strokeOpacity="0.3" strokeWidth="0.5" />
      {/* check seal */}
      <circle cx="156" cy="62" r="18" fill={a} />
      <path d="M 148 62 L 154 68 L 164 56" fill="none" stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Mono x={100} y={114} anchor="middle">NDA MÚTUO · SEM MULTA</Mono>
    </>
  );
}

/* External — outgoing arrow over orbital */
function External({ a }: { a: string }) {
  return (
    <>
      <Horizon />
      <circle cx="76" cy="56" r="26" fill="none" stroke={INK} strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="2 4" />
      <circle cx="76" cy="56" r="14" fill="none" stroke={INK} strokeOpacity="0.7" strokeWidth="1.25" />
      <circle cx="76" cy="56" r="5" fill={a} />
      <line x1="110" y1="50" x2="160" y2="26" stroke={INK} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 148 24 L 162 24 L 162 38" fill="none" stroke={INK} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Ticks x={18} y={26} count={4} gap={6} />
      <Wave d="M 30 104 Q 60 100 100 104 T 170 102" a={a} opacity={0.55} />
      <Mono x={100} y={114} anchor="middle">LINK EXTERNO</Mono>
    </>
  );
}
