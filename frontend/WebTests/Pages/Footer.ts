import { Page, Locator } from '@playwright/test';

export class Footer {
  constructor(readonly page: Page) {}

  // Locators
  getLogoImage(): Locator {
    return this.page.locator('footer a img[alt="Brightest logo"]');
  }

  getAboutLink(): Locator {
    return this.page.locator('footer a:has-text("About")');
  }

  getContactLink(): Locator {
    return this.page.locator('footer a:has-text("Contact")');
  }

  getRightsText(): Locator {
    return this.page.locator('footer').getByText(' Brightest. All rights reserved.');
  }

  // Methods
  async clickLogoToHome(): Promise<void> {
    await this.getLogoImage().click();
  }

  async clickAbout(): Promise<void> {
    await this.getAboutLink().click();
  }

  async clickContact(): Promise<void> {
    await this.getContactLink().click();
  }

  // Assertions helpers
  async isLogoVisible(): Promise<boolean> {
    return await this.getLogoImage().isVisible();
  }

  async isAboutLinkVisible(): Promise<boolean> {
    return await this.getAboutLink().isVisible();
  }

  async isContactLinkVisible(): Promise<boolean> {
    return await this.getContactLink().isVisible();
  }

  async isRightsTextVisible(): Promise<boolean> {
    return await this.getRightsText().isVisible();
  }

  async verifyAllFooterElements(): Promise<boolean> {
    return (
      (await this.isLogoVisible()) &&
      (await this.isAboutLinkVisible()) &&
      (await this.isContactLinkVisible()) &&
      (await this.isRightsTextVisible())
    );
  }
}