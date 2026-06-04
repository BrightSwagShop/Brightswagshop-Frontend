import { test, expect } from '@playwright/test';
import { AboutPage } from '../../Pages/AboutPage';

test.describe('AboutPage - Smoke Tests', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {

    aboutPage = new AboutPage(page);
    await aboutPage.navigateToAbout();

  });

  test('[About Page - Smoke] Load page successfully', async () => {  
  
    await expect(aboutPage.page).toHaveURL(/.*\/about.*/);
    await expect(aboutPage.getMainHeading()).toBeVisible();

  });

  test('[About Page - Smoke] Navbar verification', async () => {

    const navbarValid = await aboutPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('[About Page - Smoke] Heading text verification', async () => {

    const heading = await aboutPage.getHeadingText();
    expect(heading).toBe('BrightestSwagShop');

  });

  test('[About Page - Smoke] Shop button visibility', async () => {

    const shopButton = aboutPage.getShopButton();
    await expect(shopButton).toBeVisible();

  });

  test('[About Page - Smoke] Contact button visibility', async () => {

    const contactButton = aboutPage.getContactButton();
    await expect(contactButton).toBeVisible();

  });

  test('[About Page - Smoke] Display customers section', async () => {

    const hasCustomers = await aboutPage.hasCustomers();
    expect(hasCustomers).toBe(true);

  });

  test('[About Page - Smoke] Footer verification', async () => {

    const footerValid = await aboutPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});