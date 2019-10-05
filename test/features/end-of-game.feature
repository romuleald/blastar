Feature: End of game

  Scenario Outline: Game stop when a player reach <title> points
    Given <count> player(s)
    And Game stop at <gameStopPoints>
    When player <playerIndex> reach <points> points
    Then The game is <finished> finish

    Examples:
      | title | count | gameStopPoints | playerIndex | point | finished |
      | 100   | 4     | 100            | 1           | 10    | not      |
      | 100   | 4     | 100            | 2           | 20    | not      |
      | 100   | 4     | 100            | 3           | 99    | not      |
      | 100   | 4     | 100            | 4           | 100   |          |
      | 100   | 4     | 100            | 1           | 101   |          |
      | 50    | 3     | 50             | 1           | 49    | not      |
      | 50    | 3     | 50             | 1           | 50    |          |
