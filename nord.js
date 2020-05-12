const { spawn } = require("child_process");
const { performance } = require("perf_hooks");

const run = (scriptPath, scriptArgs) => {
  const t0 = performance.now();
  const child = spawn("Rscript", [scriptPath, ...scriptArgs]);

  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    child.stderr.on("data", (err) => {
      reject(`Error: ${err}`);
    });

    child.on("close", (code) => {
      const t1 = performance.now();
      const cyan = "\x1b[36m";
      const magenta = "\x1b[35m";

      const color = code === 0 ? cyan : magenta;

      console.log(
        `${color}%s\x1b[0m`,
        `Benchmark: \`${scriptPath}\` took ${((t1 - t0) / 1000).toFixed(
          2
        )}s (code ${code})`
      );
    });
  });
};

module.exports = { run };
