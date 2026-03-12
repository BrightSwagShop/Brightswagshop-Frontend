import { test, expect } from '@playwright/test';
import { AboutPage } from '../../Pages/AboutPage';

test.describe('AboutPage - Smoke Tests', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {

    aboutPage = new AboutPage(page);
    await aboutPage.navigateToAbout();

  });

  test('should load about page successfully', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE1' }}, async () => {  
  
    await expect(aboutPage.page).toHaveURL(/.*\/about.*/);
    await expect(aboutPage.getMainHeading()).toBeVisible();

  });

  test('should have correct navbar', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE2' }}, async () => {

    const navbarValid = await aboutPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('should have correct heading', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE3' }}, async () => {

    const heading = await aboutPage.getHeadingText();
    expect(heading).toBe('BrightestSwagShop');

  });

  test('should have shop button', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE4' }}, async () => {

    const shopButton = aboutPage.getShopButton();
    await expect(shopButton).toBeVisible();

  });

  test('should have contact button', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE5' }}, async () => {

    const contactButton = aboutPage.getContactButton();
    await expect(contactButton).toBeVisible();

  });

  test('should display customers', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE6' }}, async () => {

    const hasCustomers = await aboutPage.hasCustomers();
    expect(hasCustomers).toBe(true);

  });

  test('should display footer', 
    {annotation: { type: 'qmetry', description: 'SWAG-SMOKE7' }}, async () => {

    const footerValid = await aboutPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});