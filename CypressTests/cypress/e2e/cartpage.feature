Feature: Cart Page - Smoke Tests

  Background:
    Given I mock the user and cart APIs
    And I set a mock auth token in local storage
    And I visit the cart page

  Scenario: Load page successfully
    Then the URL should include "/winkelwagen"

  Scenario: Navbar verification
    Then all navbar elements should be visible

  Scenario: Continue shopping button visibility
    Then the continue shopping button should be visible

  Scenario: Checkout button visibility
    Then the checkout button should be visible

  Scenario: Footer verification
    Then all footer elements should be visible
