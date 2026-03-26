"use client"

import { TUI } from "@gridland/web"
import { ThemeProvider } from "@/components/ui/theme"
import { StatusBar } from "@/components/ui/status-bar"
import { TabBar } from "@/components/ui/tab-bar"
import { siteTheme } from "@/lib/colors"
import { useRouter } from "next/navigation"
import { useKeyboard } from "@gridland/utils"
import { ClientOnly } from "@/components/client-only"
import type { ReactNode } from "react"

const NAV_ITEMS = [
  { label: "home", path: "/" },
  { label: "blog", path: "/blog" },
  { label: "projects", path: "/projects" },
  { label: "about", path: "/about" },
]

export function Shell({
  children,
  activePage,
}: {
  children: ReactNode
  activePage: string
}) {
  const router = useRouter()
  const activeIndex = NAV_ITEMS.findIndex((item) => item.label === activePage)

  useKeyboard((key) => {
    if (key.name === "h") router.push("/")
    if (key.name === "b") router.push("/blog")
    if (key.name === "p") router.push("/projects")
    if (key.name === "a") router.push("/about")
  })

  return (
    <ClientOnly>
      <TUI style={{ width: "100vw", height: "100vh" }}>
        <ThemeProvider theme={siteTheme}>
          <box flexDirection="column" width="100%" height="100%">
            <TabBar
              options={NAV_ITEMS.map((n) => n.label)}
              selectedIndex={activeIndex >= 0 ? activeIndex : 0}
            />
            <box flexDirection="column" flexGrow={1} padding={1}>
              {children}
            </box>
            <StatusBar
              items={[
                { key: "h", label: "home" },
                { key: "b", label: "blog" },
                { key: "p", label: "projects" },
                { key: "a", label: "about" },
              ]}
              extra={
                <span style={{ fg: siteTheme.accent }}>kiel.codes</span>
              }
            />
          </box>
        </ThemeProvider>
      </TUI>
    </ClientOnly>
  )
}
