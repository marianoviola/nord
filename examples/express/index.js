const express = require("express");
const { run } = require("@marianoviola/nord");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const data = await run("./scripts/topten.R", ["json"]);
    console.log(data);
    res.json(data);
  } catch (err)  {
    res.send(err);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
