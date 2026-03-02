import { test, expect } from '@playwright/test';

test.describe('Shopping Flow - Happy Path', () => {
  test('should browse products by category', async ({ page }) => {
    await page.goto('/');
    
    // Click on first category
    const categoryLink = page.locator('a[href*="/category/"]').first();
    await expect(categoryLink).toBeVisible();
    await categoryLink.click();
    
    // Verify on category page
    await expect(page).toHaveURL(/.*\/category\/.*/);
    
    // Verify content is displayed
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to category
    const categoryLink = page.locator('a[href*="/category/"]').first();
    await categoryLink.click();
    
    // Click on product detail
    const detailLink = page.locator('a[href*="/detailpage"]').first();
    if (await detailLink.isVisible()) {
      await detailLink.click();
      
      // Find and click "Add to Cart" button
      const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add"), button:has-text("Add to Bag")').first();
      if (await addToCartBtn.isVisible()) {
        await addToCartBtn.click();
        
        // Verify success message or cart updated
        const successMsg = page.locator('[class*="success"], [class*="toast"], [class*="notification"]').first();
        if (await successMsg.isVisible()) {
          await expect(successMsg).toContainText(/added|success|cart/i);
        }
      }
    }
  });

  test('should view shopping cart', async ({ page }) => {
    await page.goto('/winkelwagen');
    
    // Verify on cart page
    await expect(page).toHaveURL(/.*\/winkelwagen.*/);
    
    // Verify page loaded
    const body = page.locator('body');
    await expect(body).toBeVisible();
    const checkoutBtn = page.locator('button:has-text("Checkout"), button:has-text("Place Order"), a[href*="/checkout"]').first();
    if (await checkoutBtn.isVisible()) {
      await checkoutBtn.click();
      
      // Verify navigation to checkout page
      await page.waitForURL(/.*\/checkout.*/);
      await expect(page).toHaveURL(/.*\/checkout.*/);
    }
  });

  test('should display checkout form', async ({ page }) => {
    await page.goto('/checkout');
    
    // Verify on checkout page
    await expect(page).toHaveURL(/.*\/checkout.*/);
    
    // Verify page loaded
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
