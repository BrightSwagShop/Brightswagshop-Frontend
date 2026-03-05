import { test, expect } from '@playwright/test';

test.describe('Authentication - Happy Path', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    // Verify on login page
    await expect(page).toHaveURL(/.*\/login.*/);
    
    // Verify login form is visible
    const loginForm = page.locator('form, [class*="login"]').first();
    await expect(loginForm).toBeVisible();
  });

  test('should have email and password input fields', async ({ page }) => {
    await page.goto('/login');
    
    // Verify username input
    const usernameInput = page.locator('input[placeholder*="Gebruikersnaam"]');
    await expect(usernameInput).toBeVisible();
    
    // Verify password input
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    await page.goto('/login');
    
    // Verify submit button exists
    const submitBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in"), button:has-text("Submit")').first();
    await expect(submitBtn).toBeVisible();
  });

  test('should handle login form submission', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in form fields
    const usernameInput = page.locator('input[placeholder*="Gebruikersnaam"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitBtn = page.locator('button:has-text("Login")').first();
    
    if (await usernameInput.isVisible() && await passwordInput.isVisible() && await submitBtn.isVisible()) {
      await usernameInput.fill('testuser');
      await passwordInput.fill('password123');
      
      // Verify form is filled
      await expect(usernameInput).toHaveValue('testuser');
      await expect(passwordInput).toHaveValue('password123');
      
      // Submit form
      await submitBtn.click();
      
      // Wait for response
      await page.waitForLoadState('networkidle');
    }
  });
});
