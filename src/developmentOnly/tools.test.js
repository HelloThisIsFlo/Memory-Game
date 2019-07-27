const { alphaPctToHex } = require("./tools");

describe("Alpha to Hex", () => {
  it("converts 100% to FF", () => {
    expect(alphaPctToHex(100)).toBe('FF')
  });

  it("converts 0% to 00", () => {
    expect(alphaPctToHex(0)).toBe('00')
  });
});
