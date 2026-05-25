import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the main logo should be visible', () => {
  cy.get('img[src*="logo"], img[alt*="Brightest"], img[alt*="logo"]').should('be.visible');
});

Then('the Microsoft login button should be visible', () => {
  cy.get('button').filter(':contains("Microsoft")').should('be.visible');
});

Then('the Microsoft login button should be enabled', () => {
  cy.get('button').filter(':contains("Microsoft")').should('not.be.disabled');
});

Then('the Microsoft login button should contain text matching {string}', (text: string) => {
  cy.get('button').filter(':contains("Microsoft")').invoke('text').then((buttonText) => {
    expect(buttonText.toLowerCase()).to.include(text.toLowerCase());
  });
});
