import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { CartPage } from '../../Pages/CartPage';

test.describe('Winkelwagen Page - Smoke Tests', () => {
  let cartPage: CartPage;
  const mockUserResponse = {
    id: 'user-123',
    username: 'playwright-user',
    favorites: [],
  };

  const mockCartResponse = {
    id: 'cart-1',
    userId: 'user-123',
    totalPrice: 29.99,
    updatedAt: new Date().toISOString(),
    items: [
      {
        productId: 'prod-1',
        productName: 'Test Product',
        selectedColor: 'Black',
        unitPrice: 29.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/300',
      },
    ],
  };

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('token', 'mock-local-token');
    });

    await page.route('**/api/users/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUserResponse),
      });
    });

    await page.route('**/api/shoppingcarts/user/user-123', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCartResponse),
      });
    });

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