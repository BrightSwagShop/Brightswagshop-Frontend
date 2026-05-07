import { test, expect } from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';

test.describe('Homepage - Smoke Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    await homePage.navigateToHome();

  });

  test('[Home Page - Smoke] Load page successfully', async () => {  

    await expect(homePage.page).toHaveURL('http://localhost:5173/');
    await expect(homePage.getMainHeading()).toBeVisible();

  });

  test('[Home Page - Smoke] Navbar verification', async () => {

    const navbarValid = await homePage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('[Home Page - Smoke] Heading text verification', async () => {

    const heading = await homePage.getHeadingText();
    expect(heading).toBe('BrightSwagShop');

  });

  test('[Home Page - Smoke] Product categories display', async () => {

    const hasCategories = await homePage.hasProductCategories();
    expect(hasCategories).toBe(true);

  });

  test('[Home Page - Smoke] Footer verification', async () => {

    const footerValid = await homePage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});