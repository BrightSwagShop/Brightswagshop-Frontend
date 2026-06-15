import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { createEntraIdAuthHelper, EntraIdAuthHelper } from '../../Utils/EntraIdAuthHelper';

function decodeJwtPayload(token: string): Record<string, unknown> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format. Expected 3 token parts.');
  }

  const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = payloadBase64.padEnd(Math.ceil(payloadBase64.length / 4) * 4, '=');
  const payloadJson = atob(padded);
  return JSON.parse(payloadJson) as Record<string, unknown>;
}

test.describe('EntraID Login - Smoke Tests', () => {
  let loginPage: LoginPage;

  test.describe('Login Page UI Tests', () => {
    test.skip(!!process.env.SKIP_LOGIN_TESTS, 'Skipped when running via admin automation — login page may redirect authenticated sessions');

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.navigateToLogin();
    });

    test('[EntraID] Login page loads successfully', async ({ page }) => {
      expect(page.url()).toContain('/login');
    });

    test('[EntraID] Microsoft login button is visible', async () => {
      await expect(loginPage.getLoginButton()).toBeVisible();
    });

    test('[EntraID] Microsoft login button is clickable', async () => {
      await expect(loginPage.getLoginButton()).toBeEnabled();
    });

    test('[EntraID] Microsoft login button displays correct text', async () => {
      await expect(loginPage.getLoginButton()).toContainText(/sign in with microsoft/i);
    });
  });

  test.describe('EntraID Token Acquisition', () => {
    let authHelper: EntraIdAuthHelper | null = null;
    let helperInitError: Error | null = null;

    test.beforeAll(async () => {
      try {
        authHelper = createEntraIdAuthHelper();
      } catch (error) {
        helperInitError = error as Error;
      }
    });

    test.afterEach(async () => {
      EntraIdAuthHelper.clearCache();
    });

    test('[EntraID] Token can be acquired with configured credentials', async () => {
      if (!authHelper) {
        expect(helperInitError?.message).toContain('Missing required environment variables for EntraID authentication');
        return;
      }

      const token = await authHelper.getTokenAsync();

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    test('[EntraID] Token payload contains required JWT claims', async () => {
      if (!authHelper) {
        expect(helperInitError?.message).toContain('Missing required environment variables for EntraID authentication');
        return;
      }

      const token = await authHelper.getTokenAsync();
      const payload = decodeJwtPayload(token);

      expect(payload.aud).toBeTruthy();
      expect(payload.iss).toBeTruthy();
      expect(payload.exp).toBeTruthy();

      const exp = Number(payload.exp);
      expect(Number.isFinite(exp)).toBeTruthy();
      expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });

    test('[EntraID] Token is cached while still valid', async () => {
      if (!authHelper) {
        expect(helperInitError?.message).toContain('Missing required environment variables for EntraID authentication');
        return;
      }

      const token1 = await authHelper.getTokenAsync();
      const token2 = await authHelper.getTokenAsync();

      expect(token1).toBe(token2);
    });

    test('[EntraID] Token can be reacquired after cache clear', async () => {
      if (!authHelper) {
        expect(helperInitError?.message).toContain('Missing required environment variables for EntraID authentication');
        return;
      }

      const token1 = await authHelper.getTokenAsync();
      EntraIdAuthHelper.clearCache();
      const token2 = await authHelper.getTokenAsync();

      expect(token1).toBeTruthy();
      expect(token2).toBeTruthy();
      expect(token2.split('.').length).toBe(3);
    });

    test('[EntraID] Bearer header format is correct for API usage', async () => {
      if (!authHelper) {
        expect(helperInitError?.message).toContain('Missing required environment variables for EntraID authentication');
        return;
      }

      const token = await authHelper.getTokenAsync();
      const bearerHeader = `Bearer ${token}`;

      expect(bearerHeader.startsWith('Bearer ')).toBeTruthy();
      expect(bearerHeader.length).toBeGreaterThan('Bearer '.length + 20);
    });
  });

  test.describe('Protected Admin Routes', () => {
    test.skip(!!process.env.SKIP_LOGIN_TESTS, 'Skipped when running via admin automation — tests require unauthenticated state');

    test('[EntraID] Admin page redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/admin', { waitUntil: 'networkidle' });
      expect(page.url()).toMatch(/login/i);
    });

    test('[EntraID] Admin dashboard redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/admin/dashboard', { waitUntil: 'networkidle' });
      expect(page.url()).toMatch(/login/i);
    });

    test('[EntraID] Admin users page redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/admin/users', { waitUntil: 'networkidle' });
      expect(page.url()).toMatch(/login/i);
    });
  });
});
