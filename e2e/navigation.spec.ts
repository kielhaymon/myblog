import { test, expect } from "@playwright/test"
import { waitForCanvas } from "./helpers/canvas"

test.describe("Cross-Page Navigation", () => {
  test("direct URL access: home page loads", async ({ page }) => {
    await page.goto("/")
    await waitForCanvas(page)
  })

  test("direct URL access: blog page loads", async ({ page }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
  })

  test("direct URL access: projects page loads", async ({ page }) => {
    await page.goto("/projects")
    await waitForCanvas(page)
  })

  test("direct URL access: about page loads", async ({ page }) => {
    await page.goto("/about")
    await waitForCanvas(page)
  })

  test("direct URL access: blog post loads", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
  })

  test("browser back button works after navigation", async ({ page }) => {
    await page.goto("/")
    await waitForCanvas(page)
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.goBack()
    await page.waitForURL("**/")
    // Should be back on home page
    const title = await page.title()
    expect(title).toBe("kiel.codes")
  })

  test("browser forward button works", async ({ page }) => {
    await page.goto("/")
    await waitForCanvas(page)
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.goBack()
    await page.waitForURL("**/")
    await page.goForward()
    await page.waitForURL("**/blog")
    expect(page.url()).toContain("/blog")
  })

  test("page refresh on blog page works", async ({ page }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.reload()
    await waitForCanvas(page)
    await expect(page).toHaveTitle(/Blog/)
  })

  test("page refresh on about page works", async ({ page }) => {
    await page.goto("/about")
    await waitForCanvas(page)
    await page.reload()
    await waitForCanvas(page)
    await expect(page).toHaveTitle(/About/)
  })

  test("deep link to blog post shows correct title", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await expect(page).toHaveTitle(/Hello World/)
  })
})
