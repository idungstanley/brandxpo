"use client";

import { useState } from "react";

const plans = [
  {
    name: "Spark", desc: "For new labels finding their feet",
    m: 499, a: 449,
    features: ["2 graphics / day", "Social media management", "1 monthly strategy call", "Shared brand sheet"],
    cta: "Start with Spark",
  },
  {
    name: "Studio", desc: "For growing brands that want every surface live",
    m: 1499, a: 1299,
    features: ["Everything in Spark", "1 commercial video / month", "SEO — technical + content", "UGC sourcing (1 creator / mo)", "Weekly creative review"],
    cta: "Choose Studio", highlight: true,
  },
  {
    name: "Atelier", desc: "For established labels with a full-time pipeline",
    m: null, a: null,
    features: ["Everything in Studio", "Custom website + storefront", "2 commercial videos / month", "Dedicated brand director", "Quarterly recalibration"],
    cta: "Talk to us",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="bxp-section-pad" style={{ background: "var(--surface-page)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="bxp-grid-header-sm" style={{ alignItems: "end" }}>
          <div>
            <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
              Pricing
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.01em", margin: 0, color: "var(--text-strong)", fontWeight: 400 }}>
              One monthly fee.<br />
              <span style={{ WebkitTextStroke: "1.5px currentColor", WebkitTextFillColor: "transparent" } as React.CSSProperties}>No surprises.</span>
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end" }}>
            <div style={{ display: "inline-flex", border: "1px solid var(--border-default)", borderRadius: 999, padding: 4, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {["Monthly", "Annual"].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(i === 1)}
                  style={{
                    padding: "8px 18px",
                    background: (i === 1) === annual ? "var(--brand-primary)" : "transparent",
                    color: (i === 1) === annual ? "var(--brand-on-primary)" : "var(--text-muted)",
                    border: 0, borderRadius: 999, cursor: "pointer",
                    fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit", textTransform: "inherit",
                    transition: "background .2s var(--ease-standard), color .2s var(--ease-standard)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bxp-grid-pricing">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={p.highlight ? "bxp-pricing-card-highlight" : undefined}
              style={{
                background: "var(--surface-card)",
                border: `1px solid ${p.highlight ? "var(--border-strong)" : "var(--border-default)"}`,
                margin: p.highlight ? "-8px -2px" : "0",
                position: "relative",
                zIndex: p.highlight ? 2 : 1,
                padding: 40,
              }}
            >
              {p.highlight ? (
                <div style={{ position: "absolute", top: -14, left: 32, right: 32, display: "flex", justifyContent: "center" }}>
                  <span style={{ background: "var(--terracotta-3)", color: "var(--cream-0)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 999 }}>
                    Most loved
                  </span>
                </div>
              ) : null}

              <div style={{ paddingBottom: 28, borderBottom: "1px solid var(--border-default)", marginBottom: 28 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 36px)", letterSpacing: "-0.01em", margin: "8px 0 6px", color: "var(--text-strong)", fontWeight: 400 }}>{p.name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>{p.desc}</p>
              </div>

              <div style={{ marginBottom: 28 }}>
                {p.m !== null ? (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 5vw, 64px)", color: "var(--text-strong)", letterSpacing: "-0.01em", lineHeight: 1 }}>${annual ? p.a : p.m}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/month</span>
                  </div>
                ) : (
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 56px)", color: "var(--text-strong)", letterSpacing: "-0.01em" }}>Custom</span>
                )}
                <p style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                  {p.m !== null
                    ? (annual ? "billed annually · cancel any month" : "billed monthly · cancel any month")
                    : "scoped per brand · quarterly retainers"}
                </p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "grid", gap: 12 }}>
                {p.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--terracotta-3)", lineHeight: 1.4 }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", padding: "12px 0",
                  background: p.highlight ? "var(--brand-primary)" : "transparent",
                  color: p.highlight ? "var(--brand-on-primary)" : "var(--text-strong)",
                  border: `1px solid ${p.highlight ? "var(--brand-primary)" : "var(--border-default)"}`,
                  borderRadius: 999,
                  fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                  textDecoration: "none",
                  transition: "background .2s var(--ease-standard)",
                }}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 48, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", textAlign: "center" }}>
          All plans include · brand sheet · weekly check-in · revisions until it&apos;s right
        </p>
      </div>
    </section>
  );
}
