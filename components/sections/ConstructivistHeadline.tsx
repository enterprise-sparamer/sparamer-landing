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

/* ─── Per-line shapes — fill the line vertically, drift horizontally ── */

type ShapeProps = {
  variant: LineDef["variant"];
  lineY: number;
  lineH: number;
  width: number;
  paused: boolean;
};

function LineShapes({ variant, lineY, lineH, width, paused }: ShapeProps) {
  const sq = Math.max(24, lineH * 0.78);
  const tri = Math.max(20, lineH * 0.7);
  const r1 = Math.max(18, lineH * 0.5);
  const r2 = Math.max(14, lineH * 0.36);

  const loop = paused
    ? { duration: 0 }
    : { repeat: Infinity, repeatType: "loop" as const };

  if (variant === "alpha") {
    return (
      <>
        <motion.rect
          y={lineY + lineH * 0.12}
          width={sq}
          height={sq}
          fill={cssVar.mostarda}
          animate={
            paused
              ? { x: width * 0.35 }
              : { x: [-sq, width * 0.35, width * 0.8, width + sq] }
          }
          transition={{ ...loop, duration: 14, ease: "linear" }}
        />
        <motion.polygon
          points={`0,0 ${tri},0 ${tri / 2},${tri}`}
          fill={cssVar.ceramica}
          animate={
            paused
              ? { x: width * 0.55, y: lineY + lineH * 0.2 }
              : {
                  x: [-tri, width * 0.5, width + tri],
                  y: [
                    lineY + lineH * 0.22,
                    lineY + lineH * 0.18,
                    lineY + lineH * 0.26,
                  ],
                }
          }
          transition={{ ...loop, duration: 11, ease: "easeInOut" }}
        />
        <motion.circle
          cy={lineY + lineH * 0.55}
          r={r1}
          fill={cssVar.olive}
          animate={
            paused
              ? { cx: width * 0.7 }
              : { cx: [width + r1, width * 0.6, -r1] }
          }
          transition={{ ...loop, duration: 13, ease: "easeInOut" }}
        />
      </>
    );
  }

  if (variant === "beta") {
    return (
      <>
        <motion.circle
          cy={lineY + lineH * 0.45}
          r={lineH * 0.65}
          fill={cssVar.olive}
          animate={
            paused
              ? { cx: width * 0.3 }
              : { cx: [-lineH * 0.7, width * 0.4, width * 0.85, width + lineH * 0.7] }
          }
          transition={{ ...loop, duration: 9, ease: "easeInOut" }}
        />
        <motion.rect
          y={lineY + lineH * 0.2}
          width={sq * 0.85}
          height={sq * 0.85}
          fill={cssVar.mostarda}
          animate={
            paused
              ? { x: width * 0.55 }
              : { x: [width + sq, width * 0.3, -sq] }
          }
          transition={{ ...loop, duration: 12, ease: "linear" }}
        />
        <motion.circle
          cy={lineY + lineH * 0.65}
          r={r2}
          fill={cssVar.ceramica}
          animate={
            paused
              ? { cx: width * 0.5 }
              : { cx: [width * 0.05, width * 0.75, width * 0.4, width * 0.05] }
          }
          transition={{ ...loop, duration: 7, ease: "easeInOut" }}
        />
      </>
    );
  }

  // gamma
  return (
    <>
      <motion.rect
        y={lineY + lineH * 0.14}
        width={sq * 0.9}
        height={sq * 0.9}
        fill={cssVar.mostarda}
        animate={
          paused
            ? { x: width * 0.4 }
            : { x: [-sq, width * 0.3, width * 0.7, width + sq] }
        }
        transition={{ ...loop, duration: 16, ease: "linear" }}
      />
      <motion.circle
        cy={lineY + lineH * 0.4}
        r={r1}
        fill={cssVar.olive}
        animate={
          paused
            ? { cx: width * 0.5 }
            : { cx: [width + r1, width * 0.55, -r1] }
        }
        transition={{ ...loop, duration: 10, ease: "easeInOut" }}
      />
      <motion.polygon
        points={`0,0 ${tri * 0.85},0 ${(tri * 0.85) / 2},${tri * 0.85}`}
        fill={cssVar.ceramica}
        animate={
          paused
            ? { x: width * 0.6, y: lineY + lineH * 0.28 }
            : {
                x: [width + tri, width * 0.4, -tri],
                y: [
                  lineY + lineH * 0.25,
                  lineY + lineH * 0.2,
                  lineY + lineH * 0.32,
                ],
              }
        }
        transition={{ ...loop, duration: 13, ease: "easeInOut" }}
      />
    </>
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
