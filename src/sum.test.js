const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
  console.log(sum);
  expect(sum.doSum(1, 2)).toBe(3);
});
