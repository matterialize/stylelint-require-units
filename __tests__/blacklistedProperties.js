"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("blacklistedProperties", () =>
  runTests({
    options: [
      true,
      {
        blacklistedProperties: ["width"],
      },
    ],
    accept: [
      {
        it: "Should not check for properties in blacklist",
        code: `
          styled.css\`
            width: 10;
          \`;
        `,
      },
    ],
    reject: [
      {
        it: "Should check for non blacklisted properties",
        code: `
          styled.css\`
            height: 10;
          \`;
        `,
        text: messages.expectedUnit,
        line: 3,
        column: 21,
      },
    ],
  }));
