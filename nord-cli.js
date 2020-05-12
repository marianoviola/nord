#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { run } = require("./nord");

const args = process.argv.slice(2);

const [outputArgs, scriptPath, ...scriptArgs] = args;
const [outputType, outputPath] = outputArgs.split("=");

const scriptExt = path.extname(scriptPath);
const scriptName = path.basename(scriptPath, scriptExt);

run(scriptPath, scriptArgs)
  .then(outputData => {
    try {
      fs.writeFileSync(
        `${outputPath}/${scriptName}.${outputType}`,
        outputData
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
