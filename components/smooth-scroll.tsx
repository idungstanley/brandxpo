"use client"

import { useEffect } from "react"
import Lenis from "lenis"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

// Weighted, eased page scrolling. Skipped entirely for reduced-motion users.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 }, autoRaf: true })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}

export function scrollToY(y: number) {
  if (window.__lenis) window.__lenis.scrollTo(y)
  else window.scrollTo({ top: y, behavior: "smooth" })
}
