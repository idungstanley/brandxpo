"use client";

import { useState, useEffect } from "react";

const links = ["Services", "Process", "Work", "Pricing", "Contact"];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          zIndex: 50,
          top: scrolled ? 16 : 0,
          left: scrolled ? 16 : 0,
          right: scrolled ? 16 : 0,
          transition: "top .35s var(--ease-standard), left .35s var(--ease-standard), right .35s var(--ease-standard)",
        }}
      >
        <nav
          style={{
            margin: "0 auto",
            maxWidth: scrolled ? 1200 : 1400,
            height: scrolled ? 56 : 72,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled || menuOpen
              ? "color-mix(in oklab, var(--wine-1) 95%, transparent)"
              : "transparent",
            color: "var(--cream-1)",
            backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
            border: scrolled
              ? "1px solid color-mix(in oklab, var(--cream-1) 12%, transparent)"
              : "1px solid transparent",
            borderRadius: scrolled ? 16 : 0,
            transition: "all .35s var(--ease-standard)",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/brandxpo-logo.png" alt="BrandXpo Logo" className="h-full w-40" />
          </a>

          {/* Desktop nav links */}
          <div className="bxp-nav-desktop">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{ color: "color-mix(in oklab, var(--cream-1) 70%, transparent)", fontSize: 13, textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="bxp-nav-cta">
            <a href="#" style={{ color: "color-mix(in oklab, var(--cream-1) 70%, transparent)", fontSize: 13, textDecoration: "none" }}>
              Client login
            </a>
            <a
              href="#pricing"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "var(--cream-1)", color: "var(--wine-1)",
                fontSize: 13, fontWeight: 500, fontFamily: "var(--font-sans)",
                textDecoration: "none", padding: "0 20px", height: 36, borderRadius: 999,
              }}
            >
              Get an offer
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="bxp-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: "var(--cream-1)" }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`bxp-mobile-menu${menuOpen ? " open" : ""}`}>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
          {links.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 10vw, 4rem)",
                lineHeight: 1.1,
                color: i === 0 ? "var(--cream-0)" : `color-mix(in oklab, var(--cream-1) ${80 - i * 15}%, transparent)`,
                textDecoration: "none",
                transition: "color .2s var(--ease-standard)",
              }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div style={{ paddingTop: 32, borderTop: "1px solid color-mix(in oklab, var(--cream-1) 12%, transparent)", display: "flex", flexDirection: "column", gap: 16 }}>
          <a href="#" style={{ color: "color-mix(in oklab, var(--cream-1) 55%, transparent)", fontSize: 14, textDecoration: "none", fontFamily: "var(--font-sans)" }}>
            Client login
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "var(--cream-1)", color: "var(--wine-1)",
              fontSize: 15, fontWeight: 500, fontFamily: "var(--font-sans)",
              textDecoration: "none", padding: "14px 0", borderRadius: 999,
            }}
          >
            Get an offer
          </a>
        </div>
      </div>
    </>
  );
}
