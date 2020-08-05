Feature: Verify the functionality of weather forecasting application

  @weather @test1
  Scenario Outline: Retrieve 5 day weather forecast of the city
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast

    Examples:

      | City name |
      | aberdeen  |
      | dundee    |
      | Glasgow   |
      | perth     |
      | stirling  |
      | edinburgh |

  @weather @test2
  Scenario Outline: Retrieve hourly forecast of a day
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast

    Examples:

      | City name | Day |
      | aberdeen  | Wed |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test3
  Scenario Outline: Display weather forecast in 3 hour format
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I validate displayed forecast of the selected <Day> is in 3 hourly format

    Examples:

      | City name | Day |
      | aberdeen  | Wed |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test4
  Scenario Outline: Daily forecast to provide 3 hour format for maximum and minimum temperature
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I validate the Minimum and maximum temperature of the selected <Day>

    Examples:

      | City name | Day |
      | aberdeen  | Wed |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test5
  Scenario Outline: Summarise aggregate rainfall
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I validate the aggregate rainfall of the selected <Day>

    Examples:

      | City name | Day |
      | aberdeen  | Wed |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test6
  Scenario Outline: Summarise most dominant condition
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I validate the dominant condition of the selected <Day>

    Examples:

      | City name | Day |
      | aberdeen  | Wed |
      | dundee    | Sat |
      | perth     | Tue |
      | Glasgow   | Thu |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test7
  Scenario Outline: Summarise most dominant wind speed and direction
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I validate the wind speed of the selected <Day>

    Examples:

      | City name | Day |
      | aberdeen  | Fri |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test8
  Scenario Outline: Hide hourly forecast
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I select a <Day> and I will get hourly forecast
    Then I hide the hourly forecast of the selected <Day>

    Examples:

      | City name | Day |
      | aberdeen  | Fri |
      | dundee    | Sat |
      | Glasgow   | Tue |
      | perth     | Wed |
      | stirling  | Thu |
      | edinburgh | Thu |

  @weather @test9
  Scenario Outline: Verify the default city name is displayed when refreshing the page
    Given Application is open
    When I enter the <City name> and click on submit
    Then I should get the five day whether forecast
    Then I refresh the page
    Then I should get the default city name in input search field

    Examples:

      | City name |
      | aberdeen  |
      | dundee    |
      | Glasgow   |
      | perth     |
      | stirling  |
      | edinburgh |

  @weather @test10 @nagativeScenario
  Scenario Outline: Verify the error message for any other random city
    Given Application is open
    When I enter an random city name <City name>
    Then I should get the message <Error Message Text>

    Examples:

      | City name | Error Message Text             |
      | croydon   | Error retrieving the forecast  |
      | reading   | Error retrieving the forecast  |

  @weather @test11 @nagativeScenario
  Scenario Outline: Verify that the user is getting error message when submitting without entering any input
    Given Application is open
    When I submit without entering any input
    Then I should get the message <Error Message Text>

    Examples:

      | Error Message Text             |
      | Error retrieving the forecast  |
