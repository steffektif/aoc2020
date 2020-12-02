const fs = require("fs");
const readLine = require("readline");

var invalidPasswords = 0;
var passwords = 0;

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

lineReader.on("line", function (line) {
  const partsArray = line.split(" ");
  const min = partsArray[0].split("-")[0];
  const max = partsArray[0].split("-")[1];
  const letter = partsArray[1].substr(0, 1);
  const password = partsArray[2];

  const count = (password.match(new RegExp(letter, "g")) || []).length;

  if (count < min || count > max) {
    invalidPasswords = invalidPasswords + 1;
  }
  passwords = passwords + 1;

  console.log("valid ones", passwords - invalidPasswords);
});
