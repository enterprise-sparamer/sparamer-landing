import type { Case, CaseResult } from "@/types/cases";
import { FRENTE_ACCENT, FRENTE_FG_ON_ACCENT } from "@/lib/casos-constants";
import { IndustrialArrow } from "./IndustrialArrow";

interface CaseTransformationProps {
  resultado: CaseResult;
  frente: Case["frente"];
  size?: "card" | "page";
}

export function CaseTransformation({
  resultado,
  frente,
  size = "card",
}: CaseTransformationProps) {
  const accent = FRENTE_ACCENT[frente];
  const fgOnAccent = FRENTE_FG_ON_ACCENT[frente];

  return (
    <div
      className={`caso-xform caso-xform--${size}`}
      style={
        {
          "--accent": accent,
          "--fg-on-accent": fgOnAccent,
        } as React.CSSProperties
      }
    >
      <p className="caso-xform__metric">{resultado.metrica}</p>
      <div className="caso-xform__blocks">
        <div className="caso-xform__block caso-xform__block--antes">
          <span className="caso-xform__block-label">ANTES</span>
          <span className="caso-xform__block-value">{resultado.antes}</span>
        </div>
        <div className="caso-xform__arrow">
          <IndustrialArrow />
        </div>
        <div className="caso-xform__block caso-xform__block--depois">
          <span className="caso-xform__block-label">DEPOIS</span>
          <span className="caso-xform__block-value">{resultado.depois}</span>
        </div>
      </div>
    </div>
  );
}
