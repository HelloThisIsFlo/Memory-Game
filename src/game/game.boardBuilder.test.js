const { BoardBuilder } = require("./game");

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

describe("BoardBuilder", () => {
  let boardBuilder;
  beforeEach(() => {
    boardBuilder = new BoardBuilder();
  });

  it("Ensures there are enough icon provided", () => {
    expect(() => {
      boardBuilder.buildFromIcons([""]);
    }).toThrow(/Not enough icons provided.*at least 8 different icons/);
  });

  it("Ensures there are enough icon provided after duplicates removed", () => {
    expect(() => {
      boardBuilder.buildFromIcons([
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
    const board1 = boardBuilder.buildFromIcons(mockIcons);
    const board2 = boardBuilder.buildFromIcons(mockIcons);

    expect(board1).not.toEqual(board2);
  });

  it("Returns a 4x4 board", () => {
    const board = boardBuilder.buildFromIcons(mockIcons);
    expect(board.length).toBe(4);
    for (row of board) {
      expect(row.length).toBe(4);
    }
  });
});
