import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

// ─── Navbar steps ─────────────────────────────────────────────────────────────

Then('all navbar elements should be visible', () => {
  cy.get('[data-testid="logo-link"]').should('be.visible');
  cy.get('[data-testid="about-link"]').should('be.visible');
  cy.get('[data-testid="contact-link"]').should('be.visible');
  cy.get('[data-testid="cart-link"]').should('be.visible');
});

// ─── Footer steps ─────────────────────────────────────────────────────────────

Then('all footer elements should be visible', () => {
  cy.get('[data-testid="footer-logo-link"]').should('be.visible');
  cy.get('[data-testid="footer-about-link"]').should('be.visible');
  cy.get('[data-testid="footer-contact-link"]').should('be.visible');
  cy.get('[data-testid="footer-linkedin"]').should('be.visible');
  cy.get('[data-testid="footer-facebook"]').should('be.visible');
  cy.get('[data-testid="footer-instagram"]').should('be.visible');
  cy.get('footer').contains(/Brightest\. All rights reserved\./i).should('be.visible');
});

// ─── URL steps ────────────────────────────────────────────────────────────────

Then('the URL should be {string}', (path: string) => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}${path}`);
});

Then('the URL should include {string}', (path: string) => {
  cy.url().should('include', path);
});

// ─── Heading steps ────────────────────────────────────────────────────────────

Then('the main heading should be visible', () => {
  cy.get('h1').should('be.visible');
});

Then('the main heading text should be {string}', (text: string) => {
  cy.get('h1').should('have.text', text);
});

// ─── Mock setup steps ─────────────────────────────────────────────────────────

Given('I mock the product types API', () => {
  cy.mockProductTypesAPI();
});

Given('I mock the user and cart APIs', () => {
  cy.mockUserAndCartAPI();
});

Given('I set a mock auth token in local storage', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('token', 'mock-local-token');
  });
});

// ─── Visit steps ──────────────────────────────────────────────────────────────

Given('I visit the homepage', () => {
  cy.visit('/');
});

Given('I visit the about page', () => {
  cy.visit('/about');
});

Given('I visit the login page', () => {
  cy.visit('/login');
});

Given('I visit the cart page', () => {
  cy.visit('/winkelwagen');
});

Given('I visit the contact page', () => {
  cy.visit('/contact');
});

Given('I visit a non-existent page', () => {
  cy.visit('/nonexistent-page-12345');
});

Given('I visit the admin page without authentication', () => {
  cy.visit('/admin', { failOnStatusCode: false });
  cy.wait(1000);
});

Given('I visit the admin dashboard without authentication', () => {
  cy.visit('/admin/dashboard', { failOnStatusCode: false });
  cy.wait(1000);
});

Given('I visit the admin users page without authentication', () => {
  cy.visit('/admin/users', { failOnStatusCode: false });
  cy.wait(1000);
});
