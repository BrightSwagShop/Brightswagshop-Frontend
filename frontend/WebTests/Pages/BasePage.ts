import { Page, Locator } from '@playwright/test';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export class BasePage {
readonly navbar: Navbar;
readonly footer: Footer;

  constructor(readonly page: Page) {
    this.navbar = new Navbar(this.page);
    this.footer = new Footer(this.page);
  }

  // Navigation
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Wait for page to load
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Common element interactions
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  // Common assertions helpers
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  // URL helper
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Wait for element
  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  // Get page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Reload page
  async reload(): Promise<void> {
    await this.page.reload();
  }
}