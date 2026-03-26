const hiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
}

export function SeoFallback({ children }: { children: React.ReactNode }) {
  return (
    <div style={hiddenStyle} aria-hidden="false">
      {children}
    </div>
  )
}
