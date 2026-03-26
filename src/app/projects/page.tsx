import ProjectsClient from "@/components/pages/projects-client"
import { SeoFallback } from "@/components/seo-fallback"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I'm building — software projects by Kiel Haymon.",
}

const PROJECTS = [
  {
    name: "kiel.codes",
    description: "This website — a TUI-aesthetic personal blog built with Gridland and Next.js.",
    tech: ["React", "Gridland", "Next.js", "TypeScript"],
    url: "https://kiel.codes",
  },
]

export default function ProjectsPage() {
  return (
    <>
      <SeoFallback>
        <h1>Projects</h1>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong>: {p.description}
            </li>
          ))}
        </ul>
      </SeoFallback>
      <ProjectsClient projects={PROJECTS} />
    </>
  )
}
