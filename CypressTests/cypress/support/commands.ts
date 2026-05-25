// Custom Cypress commands for BrightSwagShop tests

declare global {
  namespace Cypress {
    interface Chainable {
      mockProductTypesAPI(): Chainable<void>;
      mockUserAndCartAPI(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('mockProductTypesAPI', () => {
  cy.intercept('GET', '**/api/producttypes**', {
    statusCode: 200,
    body: [
      { name: 'T-shirts', slug: 'tshirts' },
      { name: 'Hoodies', slug: 'hoodies' },
      { name: 'Mokken', slug: 'mokken' },
      { name: 'Drinkflessen', slug: 'drinkflessen' },
      { name: 'Notebooks', slug: 'notebooks' },
    ],
  }).as('productTypes');
});

Cypress.Commands.add('mockUserAndCartAPI', () => {
  cy.intercept('GET', '**/api/users/me', {
    statusCode: 200,
    body: {
      id: 'user-123',
      username: 'cypress-user',
      favorites: [],
    },
  }).as('getUser');

  cy.intercept('GET', '**/api/shoppingcarts/user/user-123', {
    statusCode: 200,
    body: {
      id: 'cart-1',
      userId: 'user-123',
      totalPrice: 29.99,
      updatedAt: new Date().toISOString(),
      items: [
        {
          productId: 'prod-1',
          productName: 'Test Product',
          selectedColor: 'Black',
          unitPrice: 29.99,
          quantity: 1,
          imageUrl: 'https://via.placeholder.com/300',
        },
      ],
    },
  }).as('getCart');
});

export {};
