const fs = require("fs");

const data = fs.readFileSync("input").toString("utf-8");

const answers = data.split(/\n\s*\n/);

var count = 0;

answers.forEach((answer) => {
  const lines = answer.replace(/(?:\r\n|\r|\n)/g, "").split("");

  const cleanedLines = lines.flatMap((line) => {
    const chars = [...line];

    return [...new Set(chars)];
  });
  count = count + [...new Set(cleanedLines)].length;
});

console.log(count);
