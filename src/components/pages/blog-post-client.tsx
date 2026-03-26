"use client"

import { Shell } from "@/components/shell"
import { Ascii } from "@/components/ui/ascii"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

interface BlogPostClientProps {
  title: string
  date: string
  content: string
  tags: string[]
}

export default function BlogPostClient({
  title,
  date,
  content,
  tags,
}: BlogPostClientProps) {
  const theme = useTheme()

  return (
    <Shell activePage="blog">
      <scrollbox flexGrow={1}>
        <box flexDirection="column" gap={1}>
          <Ascii text={title} font="tiny" />
          <text>
            <span style={textStyle({ fg: theme.muted, dim: true })}>
              {date}
            </span>
            {tags.length > 0 && (
              <span style={textStyle({ fg: theme.accent, dim: true })}>
                {"  "}{tags.map((t) => `#${t}`).join(" ")}
              </span>
            )}
          </text>
          <box
            borderStyle="rounded"
            borderColor={theme.border}
            padding={1}
            flexDirection="column"
          >
            <markdown>{content}</markdown>
          </box>
        </box>
      </scrollbox>
    </Shell>
  )
}
