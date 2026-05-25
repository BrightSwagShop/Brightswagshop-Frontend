import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;
const adminHeaders = { 'X-User-Role': 'Admin', 'X-User-Id': 'test-admin-user' };
const userHeaders = { 'X-User-Role': 'User', 'X-User-Id': 'test-user-user' };

function discountPayload(unique: number) {
  return {
    name: `Cy Discount ${unique}`,
    description: 'Cypress test discount',
    percentage: 10,
    code: `CY10-${unique}`,
    startsAt: new Date().toISOString(),
    endsAt: null,
    isActive: true,
  };
}

function mugPayload(unique: number) {
  return JSON.stringify({
    $type: 'SimpleProduct',
    name: `Discount Mug ${unique}`,
    description: 'Discount test product',
    price: 9.99,
    category: 'Drinkartikelen',
    productType: 'Mok',
    isActive: true,
    kleuren: [{ kleur: 'Zwart', imageUrl: 'https://example.com/mug.png', stock: 10, sku: `DIS-${unique}` }],
  });
}

When('I try to create a discount as a regular user', () => {
  const unique = Date.now();
  cy.request({
    method: 'POST',
    url: `${api()}/api/discounts`,
    headers: { ...userHeaders, 'Content-Type': 'application/json' },
    body: discountPayload(unique),
    failOnStatusCode: false,
  }).as('lastResponse');
});

When('I create a discount as admin', () => {
  const unique = Date.now();
  cy.wrap(discountPayload(unique)).as('discountPayload');
  cy.get('@discountPayload').then((payload) => {
    cy.request({
      method: 'POST',
      url: `${api()}/api/discounts`,
      headers: { ...adminHeaders, 'Content-Type': 'application/json' },
      body: payload,
      failOnStatusCode: false,
    }).then((resp) => {
      cy.wrap(resp).as('lastResponse');
      cy.wrap(resp.body.id).as('discountId');
      cy.wrap((payload as { code: string }).code).as('discountCode');
    });
  });
});

Given('I seed a product and discount for discount tests', () => {
  const unique = Date.now();
  cy.wrap(`cy-disc-user-${unique}`).as('discountUserId');
  const payload = discountPayload(unique);
  cy.wrap(payload.code).as('discountCode');

  cy.request({
    method: 'POST',
    url: `${api()}/api/products`,
    headers: { ...adminHeaders, 'Content-Type': 'application/json' },
    body: mugPayload(unique),
    failOnStatusCode: false,
  }).then((resp) => {
    cy.wrap(resp.body.id).as('discountProductId');
  });

  cy.request({
    method: 'POST',
    url: `${api()}/api/discounts`,
    headers: { ...adminHeaders, 'Content-Type': 'application/json' },
    body: payload,
    failOnStatusCode: false,
  });
});

Given('I create a cart for discount tests', () => {
  cy.get('@discountUserId').then((userId) => {
    cy.get('@discountProductId').then((productId) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/shoppingcarts`,
        body: { userId, items: [{ productId, quantity: 1 }] },
        failOnStatusCode: false,
      }).then((resp) => {
        cy.wrap(resp.body.id).as('discountCartId');
      });
    });
  });
});

When('I apply the valid discount code to the cart', () => {
  cy.get('@discountCartId').then((cartId) => {
    cy.get('@discountCode').then((code) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/shoppingcarts/${cartId}/apply-discount`,
        body: { code },
        failOnStatusCode: false,
      }).as('lastResponse');
    });
  });
});

When('I apply the valid discount code to the cart again', () => {
  cy.get('@discountCartId').then((cartId) => {
    cy.get('@discountCode').then((code) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/shoppingcarts/${cartId}/apply-discount`,
        body: { code },
        failOnStatusCode: false,
      }).as('lastResponse');
    });
  });
});

Given('I seed a product for invalid discount test', () => {
  const unique = Date.now();
  cy.wrap(`cy-inv-disc-user-${unique}`).as('invalidDiscountUserId');
  cy.request({
    method: 'POST',
    url: `${api()}/api/products`,
    headers: { ...adminHeaders, 'Content-Type': 'application/json' },
    body: mugPayload(unique),
    failOnStatusCode: false,
  }).then((resp) => {
    cy.wrap(resp.body.id).as('invalidDiscountProductId');
  });
});

Given('I create a cart for invalid discount test', () => {
  cy.get('@invalidDiscountUserId').then((userId) => {
    cy.get('@invalidDiscountProductId').then((productId) => {
      cy.request({
        method: 'POST',
        url: `${api()}/api/shoppingcarts`,
        body: { userId, items: [{ productId, quantity: 1 }] },
        failOnStatusCode: false,
      }).then((resp) => {
        cy.wrap(resp.body.id).as('invalidDiscountCartId');
      });
    });
  });
});

When('I apply an invalid discount code', () => {
  cy.get('@invalidDiscountCartId').then((cartId) => {
    cy.request({
      method: 'POST',
      url: `${api()}/api/shoppingcarts/${cartId}/apply-discount`,
      body: { code: 'NOSUCHCODE-xyz-999' },
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

Then('the discount response should contain an id', () => {
  cy.get('@lastResponse').its('body').its('id').should('be.a', 'string').and('not.be.empty');
});

Then('the discount response should contain a totalPrice', () => {
  cy.get('@lastResponse').its('body').its('totalPrice').should('be.a', 'number');
});
