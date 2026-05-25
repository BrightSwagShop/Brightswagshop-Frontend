import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the shop button should be visible', () => {
  cy.get('a').contains('Shop').should('be.visible');
});

Then('the contact button should be visible', () => {
  cy.get('[data-testid="contact-button"]').should('be.visible');
});

Then('the customers grid section should be visible', () => {
  cy.get('.grid').should('exist');
  cy.get('.grid').should('be.visible');
});
