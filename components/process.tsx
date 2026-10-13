"use client"

import { cn } from "@/lib/utils"
import { Reveal, useInView } from "./reveal"

const steps = [
  {
    title: "Brief.",
    timing: "Within 48 hours",
    lead: "One 30-minute call. A written brief back within 48 hours.",
    detail: "We draft your audit, brand sheet and content calendar so everyone works from the same plan.",
  },
  {
    title: "Build.",
    timing: "Week one onward",
    lead: "Design, write, shoot, edit. Approvals through a shared inbox.",
    detail: "Daily graphics start in week one. Your site and first commercial land inside 30 days.",
  },
  {
    title: "Ship.",
    timing: "Every week",
    lead: "Daily creative live. Monthly commercials cut for ads.",
    detail: "SEO and social run in the background. Weekly report, monthly review, quarterly recalibration.",
  },
]

export function Process() {
  const [lineRef, inView] = useInView<HTMLDivElement>(0.3)

  return (
    <section id="process" className="py-24 md:py-32 bg-ink text-paper overflow-hidden">
      <div className="container mx-auto px-5 md:px-8">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow text-paper/60 mb-5">Process</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.98]">Brief. Build. Ship.</h2>
        </Reveal>

        <div ref={lineRef} className="relative">
          {/* Progress line draws across as the section enters */}
          <div className="hidden md:block absolute top-[11px] left-0 right-0 h-px bg-paper/15">
            <div
              className={cn(
                "h-full bg-paper origin-left transition-transform duration-[1800ms] ease-[var(--ease-in-out-quart)]",
                inView ? "scale-x-100" : "scale-x-0",
              )}
            />
          </div>

          <ol className="grid md:grid-cols-3 gap-12 md:gap-10">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  className={cn(
                    "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-paper bg-ink mb-8 transition-all duration-500",
                    inView && "bg-paper",
                  )}
                  style={{ transitionDelay: `${300 + i * 600}ms` }}
                >
                  <span className="sr-only">Step {i + 1}</span>
                </span>
                <Reveal delay={200 + i * 150}>
                  <p className="eyebrow text-paper/60 mb-3">
                    0{i + 1} · {step.timing}
                  </p>
                  <h3 className="text-3xl md:text-4xl mb-4">{step.title}</h3>
                  <p className="text-lg leading-relaxed mb-3">{step.lead}</p>
                  <p className="leading-relaxed text-paper/70">{step.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
