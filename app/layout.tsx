import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brandxpo.co"),
  title: "brandXpo — Websites, content and campaigns for fashion and beauty brands",
  description:
    "Website, SEO, daily graphics, a monthly commercial, UGC and social media management. One connected creative partner, one flat monthly fee.",
  openGraph: {
    title: "brandXpo — Make your brand impossible to overlook",
    description: "Websites, content and campaigns. One connected creative partner.",
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
