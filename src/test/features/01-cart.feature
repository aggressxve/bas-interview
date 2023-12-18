Feature: Cart

Background:
    Given user navigates to the application

Scenario: a logged in user wants adds an item to the cart
    Given user logs in to the application
    And user clicks on a laptop item
    When user adds the item to the cart
    Then item should appear in the cart
    And browser should close