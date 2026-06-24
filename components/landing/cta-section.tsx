export function CtaSection() {
  return (
    <section id="contact" className="bxp-cta-section" style={{ background: "var(--surface-page)" }}>
      <div
        className="bxp-cta-inner"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          border: "1px solid var(--border-strong)",
        }}
      >
        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 96, height: 96, borderBottom: "1px solid var(--border-default)", borderLeft: "1px solid var(--border-default)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 96, height: 96, borderTop: "1px solid var(--border-default)", borderRight: "1px solid var(--border-default)" }} />

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.01em", margin: "0 0 28px", color: "var(--text-strong)", fontWeight: 400, maxWidth: 820 }}>
          Ready for your<br />
          next <span style={{ fontStyle: "italic", color: "var(--terracotta-3)" }}>drop</span>?
        </h2>

        <p style={{ maxWidth: 560, color: "var(--text-muted)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.6, margin: "0 0 40px" }}>
          We work with fashion and beauty brands ready to ship weekly, not quarterly. Tell us about your label — we&apos;ll send a written offer within 48 hours.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "var(--brand-primary)", color: "var(--brand-on-primary)",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
              padding: "0 28px", height: 48, borderRadius: 999, textDecoration: "none",
            }}
          >
            See our offer →
          </a>
          <a
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "transparent", color: "var(--text-strong)",
              fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
              padding: "0 28px", height: 48, borderRadius: 999, textDecoration: "none",
              border: "1px solid var(--border-default)",
            }}
          >
            Book a consultation
          </a>
        </div>

        <p style={{ marginTop: 32, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Now booking Q3 · 4 spots left
        </p>
      </div>
    </section>
  );
}
