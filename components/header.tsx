"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BrandLockup } from "./brand"
import { scrollToY } from "./smooth-scroll"

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Your month", href: "#month" },
  { label: "Process", href: "#process" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    scrollToY(0)
  }

  return (
    <header
      className={cn(
        "fixed z-50 text-paper transition-all duration-500 ease-out",
        scrolled || mobileMenuOpen
          ? "top-3 left-3 right-3 rounded-2xl bg-ink/95 backdrop-blur-md py-3 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)]"
          : "top-0 left-0 right-0 bg-transparent py-5",
      )}
    >
      <nav className="container mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={scrollToTop} aria-label="brandXpo home">
          <BrandLockup className="h-7 md:h-8" />
        </Link>

        <ul className="hidden md:flex items-center gap-9 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="relative text-paper/80 hover:text-paper transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:bg-paper after:transition-transform after:duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-paper text-ink text-sm font-medium px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          Book a consultation
        </Link>

        <button
          className="md:hidden z-50 p-1 -mr-1"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-5">
          <ul className="flex flex-col gap-5 mb-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-paper text-3xl font-semibold tracking-tight block"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-paper text-ink text-sm font-medium px-5 py-3 mb-5"
            onClick={closeMobileMenu}
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </header>
  )
}
