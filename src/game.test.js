const { MemoryGame } = require("./game");

const mockIcons = [
  "icon1",
  "icon2",
  "icon3",
  "icon4",
  "icon5",
  "icon6",
  "icon7",
  "icon8"
];

describe("Create a new game", () => {
  it("Ensures there are enough icon provided", () => {
    expect(() => {
      new MemoryGame([""]);
    }).toThrow(/Not enough icons provided.*at least 8 different icons/);
  });

  it("Ensures there are enough icon provided after duplicates removed", () => {
    expect(() => {
      new MemoryGame([
        "icon1",
        "icon1",
        "icon1",
        "icon1",
        "icon1",
        "icon1",
        "icon1",
        "icon1"
      ]);
    }).toThrow(/Not enough icons provided.*at least 8 different icons/);
  });

  it("Shuffles cards", () => {
    /**
     * Technically this is a flaky test, but in reality the probability
     * of ending up with the exact same board is incredibly low.
     */
    const game1 = new MemoryGame(mockIcons);
    const game2 = new MemoryGame(mockIcons);

    let allEquals = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const { card1: cardGame1 } = game1.playCard(i, j);
        const { card1: cardGame2 } = game2.playCard(i, j);
        if (cardGame1.icon !== cardGame2.icon) {
          allEquals = false;
        }
      }
    }

    expect(allEquals).toBeFalsy();
  });
});

describe("Set board", () => {
  let game;
  beforeEach(() => {
    game = new MemoryGame(mockIcons);
  });
  it("ensures the board contains 8 pair of icons", () => {
    const game = new MemoryGame(mockIcons);
    expect(() => {
      game.setBoard([
        ["a", "b", "c", "d"],
        ["e", "f", "g", "h"],
        ["a", "b", "c", "d"],
        ["e", "f", "g", "missingSecondH"]
      ]);
    }).toThrow(/must contain 8 pairs of icons/);
  });
  it("ensures the board is 4x4", () => {
    expect(() => {
      game.setBoard([
        ["a", "b", "c", "d"],
        ["a", "b", "c", "d"],
        ["e", "f", "g", "h"]
      ]);
    }).toThrow(/must be 4x4/);
  });

  it("sets the board when valid", () => {
    game.setBoard([
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
  beforeEach(() => {
    game = new MemoryGame(mockIcons);
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

  // describe.skip("First Card", () => {
  //   it("returns first card", () => {
  //     const { card1: playedCard } = game.playCard(2, 4);
  //   });
  // });
  // describe("Second Card", () => {
  //   it.todo("asdfs");
  // });
});

it("debug", () => {
  expect({ yo: "frank", hey: 3 }).toEqual({ yo: "frank", hey: 3 });
  expect([1, 2, 3, 4].slice(0, 2)).toEqual([1, 2]);
  const someArray = [1, 2, 3, 4];
  const duplicatedArray = [...someArray, ...someArray];
  expect(duplicatedArray).toEqual([1, 2, 3, 4, 1, 2, 3, 4]);

  // console.log(someArray.sort(() => (0.5 - Math.random())));
  // console.log(someArray);
});
