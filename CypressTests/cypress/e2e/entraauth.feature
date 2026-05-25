Feature: EntraID Authentication - Smoke Tests

  Scenario: Login page loads successfully
    Given I visit the login page
    Then the URL should include "/login"

  Scenario: Microsoft login button is visible
    Given I visit the login page
    Then the Microsoft login button should be visible

  Scenario: Microsoft login button is clickable
    Given I visit the login page
    Then the Microsoft login button should be enabled

  Scenario: Microsoft login button displays correct text
    Given I visit the login page
    Then the Microsoft login button should contain text matching "sign in with microsoft"

  Scenario: Admin page redirects to login when not authenticated
    Given I visit the admin page without authentication
    Then the URL should include "login"

  Scenario: Admin dashboard redirects to login when not authenticated
    Given I visit the admin dashboard without authentication
    Then the URL should include "login"

  Scenario: Admin users page redirects to login when not authenticated
    Given I visit the admin users page without authentication
    Then the URL should include "login"
