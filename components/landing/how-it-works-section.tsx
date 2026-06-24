"use client";

import { useState } from "react";

const steps = [
  {
    num: "01", title: "Brief", sub: "the studio",
    body: "Tell us what you sell, who buys it, and the vibe. One 30-minute call — we send a written brief back within 48 hours.",
    note: "Audit + brand sheet + content calendar drafted.",
  },
  {
    num: "02", title: "Build", sub: "the work",
    body: "We design, write, shoot, and edit. Approvals run through a shared inbox; no agency portals, no five-tab review tools.",
    note: "Daily graphics from week 1. Site + first commercial inside 30 days.",
  },
  {
    num: "03", title: "Ship", sub: "every week",
    body: "Daily creative goes live. Monthly commercials cut for ads. SEO + social run in the background. You watch the metrics in your inbox.",
    note: "Weekly report. Monthly review. Quarterly recalibration.",
  },
];

export function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="bxp-section-pad theme-wine" style={{ background: "var(--wine-1)", color: "var(--cream-1)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in oklab, var(--cream-1) 50%, transparent)" }}>
          <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
          Process
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.86, letterSpacing: "-0.01em", color: "var(--cream-0)", margin: "0 0 64px", fontWeight: 400 }}>
          <span style={{ display: "block" }}>Brief.</span>
          <span style={{ display: "block", color: "color-mix(in oklab, var(--cream-1) 38%, transparent)" }}>Build.</span>
          <span style={{ display: "block", color: "color-mix(in oklab, var(--cream-1) 14%, transparent)" }}>Ship.</span>
        </h2>

        <div className="bxp-grid-3" style={{ gap: 16 }}>
          {steps.map((s, i) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                textAlign: "left",
                padding: 36,
                background: "var(--wine-0)",
                color: "var(--cream-1)",
                border: `1px solid ${active === i ? "color-mix(in oklab, var(--cream-1) 50%, transparent)" : "color-mix(in oklab, var(--cream-1) 18%, transparent)"}`,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                transition: "border-color .25s var(--ease-standard)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "-0.01em", color: active === i ? "var(--terracotta-4)" : "color-mix(in oklab, var(--cream-1) 22%, transparent)" }}>
                  {s.num}
                </span>
                <div style={{ flex: 1, height: 1, background: "color-mix(in oklab, var(--cream-1) 12%, transparent)", overflow: "hidden" }}>
                  {active === i ? (
                    <div style={{ height: "100%", background: "var(--terracotta-4)", opacity: 0.6, animation: "fillBar 6s linear infinite" }} />
                  ) : null}
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.05, color: "var(--cream-0)", margin: "0 0 4px", fontWeight: 400 }}>{s.title}</h3>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "color-mix(in oklab, var(--cream-1) 45%, transparent)", marginBottom: 20 }}>{s.sub}</div>
              <p style={{ color: "color-mix(in oklab, var(--cream-1) 65%, transparent)", lineHeight: 1.55, margin: "0 0 20px", fontSize: 14 }}>{s.body}</p>
              <div style={{ paddingTop: 16, borderTop: "1px solid color-mix(in oklab, var(--cream-1) 12%, transparent)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in oklab, var(--cream-1) 45%, transparent)" }}>
                {s.note}
              </div>
              {active === i ? <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "var(--terracotta-4)" }} /> : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
