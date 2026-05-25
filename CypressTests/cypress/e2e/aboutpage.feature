Feature: About Page - Smoke Tests

  Background:
    Given I visit the about page

  Scenario: Load page successfully
    Then the URL should include "/about"
    And the main heading should be visible

  Scenario: Navbar verification
    Then all navbar elements should be visible

  Scenario: Heading text verification
    Then the main heading text should be "BrightestSwagShop"

  Scenario: Shop button visibility
    Then the shop button should be visible

  Scenario: Contact button visibility
    Then the contact button should be visible

  Scenario: Display customers section
    Then the customers grid section should be visible

  Scenario: Footer verification
    Then all footer elements should be visible
