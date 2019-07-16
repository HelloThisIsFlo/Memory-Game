const { MemoryGame } = require("./game");
const _ = require("lodash");
const objectContaining = expect.objectContaining;

describe("When creating a new game", () => {
  it("ensures the board contains 8 pair of icons", () => {
    expect(() => {
      new MemoryGame([
        ["a", "b", "c", "d"],
        ["e", "f", "g", "h"],
        ["a", "b", "c", "d"],
        ["e", "f", "g", "missingSecondH"]
      ]);
    }).toThrow(/must contain 8 pairs of icons/);
  });

  it("ensures the board is 4x4", () => {
    expect(() => {
      new MemoryGame([
        ["a", "b", "c", "d"],
        ["a", "b", "c", "d"],
        ["e", "f", "g", "h"]
      ]);
    }).toThrow(/must be 4x4/);
  });

  it("sets the board when valid", () => {
    const game = new MemoryGame([
      ["a", "b", "c", "d"],
      ["e", "f", "g", "h"],
      ["a", "b", "c", "d"],
      ["e", "f", "g", "h"]
    ]);

    const { card1: cardAt11 } = game.playCard(1, 1);
    expect(cardAt11.icon).toBe("f");
  });
});

describe("Play a Card", () => {
  let game;
  const mockBoard = [
    ["a", "b", "c", "d"],
    ["e", "f", "g", "h"],
    ["a", "b", "c", "d"],
    ["e", "f", "g", "h"]
  ];
  beforeEach(() => {
    game = new MemoryGame(mockBoard);
  });

  it("raises error when coordinates out of board", () => {
    // Valid coordinates: 0-3
    [
      () => game.playCard(4, 2),
      () => game.playCard(-1, 3),
      () => game.playCard(2, -1),
      () => game.playCard(2, 4)
    ].forEach(playCardWithInvalidCoordinate => {
      expect(playCardWithInvalidCoordinate).toThrow(/out of the board/);
    });
  });

  describe("First Move", () => {
    describe("First Card", () => {
      it("returns first card", () => {
        const { card1: playedCard } = game.playCard(1, 3);
        expect(playedCard.icon).toBe("f");
      });
      it("sets parameters depending on second card to null", () => {
        const { card2: secondPlayedCard, success: isSuccess } = game.playCard(
          1,
          3
        );
        expect(secondPlayedCard).toBe(null);
        expect(isSuccess).toBe(null);
      });
    });
    describe("Second Card", () => {
      beforeEach(() => {
        const { card1: firstPlayedCard } = game.playCard(2, 3);
        expect(firstPlayedCard.icon).toBe("g");
      });

      it("returns success when second card has same icon as the first", () => {
        const { success: isSuccess } = game.playCard(2, 1);
        expect(isSuccess).toBeTruthy();
      });
      it("returns failure when second card has not the same icon as the first", () => {
        const { success: isSuccess } = game.playCard(0, 0);
        expect(isSuccess).toBeFalsy();
      });
      it("returns both card played", () => {
        const result = game.playCard(1, 1);
        expect(result.card1).toEqual(
          objectContaining({ x: 2, y: 3, icon: "g" })
        );
        expect(result.card2).toEqual(
          objectContaining({ x: 1, y: 1, icon: "f" })
        );
      });
      it("throws when playing the 1st card again", () => {
        expect(() => {
          game.playCard(2, 3);
        }).toThrow(/Can not play the same card twice/);
      });
    });
  });

  describe("Full Game", () => {
    let game;
    const mockBoard = [
      ["a", "b", "c", "d"],
      ["e", "f", "g", "h"],
      ["a", "b", "c", "d"],
      ["e", "f", "g", "h"]
    ];

    beforeEach(() => {
      game = new MemoryGame(mockBoard);
    });

    it("throws when trying to play a card already revealed", () => {
      // First successful pair
      game.playCard(0, 0); // a
      game.playCard(0, 2); // a

      // Some unsuccessful try
      game.playCard(3, 1); // h
      game.playCard(1, 1); // f

      // Trying to play card already discovered
      expect(() => {
        game.playCard(0, 2);
      }).toThrow("Card already revealed");
    });

    describe("End of Game", () => {
      beforeEach(() => {
        const playAllMovesExceptLastOne = () => {
          // Success - 'a'
          game.playCard(0, 2);
          game.playCard(0, 0);

          // Some unsuccessful try
          game.playCard(3, 1); // h
          game.playCard(1, 1); // f

          // Success - 'b'
          game.playCard(1, 2);
          game.playCard(1, 0);

          // Success - 'c'
          game.playCard(2, 2);
          game.playCard(2, 0);

          // Success - 'd'
          game.playCard(3, 2);
          game.playCard(3, 0);

          // Success - 'e'
          game.playCard(0, 3);
          game.playCard(0, 1);

          // Success - 'f'
          game.playCard(1, 3);
          game.playCard(1, 1);

          // Success - 'g'
          game.playCard(2, 3);
          game.playCard(2, 1);
        };

        playAllMovesExceptLastOne();
      });

      it("sets 'isGameFinished' to 'true' on the last move", () => {
        // Success - 'h' - Move 1
        const resultAfterFinalPairMove1 = game.playCard(3, 3);
        const resultAfterFinalPairMove2 = game.playCard(3, 1);

        expect(resultAfterFinalPairMove1.isGameFinished).toBe(false);
        expect(resultAfterFinalPairMove2.isGameFinished).toBe(true);
      });

      it("throws if trying to play a card after the game is finished", () => {
        const finishGame = () => {
          game.playCard(3, 3);
          game.playCard(3, 1);
        };

        finishGame();
        expect(() => {
          game.playCard(3, 3);
        }).toThrow("game is finished");
      });
    });

    it.todo("increments the movesCounter after each full move");
    describe("Rating", () => {
      /**
       * TODO: Implement some scenario with the rating
       *       Offer the option to set the threshold as option when building
       *       the game.
       **/
    });
  });
});

it("debug", () => {
  expect({ yo: "frank", hey: 3 }).toEqual({ yo: "frank", hey: 3 });
  expect([1, 2, 3, 4].slice(0, 2)).toEqual([1, 2]);
  const someArray = [1, 2, 3, 4];
  const duplicatedArray = [...someArray, ...someArray];
  expect(duplicatedArray).toEqual([1, 2, 3, 4, 1, 2, 3, 4]);

  const someGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const clonedGrid = _.cloneDeep(someGrid);
  expect(clonedGrid).toEqual(someGrid);
  someGrid[1][2] = "a";
  expect(clonedGrid).not.toEqual(someGrid);
});
