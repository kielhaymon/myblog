"use client"

import { Shell } from "@/components/shell"
import { Ascii } from "@/components/ui/ascii"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

export default function NotFoundClient() {
  const theme = useTheme()

  return (
    <Shell activePage="">
      <box flexDirection="column" gap={1}>
        <Ascii text="404" font="block" color={theme.error} />
        <text style={textStyle({ fg: theme.foreground })}>
          Page not found. Try navigating with the tabs above or type &apos;help&apos; on the home page.
        </text>
      </box>
    </Shell>
  )
}
