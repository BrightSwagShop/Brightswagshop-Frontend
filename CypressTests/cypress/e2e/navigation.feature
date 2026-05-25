Feature: Navigation - Smoke Tests

  Background:
    Given I mock the product types API
    And I visit the homepage

  Scenario: Navigate to Home via navbar
    When I click the navbar logo
    Then the URL should include "/"

  Scenario: Navigate to About page via navbar
    When I click the navbar about link
    Then the URL should include "/about"

  Scenario: Navigate to Contact page via navbar
    When I click the navbar contact link
    Then the URL should include "/contact"

  Scenario: Navigate to Cart via navbar
    When I click the navbar cart icon
    Then the URL should include "/winkelwagen"

  Scenario: Navigate to Home via footer
    When I click the footer logo
    Then the URL should include "/"

  Scenario: Navigate to About page via footer
    When I click the footer about link
    Then the URL should include "/about"

  Scenario: Navigate to Contact page via footer
    When I click the footer contact link
    Then the URL should include "/contact"
