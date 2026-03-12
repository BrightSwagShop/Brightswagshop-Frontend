import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { CartPage } from '../../Pages/CartPage';

test.describe('Winkelwagen Page - Smoke Tests', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {

    cartPage = new CartPage(page);
    await cartPage.navigateToCart();

  });

  test(qase(20, '[Cart Page - Smoke] Load page successfully'), async () => {  

    await expect(cartPage.page).toHaveURL(/.*\/winkelwagen.*/);

  });

  test(qase(21, '[Cart Page - Smoke] Navbar verification'), async () => {

    const navbarValid = await cartPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test(qase(22, '[Cart Page - Smoke] Continue shopping button visibility'), async () => {

    const shopButton = cartPage.getShopButton();
    await expect(shopButton).toBeVisible();

  });

  test(qase(23, '[Cart Page - Smoke] Checkout button visibility'), async () => {

    const checkoutButton = cartPage.getCheckoutButton();
    await expect(checkoutButton).toBeVisible();

  });

  test(qase(24, '[Cart Page - Smoke] Footer verification'), async () => {

    const footerValid = await cartPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });
});