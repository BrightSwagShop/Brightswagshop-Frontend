import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('LoginPage - Smoke Tests', () => {
  test.skip(!!process.env.SKIP_LOGIN_TESTS, 'Skipped when running via admin automation — login page may redirect authenticated sessions');

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

  });

  test('[Login Page - Smoke] Load page successfully', async () => {  

    await expect(loginPage.page).toHaveURL(/.*\/login.*/);
    await expect(loginPage.getMainLogo()).toBeVisible();

  });

  test('[Login Page - Smoke] Microsoft login button visibility', async () => {

    const loginButton = loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();

  });

});