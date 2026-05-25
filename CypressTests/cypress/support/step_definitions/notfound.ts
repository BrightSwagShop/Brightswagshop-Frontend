import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the continue shopping link should be visible', () => {
  cy.get('a').contains('Verder shoppen').should('be.visible');
});

Then('the continue shopping link text should be {string}', (text: string) => {
  cy.get('a').contains(text).should('be.visible');
});

When('I click the continue shopping link', () => {
  cy.get('a').contains('Verder shoppen').click();
});

Then('the error description text should be visible', () => {
  cy.get('p').contains('Deze pagina bestaat niet').should('be.visible');
});
