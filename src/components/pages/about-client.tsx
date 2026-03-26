"use client"

import { Shell } from "@/components/shell"
import { Ascii } from "@/components/ui/ascii"
import { Link } from "@/components/ui/link"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

export default function AboutClient() {
  const theme = useTheme()

  return (
    <Shell activePage="about">
      <box flexDirection="column" gap={1}>
        <Ascii text="about" font="tiny" />
        <box
          borderStyle="rounded"
          borderColor={theme.border}
          padding={1}
          flexDirection="column"
          gap={1}
        >
          <text style={textStyle({ fg: theme.foreground })}>
            Hey, I&apos;m Kiel. I&apos;m a software engineer who enjoys building things{"\n"}
            that are useful, well-crafted, and sometimes a little weird.
          </text>
          <text style={textStyle({ fg: theme.foreground })}>
            I spend my days writing code, thinking about developer tools and{"\n"}
            productivity, and occasionally writing about what I learn along the way.
          </text>
          <text style={textStyle({ fg: theme.foreground })}>
            This site is built with Gridland — a React framework for terminal UIs{"\n"}
            that run in the browser. Because why not.
          </text>
        </box>
        <box flexDirection="column" gap={0} marginTop={1}>
          <text style={textStyle({ fg: theme.primary, bold: true })}>
            find me online
          </text>
          <box flexDirection="row" gap={2}>
            <Link url="https://github.com/kielhaymon">GitHub</Link>
            <Link url="https://linkedin.com/in/kielhaymon">LinkedIn</Link>
          </box>
        </box>
      </box>
    </Shell>
  )
}
