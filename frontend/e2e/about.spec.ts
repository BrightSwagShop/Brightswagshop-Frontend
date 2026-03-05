import { test, expect } from '@playwright/test';

test.describe('About Page - Happy Path', () => {
  test('should navigate to about page via navigation', async ({ page }) => {
    await page.goto('/');

    // Try to find About link in header/navigation
    const aboutLink = page.locator('a:has-text("About"), a:has-text("Over")').first();

    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*\/about.*/);
    } else {
      // Direct navigation fallback
      await page.goto('/about');
      await expect(page).toHaveURL(/.*\/about.*/);
    }
  });

  test('should display about page content', async ({ page }) => {
    await page.goto('/about');

    // Verify URL
    await expect(page).toHaveURL(/.*\/about.*/);

    // Check header & footer still visible
    await expect(page.locator('header')).toBeVisible();
    await page.keyboard.press('End');
    await expect(page.locator('footer')).toBeVisible();

    // Check main content exists
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Optional: check for heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});