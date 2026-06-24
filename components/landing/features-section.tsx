const services = [
  { num: "01", title: "Website",                  body: "Bespoke storefronts and brand sites. Shopify or custom — fast, indexable, on-brand from the favicon up.",  cadence: "14-day launch" },
  { num: "02", title: "SEO",                      body: "Technical + on-page + content. Built to rank in the queries your buyers already search.",                   cadence: "Always-on" },
  { num: "03", title: "Graphics design",          body: "Two graphics every working day. Campaign visuals, social posts, lookbook spreads, product cards.",          cadence: "2 / day",   featured: true },
  { num: "04", title: "Commercial video",         body: "One produced commercial per month for paid ads. Concept, shoot, edit, masters.",                            cadence: "1 / month" },
  { num: "05", title: "Social media management",  body: "Calendar, captions, replies, reporting. Your feed runs on rhythm — not vibes.",                            cadence: "Always-on" },
  { num: "06", title: "UGC + creator",            body: "Sourced creators shooting your product in their world. Raw + cut deliverables.",                           cadence: "On request" },
];

export function CapabilitiesSection() {
  return (
    <section id="services" className="bxp-section-pad" style={{ background: "var(--surface-page)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="bxp-grid-header">
          <div>
            <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              <span style={{ width: 32, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />
              Services
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.01em", color: "var(--text-strong)", margin: 0, fontWeight: 400 }}>
              Every surface,<br />
              <span style={{ color: "var(--text-muted)" }}>covered.</span>
            </h2>
          </div>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.55, color: "var(--text-muted)", margin: 0 }}>
            One studio for everything your fashion or beauty brand puts in front of a customer. Subscription pricing — predictable, monthly, no scope fights.
          </p>
        </div>

        <div className="bxp-grid-3">
          {services.map((s) => (
            <div
              key={s.num}
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-default)",
                borderRadius: 4,
                padding: 36,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em" }}>{s.num}</span>
                {s.featured ? (
                  <span style={{ background: "var(--terracotta-3)", color: "var(--cream-0)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 }}>
                    Most loved
                  </span>
                ) : null}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.01em", lineHeight: 1.05, margin: "0 0 14px", color: "var(--text-strong)", fontWeight: 400 }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6, margin: "0 0 24px", flex: 1 }}>{s.body}</p>
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-default)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>Cadence</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-strong)", letterSpacing: "0.04em" }}>{s.cadence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
