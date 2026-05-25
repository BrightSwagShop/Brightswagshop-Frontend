import { When } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;
const adminHeaders = { 'X-User-Role': 'Admin', 'X-User-Id': 'test-admin-user' };
const userHeaders = { 'X-User-Role': 'User', 'X-User-Id': 'test-user-user' };

When('I POST to image upload as a regular user', () => {
  cy.request({
    method: 'POST',
    url: `${api()}/api/images/upload`,
    headers: userHeaders,
    failOnStatusCode: false,
  }).as('lastResponse');
});

When('I POST to image upload without a file', () => {
  cy.request({
    method: 'POST',
    url: `${api()}/api/images/upload`,
    headers: { ...adminHeaders, 'Content-Type': 'multipart/form-data' },
    failOnStatusCode: false,
  }).as('lastResponse');
});
