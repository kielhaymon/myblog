"use client"

import { Shell } from "@/components/shell"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

interface Project {
  name: string
  description: string
  tech: string[]
  url?: string
}

function ProjectCard({ project }: { project: Project }) {
  const theme = useTheme()

  return (
    <box
      borderStyle="rounded"
      borderColor={theme.border}
      padding={1}
      flexDirection="column"
    >
      <text style={textStyle({ fg: theme.primary, bold: true })}>
        {project.name}
      </text>
      <text style={textStyle({ fg: theme.foreground })}>
        {project.description}
      </text>
      <text style={textStyle({ fg: theme.accent, dim: true })}>
        {project.tech.join(" · ")}
      </text>
      {project.url && (
        <text style={textStyle({ fg: theme.muted, dim: true })}>
          {project.url}
        </text>
      )}
    </box>
  )
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const theme = useTheme()

  return (
    <Shell activePage="projects">
      <box flexDirection="column" gap={1}>
        <text style={textStyle({ fg: theme.primary, bold: true })}>
          ~/projects
        </text>
        <text style={textStyle({ fg: theme.muted })}>
          Things I&apos;m building. More coming soon.
        </text>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </box>
    </Shell>
  )
}
