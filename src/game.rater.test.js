const { Rater } = require("./game");

describe("Rater", () => {
  it("should ensure 2 stars threshold is lower than 1 star threshold", () => {
    expect(() => {
      new Rater(5, 2);
    }).toThrow();

    expect(() => {
      new Rater(5, 5);
    }).toThrow();

    expect(() => {
      new Rater(2, 5);
    }).not.toThrow();
  });

  it("should rate according to the thresholds", () => {
    const oneStarThreshold = 20;
    const twoStarsThreshold = 10;
    const rater = new Rater(twoStarsThreshold, oneStarThreshold);

    expect(rater.rateMovesCount(0)).toBe(3);
    expect(rater.rateMovesCount(9)).toBe(3);
    expect(rater.rateMovesCount(10)).toBe(2);
    expect(rater.rateMovesCount(19)).toBe(2);
    expect(rater.rateMovesCount(20)).toBe(1);
    expect(rater.rateMovesCount(9999)).toBe(1);
  });
});
