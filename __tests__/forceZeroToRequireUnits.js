"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("forceZeroToRequireUnits", () =>
  runTests({
    options: [
      true,
      {
        forceZeroToRequireUnits: true,
      },
    ],
    accept: [
      {
        it: "Should pass for 0 with units",
        code: `
        styled.css\`
          top: 0px;
          right: 0em;
          bottom: 0%;
          left: 0pt;
        \`;
      `,
      },
    ],
    reject: [
      {
        it: "Should fail for 0 with no units",
        code: `
        styled.css\`
          padding: 0;
        \`;
      `,
        text: messages.expectedUnit,
        line: 3,
        column: 20,
      },
    ],
  }));
