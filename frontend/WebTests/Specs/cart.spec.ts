import { test, expect } from '@playwright/test';

test.describe('Winkelwagen Page - Happy Path', () => {
  test('should load winkelwagen page and show items + total + buttons', async ({ page }) => {
    await page.goto('/winkelwagen');
    await expect(page).toHaveURL(/.*\/winkelwagen.*/);

    // Product titles (3 items)
    const productTitles = page.locator('p', { hasText: 'Classic Tee' });
    await expect(productTitles).toHaveCount(3);

    // Quantity selects
    await expect(page.locator('select')).toHaveCount(3);

    // Delete buttons (3 trash buttons)
    await expect(page.locator('button').filter({ has: page.locator('svg') })).toHaveCount(3);

    // Total section
    await expect(page.getByText('Totaal bedrag:')).toBeVisible();
    await expect(page.getByText('€59,97')).toBeVisible();

    // Navigation buttons
    await expect(page.getByRole('link', { name: /verder winkelen/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /afrekenen/i })).toBeVisible();
  });

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/winkelwagen');
    await page.getByRole('link', { name: /verder winkelen/i }).click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('should navigate to checkout', async ({ page }) => {
    await page.goto('/winkelwagen');
    await page.getByRole('link', { name: /afrekenen/i }).click();
    await expect(page).toHaveURL(/.*\/checkout.*/);
  });
});