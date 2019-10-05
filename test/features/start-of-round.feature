Feature: Start of a round

  Scenario Outline: Game start <title>
    Given <playerCount> player(s)
    And Shuffle the card
    And Each players receive 4 cards
    Then There's <cardCount> less in cards stock
    Then Each player has 4 cards face down
    Then Each player can watch 2 cards
    Then There's 1 card in the wasted cards

      Examples:
        | title     | playerCount | cardCount |
        | 4 players | 4           | 16        |
        | 3 players | 3           | 12        |
        | 6 players | 6           | 24        |
