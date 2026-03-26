"use client"

import { useRouter } from "next/navigation"
import { Shell } from "@/components/shell"
import { Gradient } from "@/components/ui/gradient"
import { CommandPrompt } from "@/components/command-prompt"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

const BANNER = "kiel.codes"

function HomeContent({ onNavigate }: { onNavigate: (path: string) => void }) {
  const theme = useTheme()

  return (
    <box flexDirection="column" gap={1}>
      <Gradient name="mind">
        {BANNER}
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
        <CommandPrompt onNavigate={onNavigate} />
      </box>
    </box>
  )
}

export default function HomeClient() {
  const router = useRouter()

  return (
    <Shell activePage="home">
      <HomeContent onNavigate={(path) => router.push(path)} />
    </Shell>
  )
}
