import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Month } from "@/components/month"
import { Process } from "@/components/process"
import { Plans } from "@/components/plans"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Month />
      <Process />
      <Plans />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}
