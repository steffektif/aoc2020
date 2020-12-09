const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

var numbers = [];
var stepSize = 25;

const findInPreamble = (preamble, target) => {
  for (let x = 0; x < preamble.length; x++) {
    for (let y = 0; y < preamble.length; y++) {
      if (x != y) {
        if (preamble[x] + preamble[y] == target) {
          return true;
        }
      }
    }
  }
  return false;
};

lineReader.on("line", function (line) {
  numbers.push(parseFloat(line));
});

lineReader.on("close", () => {
  var noFit = null;
  var preamble = [];
  var currentIndex = 0;

  while (noFit === null) {
    preamble = numbers.slice(currentIndex, currentIndex + stepSize);
    const target = numbers[currentIndex + stepSize];
    if (!findInPreamble(preamble, target)) {
      noFit = target;
    }
    currentIndex = currentIndex + 1;
  }
  console.log(noFit);
});
