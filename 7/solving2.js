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
  bagsMap.set(container.split("bags")[0].trim(), {
    contents: containsArr
      .map((element) => {
        return element.replace(".", "").substring(2).split("bag")[0].trim();
      })
      .filter((element) => element !== "o other"),
    amounts: containsArr
      .map((element) => parseInt(element.substring(0, 2)))
      .filter((element) => element !== NaN),
  });
});

const findAll = (color) => {
  if (!bagsMap.get(color)) return 0;

  const contents = bagsMap.get(color).contents;
  const amounts = bagsMap.get(color).amounts;

  return contents.reduce((sum, content, index) => sum + amounts[index] * findAll(content), 1)
};

lineReader.on("close", () => {
  console.log(findAll("shiny gold") - 1); //remove the golden one again
});
