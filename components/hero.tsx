"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandSymbol } from "./brand"
import { Hero3D } from "./hero-3d"

const chapters = [
  {
    eyebrow: "Web / Content / Campaigns",
    title: ["Make your brand", "impossible", "to overlook."],
    body: "Website, SEO, daily graphics, a monthly commercial and social, for fashion and beauty labels. One connected creative partner. One flat monthly fee.",
  },
  {
    eyebrow: "01 · Website",
    title: ["A site that sells,", "live in 14 days."],
    body: "Mobile-first, fast-loading pages built to turn visitors into enquiries, with SEO working from the first week.",
  },
  {
    eyebrow: "02 · Content",
    title: ["Fresh creative,", "every working day."],
    body: "Two branded designs a day, an ad-ready commercial every month, and a social feed that runs on rhythm.",
  },
]

const marquee = ["Website", "SEO", "Graphics design", "Commercial video", "UGC + creator", "Social media management"]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [active, setActive] = useState(0)

  // Progress through the pinned section drives both the 3D scene and the chapter copy.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      progress.current = p
      section.style.setProperty("--p", p.toFixed(4))
      setActive(Math.min(chapters.length - 1, Math.floor(p * chapters.length * 0.999)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative h-[300svh] bg-ink text-paper [--p:0]">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        {/* Mobile: a column where the 3D mark takes whatever height is left, so the
            copy and button always fit above the marquee. Desktop: two columns. */}
        <div className="container mx-auto px-5 md:px-8 flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-10 pt-20 md:pt-28 pb-5 lg:pb-6">
          {/* 3D mark, held on the right while the copy changes */}
          <div className="relative flex-1 min-h-[96px] lg:min-h-0 lg:col-span-6 lg:col-start-7 lg:order-2">
            <Hero3D progress={progress} className="absolute inset-0 lg:-inset-x-10" />
          </div>

          {/* Chapter copy */}
          <div className="relative shrink-0 lg:col-span-6 lg:row-start-1 lg:order-1 flex flex-col justify-center min-h-0">
            {/* All chapters share one grid cell, so the block is exactly as tall as the longest one */}
            <div className="grid items-center">
              {chapters.map((chapter, i) => {
                const Heading = i === 0 ? "h1" : "h2"
                const state = i === active ? "current" : i < active ? "past" : "future"
                return (
                  <div
                    key={chapter.eyebrow}
                    aria-hidden={i !== active}
                    className={cn(
                      "[grid-area:1/1] transition-all duration-700 ease-[var(--ease-out-expo)]",
                      state === "current" && "opacity-100 translate-y-0",
                      state === "past" && "opacity-0 -translate-y-10 pointer-events-none",
                      state === "future" && "opacity-0 translate-y-10 pointer-events-none",
                    )}
                  >
                    <p className="eyebrow text-paper/60 mb-4 lg:mb-6 fade-up" style={{ animationDelay: "0.1s" }}>
                      {chapter.eyebrow}
                    </p>
                    <Heading className="text-[2.2rem] leading-[1.04] sm:text-6xl xl:text-7xl mb-4 lg:mb-6">
                      {chapter.title.map((line, l) => (
                        <span key={line} className="line-mask">
                          <span className="line-rise" style={{ animationDelay: `${0.25 + l * 0.12}s` }}>
                            {line}
                          </span>
                        </span>
                      ))}
                    </Heading>
                    <p
                      className="text-[15px] sm:text-lg md:text-xl leading-relaxed text-paper/70 max-w-xl fade-up [@media(max-height:620px)]:hidden"
                      style={{ animationDelay: "0.7s" }}
                    >
                      {chapter.body}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 lg:mt-6 fade-up" style={{ animationDelay: "0.9s" }}>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-paper text-ink px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                Let&apos;s talk about your brand
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="hidden sm:inline-flex items-center rounded-full border border-paper/25 px-7 py-4 text-sm font-medium transition-colors duration-300 hover:bg-paper/10"
              >
                See what&apos;s included
              </Link>
            </div>
          </div>
        </div>

        {/* Chapter rail */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-xs font-medium">
          <span className="tabular-nums">{String(active + 1).padStart(2, "0")}</span>
          <span className="relative h-24 w-px bg-paper/20 overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 h-full bg-paper origin-top"
              style={{ transform: "scaleY(var(--p))" }}
            />
          </span>
          <span className="tabular-nums text-paper/40">{String(chapters.length).padStart(2, "0")}</span>
        </div>

        {/* Services marquee */}
        <div className="border-t border-paper/10 py-4 md:py-5 overflow-hidden shrink-0" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {[...marquee, ...marquee].map((item, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="flex items-center gap-8 pr-8 text-base md:text-xl font-medium text-paper/80"
                  >
                    {item}
                    <BrandSymbol className="h-4 w-auto text-paper/30" title="" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
