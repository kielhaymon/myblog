import { useTheme } from "./theme"
import { textStyle } from "./text-style"

export interface AsciiProps {
  text: string
  font?: "tiny" | "block" | "slick" | "shade"
  color?: string
}

export function Ascii({ text, color }: AsciiProps) {
  const theme = useTheme()
  const resolvedColor = color ?? theme.primary
  return (
    <text style={textStyle({ fg: resolvedColor, bold: true })}>
      {`[ ${text} ]`}
    </text>
  )
}
