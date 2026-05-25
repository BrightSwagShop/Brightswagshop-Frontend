import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = () => Cypress.env('apiBaseUrl') as string;

When('I POST checkout for unknown order id', () => {
  cy.request({
    method: 'POST',
    url: `${api()}/api/payments/000000000000000000000000/checkout`,
    failOnStatusCode: false,
  }).as('lastResponse');
});

Given('I create an empty order', () => {
  const unique = Date.now();
  cy.request({
    method: 'POST',
    url: `${api()}/api/orders`,
    body: { userId: `cy-order-user-${unique}`, items: [] },
    failOnStatusCode: false,
  }).then((resp) => {
    cy.wrap(resp.body.id).as('emptyOrderId');
  });
});

When('I POST checkout for the created order', () => {
  cy.get('@emptyOrderId').then((orderId) => {
    cy.request({
      method: 'POST',
      url: `${api()}/api/payments/${orderId}/checkout`,
      failOnStatusCode: false,
    }).as('lastResponse');
  });
});

When('I POST a Stripe webhook event without signature', () => {
  cy.request({
    method: 'POST',
    url: `${api()}/api/webhooks/stripe`,
    body: { type: 'payment_intent.succeeded' },
    failOnStatusCode: false,
  }).as('lastResponse');
});

Then('the payments response should contain {string}', (text: string) => {
  cy.get('@lastResponse').its('body').should((body: unknown) => {
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    expect(bodyStr).to.include(text);
  });
});
