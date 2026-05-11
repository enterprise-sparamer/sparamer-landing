"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

/**
 * Mustard liquid contained inside a button. Two blobs overlap in a tight
 * central cluster; the global SVG goo filter (#liquid-goo, mounted in root
 * layout) blurs and re-thresholds their alphas so they read as ONE mercury
 * body that morphs, never as separate ovals. The button surface clips them
 * to the pill via overflow-hidden + rounded-full.
 *
 * Idle: low opacity, slow morph (mercury in repose). Hover: full opacity,
 * faster swell (mercury under heat). Active: extra scale-up (splash).
 * Ghost variant renders nothing — transparent buttons can't hold liquid.
 */
export function LiquidStamp({ variant }: { variant: Variant }) {
  const reduce = useReducedMotion();
  if (variant === "ghost") return null;

  const blob = "absolute block rounded-full bg-mostarda-stamp";
  const willChange = { willChange: "transform" } as const;

  const tween = (duration: number, delay = 0) =>
    reduce
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, ease: "easeInOut" as const };

  // Two overlapping blobs, both centered vertically with small offset.
  // Their orbits cross paths so the goo filter constantly recomputes the
  // merged silhouette — the result reads as a single morphing mercury body
  // rather than two distinct circles. Sized as fraction of button height
  // via percentages so it scales with md/lg without per-size tuning.
  return (
    <span
      aria-hidden
      className="liquid-layer pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      style={{ filter: "url(#liquid-goo)" }}
    >
      <motion.span
        className={blob}
        style={{
          left: "30%",
          top: "50%",
          width: "55%",
          height: "180%",
          x: "-50%",
          y: "-50%",
          ...willChange,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["-58%", "-42%", "-55%", "-45%", "-58%"],
                y: ["-52%", "-48%", "-50%", "-53%", "-52%"],
                scaleX: [0.95, 1.1, 0.92, 1.05, 0.95],
                scaleY: [1.05, 0.9, 1.08, 0.95, 1.05],
              }
        }
        transition={tween(6.4)}
      />
      <motion.span
        className={blob}
        style={{
          left: "55%",
          top: "50%",
          width: "50%",
          height: "170%",
          x: "-50%",
          y: "-50%",
          ...willChange,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["-45%", "-58%", "-48%", "-52%", "-45%"],
                y: ["-48%", "-52%", "-46%", "-50%", "-48%"],
                scaleX: [1.05, 0.9, 1.08, 0.95, 1.05],
                scaleY: [0.92, 1.1, 0.95, 1.08, 0.92],
              }
        }
        transition={tween(5.2, 1.1)}
      />
    </span>
  );
}
