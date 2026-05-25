Feature: Users API

  Scenario: Register a new public user
    Given I prepare a unique user payload
    When I register the user
    Then the API response status should be 200
    And the users response should contain an id
    And the users response username should match

  Scenario: Login with a registered public user
    Given I register a unique public user
    When I login with the same credentials
    Then the API response status should be 200
    And the login response should contain a token

  Scenario: Login with unknown user returns 401
    When I login with unknown credentials
    Then the API response status should be 401
