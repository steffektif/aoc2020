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
let backup = [];
let latestChangedIndex = 0;

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

const findNextInstruction = () => {
  for (let index = latestChangedIndex; index < instructions.length; index++) {
    const element = instructions[index];
    if (element.instruction === NOOP || element.instruction === JUMP) {
      latestChangedIndex = index + 1;
      return index;
    }
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
  backup = JSON.parse(JSON.stringify(instructions));
  let shouldRun = true;
  let nextIndex = 0;
  while (shouldRun) {
    if (nextIndex === instructions.length - 1) {
      shouldRun = false;
    }

    if (!instructions[nextIndex].ran) {
      nextIndex = runInstruction(instructions[nextIndex], nextIndex);
    } else {
      accumulator = 0;
      instructions = JSON.parse(JSON.stringify(backup));
      nextIndex = 0;

      if (latestChangedIndex > instructions.length - 1) {
        shouldRun = false;
        console.log("we failed");
      } else {
        const nextToChangeIndex = findNextInstruction();
        instructions[nextToChangeIndex].instruction =
          instructions[nextToChangeIndex].instruction === NOOP ? JUMP : NOOP;
      }
    }
  }
  console.log(accumulator);
});
