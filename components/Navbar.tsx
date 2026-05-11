"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionId = "servicos" | "metodo" | "sobre";

const NAV_LINKS: { id: SectionId | null; href: string; label: string }[] = [
  { id: "servicos", href: "/#servicos", label: "serviços" },
  { id: "metodo",   href: "/#metodo",   label: "método" },
  { id: null,       href: "/sobre",     label: "sobre" },
];

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Scroll detection — threshold 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section detection — only on the home page where the sections exist.
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const ids: SectionId[] = ["servicos", "metodo", "sobre"];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    let pending = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (pending) return;
        pending = true;
        // Throttle to no more than 4×/sec.
        window.setTimeout(() => {
          pending = false;
        }, 250);

        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { threshold: 0.4 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Mobile menu: close on Escape, route change, and viewport widening; focus-trap.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    // Move focus to the first menu item after the panel un-hides
    // (display:none ancestors prevent focus until the next frame).
    const raf = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navClass = `site-nav${scrolled ? " is-scrolled" : ""}`;

  return (
    <header className={navClass} role="banner">
      <a href="#main" className="skip-link">
        pular para o conteúdo
      </a>

      <div className="nav-inner">
        <Link href="/" className="wordmark" aria-label="Sparamer — início">
          <span className="brand-dot" aria-hidden="true" />
          <span className="wordmark-text">
            sparamer<span className="wordmark-dot">.</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => {
            const active =
              link.id !== null
                ? isHome && activeSection === link.id
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta">
          <Link href="/diagnostico" className="nav-ghost">
            diagnóstico
          </Link>
          <Link href="/contato" className="btn-primary nav-cta-primary">
            conversar <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav-mobile"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={menuOpen ? "M6 6 L18 18 M6 18 L18 6" : "M4 8 H20 M4 16 H20"}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        id="site-nav-mobile"
        ref={menuRef}
        className="mobile-menu"
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navegação principal"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <Link href="/diagnostico">diagnóstico</Link>
      </div>
    </header>
  );
}
