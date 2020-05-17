#!/usr/bin/env node

const { run } = require("./nord");

const args = process.argv.slice(2);
const [scriptPath, ...scriptArgs] = args;

if (args.length < 1) {
  console.log(`Usage: nord-cli script-path [script-arguments ...] > [output]`) 
  return;
}

run(scriptPath, scriptArgs)
  .then(data => {
    process.stdout.write(data);
  })
  .catch((err) => {
    process.stderr.write(err);
  });
