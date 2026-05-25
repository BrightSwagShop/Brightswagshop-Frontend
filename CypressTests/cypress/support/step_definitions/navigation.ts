import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I click the navbar logo', () => {
  cy.get('[data-testid="logo-link"]').click();
});

When('I click the navbar about link', () => {
  cy.get('[data-testid="about-link"]').click();
});

When('I click the navbar contact link', () => {
  cy.get('[data-testid="contact-link"]').click();
});

When('I click the navbar cart icon', () => {
  cy.get('[data-testid="cart-link"]').click();
});

When('I click the footer logo', () => {
  cy.get('[data-testid="footer-logo-link"]').click();
});

When('I click the footer about link', () => {
  cy.get('[data-testid="footer-about-link"]').click();
});

When('I click the footer contact link', () => {
  cy.get('[data-testid="footer-contact-link"]').click();
});
