import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;

Given('I prepare a unique user payload', () => {
  const unique = Date.now();
  cy.wrap(`cy-user-${unique}`).as('username');
  cy.wrap(`P@ss-${unique}`).as('password');
});

Given('I register a unique public user', () => {
  const unique = Date.now();
  const username = `cy-user-${unique}`;
  const password = `P@ss-${unique}`;
  cy.wrap(username).as('username');
  cy.wrap(password).as('password');
  cy.request({
    method: 'POST',
    url: `${api()}/api/users/register`,
    body: { username, password },
    failOnStatusCode: false,
  });
});

When('I register the user', () => {
  cy.get('@username').then((username) => {
    cy.get('@password').then((password) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/users/register`,
        body: { username, password },
        failOnStatusCode: false,
      }).as('lastResponse');
    });
  });
});

When('I login with the same credentials', () => {
  cy.get('@username').then((username) => {
    cy.get('@password').then((password) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/users/login`,
        body: { username, password },
        failOnStatusCode: false,
      }).as('lastResponse');
    });
  });
});

When('I login with unknown credentials', () => {
  cy.request({
    method: 'POST',
    url: `${api()}/api/users/login`,
    body: { username: 'no-such-cypress-user-xyz', password: 'WrongPass999!' },
    failOnStatusCode: false,
  }).as('lastResponse');
});

Then('the users response should contain an id', () => {
  cy.get('@lastResponse').its('body').its('id').should('be.a', 'string').and('not.be.empty');
});

Then('the users response username should match', () => {
  cy.get('@username').then((username) => {
    cy.get('@lastResponse').its('body').its('username').should('eq', username);
  });
});

Then('the login response should contain a token', () => {
  cy.get('@lastResponse').its('body').its('token').should('be.a', 'string').and('not.be.empty');
});
