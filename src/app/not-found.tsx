import NotFoundClient from "@/components/pages/not-found-client"
import { SeoFallback } from "@/components/seo-fallback"

export default function NotFound() {
  return (
    <>
      <SeoFallback>
        <h1>404 — Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go home</a>
      </SeoFallback>
      <NotFoundClient />
    </>
  )
}
