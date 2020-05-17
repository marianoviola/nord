const { run } = require("../nord");

test("should return the same number of arguments", async () => {
  const args = await run("./test/args.R", ["one", "two", "three", "four,", "five"]);
  expect(parseInt(args)).toBe(5);
});

test("should return an unexpected end of input error", async () => {
  await expect(run("./test/err.R")).rejects.toMatch(
    /Error: unexpected end of input/
  );
});
