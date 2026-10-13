import Link from "next/link"
import { contact } from "@/lib/contact"
import { BrandLockup } from "./brand"

const columns = [
  {
    title: "Services",
    links: [
      { label: "Website", href: "#services" },
      { label: "SEO", href: "#services" },
      { label: "Graphics design", href: "#services" },
      { label: "Commercial video", href: "#services" },
      { label: "UGC + creator", href: "#services" },
      { label: "Social media", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Your month", href: "#month" },
      { label: "Process", href: "#process" },
      { label: "Plans", href: "#plans" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: contact.supportEmail, href: `mailto:${contact.supportEmail}` },
      { label: contact.phoneDisplay, href: `tel:${contact.phone}` },
      { label: "WhatsApp", href: contact.whatsapp },
      { label: `Instagram ${contact.instagramHandle}`, href: contact.instagram },
    ],
  },
]

export function Footer() {
  return (
    <footer className="pt-20 pb-10 md:pt-24">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6 text-ink" aria-label="brandXpo home">
              <BrandLockup className="h-9" />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Websites, content and campaigns for fashion and beauty brands. One connected creative partner.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={col.title === "Connect" ? "md:col-span-3" : "md:col-span-2"}>
              <h4 className="eyebrow text-muted-foreground mb-5">{col.title}</h4>
              <ul className="space-y-3 text-sm font-medium">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:opacity-60 transition-opacity"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 brandXpo. All rights reserved.</p>
          <p className="font-medium text-foreground">Brand exposure. Built with purpose.</p>
        </div>
      </div>
    </footer>
  )
}
