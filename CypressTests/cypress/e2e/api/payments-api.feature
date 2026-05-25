Feature: Payments API

  Scenario: Create checkout session for unknown order returns 404
    When I POST checkout for unknown order id
    Then the API response status should be 404
    And the payments response should contain "Order not found"

  Scenario: Create checkout session for empty order returns 400
    Given I create an empty order
    When I POST checkout for the created order
    Then the API response status should be 400
    And the payments response should contain "Order has no items"

  Scenario: Stripe webhook without signature returns 400
    When I POST a Stripe webhook event without signature
    Then the API response status should be 400
