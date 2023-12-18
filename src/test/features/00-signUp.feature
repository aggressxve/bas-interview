Feature: Sign up / Login

Background:
    Given user navigates to the application

Scenario: A new user wants to sign up 
    Given user clicks on the "Sign Up" link
    * user can see the "Sign Up" form
    * user fills in a "Sign Up" test username
    * user fills in a "Sign Up" test password
    When user clicks on the "Sign Up" button
    Then user logs in to the application
    And browser should close

Scenario: A user wants to log in
    Given user clicks on the "Log in" link
    * user can see the "Log in" form
    * user fills in a "Log in" test username
    * user fills in a "Log in" test password
    When user clicks on the "Log in" button
    Then user can see a welcome message
    And browser should close

Scenario: a logged in user wants to log out
    Given user logs in to the application
    And user can see the log out link
    When user clicks on the log out link
    Then user can see the Log in link
    And browser should close