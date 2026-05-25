Feature: Contact Page - Smoke Tests

  Background:
    Given I visit the contact page

  Scenario: Load page successfully
    Then the URL should include "/contact"
    And the main heading should be visible

  Scenario: Navbar verification
    Then all navbar elements should be visible

  Scenario: Heading text verification
    Then the main heading text should be "Neem contact met ons op"

  Scenario: Phone number visibility
    Then the phone number link should be visible

  Scenario: Email visibility
    Then the email link should be visible

  Scenario: Contact form exists
    Then the contact form should be visible

  Scenario: Form fields validation
    Then the contact form should have all required fields

  Scenario: Footer verification
    Then all footer elements should be visible
