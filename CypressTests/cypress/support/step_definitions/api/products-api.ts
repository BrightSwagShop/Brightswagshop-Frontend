import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;
const adminHeaders = { 'X-User-Role': 'Admin', 'X-User-Id': 'test-admin-user' };
const userHeaders = { 'X-User-Role': 'User', 'X-User-Id': 'test-user-user' };

function mugPayload() {
  const unique = Date.now();
  return JSON.stringify({
    $type: 'SimpleProduct',
    name: `Cypress Mug ${unique}`,
    description: 'Cypress API test product',
    price: 9.99,
    category: 'Drinkartikelen',
    productType: 'Mok',
    isActive: true,
    kleuren: [{ kleur: 'Zwart', imageUrl: 'https://example.com/mug.png', stock: 10, sku: `CY-${unique}` }],
  });
}

Given('I have a valid product payload', () => {
  cy.wrap(mugPayload()).as('productPayload');
});

When('I try to create the product as a regular user', () => {
  cy.get('@productPayload').then((payload) => {
    cy.request({
      method: 'POST',
      url: `${api()}/api/products`,
      headers: { ...userHeaders, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

When('I try to delete {string} as a regular user', (path: string) => {
  cy.request({
    method: 'DELETE',
    url: `${api()}${path}`,
    headers: userHeaders,
    failOnStatusCode: false,
  }).as('lastResponse');
});

When('I create the product via admin', () => {
  cy.wrap(mugPayload()).as('productPayload');
  cy.get('@productPayload').then((payload) => {
    cy.request({
      method: 'POST',
      url: `${api()}/api/products`,
      headers: { ...adminHeaders, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false,
    }).then((resp) => {
      cy.wrap(resp).as('lastResponse');
      cy.wrap(resp.body.id).as('createdProductId');
    });
  });
});

Then('I store the created product id', () => {
  cy.get('@lastResponse').its('body').its('id').as('createdProductId');
});

When('I GET the created product', () => {
  cy.get('@createdProductId').then((id) => {
    cy.request({
      method: 'GET',
      url: `${api()}/api/products/${id}`,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

When('I DELETE the created product', () => {
  cy.get('@createdProductId').then((id) => {
    cy.request({
      method: 'DELETE',
      url: `${api()}/api/products/${id}`,
      headers: adminHeaders,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});
