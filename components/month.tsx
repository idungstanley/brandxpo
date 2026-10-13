"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, MotionConfig, animate, motion, useMotionValue, useTransform } from "motion/react"
import { Check, FileText, Globe, LineChart, MessageSquare, Palette, Pause, Phone, Play, RotateCcw, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal, useInView } from "./reveal"

/*
  Month one, from the offer sheet:
  brief call day 1, written brief within 48 hours, two designs every working day,
  site live inside 14 days, first commercial inside 30 days, weekly reports,
  SEO and social always-on.
*/
const DAYS = 28
const GRAPHICS_START = 3
const WEBSITE_LIVE = 12
const COMMERCIAL = 26
const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const weekday = (day: number) => (day - 1) % 7
const isWorkday = (day: number) => weekday(day) < 5
const hasDesigns = (day: number) => isWorkday(day) && day >= GRAPHICS_START

const milestones: Record<number, string> = {
  1: "Brief call",
  [WEBSITE_LIVE]: "Website live",
  [COMMERCIAL]: "Commercial",
}

type DayEvent = { icon: typeof Check; label: string; strong?: boolean }

function eventsFor(day: number): DayEvent[] {
  if (!isWorkday(day)) return [{ icon: LineChart, label: "Off. SEO and social keep running in the background." }]
  const events: DayEvent[] = []
  if (day === 1) events.push({ icon: Phone, label: "Brief call, 30 minutes", strong: true })
  if (day === GRAPHICS_START)
    events.push({ icon: FileText, label: "Written brief, brand sheet and content calendar", strong: true })
  if (day === WEBSITE_LIVE) events.push({ icon: Globe, label: "Website live", strong: true })
  if (day === COMMERCIAL) events.push({ icon: Video, label: "First commercial delivered, cut for ads", strong: true })
  if (hasDesigns(day)) events.push({ icon: Palette, label: "2 branded designs delivered" })
  if (day > 1) events.push({ icon: MessageSquare, label: "Social posts scheduled and replies handled" })
  if (weekday(day) === 4) events.push({ icon: LineChart, label: "Weekly report" })
  return events
}

const designsBy = (day: number) => {
  let n = 0
  for (let d = 1; d <= day; d++) if (hasDesigns(d)) n += 2
  return n
}

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const rounded = useTransform(mv, (v) => Math.round(v))
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [mv, value])
  return <motion.span>{rounded}</motion.span>
}

export function Month() {
  const [cardRef, inView] = useInView<HTMLDivElement>(0)
  const [day, setDay] = useState(0) // 0 = month not started
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  // Auto-play through the month the first time the calendar is seen
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDay(DAYS)
      return
    }
    setPlaying(true)
  }, [inView])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setDay((d) => {
        if (d >= DAYS) {
          setPlaying(false)
          return d
        }
        return d + 1
      })
    }, 170)
    return () => window.clearInterval(id)
  }, [playing])

  // The panel rests on the latest milestone reached (so it isn't re-animating
  // every tick during playback); hovering or tapping shows the exact day.
  const notable = [1, GRAPHICS_START, WEBSITE_LIVE, COMMERCIAL].filter((d) => d <= Math.max(1, day)).pop() ?? 1
  const panelDay = hovered ?? notable
  // The selection ring follows the playhead while playing.
  const selected = hovered ?? (playing ? Math.max(1, day) : notable)
  const events = useMemo(() => eventsFor(panelDay), [panelDay])
  const designs = designsBy(day)

  const togglePlay = () => {
    if (day >= DAYS) setDay(0)
    setPlaying((p) => !(p && day < DAYS))
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id="month" className="py-24 md:py-32">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-muted-foreground mb-5">Your month</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 text-balance">
                Every surface, on the calendar.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                Here is how month one runs. Tap any day to see what lands.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="flex gap-0.5">
                    <span className="h-2.5 w-2.5 rounded-[3px] bg-ink" />
                    <span className="h-2.5 w-2.5 rounded-[3px] bg-ink" />
                  </span>
                  2 designs
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-5 rounded-full bg-ink" />
                  Milestone
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full ring-2 ring-ink/40" />
                  Weekly report
                </li>
              </ul>
            </Reveal>
          </div>

          <div ref={cardRef} className="rounded-[2rem] bg-ink text-paper p-4 sm:p-8 md:p-10">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
              <div>
                <p className="eyebrow text-paper/50 mb-1">Month one</p>
                <p className="text-lg md:text-xl font-semibold tabular-nums">
                  Day {Math.max(1, day)} <span className="text-paper/40 font-medium">of {DAYS}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 flex-1 max-w-sm">
                <div className="relative h-1 flex-1 rounded-full bg-paper/10 overflow-hidden">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-paper"
                    animate={{ width: `${(day / DAYS) * 100}%` }}
                    transition={{ duration: 0.25, ease: "linear" }}
                  />
                </div>
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : day >= DAYS ? "Replay month" : "Play month"}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" />
                  ) : day >= DAYS ? (
                    <RotateCcw className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 translate-x-px" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Calendar */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
                  {weekdayNames.map((d, i) => (
                    <span
                      key={d}
                      className={cn("eyebrow !tracking-[0.1em] text-[10px] sm:text-xs", i < 5 ? "text-paper/50" : "text-paper/25")}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2" onMouseLeave={() => setHovered(null)}>
                  {Array.from({ length: DAYS }, (_, i) => {
                    const d = i + 1
                    const lit = d <= day
                    const milestone = milestones[d]
                    const work = isWorkday(d)
                    const isSelected = d === selected
                    return (
                      <button
                        key={d}
                        onMouseEnter={() => setHovered(d)}
                        onFocus={() => setHovered(d)}
                        onClick={() => {
                          setPlaying(false)
                          setDay((cur) => Math.max(cur, d))
                          setHovered(d)
                        }}
                        aria-label={`Day ${d}${milestone ? `, ${milestone}` : ""}`}
                        className={cn(
                          "relative aspect-square sm:aspect-[5/4] rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 text-left transition-opacity duration-300",
                          lit ? "opacity-100" : "opacity-30",
                        )}
                      >
                        {/* Cell surface */}
                        <span
                          className={cn(
                            "absolute inset-0 rounded-[inherit] border transition-colors duration-500",
                            milestone && lit ? "bg-paper border-paper" : work ? "border-paper/12 bg-paper/[0.03]" : "border-transparent bg-paper/[0.015]",
                          )}
                        />
                        {/* Gliding selection ring */}
                        {isSelected && (
                          <motion.span
                            layoutId="day-ring"
                            className="absolute -inset-[3px] rounded-[0.85rem] sm:rounded-[1rem] ring-2 ring-paper"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          />
                        )}

                        <span className="relative flex h-full flex-col justify-between">
                          <span className="flex items-start justify-between">
                            <span
                              className={cn(
                                "text-xs sm:text-base font-semibold tabular-nums leading-none",
                                milestone && lit ? "text-ink" : work ? "text-paper" : "text-paper/35",
                              )}
                            >
                              {d}
                            </span>
                            {weekday(d) === 4 && (
                              <span
                                className={cn(
                                  "hidden sm:block h-1.5 w-1.5 rounded-full ring-2",
                                  milestone && lit ? "ring-ink/40" : "ring-paper/40",
                                )}
                              />
                            )}
                          </span>

                          {milestone ? (
                            <span
                              className={cn(
                                "hidden sm:block text-[11px] md:text-xs font-semibold leading-tight",
                                lit ? "text-ink" : "text-paper",
                              )}
                            >
                              {milestone}
                            </span>
                          ) : hasDesigns(d) ? (
                            <span className="flex gap-0.5 sm:gap-1">
                              {[0, 1].map((n) => (
                                <motion.span
                                  key={n}
                                  className="block h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-[2px] sm:rounded-[3px] bg-paper"
                                  initial={false}
                                  animate={{ scale: lit ? 1 : 0.4, opacity: lit ? 1 : 0.4 }}
                                  transition={{ type: "spring", stiffness: 600, damping: 20, delay: n * 0.06 }}
                                />
                              ))}
                            </span>
                          ) : !work ? (
                            <span className="hidden sm:block text-[10px] text-paper/25">Off</span>
                          ) : (
                            <span />
                          )}
                          {milestone && <span className="sm:hidden h-1 w-3 rounded-full bg-current opacity-80" />}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Always-on lanes */}
                <div className="mt-5 grid sm:grid-cols-2 gap-2">
                  {["SEO", "Social media management"].map((lane) => (
                    <div key={lane} className="relative h-10 rounded-full border border-paper/12 overflow-hidden">
                      <motion.span
                        className="absolute inset-y-0 left-0 bg-paper/12"
                        animate={{ width: `${(day / DAYS) * 100}%` }}
                        transition={{ duration: 0.25, ease: "linear" }}
                      />
                      <span className="relative flex h-full items-center justify-between px-4 text-sm font-medium">
                        {lane}
                        <span className="text-paper/50 text-xs">Always-on</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day detail + running totals */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-paper/10 lg:pl-10">
                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={panelDay}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="eyebrow text-paper/50 mb-2">{weekdayNames[weekday(panelDay)]}</p>
                      <p className="text-5xl font-semibold tracking-tight mb-5 tabular-nums">Day {panelDay}</p>
                      <ul className="space-y-3">
                        {events.map((e) => (
                          <li key={e.label} className="flex gap-3">
                            <span
                              className={cn(
                                "grid h-7 w-7 shrink-0 place-items-center rounded-full",
                                e.strong ? "bg-paper text-ink" : "border border-paper/15 text-paper/70",
                              )}
                            >
                              <e.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className={cn("pt-1 text-sm leading-snug", e.strong ? "text-paper font-medium" : "text-paper/70")}>
                              {e.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <dl className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5 border-t border-paper/10 pt-6 mt-auto">
                  <div>
                    <dt className="text-xs text-paper/50 mb-1">Designs delivered</dt>
                    <dd className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">
                      <AnimatedNumber value={designs} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper/50 mb-1">Website</dt>
                    <dd className="text-base md:text-lg font-semibold">
                      {day >= WEBSITE_LIVE ? "Live" : day >= 1 ? "In build" : "Brief"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-paper/50 mb-1">Commercial</dt>
                    <dd className="text-base md:text-lg font-semibold">
                      {day >= COMMERCIAL ? "Delivered" : day >= GRAPHICS_START ? "In production" : "Planned"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Illustrative month-one schedule. Exact dates are set in your brief.</p>
        </div>
      </section>
    </MotionConfig>
  )
}
