export function MetricsSection() {
  return (
    <section id="work" className="bxp-section-pad" style={{ background: "var(--surface-canvas)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
          By the numbers
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 9vw, 9rem)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "var(--text-strong)", margin: "0 0 64px", fontWeight: 400, maxWidth: "78%" }}>
          A studio that{" "}
          <span style={{ fontStyle: "italic", color: "var(--terracotta-3)" }}>moves</span>.
        </h2>

        <div className="bxp-grid-metrics">
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>This month</div>
              <div style={{ color: "var(--text-strong)", fontSize: 16 }}>Graphics shipped to fashion + beauty labels</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 96px)", letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-strong)" }}>847</div>
          </div>

          {[
            { v: "32",  s: "Brands on retainer",    m: "fashion + beauty only" },
            { v: "14d", s: "Average website launch", m: "brief to live" },
          ].map((m) => (
            <div key={m.s} style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", padding: 32, display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.m}</div>
                <div style={{ color: "var(--text-strong)", fontSize: 15 }}>{m.s}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.02em", lineHeight: 1, color: "var(--text-strong)" }}>{m.v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--border-default)", display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--terracotta-3)", display: "inline-block" }} />
            Now booking Q3
          </span>
          <span>Clients we work with — fashion · beauty · skincare · fragrance · jewelry</span>
        </div>
      </div>
    </section>
  );
}
