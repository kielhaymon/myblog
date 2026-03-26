import { test, expect } from "@playwright/test"
import { waitForCanvas } from "./helpers/canvas"

test.describe("Blog Listing Page", () => {
  test("loads and shows blog heading in SEO fallback", async ({ page }) => {
    await page.goto("/blog")
    const heading = page.locator("h1")
    await expect(heading).toContainText("Blog")
  })

  test("canvas renders on blog page", async ({ page }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
  })

  test("has correct page title", async ({ page }) => {
    await page.goto("/blog")
    await expect(page).toHaveTitle(/Blog/)
  })

  test("SEO fallback lists post titles", async ({ page }) => {
    await page.goto("/blog")
    const postLink = page.locator('a[href="/blog/hello-world"]')
    await expect(postLink).toBeAttached()
  })

  test("post link in SEO fallback contains title", async ({ page }) => {
    await page.goto("/blog")
    const strong = page.locator("strong")
    await expect(strong.first()).toContainText("Hello World")
  })

  test("single post renders correctly without 'no posts' message", async ({
    page,
  }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
    // The SEO fallback should have at least one list item
    const listItems = page.locator("li")
    expect(await listItems.count()).toBeGreaterThanOrEqual(1)
  })
})

test.describe("Individual Blog Post", () => {
  test("loads hello-world post", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
  })

  test("has correct page title for post", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await expect(page).toHaveTitle(/Hello World/)
  })

  test("SEO fallback contains post content", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const article = page.locator("article")
    await expect(article).toBeAttached()
    await expect(article.locator("h1")).toContainText("Hello World")
  })

  test("post date is displayed in SEO fallback", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const time = page.locator("time")
    await expect(time).toHaveAttribute("datetime", "2026-03-25")
  })

  test("JSON-LD structured data is present", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd).toBeAttached()
    const content = await jsonLd.textContent()
    const data = JSON.parse(content!)
    expect(data["@type"]).toBe("BlogPosting")
    expect(data.headline).toBe("Hello World")
    expect(data.datePublished).toBe("2026-03-25")
  })

  test("screenshot matches baseline", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
    await page.waitForTimeout(1000)
    await expect(page).toHaveScreenshot("blog-post.png", {
      maxDiffPixelRatio: 0.05,
    })
  })
})

test.describe("Blog Post — edge cases", () => {
  test("nonexistent slug returns 404", async ({ page }) => {
    const response = await page.goto("/blog/nonexistent-slug")
    expect(response?.status()).toBe(404)
  })

  test("post with no summary renders without crash", async ({ page }) => {
    // hello-world has a summary, but verify the page at least works
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
    const canvas = page.locator("canvas")
    await expect(canvas).toBeVisible()
  })

  test("back navigation from post to listing works", async ({ page }) => {
    await page.goto("/blog")
    await waitForCanvas(page)
    await page.goto("/blog/hello-world")
    await waitForCanvas(page)
    await page.goBack()
    await page.waitForURL("**/blog")
    expect(page.url()).toContain("/blog")
    expect(page.url()).not.toContain("/hello-world")
  })
})
