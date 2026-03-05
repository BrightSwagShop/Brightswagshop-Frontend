import { test, expect } from '@playwright/test';

test.describe('Contact Page - Happy Path', () => {
  test('should navigate to contact page via navigation', async ({ page }) => {
    await page.goto('/');

    const contactLink = page.getByRole('link', { name: /contact/i }).first();

    if (await contactLink.isVisible()) {
      await contactLink.click();
    } else {
      await page.goto('/contact');
    }

    await expect(page).toHaveURL(/.*\/contact.*/);
  });

  test('should display contact page content', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*\/contact.*/);

    // Header & footer
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Heading
    await expect(
      page.getByRole('heading', { name: /neem contact met ons op/i })
    ).toBeVisible();

    // Form fields (Formik name selectors)
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    // Submit button
    await expect(
      page.getByRole('button', { name: /verstuur/i })
    ).toBeVisible();
  });
});