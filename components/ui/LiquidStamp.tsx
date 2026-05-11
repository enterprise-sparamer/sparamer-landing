"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

/**
 * Mustard liquid contained inside a button. Three blobs orbit in independent
 * loops; the global SVG goo filter (#liquid-goo, mounted in root layout)
 * merges their alphas at the edges so they coalesce / separate like mercury.
 * The button itself must clip to the pill shape (overflow-hidden, rounded-full).
 *
 * Idle: low opacity, slow orbit. Hover: full opacity, faster swell.
 * Ghost variant renders nothing — transparent buttons can't contain liquid.
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

  // Three blobs, each with its own orbit. Coordinates are pixel offsets from
  // each blob's anchored origin (left/top). The goo filter merges them when
  // their blurred alphas overlap.
  return (
    <span
      aria-hidden
      className="liquid-layer pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      style={{ filter: "url(#liquid-goo)" }}
    >
      <motion.span
        className={`${blob} h-9 w-9`}
        style={{ left: "-6%", top: "30%", ...willChange }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, 28, 56, 30, 0],
                y: [-4, 6, -2, 8, -4],
                scale: [0.9, 1.15, 0.95, 1.1, 0.9],
              }
        }
        transition={tween(7.2)}
      />
      <motion.span
        className={`${blob} h-7 w-7`}
        style={{ left: "38%", top: "18%", ...willChange }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -22, 18, -10, 0],
                y: [0, 10, -6, 4, 0],
                scale: [1, 1.18, 0.85, 1.08, 1],
              }
        }
        transition={tween(5.6, 0.9)}
      />
      <motion.span
        className={`${blob} h-8 w-8`}
        style={{ right: "-4%", top: "40%", ...willChange }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -30, -10, -40, 0],
                y: [0, -6, 8, 2, 0],
                scale: [0.85, 1.1, 0.95, 1.15, 0.85],
              }
        }
        transition={tween(6.4, 1.8)}
      />
    </span>
  );
}
