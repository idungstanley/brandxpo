"use client";

import { useState } from "react";

const faqs = [
  { q: "Do you only work with fashion and beauty brands?", a: "Mostly. Apparel, accessories, skincare, fragrance, jewelry, cosmetics — anything that lives on a feed and sells through a storefront. If you're outside that lane, talk to us anyway, but we'll be honest about fit." },
  { q: "How fast can we go live?", a: "First graphics ship within a week of the brief. A new website lands in around fourteen days. Commercials run on a monthly cadence, with first delivery inside thirty days from kickoff." },
  { q: "Who owns the work?", a: "You do. Every deliverable — graphics, footage, masters, copy, code — transfers to your brand on delivery, with source files included." },
  { q: "What if we don't like a deliverable?", a: "Revisions are included on every plan. We keep iterating until it ships — no extra invoice, no scope theatre." },
  { q: "Can we pause or cancel?", a: "Yes. Monthly plans cancel any month. Quarterly retainers pause at the end of the cycle. No early-exit fees." },
  { q: "Do you run paid ads too?", a: "We make the assets that ads run on — commercials, statics, UGC. Buying media is a partner offering; we'll plug you into the team we trust if you need it." },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bxp-section-pad" style={{ background: "var(--surface-canvas)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="bxp-grid-faq">
          {/* Sticky sidebar */}
          <div style={{ position: "sticky", top: 120 }}>
            <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
              FAQs
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 6vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "var(--text-strong)", margin: "0 0 24px", fontWeight: 400 }}>
              Questions,<br />
              <span style={{ color: "var(--text-muted)" }}>answered.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 28 }}>
              Don&apos;t see yours? Send a note. We reply within one business day, no sales script attached.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "transparent", color: "var(--text-strong)",
                fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500,
                padding: "10px 22px", borderRadius: 999,
                textDecoration: "none",
                border: "1px solid var(--border-default)",
              }}
            >
              Email the studio →
            </a>
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border-default)" }}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} style={{ borderBottom: "1px solid var(--border-default)" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%", background: "transparent", border: 0,
                      padding: "24px 0", display: "flex", alignItems: "center",
                      gap: 16, textAlign: "left", cursor: "pointer",
                      color: "var(--text-strong)", fontFamily: "var(--font-sans)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--text-muted)", width: 28, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.5vw, 26px)", lineHeight: 1.15, letterSpacing: "-0.01em", flex: 1, fontWeight: 400 }}>
                      {f.q}
                    </span>
                    <span style={{
                      width: 32, height: 32, borderRadius: 999, border: "1px solid var(--border-default)", flexShrink: 0,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      transition: "transform .25s var(--ease-standard), background .25s var(--ease-standard), color .25s var(--ease-standard)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      background: isOpen ? "var(--brand-primary)" : "transparent",
                      color: isOpen ? "var(--brand-on-primary)" : "var(--text-strong)",
                      fontSize: 18,
                    }}>+</span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 400 : 0, overflow: "hidden",
                    transition: "max-height .35s var(--ease-standard), opacity .25s var(--ease-standard)",
                    opacity: isOpen ? 1 : 0,
                  }}>
                    <p style={{ margin: 0, padding: "0 48px 24px 44px", fontSize: 15, lineHeight: 1.65, color: "var(--text-muted)" }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
