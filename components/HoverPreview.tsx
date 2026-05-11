"use client";

import { useEffect, useRef, useState } from "react";
import { resolvePreview, type LinkPreview } from "@/lib/linkPreviews";
import { PreviewIllustration } from "./HoverPreviewIllustrations";

type PreviewState = {
  preview: LinkPreview;
  x: number;
  y: number;
};

const SHOW_DELAY = 180;
const HIDE_DELAY = 120;
const CARD_W = 320;
const CARD_H = 280;
const GAP = 14;

export function HoverPreview() {
  const [state, setState] = useState<PreviewState | null>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const hoveringCard = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The card is 320 px wide; below that we'd be a worse experience than the
    // bare link, so skip mounting the listener entirely.
    if (window.innerWidth < CARD_W + 24) return;

    const clearTimers = () => {
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      showTimer.current = null;
      hideTimer.current = null;
    };

    const computeCoords = (rect: DOMRect) => {
      const vw = window.innerWidth;
      const spaceBelow = window.innerHeight - rect.bottom;
      const placeBelow = spaceBelow >= CARD_H + GAP + 12;
      const centerX = rect.left + rect.width / 2;
      // If viewport is narrower than card + gutters, center the card; otherwise
      // clamp it inside the safe gutter so it never clips at either edge.
      const minX = 12;
      const maxX = Math.max(minX, vw - CARD_W - 12);
      const x = Math.max(minX, Math.min(maxX, centerX - CARD_W / 2));
      const y = placeBelow
        ? rect.bottom + GAP
        : Math.max(12, rect.top - CARD_H - GAP);
      return { x, y };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.noPreview === "true") return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("javascript:")) return;
      if (href === "#" || href === "") return;

      const preview = resolvePreview(href, anchor.textContent || undefined);
      if (!preview) return;

      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      if (showTimer.current) window.clearTimeout(showTimer.current);

      const rect = anchor.getBoundingClientRect();
      const { x, y } = computeCoords(rect);

      showTimer.current = window.setTimeout(() => {
        setState({ preview, x, y });
      }, SHOW_DELAY);
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const related = e.relatedTarget;
      if (related instanceof Node && anchor.contains(related)) return;

      if (showTimer.current) {
        window.clearTimeout(showTimer.current);
        showTimer.current = null;
      }
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        if (!hoveringCard.current) setState(null);
      }, HIDE_DELAY);
    };

    const onScroll = () => {
      clearTimers();
      setState(null);
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimers();
    };
  }, []);

  if (!state) return null;
  const { preview, x, y } = state;

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => {
        hoveringCard.current = true;
        if (hideTimer.current) {
          window.clearTimeout(hideTimer.current);
          hideTimer.current = null;
        }
      }}
      onMouseLeave={() => {
        hoveringCard.current = false;
        setState(null);
      }}
      style={{
        position: "fixed",
        top: y,
        left: x,
        width: CARD_W,
        height: CARD_H,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
      className="hover-preview-card"
    >
      {/* Constructivist index tab — mostarda hairline at top-left */}
      <span aria-hidden className="hover-preview-tab" />

      <div className="hover-preview-shell">
        {/* Illustration */}
        <div className="hover-preview-art">
          <PreviewIllustration variant={preview.illustration} accent={preview.accent} />
        </div>

        {/* Editorial body */}
        <div className="hover-preview-content">
          <span className="hover-preview-divider" aria-hidden />
          <h4 className="hover-preview-title">{preview.title}</h4>
          <p className="hover-preview-subtitle">{preview.subtitle}</p>
        </div>

        {/* Footer register */}
        <footer className="hover-preview-foot">
          <span className="hover-preview-foot-number">{preview.number}</span>
          <span className="hover-preview-foot-cta">→ abrir</span>
        </footer>
      </div>
    </div>
  );
}
