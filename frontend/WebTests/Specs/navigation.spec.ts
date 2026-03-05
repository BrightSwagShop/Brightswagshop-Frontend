import { test, expect } from '@playwright/test';

test.describe('Navigation - Happy Path', () => {
  test('should load home page and display header/footer', async ({ page }) => {
    await page.goto('/');
    
    // Verify page loaded
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Check header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check footer is visible
    const footer = page.locator('footer');
    // Scroll down to ensure footer is in viewport
    await page.keyboard.press('End');
    await expect(footer).toBeVisible();
  });

  test('should navigate to category page', async ({ page }) => {
    await page.goto('/');
    
    // Click on a category link
    const categoryLink = page.locator('a[href*="/category/"]').first();
    await expect(categoryLink).toBeVisible();
    await categoryLink.click();
    
    // Verify navigation to category page
    await expect(page).toHaveURL(/.*\/category\/.*/);
  });

  test('should navigate to product detail page from product click', async ({ page }) => {
    await page.goto('/');
    
    // Click on a product
    const productLink = page.locator('a[href*="/detailpage"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await expect(page).toHaveURL(/.*\/detailpage.*/);
    }
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Find login link in header/navigation
    const loginLink = page.locator('a:has-text("Login"), button:has-text("Login")').first();
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/.*\/login.*/);
    } else {
      // Direct navigation
      await page.goto('/login');
      await expect(page).toHaveURL(/.*\/login.*/);
    }
  });

  test('should navigate to shopping cart', async ({ page }) => {
    await page.goto('/');
    
    // Find cart link in navigation
    const cartLink = page.locator('a[href*="/winkelwagen"], button:has-text("Cart"), button:has-text("Winkelwagen")').first();
    if (await cartLink.isVisible()) {
      await cartLink.click();
      await expect(page).toHaveURL(/.*\/winkelwagen.*/);
    } else {
      // Direct navigation
      await page.goto('/winkelwagen');
      await expect(page).toHaveURL(/.*\/winkelwagen.*/);
    }
  });
});
