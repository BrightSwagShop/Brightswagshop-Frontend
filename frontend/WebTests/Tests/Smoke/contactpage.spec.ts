import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { ContactPage } from '../../Pages/ContactPage';

test.describe('Contact Page - Smoke Tests', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {

    contactPage = new ContactPage(page);
    await contactPage.navigateToContact();

  });

  test(qase(30, '[Contact Page - Smoke] Load page successfully'), async () => {  

    await expect(contactPage.page).toHaveURL(/.*\/contact.*/);
    await expect(contactPage.getMainHeading()).toBeVisible();

  });

  test(qase(31, '[Contact Page - Smoke] Navbar verification'), async () => {

    const navbarValid = await contactPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test(qase(32, '[Contact Page - Smoke] Heading text verification'), async () => {

    const heading = await contactPage.getHeadingText();
    expect(heading).toBe('Neem contact met ons op');

  });

  test(qase(33, '[Contact Page - Smoke] Phone number visibility'), async () => {

    const phoneLocator = contactPage.page.locator('a[href="tel:+3234508842"]');
    await expect(phoneLocator).toBeVisible();

  });

  test(qase(34, '[Contact Page - Smoke] Email visibility'), async () => {

    const emailLocator = contactPage.page.locator('a[href="mailto:info@brightest.be"]');
    await expect(emailLocator).toBeVisible();

  });

  test(qase(35, '[Contact Page - Smoke] Contact form exists'), async () => {

    const hasForm = await contactPage.contactForm.formExists();
    expect(hasForm).toBe(true);

  });

  test(qase(36, '[Contact Page - Smoke] Form fields validation'), async () => {

    const expectedFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    const hasFields = await contactPage.contactForm.hasFields(expectedFields);
    expect(hasFields).toBe(true);

  });

  test(qase(37, '[Contact Page - Smoke] Footer verification'), async () => {

    const footerValid = await contactPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});