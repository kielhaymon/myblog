import HomeClient from "@/components/pages/home-client"
import { SeoFallback } from "@/components/seo-fallback"

export default function HomePage() {
  return (
    <>
      <SeoFallback>
        <h1>kiel.codes</h1>
        <p>
          Kiel Haymon — software engineer. Writing about software engineering,
          productivity, and things I&apos;m building.
        </p>
        <nav>
          <a href="/blog">Blog</a>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
        </nav>
      </SeoFallback>
      <HomeClient />
    </>
  )
}
