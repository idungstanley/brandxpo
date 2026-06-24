const quotes = [
  {
    body: "BrandXpo runs every channel for us. Two graphics every morning, a commercial each month, and our drops sell out the day they post.",
    who: "Sade A.", role: "Founder, NÜA Skin", tag: "Skincare · D2C", initials: "SA",
  },
  {
    body: "We went from posting twice a week to twice a day, and the look finally feels like a brand, not a Canva folder.",
    who: "Maya L.", role: "Creative Director, Maison Forme", tag: "Fashion · RTW", initials: "ML",
  },
  {
    body: "The website came in fourteen days. The shoot came in three. The studio just keeps moving and we keep selling.",
    who: "Tomi K.", role: "CEO, ORÒ Fragrance", tag: "Fragrance · Luxury", initials: "TK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bxp-section-pad" style={{ background: "var(--surface-page)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="bxp-grid-header-sm">
          <div>
            <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
              What clients say
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "var(--text-strong)", margin: 0, fontWeight: 400 }}>
              Labels that{" "}
              <span style={{ fontStyle: "italic", color: "var(--terracotta-3)" }}>sell</span>{" "}
              swear by us.
            </h2>
          </div>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
            Founders, creative directors, and merchandisers who hand us their brand and watch the cadence pick up.
          </p>
        </div>

        <div className="bxp-grid-3">
          {quotes.map((q) => (
            <figure
              key={q.who}
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-default)",
                borderRadius: 4,
                padding: 36,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.4, color: "var(--terracotta-3)", display: "block", marginBottom: -12 }}>"</span>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--text-strong)", flex: 1 }}>
                {q.body}
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid var(--border-default)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--wine-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cream-1)", letterSpacing: "0.04em" }}>{q.initials}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: "var(--text-strong)", fontWeight: 500 }}>{q.who}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{q.role}</div>
                </div>
                <span style={{ border: "1px solid var(--border-default)", borderRadius: 999, padding: "4px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                  {q.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
