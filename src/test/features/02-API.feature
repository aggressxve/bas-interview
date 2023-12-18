Feature: API

Background:
    Given the request context is created

Scenario: User adds a pet using a POST request
    When user sends a post request to create a pet
    Then response should be schema compliant
    And response should get a 200 status code

Scenario: User wants to get data from an existing pet
    When user sends a get request with an existing pet id
    Then response should be schema compliant
    And response should get a 200 status code

Scenario: User wants to modify an existing pet using such pet id
    When user sends a put request with new data and an existing pet id
    Then response should be schema compliant
    And response should get a 200 status code