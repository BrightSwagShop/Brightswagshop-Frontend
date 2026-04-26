import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { NotFoundPage } from 'testing-framework/frontend';

const shouldAutoCreateQaseCases = process.env.QASE_TESTOPS_AUTO_CREATE === 'true';
const qaseCase = (id: number, title: string) => shouldAutoCreateQaseCases ? title : qase(id, title);

test.describe('Error Pages - Smoke Tests', () => {
  let notFoundPage: NotFoundPage;

  test.beforeEach(async ({ page }) => {
    notFoundPage = new NotFoundPage(page);
  });

  test(qaseCase(74, '[Error Page - Smoke] Load 404 page successfully'), async () => {
    await notFoundPage.navigateToNonExistentPage();
    await expect(notFoundPage.page).toHaveURL(/http:\/\/localhost:5173\/nonexistent-page-12345/);
  });

  test(qaseCase(75, '[Error Page - Smoke] Display "Pagina niet gevonden" heading'), async () => {
    await notFoundPage.navigateToNonExistentPage();
    await expect(notFoundPage.getMainHeading()).toBeVisible();
    
    const headingText = await notFoundPage.getHeadingText();
    expect(headingText).toBe('Pagina niet gevonden');
  });

  test(qaseCase(76, '[Error Page - Smoke] Display "Verder shoppen" button'), async () => {
    await notFoundPage.navigateToNonExistentPage();
    
    const continueButton = notFoundPage.getContinueShoppingButton();
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toHaveText('Verder shoppen');
  });

  test(qaseCase(77, '[Error Page - Smoke] Click "Verder shoppen" redirects to home'), async () => {
    await notFoundPage.navigateToNonExistentPage();
    
    await notFoundPage.clickContinueShopping();
    await expect(notFoundPage.page).toHaveURL('http://localhost:5173/');
  });

  test(qaseCase(78, '[Error Page - Smoke] Display error description text'), async () => {
    await notFoundPage.navigateToNonExistentPage();
    
    const errorDescription = notFoundPage.getErrorDescription();
    await expect(errorDescription).toBeVisible();
  });
});
