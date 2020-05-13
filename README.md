<p>
  <img src="https://repository-images.githubusercontent.com/263383491/6e90ef00-9517-11ea-8d36-07bf6d0b4915"  alt="nord">
</p>

# Nord

`Nord` is a proof of concept micro-libray that can be used to execute R scripts from Node.

## Installation

For use with node and npm:

```bash
$ npm install --save @marianoviola/nord
```

## Usage

In order to execute R scripts through `nord` you need a working [R installation](https://www.r-project.org/).

### Module

```js
const { run } = require("@marianoviola/nord");

run("./examples/eleventy/scripts/topten.R", ["json"])
  .then(data => console.log(data))
  .catch(err => console.log(err))
```

## API

`run(scriptPath, scriptArgs)`

Exec a R script.

### Arguments

`scriptPath` _(string)_: The R script path.

`scriptArgs` _(...Array)_: An array of arguments to pass to the R script.

### Returns

_(Promise\<string\>)_: The R script output decoded as `UTF-8` string.

## Examples

### Eleventy

`Nord` can be used to execute R scripts making their output available to a static site generator such as [Eleventy](https://www.11ty.dev). Eleventy allows to dinamically generate data at build time using [JavaScript data files](https://www.11ty.dev/docs/data-js/):

```js
const { run } = require("@marianoviola/nord");

module.exports = async function () {
  try {
    const data = await run("./scripts/topten.R", ["json"]);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};
```
`examples/eleventy/_data/topten.json`.

To build Eleventy using `Nord` using GitHub Actions you can use a workflow like this:

```yaml
name: Exec R scripts and build Eleventy
on:
  push:
    branches:
    - master
jobs:
  nord:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup and install R packages
        uses: r-lib/actions/setup-r@v1
      - run: Rscript -e 'install.packages("remotes", repos = c(CRAN = "https://cran.stat.unipd.it/"))'
      - run: Rscript -e 'remotes::install_github("rstudio/renv")'
      - run: Rscript -e 'renv::restore()'
      - name: Setup and run Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      - run: npm install
      - run: npm run build
```
`examples/eleventy/.github/workflows/topten.json`.

The workflow example above setups R using [GitHub Actions for the R language](https://github.com/r-lib/actions) and installs R packages using [`renv`](https://rstudio.github.io/renv/articles/renv.html) before running Node scripts.

### Express

`Nord` can be also used to exec R scripts at runtime using Express or any another Node web framework. It can be an alternative to [Plumber](https://www.rplumber.io/).

```js
const express = require("express");
const { run } = require("@marianoviola/nord");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const data = await run("./scripts/topten/topten.R", ["json"]);
    console.log(data);
    res.json(data);
  } catch (err)  {
    res.send(err);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
```
`examples/express/index.js`.

You can run the Express example pulling and running the `Nord` Docker image from Docker Hub:

```bash
$ docker pull marianoviola/nord
$ docker run --name nord -p 3000:3000 -d marianoviola/nord
```

## CLI

`Nord` can be used via CLI using `nord-cli` a simple wrapper around `nord.js`.

```bash
$ npx @marianoviola/nord json=./examples/eleventy/_data ./examples/eleventy/scripts/topten.R json
```

The first argument is composed by the output type expected from the script (eg. `JSON` or `CSV`) and the output path joined by the `=` character. The second argument is a the R script path followed by a list of arbitrary arguments that will be passed to the R script.
