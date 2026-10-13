/*
  Portfolio entries for the "Selected work" section.

  To add a project:
  1. Put its images in /public/projects/<slug>/.
     - App projects: portrait screenshots (about 9:19.5). Up to 3 are shown.
       Use `shotStyle: "store"` for App Store marketing graphics that already
       include their own device and caption; "device" (default) wraps raw
       screenshots in a phone frame.
     - Website projects: one tall desktop capture. It scrolls inside the
       browser frame on hover.
  2. Add an entry below. Links, highlights, icon and client are optional.
*/

export type ProjectKind = "app" | "website"

export type Project = {
  slug: string
  name: string
  client?: string
  kind: ProjectKind
  category: string
  year: string
  summary: string
  /** Short labels shown as chips: platform, sector, or what we delivered. */
  tags: string[]
  /** Short, verifiable outcomes. Only add what you can back up. */
  highlights?: string[]
  links?: {
    playStore?: string
    appStore?: string
    website?: string
  }
  /** Paths under /public, e.g. "/projects/acme/1.webp" */
  images: string[]
  icon?: string
  shotStyle?: "device" | "store"
  /** Renders an empty device frame until real screenshots are added. */
  placeholder?: boolean
}

// TODO: add the brandXpo services delivered on each project to `tags`.
export const projects: Project[] = [
  {
    slug: "talstrike",
    name: "Talstrike",
    client: "Talstrike, L.L.C",
    kind: "app",
    category: "Sports · iOS app",
    year: "2026",
    summary:
      "A global sports platform where athletes get discovered. Players share highlights, scouts and coaches search and filter talent, and both sides connect, chat and close deals in one place.",
    tags: ["iOS", "Sports", "Talent discovery", "Messaging"],
    links: { appStore: "https://apps.apple.com/ng/app/talstrike/id6755691152" },
    images: ["/projects/talstrike/1.webp", "/projects/talstrike/2.webp", "/projects/talstrike/3.webp"],
    icon: "/projects/talstrike/icon.webp",
    shotStyle: "store",
  },
  {
    slug: "lazyzonelabs",
    name: "LazyzoneLabs",
    client: "LazyzoneLabs",
    kind: "website",
    category: "AI SaaS · Website",
    year: "2026",
    summary:
      "The marketing site for an all-in-one AI toolkit for creators: scripting, voice cloning, 4K video enhancement, clipping and thumbnails, presented as five modules in one workflow.",
    tags: ["Website", "SaaS", "AI", "Pricing & onboarding"],
    links: { website: "https://www.lazyzonelabs.com/" },
    images: ["/projects/lazyzonelabs/page.webp"],
  },
  {
    slug: "swiftpoint",
    name: "Swiftpoint",
    client: "Swiftpoint Technology Ltd",
    kind: "app",
    category: "Fintech · iOS app",
    year: "2026",
    summary:
      "A cross-border payments app for Africa. Multi-currency wallets, instant transfers, bill payments and live-rate conversion, with cashback on international exchanges.",
    tags: ["iOS", "Fintech", "Payments", "Multi-currency"],
    links: { appStore: "https://apps.apple.com/gb/app/swiftpoint/id6753941882" },
    images: ["/projects/swiftpoint/1.webp", "/projects/swiftpoint/2.webp", "/projects/swiftpoint/3.webp"],
    icon: "/projects/swiftpoint/icon.webp",
    shotStyle: "store",
  },
]
