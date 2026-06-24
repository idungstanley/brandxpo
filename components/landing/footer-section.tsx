const cols: Record<string, string[]> = {
  Studio:    ["Services", "Process", "Pricing", "Work"],
  Resources: ["Brand audit", "Templates", "Case studies", "Journal"],
  Company:   ["About", "Careers", "Press", "Contact"],
  Legal:     ["Privacy", "Terms", "Cookies"],
};

export function FooterSection() {
  return (
    <footer className="theme-wine" style={{ background: "var(--wine-1)", color: "var(--cream-1)" }}>
      <div className="bxp-footer-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 48px 32px" }}>
        <div className="bxp-grid-footer">
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <a href="#" style={{ display: "inline-flex", gap: 10, textDecoration: "none", marginBottom: 24 }}>
              <img src="/brandxpo-logo.png" alt="BrandXpo Logo" className="h-full w-40" />
            </a>
            <p style={{ color: "color-mix(in oklab, var(--cream-1) 50%, transparent)", fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: "0 0 32px" }}>
              The brand studio for fashion + beauty. Websites, commercials, daily creative, and SEO — on a single monthly fee.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Instagram", "TikTok", "Behance"].map((s) => (
                <a key={s} href="#" style={{ color: "color-mix(in oklab, var(--cream-1) 50%, transparent)", fontSize: 13, textDecoration: "none" }}>{s} ↗</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--cream-0)", margin: "0 0 20px", fontWeight: 500 }}>{title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "color-mix(in oklab, var(--cream-1) 50%, transparent)", fontSize: 13, textDecoration: "none" }}>
                      {l}
                      {l === "Careers" ? (
                        <span style={{ background: "var(--terracotta-3)", color: "var(--cream-0)", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 999 }}>
                          Hiring
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid color-mix(in oklab, var(--cream-1) 12%, transparent)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, color: "color-mix(in oklab, var(--cream-1) 35%, transparent)", fontSize: 13 }}>
          <span>© 2025 BrandXpo. Made for labels that move.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--terracotta-4)", display: "inline-block" }} />
            Now booking Q3
          </span>
        </div>
      </div>
    </footer>
  );
}
