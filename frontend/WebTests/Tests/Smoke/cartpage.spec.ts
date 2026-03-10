import { test, expect } from '@playwright/test';
import { CartPage } from '../../Pages/CartPage';

test.describe('Winkelwagen Page - Smoke Tests', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {

    cartPage = new CartPage(page);
    await cartPage.navigateToCart();

  });

  test('should load cart page successfully', async () => {  

    await expect(cartPage.page).toHaveURL(/.*\/winkelwagen.*/);

  });

  test('should have correct navbar', async () => {

    const navbarValid = await cartPage.navbar.verifyAllNavbarElements();
    expect(navbarValid).toBe(true);

  });

  test('should have Verder winkelen button', async () => {

    const shopButton = cartPage.getShopButton();
    await expect(shopButton).toBeVisible();

  });

  test('should have Afrekenen button', async () => {

    const checkoutButton = cartPage.getCheckoutButton();
    await expect(checkoutButton).toBeVisible();

  });

  test('should display footer', async () => {

    const footerValid = await cartPage.footer.verifyAllFooterElements();
    expect(footerValid).toBe(true);

  });
});