"use client"

import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react"
import { contact } from "@/lib/contact"
import { BrandSymbol } from "./brand"
import { Reveal } from "./reveal"

export function CallToAction() {
  return (
    <section id="contact" className="relative py-24 md:py-36 bg-ink text-paper overflow-hidden">
      <BrandSymbol
        title=""
        className="pointer-events-none absolute -right-16 md:right-8 top-1/2 -translate-y-1/2 h-[80%] w-auto text-paper/[0.06]"
      />
      <div className="container mx-auto px-5 md:px-8 relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-paper/60 mb-6">Start a conversation</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-8 text-balance">
            Let&apos;s make your brand easier to find.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-paper/75 mb-10 max-w-xl">
            Tell us about your label. One 30-minute call, and a written brief back within 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${contact.email}?subject=Consultation%20request`}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-paper text-ink px-8 py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-paper/30 px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-paper/10"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-paper/15 flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 text-paper/75 hover:text-paper transition-colors">
              <Mail className="w-4 h-4" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2.5 text-paper/75 hover:text-paper transition-colors">
              <Phone className="w-4 h-4" />
              {contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
