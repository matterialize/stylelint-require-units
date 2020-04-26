"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("checkedFunctions", () =>
  runTests({
    options: [
      true,
      {
        checkedFunctions: ["myCustomFunction"],
      },
    ],
    accept: [
      {
        it: "Should not check for non checked functions",
        code: `
          styled.css\`
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16); 
          \`;
        `,
      },
    ],
    reject: [
      {
        it: "Should check for non checked functions",
        code: `
          styled.css\`
            height: myCustomFunction(20);
          \`;
        `,
        text: messages.expectedUnit,
        line: 3,
        column: 38,
      },
    ],
  }));
