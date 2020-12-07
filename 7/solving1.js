const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

bagsMap = new Map();

lineReader.on("line", function (rule) {
  const container = rule.split("contain")[0];
  const contains = rule.split("contain")[1];

  const containsArr = contains.includes(",") ? contains.split(",") : [contains];
  bagsMap.set(container.trim(), containsArr);
});

lineReader.on("close", () => {
  var shinyBagContainers = new Set();

  var searchFor = ["shiny gold"];
  var previousCount = -1;

  while (previousCount != shinyBagContainers.size) {
    previousCount = shinyBagContainers.size;

    bagsMap.forEach((contents, container) => {
      contents.forEach((content) => {
        searchFor.forEach((canHaveGold) => {
          if (content.includes(canHaveGold)) {
            searchFor.push(container.split("bag")[0]);
            shinyBagContainers.add(container);
          }
        });
      });
    });
  }
  console.log(shinyBagContainers.size);
});
