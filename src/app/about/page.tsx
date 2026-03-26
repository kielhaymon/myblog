import AboutClient from "@/components/pages/about-client"
import { SeoFallback } from "@/components/seo-fallback"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kiel Haymon — software engineer who enjoys building things that are useful, well-crafted, and sometimes a little weird.",
}

export default function AboutPage() {
  return (
    <>
      <SeoFallback>
        <h1>About — Kiel Haymon</h1>
        <p>
          Software engineer who enjoys building things that are useful,
          well-crafted, and sometimes a little weird.
        </p>
        <ul>
          <li>
            <a href="https://github.com/kielhaymon">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/kielhaymon">LinkedIn</a>
          </li>
        </ul>
      </SeoFallback>
      <AboutClient />
    </>
  )
}
