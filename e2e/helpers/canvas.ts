import { type Page, expect } from "@playwright/test"

/**
 * Wait for the Gridland TUI canvas to be mounted and have non-zero dimensions.
 */
export async function waitForCanvas(page: Page) {
  const canvas = page.locator("canvas")
  await expect(canvas).toBeVisible({ timeout: 15000 })
  const box = await canvas.boundingBox()
  expect(box).toBeTruthy()
  expect(box!.width).toBeGreaterThan(0)
  expect(box!.height).toBeGreaterThan(0)
  return canvas
}

/**
 * Type a command into the Gridland TUI and press Enter.
 * Click the canvas first to ensure it has focus, then type.
 */
export async function typeCommand(page: Page, command: string) {
  const canvas = page.locator("canvas")
  await canvas.click()
  await page.keyboard.type(command, { delay: 30 })
  await page.keyboard.press("Enter")
}

/**
 * Wait for navigation to a specific URL path.
 */
export async function waitForNavigation(page: Page, path: string) {
  await page.waitForURL(`**${path}`, { timeout: 10000 })
}
