Feature: Discount API

  Scenario: Only admins can create discounts
    When I try to create a discount as a regular user
    Then the API response status should be 403

  Scenario: Admin can create discounts
    Given I am an admin user
    When I create a discount as admin
    Then the API response status should be 201
    And the discount response should contain an id

  Scenario: Apply a valid discount code to a cart
    Given I am an admin user
    And I seed a product and discount for discount tests
    And I create a cart for discount tests
    When I apply the valid discount code to the cart
    Then the API response status should be 200
    And the discount response should contain a totalPrice

  Scenario: Prevent applying a discount code twice
    Given I am an admin user
    And I seed a product and discount for discount tests
    And I create a cart for discount tests
    And I apply the valid discount code to the cart
    When I apply the valid discount code to the cart again
    Then the API response status should be 409

  Scenario: Apply an invalid discount code
    Given I am an admin user
    And I seed a product for invalid discount test
    And I create a cart for invalid discount test
    When I apply an invalid discount code
    Then the API response status should be 404
