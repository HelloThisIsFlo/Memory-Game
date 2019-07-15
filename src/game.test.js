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

  it("debug", () => {
    expect({ yo: "frank", hey: 3 }).toEqual({ yo: "frank", hey: 3 });
    expect([1, 2, 3, 4].slice(0, 2)).toEqual([1, 2]);
    const someArray = [1, 2, 3, 4];
    const duplicatedArray = [...someArray, ...someArray];
    expect(duplicatedArray).toEqual([1, 2, 3, 4, 1, 2, 3, 4]);

    // console.log(someArray.sort(() => (0.5 - Math.random())));
    // console.log(someArray);
  });
});
