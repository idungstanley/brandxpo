"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

const faqs = [
  {
    question: "Do you only work with fashion and beauty brands?",
    answer:
      "Mostly. Apparel, accessories, skincare, fragrance, jewelry and cosmetics. If your brand sits close to those, start a conversation and we'll tell you honestly whether we're the right fit.",
  },
  {
    question: "How fast do things go live?",
    answer: "First graphics within a week. Your website in about 14 days. Your first commercial inside 30 days.",
  },
  {
    question: "Who owns the work?",
    answer: "You do. Every deliverable transfers to you on delivery, source files included.",
  },
  {
    question: "What if I don't like something?",
    answer: "Revisions are included on every plan. We keep going until it's right, with no extra invoice.",
  },
  {
    question: "Can I pause or cancel?",
    answer: "Monthly plans cancel any month. Quarterly plans pause at the end of the cycle. No exit fees.",
  },
  {
    question: "Do you run paid ads?",
    answer: "We make the ad assets, including your monthly commercial. Media buying is handled through a partner.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-muted-foreground mb-5">FAQ</p>
            <h2 className="text-4xl md:text-5xl leading-[1.05] text-balance">Questions, answered.</h2>
          </Reveal>

          <div className="lg:col-span-8 border-t border-border">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <Reveal key={faq.question} delay={index * 60} className="border-b border-border">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                  >
                    <span className="text-lg md:text-xl font-medium transition-opacity group-hover:opacity-70">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "grid place-items-center h-8 w-8 shrink-0 rounded-full border border-border transition-all duration-500",
                        isOpen && "bg-ink text-paper border-ink rotate-45",
                      )}
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[var(--ease-out-expo)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground leading-relaxed pb-6 pr-12 max-w-2xl">{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
