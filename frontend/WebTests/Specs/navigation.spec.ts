import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

test.describe('Navigation - Using Components', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  // Navbar navigation tests

  test('should navigate to Home via navbar', async ({ page }) => {

    await homePage.navbar.clickLogoToHome();
    await expect(page).toHaveURL(/\//);

  });

  test('should navigate to About page via navbar', async ({ page }) => {

    await homePage.navbar.clickAbout();
    await expect(page).toHaveURL(/.*\/about.*/);

  });

  test('should navigate to Contact page via navbar', async ({ page }) => {

    await homePage.navbar.clickContact();
    await expect(page).toHaveURL(/.*\/contact.*/);

  });

  test('should navigate to Cart via navbar', async ({ page }) => {

    await homePage.navbar.clickCart();
    await expect(page).toHaveURL(/.*\/winkelwagen.*/);

  });

  // Footer navigation tests

   test('should navigate to Home via footer', async ({ page }) => {

    await homePage.footer.clickLogoToHome();
    await expect(page).toHaveURL(/\//);

  });

  test('should navigate to About page via footer link', async ({ page }) => {

    await homePage.footer.clickAbout();
    await expect(page).toHaveURL(/.*\/about.*/);

  });

  test('should navigate to Contact page via footer link', async ({ page }) => {

    await homePage.footer.clickContact();
    await expect(page).toHaveURL(/.*\/contact.*/);

  });
});
