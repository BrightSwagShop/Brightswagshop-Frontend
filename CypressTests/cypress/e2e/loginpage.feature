Feature: Login Page - Smoke Tests

  Background:
    Given I visit the login page

  Scenario: Load page successfully
    Then the URL should include "/login"
    And the main logo should be visible

  Scenario: Microsoft login button visibility
    Then the Microsoft login button should be visible
