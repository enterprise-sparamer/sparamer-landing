"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "discord";

/**
 * Two mustard bubbles playing inside a button. They swing on opposing
 * orbits — when both arrive at the centre they kiss (goo filter merges
 * their alphas into one mercury blob for a beat), then they separate
 * and swing back to their own sides. The size mismatch (85% / 70%)
 * reads as a pair, not a clone — bubble + smaller bubble chasing it.
 *
 * Idle: visibly two bubbles at moderate opacity (you can see them play).
 * Hover: full opacity + slight scale-up — the kiss feels electric.
 * Ghost variant renders nothing.
 */
export function LiquidStamp({ variant }: { variant: Variant }) {
  const reduce = useReducedMotion();
  // Discord buttons stay a clean solid blurple — no mustard bubbles.
  if (variant === "ghost" || variant === "discord") return null;

  // aspect-square + height-as-%-of-container forces a true circle whose
  // diameter scales with button height (works for both md and lg sizes).
  const bubble =
    "absolute block rounded-full bg-mostarda-stamp aspect-square";

  const tween = (duration: number, delay = 0) =>
    reduce
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <span
      aria-hidden
      className="liquid-layer pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      style={{ filter: "url(#liquid-goo)" }}
    >
      {/* Bigger bubble — slower, takes the long way around */}
      <motion.span
        className={bubble}
        style={{
          height: "88%",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          willChange: "transform",
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["-140%", "-50%", "40%", "-50%", "-140%"],
                y: ["-50%", "-72%", "-50%", "-28%", "-50%"],
              }
        }
        transition={tween(5.6)}
      />
      {/* Smaller, eager bubble — faster, opposite phase, chases the kiss */}
      <motion.span
        className={bubble}
        style={{
          height: "68%",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          willChange: "transform",
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["40%", "-50%", "-140%", "-50%", "40%"],
                y: ["-50%", "-28%", "-50%", "-72%", "-50%"],
              }
        }
        transition={tween(4.4, 0.7)}
      />
    </span>
  );
}
