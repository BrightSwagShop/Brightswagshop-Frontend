Feature: Products API

  Scenario: GET all products returns 200 and array
    When I GET "/api/products"
    Then the API response status should be 200
    And the API response body should be an array

  Scenario: GET unknown product returns 404
    When I GET "/api/products/000000000000000000000000"
    Then the API response status should be 404

  Scenario: Only admins can create products
    Given I am an admin user
    And I have a valid product payload
    When I try to create the product as a regular user
    Then the API response status should be 403

  Scenario: Only admins can delete products
    When I try to delete "/api/products/000000000000000000000000" as a regular user
    Then the API response status should be 403

  Scenario: Create, fetch and delete a product
    Given I am an admin user
    And I have a valid product payload
    When I create the product via admin
    Then the API response status should be 201
    And I store the created product id
    When I GET the created product
    Then the API response status should be 200
    When I DELETE the created product
    Then the API response status should be 204
