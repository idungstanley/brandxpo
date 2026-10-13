"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

const services = [
  {
    name: "Website",
    cadence: "14-day launch",
    summary: "A conversion-focused storefront, built to launch in 14 days.",
    points: ["Mobile-first, fast-loading pages", "Built to convert visitors into enquiries", "Launch-ready in two weeks"],
  },
  {
    name: "SEO",
    cadence: "Always-on",
    summary: "Ongoing optimisation so the right customers find you on Google.",
    points: ["Keyword research", "On-page optimisation", "Ongoing ranking growth"],
  },
  {
    name: "Graphics design",
    cadence: "2 / day",
    summary: "Two branded designs, every single working day.",
    points: [
      "Social posts, campaign visuals, product cards, lookbook spreads",
      "Always on-brand: colours, type, tone",
      "Delivered on a content calendar you can see",
    ],
  },
  {
    name: "Commercial video",
    cadence: "1 / month",
    summary: "One ad-ready video, every month.",
    points: ["Concept to final cut", "Built for paid ad campaigns", "Yours to run, own and reuse"],
  },
  {
    name: "UGC + creator",
    cadence: "On request",
    summary: "Sourced creators shooting your product in their world.",
    points: ["Creators sourced to fit your brand", "Raw and cut deliverables"],
  },
  {
    name: "Social media management",
    cadence: "Always-on",
    summary: "Calendar, captions, replies, reporting. The feed runs on rhythm, not vibes.",
    points: ["Content calendar", "Captions and community replies", "Regular reporting"],
  },
]

export function Services() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow text-muted-foreground mb-5">Services</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 text-balance">
                Six deliverables. One flat monthly fee.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
                Your website, content and campaigns, working together. One team ships all of it, every week.
              </p>
            </Reveal>
          </div>

          <ol className="lg:col-span-7 border-t border-border">
            {services.map((service, index) => {
              const isOpen = open === index
              return (
                <Reveal as="li" key={service.name} delay={index * 70} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group relative w-full text-left overflow-hidden"
                  >
                    {/* Fill wipes up from the baseline on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-ink origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                    />
                    <span className="relative flex items-center gap-4 md:gap-8 px-1 md:px-4 py-6 md:py-7 transition-colors duration-300 group-hover:text-paper">
                      <span className="text-sm font-medium tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-paper/60 w-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-2xl md:text-3xl font-semibold tracking-tight">{service.name}</span>
                      <span className="hidden sm:inline-flex rounded-full border border-current/20 px-3 py-1 text-xs font-medium whitespace-nowrap">
                        {service.cadence}
                      </span>
                      <Plus
                        className={cn("w-5 h-5 shrink-0 transition-transform duration-500", isOpen && "rotate-45")}
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[var(--ease-out-expo)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-11 md:pl-[4.5rem] pr-4 pb-8">
                        <span className="sm:hidden inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium mb-4">
                          {service.cadence}
                        </span>
                        <p className="text-lg leading-relaxed mb-4 max-w-xl">{service.summary}</p>
                        <ul className="space-y-2 text-muted-foreground">
                          {service.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
