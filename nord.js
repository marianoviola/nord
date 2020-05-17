const { spawn } = require("child_process");

/**
 * Executes a R script
 * @param  {string} scriptPath The R script path.
 * @param  {Array<string>} args An array of arguments to pass to the R script.
 * @return {Promise<string>} The R script output decoded as UTF-8 string.
 */
const run = (scriptPath, scriptArgs = []) => {
  const child = spawn("Rscript", [scriptPath, ...scriptArgs]);

  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    child.stderr.on("data", (err) => {
      reject(err.toString());
    });
  });
};

module.exports = { run };
