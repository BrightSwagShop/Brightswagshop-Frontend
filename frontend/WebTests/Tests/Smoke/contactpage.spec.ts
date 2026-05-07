import { test, expect } from '@playwright/test';
import { ContactPage } from '../../Pages/ContactPage';

test.describe('Contact Page - Smoke Tests', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {

    contactPage = new ContactPage(page);
    await contactPage.navigateToContact();

  });

  test('[Contact Page - Smoke] Load page successfully', async () => {  

    await expect(contactPage.page).toHaveURL(/.*\/contact.*/);
    await expect(contactPage.getMainHeading()).toBeVisible();

  });

  test('[Contact Page - Smoke] Navbar verification', async () => {

    const navbarValid = await contactPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('[Contact Page - Smoke] Heading text verification', async () => {

    const heading = await contactPage.getHeadingText();
    expect(heading).toBe('Neem contact met ons op');

  });

  test('[Contact Page - Smoke] Phone number visibility', async () => {

    const phoneLocator = contactPage.page.locator('a[href="tel:+3234508842"]');
    await expect(phoneLocator).toBeVisible();

  });

  test('[Contact Page - Smoke] Email visibility', async () => {

    const emailLocator = contactPage.page.locator('a[href="mailto:info@brightest.be"]');
    await expect(emailLocator).toBeVisible();

  });

  test('[Contact Page - Smoke] Contact form exists', async () => {

    const hasForm = await contactPage.contactForm.formExists();
    expect(hasForm).toBe(true);

  });

  test('[Contact Page - Smoke] Form fields validation', async () => {

    const expectedFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    const hasFields = await contactPage.contactForm.hasFields(expectedFields);
    expect(hasFields).toBe(true);

  });

  test('[Contact Page - Smoke] Footer verification', async () => {

    const footerValid = await contactPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});