Feature: Backend API

  Scenario: GET categories returns 200 and list with id and name
    When I GET "/api/categories"
    Then the API response status should be 200
    And the API response body should be an array
    And the first item should have a numeric id and string name

  Scenario: GET product types returns 200 and list with name and slug
    When I GET "/api/producttypes"
    Then the API response status should be 200
    And the API response body should be an array
    And the first item should have a string name and string slug

  Scenario: Only admins can upload images
    When I POST to image upload as a regular user
    Then the API response status should be 403

  Scenario: POST image upload without file returns 400
    Given I am an admin user
    When I POST to image upload without a file
    Then the API response status should be 400
