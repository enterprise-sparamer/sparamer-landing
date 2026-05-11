"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/Button";
import { SistemaComposition } from "./SistemaComposition";
import { ConstructivistHeadline } from "./ConstructivistHeadline";
import { cssVar } from "@/lib/tokens";

/* ─── Motion ────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const lead: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.3 } },
};

const ctas: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.45 } },
};

/* ─── Hooks ─────────────────────────────────────────────────────────── */

function useCursorMagnet(ref: React.RefObject<HTMLElement | null>, radius = 80) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        el.style.transform = "translate(0, 0)";
        return;
      }
      const clamp = (n: number) => Math.max(-6, Math.min(6, n * 0.2));
      el.style.transform = `translate(${clamp(dx)}px, ${clamp(dy)}px)`;
    };

    const reset = () => { el.style.transform = "translate(0, 0)"; };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      el.style.transform = "";
    };
  }, [ref, radius]);
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function Hero() {
  const ctaRef = useRef<HTMLSpanElement | null>(null);
  useCursorMagnet(ctaRef);

  return (
    <section
      id="topo"
      aria-labelledby="hero-headline"
      className="relative flex flex-col overflow-hidden lg:min-h-screen lg:justify-center"
    >
      {/* Paper grain — above bg, below content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundRepeat: "repeat",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-[1200px] flex flex-col px-6 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-12 lg:py-20 lg:flex-1 lg:justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] lg:gap-x-12 lg:items-center">
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 flex flex-col">
            {/* Headline — constructivist shapes animate behind keywords */}
            <ConstructivistHeadline id="hero-headline" />
          </div>

          <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-2 flex flex-col">
            {/* Lead */}
            <motion.p
              variants={lead}
              className="mt-5 text-[17px] leading-[1.5] max-w-[58ch]"
              style={{ color: cssVar.ink70 }}
            >
              Somos a agência de automação e integrações para empresas que querem
              escalar sem inflar o time. Conectamos ferramentas, eliminamos tarefas
              manuais e devolvemos horas ao seu negócio — com código rodando em
              produção, não em slides.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={ctas}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <span
                ref={ctaRef}
                className="inline-block"
                style={{
                  transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  willChange: "transform",
                }}
              >
                <Button href="/contato" variant="primary" size="lg">
                  começar um projeto
                  <span aria-hidden className="ml-1">→</span>
                </Button>
              </span>

              <Link
                href="/#metodo"
                className="text-[14px] text-ink-70 hover:text-ink underline-offset-4 hover:underline transition-colors"
              >
                ver como trabalhamos
              </Link>
            </motion.div>
          </div>

          {/* Sistema composition */}
          <motion.div
            variants={ctas}
            className="hidden lg:flex lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center lg:my-0"
          >
            <SistemaComposition />
          </motion.div>
        </div>

        {/* Bottom row — tech stack */}
        <motion.div
          variants={ctas}
          className="mt-12 pt-5 lg:mt-auto"
          style={{ borderTop: "0.5px solid var(--color-ink-15)" }}
        >
          <span className="font-mono text-[13px] text-ink-55">
            zoho · discord · stripe · make · n8n · node · python
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
