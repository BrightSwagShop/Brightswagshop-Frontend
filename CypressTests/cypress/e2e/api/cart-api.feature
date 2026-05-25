Feature: Shopping Cart API

  Scenario: Create a cart for a user
    Given I am an admin user
    And I seed a product for cart tests
    When I create a cart with the seeded product
    Then the API response status should be 201
    And the cart response should contain the user id
    And the cart response should contain the seeded product

  Scenario: Get cart by user id
    Given I am an admin user
    And I seed a product for cart tests
    And I create a cart with the seeded product
    When I get the cart by user id
    Then the API response status should be 200
    And the cart response should contain the user id

  Scenario: Delete cart by id
    Given I am an admin user
    And I seed a product for cart tests
    And I create a cart with the seeded product
    When I delete the cart
    Then the API response status should be 204
    When I get the cart by user id
    Then the API response status should be 404
