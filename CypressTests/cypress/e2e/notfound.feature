Feature: 404 Not Found Page - Smoke Tests

  Scenario: Load 404 page
    Given I visit a non-existent page
    Then the URL should include "/nonexistent-page-12345"

  Scenario: Display "Pagina niet gevonden" heading
    Given I visit a non-existent page
    Then the main heading should be visible
    And the main heading text should be "Pagina niet gevonden"

  Scenario: Display "Verder shoppen" button
    Given I visit a non-existent page
    Then the continue shopping link should be visible
    And the continue shopping link text should be "Verder shoppen"

  Scenario: Click "Verder shoppen" redirects to home
    Given I visit a non-existent page
    When I click the continue shopping link
    Then the URL should be "/"

  Scenario: Display error description text
    Given I visit a non-existent page
    Then the error description text should be visible
