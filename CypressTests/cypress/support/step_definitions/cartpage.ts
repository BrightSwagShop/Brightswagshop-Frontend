import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the continue shopping button should be visible', () => {
  cy.get('button').contains('Verder winkelen').should('be.visible');
});

Then('the checkout button should be visible', () => {
  cy.get('button').contains('Afrekenen').should('be.visible');
});
