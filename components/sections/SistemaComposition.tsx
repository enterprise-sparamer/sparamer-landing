"use client";

import { useEffect, useState } from "react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function SistemaComposition() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 500 620"
      role="img"
      aria-label="Composição visual representando o sistema de automações da Sparamer (círculo oliva, quadrado mostarda, círculo cerâmica)"
      className="w-full h-auto max-w-[440px] mx-auto"
    >
      <rect x={100} y={180} width={280} height={280} fill="var(--color-mostarda)" />
      <circle cx={160} cy={180} r={130} fill="var(--color-olive)" />
      <line x1={40} y1={380} x2={480} y2={380} stroke="var(--color-ink)" strokeWidth={3} />
      <circle cx={400} cy={500} r={80} fill="var(--color-ceramica)" />
      <line x1={400} y1={80} x2={400} y2={380} stroke="var(--color-ink)" strokeWidth={1} strokeOpacity={0.4} />
      {!reduced && (
        <circle r={8} fill="var(--color-ink)">
          <animateMotion dur="14s" repeatCount="indefinite" path="M 100 180 L 380 180 L 380 460 L 100 460 Z" />
        </circle>
      )}
      <text
        x={20}
        y={600}
        fontFamily="var(--font-mono)"
        fontSize={11}
        fill="var(--color-ink)"
        fillOpacity={0.5}
        letterSpacing="0.05em"
      >
        sparamer · sistema · 2026
      </text>
    </svg>
  );
}
