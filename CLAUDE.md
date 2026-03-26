# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog built with **Next.js 16** (App Router) and **Gridland** — a React framework that renders a terminal-style UI (TUI) to `<canvas>`. The site looks and behaves like a terminal emulator in the browser.

## Build & Development

Package manager is **Bun**. Dev server uses **Turbopack**.

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Production build
bun run test         # Run Playwright E2E tests
bun run test:ui      # Playwright tests with UI
bun run test:headed  # Playwright tests with visible browser
```

Deployed on **Vercel** (configured via `vercel.json`).

## Architecture

### Dual-Rendering Strategy

The app renders content twice per page:
1. **Canvas (visible)**: Gridland TUI rendered to `<canvas>` — this is what users see
2. **Hidden DOM (SEO)**: Semantic HTML via `SeoFallback` component, invisible to users but crawlable by search engines

### Server/Client Component Split

Each page follows a consistent pattern:
- **Server Component** (`src/app/**/page.tsx`): Fetches data, defines Next.js `metadata`, includes `SeoFallback`, passes props to client component
- **Client Component** (`src/components/pages/*.tsx`): Marked `"use client"`, renders Gridland TUI using `<Shell>` wrapper

### Gridland JSX

Components use Gridland-specific JSX elements instead of HTML: `<box>`, `<text>`, `<scrollbox>`, `<markdown>`, `<input>`. Text styling uses the `textStyle()` helper with a bitmask system (bold=1, dim=2, italic=4, underline=8, inverse=32). Custom TypeScript declarations in `gridland-jsx.d.ts` allow flexible props on these elements.

Next.js integration is handled by the `withGridland` plugin in `next.config.ts`.

### Theming

Nord-inspired color palette defined in `src/lib/colors.ts`. Distributed via React Context (`ThemeProvider`/`useTheme` from `src/components/ui/theme.tsx`). Theme interface has 11 color properties.

### Navigation

Two parallel navigation systems:
- **Keyboard shortcuts**: `h` (home), `b` (blog), `p` (projects), `a` (about)
- **Command prompt**: Interactive terminal shell with commands like `blog`, `projects`, `about`, `whoami`, `help`, `ls`, `clear`

## Blog Content

Posts are Markdown files in `/content/blog/*.md` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "Brief description"
tags: ["tag1", "tag2"]
---
```

Post loading/parsing is in `src/lib/blog.ts` (uses `gray-matter`). Posts are statically generated at build time via `generateStaticParams`. Dynamic route: `/blog/[slug]`.

## Key UI Components

- `Shell` — Main layout: TabBar + content area + StatusBar
- `Ascii` — ASCII art text rendering (fonts: tiny, block, slick, shade)
- `Gradient` — Rainbow text effect
- `CommandPrompt` — Interactive terminal with command parsing
- `ClientOnly` — Hydration guard preventing server/client mismatch

## Testing

Playwright E2E tests in `/e2e/`. Tests two viewports: desktop (1280×720) and mobile (375×667). Tests verify canvas rendering, SEO DOM presence, navigation, and metadata. Canvas interaction helpers in `e2e/helpers/canvas.ts`.
