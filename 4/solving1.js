const fs = require("fs");

const data = fs.readFileSync("input").toString("utf-8");

const passports = data.split(/\n\s*\n/);

const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

console.log("total passports", passports.length);

const validPassports = passports.filter((passport) => {
  const fieldsPresent = passport
    .replace(/\n/g, " ")
    .split(" ")
    .map((field) => field.split(":")[0]);
  console.log(mandatoryFields);

  return (
    mandatoryFields.filter((field) => !fieldsPresent.includes(field)).length ===
    0
  );
}).length;

console.log(validPassports);
// passports.forEach((passport) => console.log(passport, "\n"));
