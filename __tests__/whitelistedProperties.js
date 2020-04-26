"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("whitelistedProperties", () =>
  runTests({
    options: [
      true,
      {
        whitelistedProperties: ["height"],
      },
    ],
    accept: [
      {
        it: "Should check for properties not in whitelist",
        code: `
          styled.css\`
            padding: 10 20;
          \`;
        `,
      },
    ],
    reject: [
      {
        it: "Should not check for whitelisted properties",
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
