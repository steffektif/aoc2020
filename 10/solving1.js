const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

let adapters = [];

lineReader.on("line", function (adapter) {
  adapters.push(adapter);
});

lineReader.on("close", () => {
  let ascendingAdapters = adapters
    .sort(function (a, b) {
      return a - b;
    })
    .map((adapter) => parseInt(adapter));

  let deviceJolts = ascendingAdapters[ascendingAdapters.length - 1] + 3;

  let differenceOne = 0;
  let differenceThree = 0;

  let jolts = 0;

  for (let index = 0; index < ascendingAdapters.length; index++) {
    let diff = ascendingAdapters[index] - jolts;

    if (diff === 3) {
      differenceThree = differenceThree + 1;
    }
    if (diff === 1) {
      differenceOne = differenceOne + 1;
    }
    jolts = ascendingAdapters[index];
  }
  console.log(differenceOne * (differenceThree + 1));
});
