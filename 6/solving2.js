const fs = require("fs");

const data = fs.readFileSync("input").toString("utf-8");

const answers = data.split(/\n\s*\n/);

var count = 0;

answers.forEach((answer) => {
  //   console.log("---b");
  var lines = answer.split("\n");
  var peopleCount = lines.length;

  if (peopleCount === 1) {
    count = count + lines[0].split("").length;
  } else {
    var allChars = answer.replace(/(?:\r\n|\r|\n)/g, "");

    while (allChars.length != 0) {
      const answer = allChars[0];
      if (allChars.match(new RegExp(answer, "g")).length === peopleCount) {
        count = count + 1;
      }
      // now remove that answer to not count twice
      allChars = allChars.replace(answer, "");
    }
  }
});

console.log(count);
