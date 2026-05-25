import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the phone number link should be visible', () => {
  cy.get('a[href="tel:+3234508842"]').should('be.visible');
});

Then('the email link should be visible', () => {
  cy.get('a[href="mailto:info@brightest.be"]').should('be.visible');
});

Then('the contact form should be visible', () => {
  cy.get('form').should('be.visible');
});

Then('the contact form should have all required fields', () => {
  const fields = ['firstName', 'lastName', 'email', 'phone', 'message'];
  fields.forEach((field) => {
    cy.get(`input[name="${field}"], textarea[name="${field}"], select[name="${field}"]`).should('exist');
  });
});
