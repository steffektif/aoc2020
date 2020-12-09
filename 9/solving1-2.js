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
      if (x !== y) {
        if (preamble[x] + preamble[y] == target) {
          return true;
        }
      }
    }
  }
  return false;
};

const findContiguousBounds = (target) => {
  for (let x = 0; x < numbers.length; x++) {
    var sum = numbers[x];
    for (let y = 1; y < numbers.length; y++) {
      if (x < y) {
        // console.log("sum", sum, "toAdd", numbers[y]);
        sum = sum + numbers[y];
        if (sum == target) {
          return y > x ? { start: x, end: y + 1 } : { start: y, end: x };
        }
      }
    }
  }
  return null;
};

lineReader.on("line", function (line) {
  numbers.push(parseFloat(line));
});

lineReader.on("close", () => {
  var invalidNumber = null;
  var preamble = [];
  var currentIndex = 0;

  while (invalidNumber === null) {
    preamble = numbers.slice(currentIndex, currentIndex + stepSize);
    const target = numbers[currentIndex + stepSize];
    if (!findInPreamble(preamble, target)) {
      invalidNumber = target;
    }
    currentIndex = currentIndex + 1;
  }
  console.log("invalid number: ", invalidNumber);

  const bounds = findContiguousBounds(invalidNumber);

  const contiguousRange = numbers.slice(bounds.start, bounds.end);

  const encryptionWeakness =
    Math.max.apply(null, contiguousRange) +
    Math.min.apply(null, contiguousRange);

  console.log("encryption weakness", encryptionWeakness);
});
