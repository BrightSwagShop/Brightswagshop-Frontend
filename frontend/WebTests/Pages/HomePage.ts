import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page : Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  getMainHeading() {
    return this.page.locator('h1');
  }

  getHeadingText(): Promise<string> {
    return this.getText(this.getMainHeading());
  }

  getProductCategories(): Locator {
    return this.page.locator('.grid a');
  }

  async hasProductCategories(): Promise<boolean> {
  const count = await this.getProductCategories().count();
  return count > 0;
}
}