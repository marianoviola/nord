const { run } = require("@marianoviola/nord");

module.exports = async function () {
  try {
    const data = await run("./scripts/topten.R", ["json"]);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};
