import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: "kiel.codes", template: "%s | kiel.codes" },
  description:
    "Kiel Haymon — software engineer. Writing about software engineering, productivity, and things I'm building.",
  metadataBase: new URL("https://kiel.codes"),
  openGraph: {
    title: "kiel.codes",
    description:
      "Kiel Haymon — software engineer. Writing about software engineering, productivity, and things I'm building.",
    url: "https://kiel.codes",
    siteName: "kiel.codes",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#1e2029", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  )
}
