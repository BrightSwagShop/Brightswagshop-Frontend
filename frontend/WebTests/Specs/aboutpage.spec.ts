import { test, expect } from '@playwright/test';
import { AboutPage } from '../Pages/AboutPage';

test.describe('AboutPage - Happy Path', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {

    aboutPage = new AboutPage(page);
    await aboutPage.navigateToAbout();

  });

  test('should load about page successfully', async () => {  

    await expect(aboutPage.page).toHaveURL(/.*\/about.*/);
    await expect(aboutPage.getMainHeading()).toBeVisible();

  });

  test('should have correct navbar', async () => {

    const navbarValid = await aboutPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('should have correct heading', async () => {

    const heading = await aboutPage.getHeadingText();
    expect(heading).toBe('BrightestSwagShop');

  });

  test('should have shop button', async () => {

    const shopButton = aboutPage.getShopButton();
    await expect(shopButton).toBeVisible();

  });

  test('should have contact button', async () => {

    const contactButton = aboutPage.getContactButton();
    await expect(contactButton).toBeVisible();

  });

  test('should display customers', async () => {

    const hasCustomers = await aboutPage.hasCustomers();
    expect(hasCustomers).toBe(true);

  });

  test('should display footer', async () => {

    const footerValid = await aboutPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});