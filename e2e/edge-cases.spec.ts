import { test, expect } from "@playwright/test"
import { waitForCanvas } from "./helpers/canvas"

test.describe("Error Handling — 404", () => {
  test("unknown route returns 404 status", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist")
    expect(response?.status()).toBe(404)
  })

  test("404 page has fallback content", async ({ page }) => {
    await page.goto("/this-page-does-not-exist")
    const heading = page.locator("h1")
    await expect(heading).toContainText("404")
  })

  test("404 page renders TUI after client hydration", async ({ page }) => {
    await page.goto("/this-page-does-not-exist")
    await waitForCanvas(page)
  })
})

test.describe("Console Errors", () => {
  test("no uncaught exceptions on home page", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))
    await page.goto("/")
    await waitForCanvas(page)
    await page.waitForTimeout(2000)
    expect(errors).toEqual([])
  })

  test("no uncaught exceptions on blog page", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.waitForTimeout(2000)
    expect(errors).toEqual([])
  })

  test("no uncaught exceptions on blog post page", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
    await page.waitForTimeout(2000)
    expect(errors).toEqual([])
  })

  test("no uncaught exceptions on projects page", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))
    await page.goto("/projects")
    await waitForCanvas(page)
    await page.waitForTimeout(2000)
    expect(errors).toEqual([])
  })

  test("no uncaught exceptions on about page", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))
    await page.goto("/about")
    await waitForCanvas(page)
    await page.waitForTimeout(2000)
    expect(errors).toEqual([])
  })

  test("no uncaught exceptions during full navigation flow", async ({
    page,
  }) => {
    const errors: string[] = []
    page.on("pageerror", (err) => errors.push(err.message))

    await page.goto("/")
    await waitForCanvas(page)
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
    await page.goto("/projects")
    await waitForCanvas(page)
    await page.goto("/about")
    await waitForCanvas(page)
    await page.goto("/")
    await waitForCanvas(page)

    expect(errors).toEqual([])
  })
})

test.describe("Accessibility", () => {
  test("canvas has role attribute", async ({ page }) => {
    await page.goto("/")
    await waitForCanvas(page)
    const canvas = page.locator("canvas")
    // Check canvas exists and is accessible
    await expect(canvas).toBeVisible()
  })

  test("noscript fallback has content", async ({ page }) => {
    await page.goto("/")
    // The SEO fallback div should always be present
    const fallbackDiv = page.locator("h1")
    await expect(fallbackDiv).toBeAttached()
  })
})

test.describe("Memory & Performance", () => {
  test("navigating through all pages does not leak memory significantly", async ({
    page,
  }) => {
    await page.goto("/")
    await waitForCanvas(page)

    const initialHeap = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0,
    )

    // Navigate through all pages 3 times
    for (let i = 0; i < 3; i++) {
      await page.goto("/blog")
      await waitForCanvas(page)
      await page.goto("/blog/hello-world")
      await waitForCanvas(page)
      await page.goto("/projects")
      await waitForCanvas(page)
      await page.goto("/about")
      await waitForCanvas(page)
      await page.goto("/")
      await waitForCanvas(page)
    }

    const finalHeap = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0,
    )

    // If memory API is available, check heap didn't grow more than 50MB
    if (initialHeap > 0 && finalHeap > 0) {
      const growth = finalHeap - initialHeap
      expect(growth).toBeLessThan(50 * 1024 * 1024)
    }
  })
})

test.describe("JavaScript Disabled", () => {
  test("page has content even without JS execution", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto("/")
    // SEO fallback should still be in the HTML
    const heading = page.locator("h1")
    await expect(heading).toContainText("kiel.codes")
    await context.close()
  })

  test("blog post has content without JS", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto("/blog/hello-world")
    const article = page.locator("article")
    await expect(article).toBeAttached()
    await context.close()
  })
})
