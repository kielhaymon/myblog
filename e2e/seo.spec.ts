import { test, expect } from "@playwright/test"

test.describe("SEO — Hidden DOM Fallback", () => {
  test("home page has hidden description text", async ({ page }) => {
    await page.goto("/")
    const fallback = page.locator("h1")
    await expect(fallback).toContainText("kiel.codes")
  })

  test("blog listing has hidden post titles", async ({ page }) => {
    await page.goto("/blog")
    const heading = page.locator("h1")
    await expect(heading).toContainText("Blog")
    // Should have at least one post link
    const postLinks = page.locator('a[href^="/blog/"]')
    expect(await postLinks.count()).toBeGreaterThanOrEqual(1)
  })

  test("blog post has hidden article content", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const article = page.locator("article")
    await expect(article).toBeAttached()
    // Article should contain post text
    const h1 = article.locator("h1")
    await expect(h1).toContainText("Hello World")
  })

  test("about page has hidden content", async ({ page }) => {
    await page.goto("/about")
    const heading = page.locator("h1")
    await expect(heading).toContainText("About")
  })

  test("projects page has hidden content", async ({ page }) => {
    await page.goto("/projects")
    const heading = page.locator("h1")
    await expect(heading).toContainText("Projects")
  })
})

test.describe("SEO — Metadata", () => {
  test("home page has correct title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("kiel.codes")
  })

  test("home page has meta description", async ({ page }) => {
    await page.goto("/")
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute("content", /software engineer/)
  })

  test("blog listing has correct title", async ({ page }) => {
    await page.goto("/blog")
    await expect(page).toHaveTitle(/Blog/)
  })

  test("blog post has correct title", async ({ page }) => {
    await page.goto("/blog/hello-world")
    await expect(page).toHaveTitle(/Hello World/)
  })

  test("blog post has Open Graph tags", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute("content", "Hello World")

    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute("content", "article")
  })

  test("blog post has JSON-LD structured data", async ({ page }) => {
    await page.goto("/blog/hello-world")
    const jsonLd = page.locator('script[type="application/ld+json"]')
    await expect(jsonLd).toBeAttached()
    const content = await jsonLd.textContent()
    const data = JSON.parse(content!)
    expect(data["@type"]).toBe("BlogPosting")
    expect(data.headline).toBe("Hello World")
    expect(data.datePublished).toBe("2026-03-25")
    expect(data.author.name).toBe("Kiel Haymon")
  })

  test("about page has meta description", async ({ page }) => {
    await page.goto("/about")
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute("content", /software engineer/)
  })

  test("projects page has meta description", async ({ page }) => {
    await page.goto("/projects")
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute("content", /building/)
  })
})

test.describe("SEO — Sitemap & Robots", () => {
  test("sitemap.xml is accessible and valid", async ({ page }) => {
    const response = await page.goto("/sitemap.xml")
    expect(response?.status()).toBe(200)
    const content = await page.content()
    expect(content).toContain("<urlset")
    expect(content).toContain("https://kiel.codes")
    expect(content).toContain("https://kiel.codes/blog")
    expect(content).toContain("https://kiel.codes/blog/hello-world")
    expect(content).toContain("https://kiel.codes/projects")
    expect(content).toContain("https://kiel.codes/about")
  })

  test("sitemap includes lastmod dates", async ({ page }) => {
    await page.goto("/sitemap.xml")
    const content = await page.content()
    expect(content).toContain("<lastmod>")
  })

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt")
    expect(response?.status()).toBe(200)
    const content = await page.content()
    expect(content).toContain("User-Agent: *")
    expect(content).toContain("Allow: /")
    expect(content).toContain("sitemap.xml")
  })
})
