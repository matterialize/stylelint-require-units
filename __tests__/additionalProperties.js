"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("additionalProperties", () =>
  runTests({
    options: [
      true,
      {
        additionalProperties: ["customProperty"],
      },
    ],
    accept: [],
    reject: [
      {
        it: "Should check for additional properties",
        code: `
          styled.css\`
            customProperty: 10;
          \`;
        `,
        text: messages.expectedUnit,
        line: 3,
        column: 29,
      },
      {
        it: "Should still check for default properties",
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
