import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('LoginPage - Smoke Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

  });

  test(qase(50, '[Login Page - Smoke] Load page successfully'), async () => {  

    await expect(loginPage.page).toHaveURL(/.*\/login.*/);
    await expect(loginPage.getMainLogo()).toBeVisible();

  });

  test(qase(51, '[Login Page - Smoke] Microsoft login button visibility'), async () => {

    const loginButton = loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();

  });

});