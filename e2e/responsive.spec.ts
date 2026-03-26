import { test, expect } from "@playwright/test"
import { waitForCanvas } from "./helpers/canvas"

test.describe("Responsive — Desktop (1280x720)", () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test("canvas fills viewport on home page", async ({ page }) => {
    await page.goto("/")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThanOrEqual(1200)
    expect(box!.height).toBeGreaterThanOrEqual(600)
  })

  test("canvas fills viewport on blog page", async ({ page }) => {
    await page.goto("/blog")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThanOrEqual(1200)
  })
})

test.describe("Responsive — Tablet (768x1024)", () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test("canvas renders at tablet size", async ({ page }) => {
    await page.goto("/")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThan(0)
    expect(box!.height).toBeGreaterThan(0)
  })

  test("navigation works at tablet size", async ({ page }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
    await expect(page).toHaveTitle(/Blog/)
  })
})

test.describe("Responsive — Mobile (375x667)", () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test("canvas renders at mobile size", async ({ page }) => {
    await page.goto("/")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThan(0)
    expect(box!.height).toBeGreaterThan(0)
  })

  test("all pages load at mobile size", async ({ page }) => {
    for (const path of ["/", "/blog", "/projects", "/about"]) {
      await page.goto(path)
      await waitForCanvas(page)
    }
  })
})

test.describe("Responsive — Edge cases", () => {
  test("very narrow viewport (320px)", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto("/")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.width).toBeGreaterThan(0)
    // No horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    const clientWidth = await page.evaluate(() => document.body.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test("very tall viewport (1280x2000)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 })
    await page.goto("/")
    const canvas = await waitForCanvas(page)
    const box = await canvas.boundingBox()
    expect(box!.height).toBeGreaterThanOrEqual(1800)
  })

  test("viewport resize during interaction", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto("/")
    await waitForCanvas(page)
    // Resize viewport
    await page.setViewportSize({ width: 800, height: 600 })
    await page.waitForTimeout(500)
    // Canvas should still be visible
    const canvas = page.locator("canvas")
    await expect(canvas).toBeVisible()
    // Resize again
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)
    await expect(canvas).toBeVisible()
  })
})
