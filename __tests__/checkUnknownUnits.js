"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("checkUnknownUnits", () =>
  runTests({
    options: [
      true,
      {
        checkUnknownUnits: true,
      },
    ],
    accept: [
      {
        it: "Should pass for correct units",
        code: `
        styled.css\`
          font-size: 12px;
          margin: 1vh 2vw;
          word-space: 1em;
        \`;
      `,
      },
      {
        it: "Should pass for variables with correct units",
        code: `
        const width = 50;
        styled.css\`
          width: \${width}px;
        \`;
      `,
      },
    ],
    reject: [
      {
        it: "Should fail for incorrect units",
        code: `
        styled.css\`
          height: 10pix;
        \`;
      `,
        text: messages.unknownUnits('pix'),
        line: 3,
        column: 19,
      },
      {
        it: "Should fail for variables with incorrect units",
        code: `
        const height = 50;
        styled.css\`
          height: \${height}wem;
        \`;
      `,
        text: messages.unknownUnits('wem'),
        line: 4,
        column: 19,
      },
    ],
  }));
