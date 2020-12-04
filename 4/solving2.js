const fs = require("fs");

const data = fs.readFileSync("input").toString("utf-8");

const passports = data.split(/\n\s*\n/);

const byrValidation = (value) => {
  if (value.length == 4) {
    const year = parseInt(value);
    if (year != NaN) {
      if (year >= 1920 && year <= 2002) {
        return true;
      }
    }
  }
  return false;
};

const iyrValidation = (value) => {
  if (value.length == 4) {
    const year = parseInt(value);
    if (year != NaN) {
      if (year >= 2010 && year <= 2020) {
        return true;
      }
    }
  }
  return false;
};

const eyrValidation = (value) => {
  if (value.length == 4) {
    const year = parseInt(value);
    if (year != NaN) {
      if (year >= 2020 && year <= 2030) {
        return true;
      }
    }
  }
  return false;
};

const hgtValidation = (value) => {
  const cmValue = value.split("cm")[0];
  const inValue = value.split("in")[0];

  if (cmValue) {
    if (cmValue >= 150 && cmValue <= 193) {
      return true;
    }
  }

  if (inValue) {
    if (inValue >= 59 && inValue <= 76) {
      return true;
    }
  }

  return false;
};

const hclValidation = (value) => {
  const hairColorCode = value.split("#")[1];
  if (hairColorCode && hairColorCode.length != 5) {
    const result = /[0-9A-Fa-f]{6}/g.test(hairColorCode);
    return result;
  }
  return false;
};

const eclValids = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const eclValidation = (value) => {
  if (value.trim().length === 3) {
    return eclValids.includes(value.trim());
  }
};

const pidValidation = (value) => {
  if (value.length === 9) {
    if (parseInt(value) != NaN) {
      return true;
    }
  }
  return false;
};

const mandatoryFields = [
  { field: "byr", validation: byrValidation },
  { field: "iyr", validation: iyrValidation },
  { field: "eyr", validation: eyrValidation },
  { field: "hgt", validation: hgtValidation },
  { field: "hcl", validation: hclValidation },
  { field: "ecl", validation: eclValidation },
  { field: "pid", validation: pidValidation },
  { field: "cid", validation: (value) => true },
];

const mandatoryFieldNames = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

console.log("total passports:", passports.length);

const validPassports = passports.filter((passport) => {
  const fields = passport
    .replace(/\n/g, " ")
    .split(" ")
    .map((field) => field.split(":"));

  const passportValidFields = mandatoryFields.map(({ field, validation }) => {
    const fieldResults = fields
      .map((fieldArray) => {
        const attribute = fieldArray[0];
        const value = fieldArray[1];

        if (attribute === field) {
          const valid = validation(value);

          return { fieldName: field, valid: valid };
        }
        return { fieldName: field, valid: false };
      })
      .filter((result) => result.valid === true)
      .map((fieldResultArray) => fieldResultArray);

    return fieldResults[0]?.fieldName ? fieldResults[0]?.fieldName : null;
  });

  const isPassportValid = mandatoryFieldNames.every((val) =>
    passportValidFields.includes(val)
  );

  return isPassportValid;
}).length;

console.log("valid passports:", validPassports);
