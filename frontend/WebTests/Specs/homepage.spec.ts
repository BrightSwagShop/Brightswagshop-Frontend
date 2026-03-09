import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

test.describe('Homepage - Happy Path', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    await homePage.navigateToHome();

  });

  test('should load homepage successfully', async () => {  

    await expect(homePage.page).toHaveURL('http://localhost:5173/');
    await expect(homePage.getMainHeading()).toBeVisible();

  });

  test('should have correct navbar', async () => {

    const navbarValid = await homePage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('should have correct heading', async () => {

    const heading = await homePage.getHeadingText();
    expect(heading).toBe('BrightSwagShop');

  });

  test('should display product categories', async () => {

    const hasCategories = await homePage.hasProductCategories();
    expect(hasCategories).toBe(true);

  });

  test('should display footer', async () => {

    const footerValid = await homePage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});