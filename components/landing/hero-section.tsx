"use client";

import { useEffect, useState } from "react";

const words = ["launched", "styled", "scaled", "sold"];

export function HeroSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="bxp-hero theme-wine"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(120% 80% at 80% 10%, var(--wine-3) 0%, var(--wine-1) 55%, var(--wine-0) 100%)",
        color: "var(--cream-1)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Grid lines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.16, pointerEvents: "none" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: `${12.5 * (i + 1)}%`, height: 1, background: "color-mix(in oklab, var(--cream-1) 18%, transparent)" }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${8.33 * (i + 1)}%`, width: 1, background: "color-mix(in oklab, var(--cream-1) 18%, transparent)" }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in oklab, var(--cream-1) 55%, transparent)" }}>
          <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
          A brand studio for fashion + beauty
        </div>

        {/* Headline */}
        <h1
          className="bxp-hero-headline"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cream-1)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>Beautiful brands,</span>
          <span style={{ display: "block" }}>
            <span style={{ color: "var(--terracotta-4)", fontStyle: "italic" }}>{words[idx]}</span>{" "}fast.
          </span>
        </h1>

        {/* Subtext */}
        <p style={{ maxWidth: 540, marginTop: 36, color: "color-mix(in oklab, var(--cream-1) 70%, transparent)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.55 }}>
          Websites, commercials, daily graphics, and SEO — for fashion and beauty labels that want to ship every week, not every quarter.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          <a
            href="#pricing"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "var(--cream-1)", color: "var(--wine-1)",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
              padding: "0 28px", height: 48, borderRadius: 999,
              textDecoration: "none",
            }}
          >
            See our offer →
          </a>
          <a
            href="#process"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "transparent", color: "var(--cream-1)",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
              padding: "0 28px", height: 48, borderRadius: 999,
              textDecoration: "none",
              border: "1px solid color-mix(in oklab, var(--cream-1) 30%, transparent)",
            }}
          >
            Book a consultation
          </a>
        </div>

        {/* Stats — static on mobile (flow), absolute on desktop via CSS class */}
        <div className="bxp-hero-stats">
          {[
            ["2 / day",   "Graphics shipped"],
            ["1 / month", "Commercial spot"],
            ["14 days",   "Average website launch"],
            ["Always-on", "Social + SEO"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 38px)", letterSpacing: "-0.01em", lineHeight: 1, color: "var(--cream-0)" }}>{v}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in oklab, var(--cream-1) 50%, transparent)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
