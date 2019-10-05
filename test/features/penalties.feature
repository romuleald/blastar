Feature: Penalties

  Scenario: Player take penalty and a new card is added to his set
    Given 4 players
    When Player 1 take a penalty
    Then A new card is added to is plate after the last one

  Scenario Outline: Player say blast but another player has better score
    Given 4 players
    Given Player 1 has 4 points
    Given Player 2 has 3 points
    When Player 1 say blast at his turn
    Then Player 1 has 5 penalty points added to his score
    Examples:
      | title     | playerCount | cardCount |
      | 4 players | 4           | 16        |
      | 3 players | 3           | 12        |
      | 6 players | 6           | 24        |

  Scenario Outline: Player say blast but has more than 5 points
    Given 4 players
    Given Player 1 has <points> points
    When Player 1 say blast at his turn
    Then Player 1 has <penaltyPoints> penalty points added to his score
    Examples:
      | title | points | penaltyPoints |
      |       | 6      | 15            |
      |       | 4      | 0             |

  Scenario: Player flip an not authorised card
    Given 4 players
    When Player 1 flip card 2 of player 3
    Then Player 1 receive 1 penalty card

  Scenario: Player take a stock card but it's not his turn
    Given 4 players
    Given It's player 4 turn to play
    When Player 1 take the first stock card
    Then Player 1 throw to waste card the stock card
    Then Player 1 receive 1 penalty card

