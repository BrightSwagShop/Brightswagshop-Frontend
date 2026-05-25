Feature: Homepage - Smoke Tests

  Background:
    Given I mock the product types API
    And I visit the homepage

  Scenario: Load page successfully
    Then the URL should be "/"
    And the main heading should be visible

  Scenario: Navbar verification
    Then all navbar elements should be visible

  Scenario: Heading text verification
    Then the main heading text should be "BrightSwagShop"

  Scenario: Product categories display
    Then product category links should be visible

  Scenario: Footer verification
    Then all footer elements should be visible
