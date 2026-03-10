import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('LoginPage - Smoke Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

  });

  test('should load login page successfully', async () => {  

    await expect(loginPage.page).toHaveURL(/.*\/login.*/);
    await expect(loginPage.getMainLogo()).toBeVisible();

  });

  test('should have microsoft login button', async () => {

    const loginButton = loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();

  });

});