"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

/*
  Naira pricing, benchmarked against 2026 Nigerian market rates for each
  service bought separately (mid-market agencies/freelancers):
    social media management ₦150k–₦300k/mo · SEO retainer ₦100k–₦250k/mo
    ongoing design ₦150k–₦500k/mo · 30–60s promo video ₦150k–₦350k each
    UGC video ₦40k–₦100k each · business website ₦300k–₦700k one-off
    e-commerce store ₦450k–₦1.5M one-off
  Studio bundles the whole offer at roughly half the separate cost.
*/
const QUARTERLY_DISCOUNT = 0.1

type Plan = {
  name: string
  monthly: number
  from?: boolean
  for: string
  features: string[]
  featured?: boolean
  anchor?: string
  cta: string
}

const plans: Plan[] = [
  {
    name: "Spark",
    monthly: 250_000,
    for: "New labels getting their first steady presence online.",
    features: [
      "1 branded design every working day (about 20 a month)",
      "Social media management on 2 platforms",
      "12 posts a month with captions and scheduling",
      "Comment and DM replies on weekdays",
      "1-page landing site, live in 14 days",
      "Google Business Profile and on-page SEO setup",
      "Monthly performance report",
    ],
    cta: "Get an offer",
  },
  {
    name: "Studio",
    monthly: 650_000,
    for: "Growing brands that want every surface live, every week.",
    features: [
      "2 branded designs every working day (about 40 a month)",
      "1 ad-ready commercial every month (30 to 60 seconds)",
      "Website up to 5 pages, live in 14 days",
      "Always-on SEO: keyword research, on-page work, 2 blog posts a month",
      "Social media management on 3 platforms, daily posting and replies",
      "Shared content calendar and approvals inbox",
      "Weekly report and monthly review call",
    ],
    featured: true,
    anchor: "Hired separately: about ₦550k–₦1.4M a month, plus ₦300k+ for the website.",
    cta: "Get an offer",
  },
  {
    name: "Atelier",
    monthly: 1_200_000,
    from: true,
    for: "Established labels running launches and paid campaigns.",
    features: [
      "Everything in Studio",
      "E-commerce store with Paystack or Flutterwave checkout",
      "2 commercials every month",
      "4 UGC creator videos every month",
      "Quarterly brand shoot day",
      "Paid ads creative and campaign setup",
      "Dedicated account manager",
    ],
    cta: "Book a consultation",
  },
]

const addOns = [
  { name: "UGC creator video", price: "from ₦60,000" },
  { name: "Extra commercial", price: "₦250,000" },
  { name: "E-commerce upgrade", price: "from ₦450,000 one-off" },
  { name: "Extra social platform", price: "₦50,000 / month" },
]

const included = ["Brand sheet", "Weekly check-in", "Revisions until it's right", "You own every file"]

const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`

export function Plans() {
  const [billing, setBilling] = useState<"monthly" | "quarterly">("monthly")

  return (
    <section id="plans" className="py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-muted-foreground mb-5">Plans</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-balance">
              One monthly fee. No surprises.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
              Priced in naira for Nigerian brands. One team for your website, content and campaigns, for less than
              hiring each one separately.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div
              role="radiogroup"
              aria-label="Billing period"
              className="relative inline-flex rounded-full bg-secondary p-1 border border-border"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  billing === "quarterly" && "translate-x-full",
                )}
              />
              {(["monthly", "quarterly"] as const).map((option) => (
                <button
                  key={option}
                  role="radio"
                  aria-checked={billing === option}
                  onClick={() => setBilling(option)}
                  className={cn(
                    "relative z-10 w-32 py-2 text-sm font-medium capitalize transition-colors duration-300",
                    billing === option ? "text-paper" : "text-foreground",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Save 10% when you pay quarterly</p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const price = billing === "monthly" ? plan.monthly : plan.monthly * (1 - QUARTERLY_DISCOUNT)
            const dark = plan.featured
            return (
              <Reveal key={plan.name} delay={i * 100}>
                <article
                  className={cn(
                    "h-full flex flex-col rounded-3xl p-7 md:p-9 border transition-transform duration-500 hover:-translate-y-1",
                    dark ? "bg-ink text-paper border-ink" : "bg-secondary border-border",
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl">{plan.name}</h3>
                    {plan.featured && (
                      <span className="rounded-full bg-paper text-ink text-xs font-medium px-3 py-1">Recommended</span>
                    )}
                  </div>

                  <p className={cn("text-sm mb-1 h-5", dark ? "text-paper/60" : "text-muted-foreground")}>
                    {plan.from ? "From" : ""}
                  </p>
                  <div className="flex items-baseline gap-1.5 mb-1 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={price}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[2.6rem] md:text-5xl xl:text-[3.25rem] font-semibold tracking-tight tabular-nums"
                      >
                        {naira(price)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className={cn("text-xs mb-5 h-4", dark ? "text-paper/50" : "text-muted-foreground")}>
                    {billing === "quarterly"
                      ? `per month · ${naira(price * 3)} billed every 3 months`
                      : "per month · cancel any month"}
                  </p>

                  <p className={cn("mb-6", dark ? "text-paper/80" : "text-foreground/80")}>{plan.for}</p>

                  <ul className={cn("space-y-3 mb-8 pt-6 border-t", dark ? "border-paper/15" : "border-border")}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm leading-snug">
                        <Check
                          className={cn("h-4 w-4 shrink-0 mt-0.5", dark ? "text-paper" : "text-foreground")}
                          strokeWidth={2.25}
                        />
                        <span className={dark ? "text-paper/85" : "text-foreground/85"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.anchor && (
                    <p className="mb-6 rounded-2xl bg-paper/[0.07] px-4 py-3 text-xs leading-relaxed text-paper/70">
                      {plan.anchor}
                    </p>
                  )}

                  <Link
                    href="#contact"
                    className={cn(
                      "group mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300",
                      dark ? "bg-paper text-ink hover:bg-paper/90" : "bg-ink text-paper hover:bg-ink/90",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Add-ons */}
        <Reveal delay={150} className="mt-5 rounded-3xl border border-border p-7 md:p-9">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="md:w-56 shrink-0">
              <p className="eyebrow text-muted-foreground mb-2">Add-ons</p>
              <p className="text-sm text-muted-foreground">Add to any plan, any month.</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              {addOns.map((a) => (
                <li key={a.name} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{a.name}</span>
                    <span className="block text-sm text-muted-foreground">{a.price}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            <span className="eyebrow text-muted-foreground">Every plan includes</span>
            {included.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 font-medium">
                <Check className="w-4 h-4" strokeWidth={2} />
                {item}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Ad spend is billed separately, at cost.</p>
        </Reveal>
      </div>
    </section>
  )
}
