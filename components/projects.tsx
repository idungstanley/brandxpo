"use client"

import type React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { projects, type Project } from "@/lib/projects"
import { Reveal, useInView } from "./reveal"

function hostname(url?: string) {
  if (!url || url === "#") return "yourclient.com"
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function PhoneFrame({ src, alt, className, style }: { src?: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2rem] border border-paper/15 bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]",
        className,
      )}
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-paper/[0.04]">
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full flex-col gap-2 p-3 pt-8" aria-hidden="true">
            <div className="h-20 rounded-xl bg-paper/[0.07]" />
            <div className="h-2 w-2/3 rounded-full bg-paper/[0.08]" />
            <div className="h-2 w-1/2 rounded-full bg-paper/[0.06]" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-lg bg-paper/[0.06]" />
              <div className="aspect-square rounded-lg bg-paper/[0.06]" />
            </div>
            <div className="mt-auto h-8 rounded-full bg-paper/[0.08]" />
          </div>
        )}
        <span className="absolute top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      </div>
    </div>
  )
}

// App Store marketing graphics already carry their own device and caption,
// so they're shown as clean tall cards rather than inside a second phone frame.
function StoreCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.4rem] ring-1 ring-paper/15 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  )
}

function AppMedia({ project, inView }: { project: Project; inView: boolean }) {
  const shots = project.images.length ? project.images.slice(0, 3) : [undefined, undefined, undefined]
  const layout = [
    "w-[29%] sm:w-[23%] -rotate-6 translate-y-5 group-hover:-rotate-[9deg] group-hover:-translate-x-3",
    "w-[33%] sm:w-[26%] z-10 -translate-y-2 group-hover:-translate-y-5",
    "w-[29%] sm:w-[23%] rotate-6 translate-y-5 group-hover:rotate-[9deg] group-hover:translate-x-3",
  ]
  return (
    <div className="flex h-full items-center justify-center gap-[3%] px-[6%]">
      {shots.map((src, i) => (
        <div
          key={i}
          className={cn("transition-all duration-1000 ease-[var(--ease-out-expo)]", layout[i % 3])}
          style={{
            opacity: inView ? 1 : 0,
            translate: inView ? "0 0" : "0 80px",
            transitionDelay: `${150 + i * 120}ms`,
          }}
        >
          {project.shotStyle === "store" && src ? (
            <StoreCard src={src} alt={`${project.name} screenshot ${i + 1}`} />
          ) : (
            <PhoneFrame src={src} alt={`${project.name} screenshot ${i + 1}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function WebsiteMedia({ project, inView }: { project: Project; inView: boolean }) {
  const src = project.images[0]
  return (
    <div className="flex h-full items-center justify-center p-[6%]">
      <div
        className="w-full overflow-hidden rounded-xl border border-paper/15 bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] transition-all duration-1000 ease-[var(--ease-out-expo)] group-hover:-translate-y-2"
        style={{ opacity: inView ? 1 : 0, translate: inView ? "0 0" : "0 60px", transitionDelay: "150ms" }}
      >
        <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-2.5 w-2.5 rounded-full bg-paper/20" />
            ))}
          </span>
          <span className="flex-1 truncate rounded-full bg-paper/[0.06] px-3 py-1 text-center text-[11px] text-paper/50">
            {hostname(project.links?.website)}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-paper/[0.04]">
          {src ? (
            // Tall full-page captures pan from top to bottom on hover
            <img
              src={src}
              alt={`${project.name} website`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom"
            />
          ) : (
            <div className="flex h-full flex-col gap-3 p-6" aria-hidden="true">
              <div className="h-3 w-1/4 rounded-full bg-paper/[0.08]" />
              <div className="mt-6 h-6 w-2/3 rounded-full bg-paper/[0.09]" />
              <div className="h-6 w-1/2 rounded-full bg-paper/[0.07]" />
              <div className="mt-auto grid grid-cols-3 gap-3">
                <div className="aspect-[4/3] rounded-lg bg-paper/[0.06]" />
                <div className="aspect-[4/3] rounded-lg bg-paper/[0.06]" />
                <div className="aspect-[4/3] rounded-lg bg-paper/[0.06]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const linkLabels: Record<keyof NonNullable<Project["links"]>, string> = {
  playStore: "Google Play",
  appStore: "App Store",
  website: "Visit website",
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const flip = index % 2 === 1
  const links = Object.entries(project.links ?? {}).filter(([, url]) => url) as [
    keyof NonNullable<Project["links"]>,
    string,
  ][]

  return (
    <article ref={ref} className="group grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* Media */}
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <div
          className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.03]"
          style={{
            clipPath: inView ? "inset(0 0 0 0 round 1.5rem)" : "inset(12% 6% 12% 6% round 1.5rem)",
            transition: "clip-path 1.2s var(--ease-out-expo)",
          }}
        >
          {project.kind === "app" ? (
            <AppMedia project={project} inView={inView} />
          ) : (
            <WebsiteMedia project={project} inView={inView} />
          )}
          {project.placeholder && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-paper/15 bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper/60 backdrop-blur">
              Screenshots coming soon
            </span>
          )}
        </div>
      </div>

      {/* Copy */}
      <Reveal delay={150} className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <div className="flex items-center gap-3 mb-6 text-sm text-paper/50">
          <span className="font-medium tabular-nums text-paper">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-paper/25" />
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>
        <div className="flex items-center gap-4 mb-2">
          {project.icon && (
            <img
              src={project.icon}
              alt=""
              className="h-12 w-12 md:h-14 md:w-14 rounded-[22%] ring-1 ring-paper/15"
              loading="lazy"
            />
          )}
          <h3 className="text-4xl md:text-5xl leading-[1.05]">{project.name}</h3>
        </div>
        {project.client && <p className="text-paper/50 mb-6">{project.client}</p>}
        <p className="text-lg leading-relaxed text-paper/75 mb-6 max-w-lg">{project.summary}</p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mb-6 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-paper/85">
                <span className="mt-2.5 h-1 w-3 shrink-0 bg-paper" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((s) => (
            <li key={s} className="rounded-full border border-paper/15 px-3 py-1 text-xs font-medium text-paper/70">
              {s}
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map(([kind, url], i) => (
              <a
                key={kind}
                href={url}
                target={url === "#" ? undefined : "_blank"}
                rel={url === "#" ? undefined : "noopener noreferrer"}
                className={cn(
                  "group/link inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
                  i === 0 ? "bg-paper text-ink hover:bg-paper/85" : "border border-paper/25 hover:bg-paper/10",
                )}
              >
                {linkLabels[kind]}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </article>
  )
}

export function Projects() {
  return (
    <section id="work" className="py-24 md:py-32 bg-ink text-paper">
      <div className="container mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-paper/50 mb-5">Selected work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">Work we&apos;ve shipped.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-paper/50 text-sm">
              <span className="text-paper text-3xl font-semibold tabular-nums mr-2">
                {String(projects.length).padStart(2, "0")}
              </span>
              projects
            </p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-36">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
