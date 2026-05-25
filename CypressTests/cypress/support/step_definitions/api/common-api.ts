import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;
const adminHeaders = { 'X-User-Role': 'Admin', 'X-User-Id': 'test-admin-user' };
const userHeaders = { 'X-User-Role': 'User', 'X-User-Id': 'test-user-user' };

// Shared state stored on Cypress.env aliases via cy.wrap + alias
function storeAlias(key: string, value: unknown) {
  cy.wrap(value).as(key);
}

Cypress.Commands.add('apiRequest' as never, (method: string, path: string, options?: object) =>
  cy.request({ method, url: `${api()}${path}`, failOnStatusCode: false, ...options })
);

// ── Role setup ──────────────────────────────────────────────────────────────

Given('I am an admin user', () => {
  storeAlias('roleHeaders', adminHeaders);
});

// ── Generic HTTP ──────────────────────────────────────────────────────────

When('I GET {string}', (path: string) => {
  cy.request({ method: 'GET', url: `${api()}${path}`, failOnStatusCode: false })
    .as('lastResponse');
});

// ── Shared Then steps ─────────────────────────────────────────────────────

Then('the API response status should be {int}', (status: number) => {
  cy.get('@lastResponse').its('status').should('eq', status);
});

Then('the API response body should be an array', () => {
  cy.get('@lastResponse').its('body').should('be.an', 'array');
});

Then('the first item should have a numeric id and string name', () => {
  cy.get('@lastResponse').its('body').then((body: { id: number; name: string }[]) => {
    expect(body[0].id).to.be.a('number');
    expect(body[0].name).to.be.a('string');
  });
});

Then('the first item should have a string name and string slug', () => {
  cy.get('@lastResponse').its('body').then((body: { name: string; slug: string }[]) => {
    expect(body[0].name).to.be.a('string');
    expect(body[0].slug).to.be.a('string');
  });
});
