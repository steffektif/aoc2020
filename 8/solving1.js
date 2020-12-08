const fs = require("fs");
const readLine = require("readline");
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input"),
});

const ACCUMULATE = "acc";
const JUMP = "jmp";
const NOOP = "nop";

let accumulator = 0;
let instructions = [];

const runInstruction = (instruction, currentIndex) => {
  switch (instruction.instruction) {
    case ACCUMULATE:
      accumulator = accumulator + instruction.steps;
      instructions.ran = true;
      return currentIndex + 1;
    case JUMP:
      instruction.ran = true;

      return currentIndex + instruction.steps;
    case NOOP:
      instruction.ran = true;
      return currentIndex + 1;
  }
};

lineReader.on("line", function (instruction) {
  instructions.push({
    instruction: instruction.split(" ")[0],
    steps: parseInt(instruction.split(" ")[1]),
    ran: false,
  });
});

lineReader.on("close", () => {
  let shouldRun = true;
  let nextIndex = 0;
  while (shouldRun) {
    if (!instructions[nextIndex].ran) {
      nextIndex = runInstruction(instructions[nextIndex], nextIndex);
      console.log("nextIndex", nextIndex);
    } else {
      shouldRun = false;
    }
  }
  console.log(accumulator);
});
