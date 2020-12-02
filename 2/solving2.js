const fs = require("fs");
const readLine = require("readline");

var validPassword = 0;

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

lineReader.on("line", function (line) {
  const partsArray = line.split(" ");
  const position1 = partsArray[0].split("-")[0];
  const position2 = partsArray[0].split("-")[1];
  const letter = partsArray[1].substr(0, 1);
  const password = partsArray[2];

  const expected1 = password[position1 - 1];
  const expected2 = password[position2 - 1];

  if (
    (expected1 == letter && expected2 != letter) ||
    (expected1 != letter && expected2 == letter)
  ) {
    validPassword = validPassword + 1;
  }
  console.log(validPassword);
});
