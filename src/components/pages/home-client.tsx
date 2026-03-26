"use client"

import { Shell } from "@/components/shell"
import { Gradient } from "@/components/ui/gradient"
import { CommandPrompt } from "@/components/command-prompt"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

function HomeContent() {
  const theme = useTheme()

  return (
    <box flexDirection="column" gap={1}>
      <Gradient name="mind">
        {"kiel.codes"}
      </Gradient>
      <text style={textStyle({ fg: theme.muted })}>
        software engineer
      </text>
      <box
        borderStyle="rounded"
        borderColor={theme.border}
        padding={1}
        marginTop={1}
      >
        <text style={textStyle({ fg: theme.foreground })}>
          Welcome to my corner of the internet. I write about software engineering,{"\n"}
          productivity, and things I&apos;m building. Feel free to explore.
        </text>
      </box>
      <box marginTop={1}>
        <CommandPrompt />
      </box>
    </box>
  )
}

export default function HomeClient() {
  return (
    <Shell activePage="home">
      <HomeContent />
    </Shell>
  )
}
