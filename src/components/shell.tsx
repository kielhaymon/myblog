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

function TrafficLights() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#ff5f57",
        }}
      />
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#febc2e",
        }}
      />
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#28c840",
        }}
      />
    </div>
  )
}

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0d1017",
          padding: 24,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 960,
            height: "100%",
            maxHeight: 680,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #2a2a3c",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 16px",
              backgroundColor: "#1a1a2e",
              borderBottom: "1px solid #2a2a3c",
              gap: 12,
            }}
          >
            <TrafficLights />
            <div
              style={{
                flex: 1,
                textAlign: "center",
                color: "#6c7086",
                fontSize: 13,
                fontFamily:
                  'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace',
                userSelect: "none",
                marginRight: 52 /* offset for traffic lights */,
              }}
            >
              visitor@kiel.codes
            </div>
          </div>
          {/* TUI content */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <TUI style={{ width: "100%", height: "100%" }}>
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
          </div>
        </div>
      </div>
    </ClientOnly>
  )
}
