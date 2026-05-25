import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('product category links should be visible', () => {
  cy.get('.grid a').should('have.length.greaterThan', 0);
  cy.get('.grid a').first().should('be.visible');
});
