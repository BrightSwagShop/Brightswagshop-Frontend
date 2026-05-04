import { test, expect } from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';

test.describe('Navigation - Smoke Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  // Navbar navigation tests

  test('[Navigation - Smoke] Navigate to Home via navbar', async ({ page }) => {

    await homePage.navbar.clickLogoToHome();
    await expect(page).toHaveURL(/\//);

  });

  test('[Navigation - Smoke] Navigate to About page via navbar', async ({ page }) => {

    await homePage.navbar.clickAbout();
    await expect(page).toHaveURL(/.*\/about.*/);

  });

  test('[Navigation - Smoke] Navigate to Contact page via navbar', async ({ page }) => {

    await homePage.navbar.clickContact();
    await expect(page).toHaveURL(/.*\/contact.*/);

  });

  test('[Navigation - Smoke] Navigate to Cart via navbar', async ({ page }) => {

    await homePage.navbar.clickCart();
    await expect(page).toHaveURL(/.*\/winkelwagen.*/);

  });

  // Footer navigation tests

  test('[Navigation - Smoke] Navigate to Home via footer', async ({ page }) => {

    await homePage.footer.clickLogoToHome();
    await expect(page).toHaveURL(/\//);

  });

  test('[Navigation - Smoke] Navigate to About page via footer', async ({ page }) => {

    await homePage.footer.clickAbout();
    await expect(page).toHaveURL(/.*\/about.*/);

  });

  test('[Navigation - Smoke] Navigate to Contact page via footer', async ({ page }) => {

    await homePage.footer.clickContact();
    await expect(page).toHaveURL(/.*\/contact.*/);

  });
});
