import { compromissos, phases, type Phase } from "@/lib/metodo";

type IllustrationKey = "diagnostico" | "implementacao" | "operacao";
const phaseIllustrationKey: Record<string, IllustrationKey> = {
  "01": "diagnostico",
  "02": "implementacao",
  "03": "operacao",
};

function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="metodo-grain"
      preserveAspectRatio="none"
    >
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}

function OpeningComposition() {
  return (
    <svg
      className="metodo-opening-art"
      viewBox="0 0 200 130"
      role="img"
      aria-label="Composição de abertura: três fases do método representadas por disco, quadrado e círculo"
    >
      {/* horizontal hairline */}
      <line x1="10" y1="65" x2="190" y2="65" stroke="var(--color-cream)" strokeOpacity="0.22" strokeWidth="1" />

      {/* the three primitives, small, in a row */}
      <circle cx="42" cy="48" r="11" fill="none" stroke="var(--color-cream)" strokeOpacity="0.75" strokeWidth="1.25" />
      <circle cx="42" cy="48" r="3" fill="var(--color-mostarda)" />
      <rect x="90" y="36" width="22" height="22" fill="var(--color-mostarda)" />
      <g>
        <circle cx="160" cy="48" r="11" fill="var(--color-ceramica)" />
        <circle cx="160" cy="48" r="18" fill="none" stroke="var(--color-ceramica)" strokeOpacity="0.55" strokeWidth="0.75" strokeDasharray="2 3" />
      </g>

      {/* mono "fases" tags */}
      <g fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-cream)" fillOpacity="0.55" letterSpacing="0.08em" textAnchor="middle">
        <text x="42" y="78">01</text>
        <text x="101" y="78">02</text>
        <text x="160" y="78">03</text>
      </g>

      {/* ruler ticks (right edge) — measurement / rigor */}
      <g stroke="var(--color-cream)" strokeOpacity="0.45" strokeWidth="1">
        <line x1="175" y1="22" x2="183" y2="22" />
        <line x1="175" y1="32" x2="183" y2="32" />
        <line x1="175" y1="42" x2="181" y2="42" />
        <line x1="175" y1="52" x2="183" y2="52" />
        <line x1="175" y1="62" x2="183" y2="62" />
      </g>

      {/* wavy hand-drawn path (mustard) below midline */}
      <path
        d="M 10 100 Q 28 95 48 102 T 88 100 T 128 102"
        fill="none"
        stroke="var(--color-mostarda)"
        strokeOpacity="0.75"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      {/* small serif "+" and dot */}
      <text x="170" y="106" fontFamily="var(--font-serif, Georgia, serif)" fontSize="13" fill="var(--color-cream)" fillOpacity="0.55" textAnchor="middle">+</text>
      <circle cx="18" cy="22" r="2" fill="var(--color-cream)" fillOpacity="0.6" />

      {/* scattered marks for texture */}
      <circle cx="68" cy="116" r="1" fill="var(--color-cream)" fillOpacity="0.35" />
      <circle cx="140" cy="20" r="1" fill="var(--color-cream)" fillOpacity="0.35" />
    </svg>
  );
}

function DiagnosticoArt({ showOrnaments, showSatellites }: { showOrnaments: boolean; showSatellites: boolean }) {
  return (
    <>
      {/* horizontal axis */}
      <line x1="10" y1="82" x2="190" y2="82" stroke="var(--color-cream)" strokeOpacity="0.18" strokeWidth="1" />

      {/* main shape — concentric scope rings + mustard center */}
      <circle cx="100" cy="82" r="46" fill="none" stroke="var(--color-cream)" strokeOpacity="0.30" strokeWidth="0.75" strokeDasharray="2 4" />
      <circle cx="100" cy="82" r="30" fill="none" stroke="var(--color-cream)" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="100" cy="82" r="16" fill="none" stroke="var(--color-cream)" strokeOpacity="0.9" strokeWidth="1.25" />
      <circle cx="100" cy="82" r="6" fill="var(--color-mostarda)" />
      {/* crosshair through center */}
      <line x1="100" y1="60" x2="100" y2="104" stroke="var(--color-cream)" strokeOpacity="0.45" strokeWidth="0.75" />
      <line x1="78" y1="82" x2="122" y2="82" stroke="var(--color-cream)" strokeOpacity="0.45" strokeWidth="0.75" />

      {showSatellites && (
        <>
          <circle cx="25" cy="138" r="3.5" fill="var(--color-cream)" fillOpacity="0.7" />
          <circle cx="170" cy="32" r="3.5" fill="var(--color-cream)" fillOpacity="0.7" />
          <circle cx="155" cy="55" r="2.5" fill="var(--color-cream)" fillOpacity="0.5" />
          <circle cx="35" cy="105" r="2.5" fill="var(--color-cream)" fillOpacity="0.5" />
        </>
      )}

      {showOrnaments && (
        <>
          {/* vertical ruler ticks at x=105 */}
          <g stroke="var(--color-cream)" strokeOpacity="0.45" strokeWidth="0.9">
            <line x1="103" y1="14" x2="107" y2="14" />
            <line x1="103" y1="24" x2="107" y2="24" />
            <line x1="103" y1="34" x2="107" y2="34" />
            <line x1="103" y1="44" x2="107" y2="44" />
          </g>

          {/* mustard squiggle */}
          <path
            d="M 130 25 Q 145 20 155 28 T 180 22"
            fill="none"
            stroke="var(--color-mostarda)"
            strokeOpacity="0.75"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* serif + */}
          <text x="155" y="138" fontFamily="var(--font-serif, Georgia, serif)" fontSize="14" fill="var(--color-cream)" fillOpacity="0.55" textAnchor="middle">+</text>
        </>
      )}
    </>
  );
}

function ImplementacaoArt({ showOrnaments, showSatellites }: { showOrnaments: boolean; showSatellites: boolean }) {
  return (
    <>
      {/* faint grid hint */}
      <line x1="100" y1="14" x2="100" y2="146" stroke="var(--color-cream)" strokeOpacity="0.10" strokeWidth="0.5" />
      <line x1="40" y1="80" x2="160" y2="80" stroke="var(--color-cream)" strokeOpacity="0.10" strokeWidth="0.5" />

      {/* main shape — mostarda square framed by hairline cream square */}
      <rect x="70" y="50" width="60" height="60" fill="none" stroke="var(--color-cream)" strokeOpacity="0.55" strokeWidth="1" />
      <rect x="78" y="58" width="44" height="44" fill="var(--color-mostarda)" />

      {showSatellites && (
        <>
          <circle cx="38" cy="78" r="3" fill="var(--color-ceramica)" />
          <circle cx="165" cy="42" r="3" fill="var(--color-ceramica)" />
          <circle cx="58" cy="128" r="2" fill="var(--color-cream)" fillOpacity="0.55" />
          <circle cx="148" cy="120" r="2" fill="var(--color-cream)" fillOpacity="0.55" />
        </>
      )}

      {showOrnaments && (
        <>
          {/* left guide ruler ticks */}
          <g stroke="var(--color-cream)" strokeOpacity="0.55" strokeWidth="0.9">
            <line x1="23" y1="28" x2="27" y2="28" />
            <line x1="23" y1="48" x2="27" y2="48" />
            <line x1="23" y1="68" x2="27" y2="68" />
            <line x1="23" y1="88" x2="27" y2="88" />
            <line x1="23" y1="108" x2="27" y2="108" />
            <line x1="23" y1="128" x2="27" y2="128" />
          </g>

          {/* up chevron */}
          <path
            d="M 168 82 L 175 72 L 182 82"
            fill="none"
            stroke="var(--color-cream)"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* mustard wavy line at bottom */}
          <path
            d="M 50 152 Q 70 148 90 152 T 130 152 T 165 150"
            fill="none"
            stroke="var(--color-mostarda)"
            strokeOpacity="0.65"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* serif + */}
          <text x="175" y="138" fontFamily="var(--font-serif, Georgia, serif)" fontSize="13" fill="var(--color-cream)" fillOpacity="0.55" textAnchor="middle">+</text>
        </>
      )}
    </>
  );
}

function OperacaoArt({ showOrnaments, showSatellites }: { showOrnaments: boolean; showSatellites: boolean }) {
  return (
    <>
      {/* outer orbital ring r=60 */}
      <circle cx="100" cy="80" r="60" fill="none" stroke="var(--color-ceramica)" strokeOpacity="0.55" strokeWidth="0.75" strokeDasharray="3 5" />

      {/* inner orbital ring r=46 */}
      <circle cx="100" cy="80" r="46" fill="none" stroke="var(--color-cream)" strokeOpacity="0.15" strokeWidth="0.5" />

      {/* main shape — ceramica disc framed by hairline cream ring */}
      <circle cx="100" cy="80" r="28" fill="none" stroke="var(--color-cream)" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="100" cy="80" r="18" fill="var(--color-ceramica)" />

      {/* animated orbital particle (still single moving element) */}
      <g className="metodo-orbit-anim">
        <circle r="3" fill="var(--color-mostarda)">
          <animateMotion dur="14s" repeatCount="indefinite" path="M 160 80 A 60 60 0 1 1 159.9 80 Z" />
        </circle>
      </g>

      {showSatellites && (
        <>
          {/* second static body */}
          <circle cx="40" cy="80" r="6" fill="var(--color-cream)" fillOpacity="0.85" />
          <circle cx="172" cy="120" r="2.5" fill="var(--color-cream)" fillOpacity="0.55" />
          <circle cx="28" cy="120" r="2" fill="var(--color-cream)" fillOpacity="0.45" />
        </>
      )}

      {showOrnaments && (
        <>
          {/* cardinal vertical ticks */}
          <g stroke="var(--color-cream)" strokeOpacity="0.5" strokeWidth="1">
            <line x1="100" y1="14" x2="100" y2="20" />
            <line x1="100" y1="140" x2="100" y2="146" />
          </g>

          {/* mustard wavy line at bottom */}
          <path
            d="M 60 150 Q 80 146 100 150 T 140 150"
            fill="none"
            stroke="var(--color-mostarda)"
            strokeOpacity="0.65"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* serif + */}
          <text x="32" y="38" fontFamily="var(--font-serif, Georgia, serif)" fontSize="13" fill="var(--color-cream)" fillOpacity="0.55" textAnchor="middle">+</text>
        </>
      )}
    </>
  );
}

function PhaseIllustration({
  phase,
  showOrnaments = true,
  showSatellites = true,
}: {
  phase: IllustrationKey;
  showOrnaments?: boolean;
  showSatellites?: boolean;
}) {
  const labels: Record<IllustrationKey, string> = {
    diagnostico: "Ilustração da fase de diagnóstico",
    implementacao: "Ilustração da fase de implementação",
    operacao: "Ilustração da fase de operação contínua",
  };

  return (
    <svg
      className={`phase-art phase-art-${phase}`}
      viewBox="0 0 200 160"
      role="img"
      aria-label={labels[phase]}
    >
      {phase === "diagnostico" && (
        <DiagnosticoArt showOrnaments={showOrnaments} showSatellites={showSatellites} />
      )}
      {phase === "implementacao" && (
        <ImplementacaoArt showOrnaments={showOrnaments} showSatellites={showSatellites} />
      )}
      {phase === "operacao" && (
        <OperacaoArt showOrnaments={showOrnaments} showSatellites={showSatellites} />
      )}
    </svg>
  );
}

function PhaseBlock({ phase, index }: { phase: Phase; index: number }) {
  const illustrationKey = phaseIllustrationKey[phase.number];
  return (
    <article
      className="phase-block"
      aria-labelledby={`phase-${phase.number}`}
      data-phase={index}
    >
      <div className="phase-illustration">
        {illustrationKey && (
          <PhaseIllustration phase={illustrationKey} showOrnaments showSatellites />
        )}
      </div>

      <div className="phase-content">
        <div className="phase-head">
          <span className="phase-number" aria-hidden="true">
            {phase.number}
          </span>
          <div className="phase-head-text">
            <h3 id={`phase-${phase.number}`} className="phase-title">
              <span className="phase-title-name">{phase.title}</span>
              <span className="phase-title-sep" aria-hidden="true">·</span>
              <span className="phase-title-duration">{phase.duration}</span>
            </h3>
            <p className="phase-invest">{phase.investimento}</p>
          </div>
        </div>

        <div className="phase-body">
          <div className="phase-entregaveis-col">
            <p className="phase-entregaveis-label">entregáveis</p>
            <ul className="phase-entregaveis">
              {phase.entregaveis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="phase-note">{phase.note}</p>
        </div>
      </div>
    </article>
  );
}

export function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-heading">
      <GrainOverlay />
      <div className="metodo-section">
        <header className="metodo-header">
          <div className="metodo-header-text">
            <h2 id="metodo-heading" className="metodo-h2">
              Um método previsível para um problema imprevisível.
            </h2>
            <p className="metodo-tagline">
              Três fases, entregáveis claros em cada gate e código em produção
              já na primeira semana. Você sabe o que vem, quando vem e por
              quanto.
            </p>
          </div>
          <div className="metodo-header-art">
            <OpeningComposition />
          </div>
        </header>

        <div className="phases-list">
          {phases.map((phase, i) => (
            <PhaseBlock key={phase.number} phase={phase} index={i} />
          ))}
        </div>

        <div className="compromissos">
          <span className="mono-label">compromissos transversais</span>
          <ul>
            {compromissos.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
