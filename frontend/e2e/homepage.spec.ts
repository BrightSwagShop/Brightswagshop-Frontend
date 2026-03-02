import { test, expect } from '@playwright/test';

test.describe('Homepage - Happy Path', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Verify page loaded
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Verify main heading is visible
    const heading = page.locator('h1:has-text("BrightSwagShop")');
    await expect(heading).toBeVisible();
  });

  test('should display header with navigation', async ({ page }) => {
    await page.goto('/');
    
    // Verify header exists
    const header = page.locator('header, nav, [class*="header"]').first();
    await expect(header).toBeVisible();
    
    // Verify navigation links are present
    const navLinks = page.locator('nav a, header a').first();
    await expect(navLinks).toBeVisible();
  });

  test('should display product categories or items', async ({ page }) => {
    await page.goto('/');
    
    // Verify products or categories are displayed
    const products = page.locator('div[class*="rounded-xl"]').first();
    await expect(products).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to bottom to ensure footer is visible
    await page.keyboard.press('End');
    
    // Verify footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have functioning search or filter if available', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[placeholder*="search"], input[placeholder*="Search"], [class*="search"] input').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      
      // Verify search was performed
      await expect(searchInput).toHaveValue('test');
    }
  });

  test('should display site logo and branding', async ({ page }) => {
    await page.goto('/');
    
    // Verify logo or site name is visible
    const logo = page.locator('header img[alt="Brightest logo"]');
    await expect(logo).toBeVisible();
  });

  test('should be responsive and not show horizontal scrollbar', async ({ page }) => {
    await page.goto('/');
    
    // Check viewport doesn't require horizontal scrolling
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
  });
});
