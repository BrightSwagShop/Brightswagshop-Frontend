import { test, expect } from '@playwright/test';
import { ContactPage } from '../Pages/ContactPage';

test.describe('Contact Page - Happy Path', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {

    contactPage = new ContactPage(page);
    await contactPage.navigateToContact();

  });

  test('should load contact page successfully', async () => {  

    await expect(contactPage.page).toHaveURL('http://localhost:5173/contact');
    await expect(contactPage.getMainHeading()).toBeVisible();

  });

  test('should have correct navbar', async () => {

    const navbarValid = await contactPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('should have correct heading', async () => {

    const heading = await contactPage.getHeadingText();
    expect(heading).toBe('Neem contact met ons op');

  });

  test('should have contact phone number', async () => {

    const phoneLocator = contactPage.page.locator('a[href="tel:+3234508842"]');
    await expect(phoneLocator).toBeVisible();

  });

  test('should have contact email', async () => {

    const emailLocator = contactPage.page.locator('a[href="mailto:info@brightest.be"]');
    await expect(emailLocator).toBeVisible();

  });

  test('should have contact form', async () => {

    const hasForm = await contactPage.contactForm.formExists();
    expect(hasForm).toBe(true);

  });

  test('should have correct form fields', async () => {

    const expectedFields = ['firstName', 'lastName', 'email', 'phone', 'message'];
    const hasFields = await contactPage.contactForm.hasFields(expectedFields);
    expect(hasFields).toBe(true);

  });

  test('should display footer', async () => {

    const footerValid = await contactPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });

});