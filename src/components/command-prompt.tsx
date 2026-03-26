"use client"

import { useState, useCallback } from "react"
import { useKeyboard } from "@gridland/utils"
import { textStyle } from "@/components/ui/text-style"
import { useTheme } from "@/components/ui/theme"

interface HistoryEntry {
  command: string
  output: string[]
}

const COMMANDS: Record<string, { navigate?: string; output?: string[] }> = {
  blog: { navigate: "/blog" },
  projects: { navigate: "/projects" },
  about: { navigate: "/about" },
  whoami: {
    output: [
      "Kiel Haymon — software engineer",
      "Writing about software engineering, productivity, and things I'm building.",
    ],
  },
  help: {
    output: [
      "Available commands:",
      "  blog       — read my blog posts",
      "  projects   — see what I'm building",
      "  about      — learn about me",
      "  whoami     — who am I?",
      "  ls         — list sections",
      "  clear      — clear the terminal",
      "  help       — show this message",
    ],
  },
  ls: {
    output: ["blog/  projects/  about/"],
  },
}

const COMMAND_NAMES = [...Object.keys(COMMANDS), "clear"]

export function CommandPrompt({ onNavigate }: { onNavigate: (path: string) => void }) {
  const theme = useTheme()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputValue, setInputValue] = useState("")
  const [tabHint, setTabHint] = useState<string[] | null>(null)

  // Tab completion
  useKeyboard((key) => {
    if (key.name === "tab") {
      const partial = inputValue.trim().toLowerCase()
      if (!partial) return

      const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial))
      if (matches.length === 1) {
        setInputValue(matches[0])
        setTabHint(null)
      } else if (matches.length > 1) {
        setTabHint(matches)
        // Find longest common prefix
        let prefix = matches[0]
        for (const m of matches) {
          while (!m.startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
          }
        }
        if (prefix.length > partial.length) {
          setInputValue(prefix)
        }
      }
    } else {
      // Clear tab hint on any other key
      if (tabHint) setTabHint(null)
    }
  })

  const handleSubmit = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase()
      setTabHint(null)
      if (!trimmed) {
        setInputValue("")
        return
      }

      setCommandHistory((prev) => [trimmed, ...prev])
      setHistoryIndex(-1)

      if (trimmed === "clear") {
        setHistory([])
        setInputValue("")
        return
      }

      const cmd = COMMANDS[trimmed]
      if (cmd?.navigate) {
        setHistory((prev) => [
          ...prev,
          { command: trimmed, output: [`Navigating to ${cmd.navigate}...`] },
        ])
        setInputValue("")
        onNavigate(cmd.navigate)
        return
      }

      if (cmd?.output) {
        setHistory((prev) => [
          ...prev,
          { command: trimmed, output: cmd.output! },
        ])
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            output: [`command not found: ${trimmed}. Type 'help' for available commands.`],
          },
        ])
      }
      setInputValue("")
    },
    [onNavigate],
  )

  return (
    <box flexDirection="column" gap={0}>
      {history.map((entry, i) => (
        <box key={i} flexDirection="column">
          <text>
            <span style={textStyle({ fg: theme.secondary, bold: true })}>
              visitor@kiel.codes
            </span>
            <span style={textStyle({ fg: theme.foreground })}>:</span>
            <span style={textStyle({ fg: theme.accent, bold: true })}>~</span>
            <span style={textStyle({ fg: theme.foreground })}>$ </span>
            <span style={textStyle({ fg: theme.foreground })}>{entry.command}</span>
          </text>
          {entry.output.map((line, j) => (
            <text key={j} style={textStyle({ fg: theme.foreground })}>
              {line}
            </text>
          ))}
        </box>
      ))}
      <box flexDirection="row">
        <text>
          <span style={textStyle({ fg: theme.secondary, bold: true })}>
            visitor@kiel.codes
          </span>
          <span style={textStyle({ fg: theme.foreground })}>:</span>
          <span style={textStyle({ fg: theme.accent, bold: true })}>~</span>
          <span style={textStyle({ fg: theme.foreground })}>$ </span>
        </text>
        <input
          value={inputValue}
          focused
          onInput={(v: any) => setInputValue(v)}
          onSubmit={(v: any) => handleSubmit(v)}
          cursorColor={theme.accent}
          cursorStyle={{ style: "block", blinking: true }}
          textColor={theme.foreground}
          placeholder="type 'help' for commands"
          placeholderColor={theme.placeholder}
        />
      </box>
      {tabHint && (
        <text style={textStyle({ fg: theme.muted })}>
          {tabHint.join("  ")}
        </text>
      )}
    </box>
  )
}
