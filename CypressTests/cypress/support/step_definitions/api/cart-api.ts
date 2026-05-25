import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;
const adminHeaders = { 'X-User-Role': 'Admin', 'X-User-Id': 'test-admin-user' };

function mugPayload(unique: number) {
  return JSON.stringify({
    $type: 'SimpleProduct',
    name: `Cart Mug ${unique}`,
    description: 'Cart test product',
    price: 9.99,
    category: 'Drinkartikelen',
    productType: 'Mok',
    isActive: true,
    kleuren: [{ kleur: 'Zwart', imageUrl: 'https://example.com/mug.png', stock: 10, sku: `CAR-${unique}` }],
  });
}

Given('I seed a product for cart tests', () => {
  const unique = Date.now();
  cy.wrap(`cy-cart-user-${unique}`).as('cartUserId');
  cy.request({
    method: 'POST',
    url: `${api()}/api/products`,
    headers: { ...adminHeaders, 'Content-Type': 'application/json' },
    body: mugPayload(unique),
    failOnStatusCode: false,
  }).then((resp) => {
    cy.wrap(resp.body.id).as('cartProductId');
  });
});

When('I create a cart with the seeded product', () => {
  cy.get('@cartUserId').then((userId) => {
    cy.get('@cartProductId').then((productId) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/shoppingcarts`,
        body: { userId, items: [{ productId, quantity: 2 }] },
        failOnStatusCode: false,
      }).then((resp) => {
        cy.wrap(resp).as('lastResponse');
        cy.wrap(resp.body.id).as('cartId');
      });
    });
  });
});

When('I get the cart by user id', () => {
  cy.get('@cartUserId').then((userId) => {
    cy.request({
      method: 'GET',
      url: `${api()}/api/shoppingcarts/user/${userId}`,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

When('I delete the cart', () => {
  cy.get('@cartId').then((cartId) => {
    cy.request({
      method: 'DELETE',
      url: `${api()}/api/shoppingcarts/${cartId}`,
      headers: adminHeaders,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

Then('the cart response should contain the user id', () => {
  cy.get('@cartUserId').then((userId) => {
    cy.get('@lastResponse').its('body').its('userId').should('eq', userId);
  });
});

Then('the cart response should contain the seeded product', () => {
  cy.get('@cartProductId').then((productId) => {
    cy.get('@lastResponse').its('body').its('items').its('0').its('productId').should('eq', productId);
  });
});
