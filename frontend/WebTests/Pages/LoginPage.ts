import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  getMainLogo() {
    return this.page.getByTestId('login-logo');
  }

  getLoginButton(): Locator {
    return this.page.getByTestId('microsoft-login-button');
  }
}