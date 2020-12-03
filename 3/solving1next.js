const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

var landscape = [];
var lineCount = 0;
var xStep = 1;
var yStep = 2;

lineReader.on("line", function (line) {
  const row = [...line];
  row.forEach((char, index) => {
    landscape.push([index, lineCount, char]);
  });
  lineCount = lineCount + 1;
});

lineReader.on("close", () => {
  //find biggest x
  var maxX = 0;
  var y = 0;

  while (y <= lineCount) {
    maxX = maxX + xStep;
    y = y + yStep;
  }

  // extend landscape until biggest x
  landscape.forEach((tile) => {
    var x = tile[0];
    while (x <= maxX) {
      x = x + 31;
      landscape.push([x, tile[1], tile[2]]);
    }
  });

  var x = 0;
  var y = 0;
  var count = 0;

  while (y < lineCount) {
    x = x + xStep;
    y = y + yStep;
    const field = landscape.find((tile) => tile[0] === x && tile[1] === y);
    if (field && field[2] === "#") {
      count = count + 1;
    }
  }
  console.log(count);
});
