"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cssVar } from "@/lib/tokens";

/* ─── Constructivist headline ───────────────────────────────────────────
   One SVG renders both the type and the animated shapes. The text is
   used twice: once as a <clipPath> that constrains the colored shapes
   to the letterforms, and once again as a stroke-only outline drawn on
   top. Because clip + stroke share the same coordinate system and font,
   they line up exactly — no canvas mask, no chromatic offset.
   ──────────────────────────────────────────────────────────────────── */

type LineDef = {
  text: string;
  variant: "alpha" | "beta" | "gamma";
};

const LINES: LineDef[] = [
  { text: "Sua empresa", variant: "alpha" },
  { text: "cresce.", variant: "beta" },
  { text: "O processo acompanha.", variant: "gamma" },
];

// Tuned for typical sans-serif metrics; SVG <text> y is the baseline.
const BASELINE = 0.78;
const LINE_HEIGHT_FACTOR = 0.98;

/* ─── Per-line liquid pool — ONE blob drifts through each line ──────────
   Single mercury circle per line, sized to fill the line height with a
   small margin. The form stays constructivist (hard-edged circle, primary
   color from the palette); the motion is liquid (slow horizontal drift,
   asymmetric scale morph so the pool breathes as it travels). Each line
   gets its own palette tone for constructivist rhythm without chaos. */

type ShapeProps = {
  variant: LineDef["variant"];
  lineY: number;
  lineH: number;
  width: number;
  paused: boolean;
};

function LineShapes({ variant, lineY, lineH, width, paused }: ShapeProps) {
  // Sized to fit fully within this line's vertical band so the clipPath
  // (built from all lines' text) never lets the pool bleed into adjacent
  // lines' letterforms.
  const radius = lineH * 0.48;
  const cy = lineY + lineH * 0.5;

  // Per-line tone + drift cadence. Different durations + directions so the
  // three lines feel like independent currents, not a synchronized march.
  const config =
    variant === "alpha"
      ? {
          fill: cssVar.olive,
          duration: 22,
          path: [-radius, width * 0.35, width * 0.7, width + radius],
        }
      : variant === "beta"
      ? {
          fill: cssVar.mostarda,
          duration: 17,
          path: [width + radius, width * 0.55, width * 0.25, -radius],
        }
      : {
          fill: cssVar.olive,
          duration: 26,
          path: [-radius, width * 0.4, width * 0.75, width + radius],
        };

  const loop = paused
    ? { duration: 0 }
    : { repeat: Infinity, repeatType: "loop" as const };

  return (
    <motion.circle
      cy={cy}
      r={radius}
      fill={config.fill}
      animate={paused ? { cx: width * 0.5 } : { cx: config.path }}
      transition={{ ...loop, duration: config.duration, ease: "easeInOut" }}
    />
  );
}

/* ─── Component ────────────────────────────────────────────────────── */

export function ConstructivistHeadline({ id }: { id?: string }) {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();
  const rootRef = useRef<HTMLHeadingElement | null>(null);
  const measureRefs = useRef<(SVGTextElement | null)[]>([]);
  const [baseFontSize, setBaseFontSize] = useState(64);
  const [width, setWidth] = useState(600);
  const [fitScale, setFitScale] = useState(1);
  const [inView, setInView] = useState(true);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize) || 64;
      const w = el.getBoundingClientRect().width;
      if (fs > 0) setBaseFontSize(fs);
      if (w > 0) setWidth(w);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => ro.disconnect();
  }, []);

  // Shrink-to-fit: measure the longest line at base fontSize and scale down
  // if it would overflow the container width.
  useLayoutEffect(() => {
    if (!width) return;
    let maxW = 0;
    for (const t of measureRefs.current) {
      if (!t) continue;
      const w = t.getComputedTextLength?.() ?? 0;
      if (w > maxW) maxW = w;
    }
    if (maxW <= 0) return;
    const next = Math.min(1, width / maxW);
    setFitScale((prev) => (Math.abs(prev - next) < 0.005 ? prev : next));
  }, [baseFontSize, width]);

  // Pause animations when the headline scrolls offscreen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = reduced || !inView;
  const fontSize = baseFontSize * fitScale;
  const lineH = fontSize * LINE_HEIGHT_FACTOR;
  const totalH = lineH * LINES.length;
  const clipId = `headline-clip-${uid.replace(/[^a-z0-9]/gi, "")}`;

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    fontWeight: 600,
    fontSize: `${fontSize}px`,
    letterSpacing: "-0.035em",
  };

  const measureStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    fontWeight: 600,
    fontSize: `${baseFontSize}px`,
    letterSpacing: "-0.035em",
  };

  return (
    <motion.h1
      ref={rootRef}
      id={id}
      aria-label={LINES.map((l) => l.text).join(" ")}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "clamp(2.5rem, 6.2vw, 5.5rem)",
        lineHeight: LINE_HEIGHT_FACTOR,
        letterSpacing: "-0.035em",
        // Reserve space so the SVG slot is stable before measurement.
        minHeight: `calc(${LINES.length} * 1em * ${LINE_HEIGHT_FACTOR})`,
      }}
    >
      <svg
        aria-hidden
        width={width}
        height={totalH}
        viewBox={`0 0 ${width} ${totalH}`}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Off-screen measurement at the unscaled font-size; drives fit-scale */}
        <g style={{ visibility: "hidden" }} aria-hidden>
          {LINES.map((line, i) => (
            <text
              key={`measure-${i}`}
              ref={(node) => {
                measureRefs.current[i] = node;
              }}
              x={0}
              y={0}
              style={measureStyle}
            >
              {line.text}
            </text>
          ))}
        </g>

        <defs>
          <clipPath id={clipId}>
            {LINES.map((line, i) => (
              <text
                key={i}
                x={0}
                y={i * lineH + fontSize * BASELINE}
                style={textStyle}
              >
                {line.text}
              </text>
            ))}
          </clipPath>
        </defs>

        {/* Animated shapes — visible only inside the letterforms */}
        <g clipPath={`url(#${clipId})`}>
          {LINES.map((line, i) => (
            <LineShapes
              key={i}
              variant={line.variant}
              lineY={i * lineH}
              lineH={lineH}
              width={width}
              paused={paused}
            />
          ))}
        </g>

        {/* Outline on top — defines the silhouette over light backgrounds */}
        {LINES.map((line, i) => (
          <text
            key={i}
            x={0}
            y={i * lineH + fontSize * BASELINE}
            style={textStyle}
            fill="none"
            stroke={cssVar.ink}
            strokeWidth={1.25}
            paintOrder="stroke"
          >
            {line.text}
          </text>
        ))}
      </svg>
    </motion.h1>
  );
}
