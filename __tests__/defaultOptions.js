"use strict";

const { messages } = require("../src/stylelint-require-units");

describe("defaultOptions", () =>
  runTests({
    options: true,
    accept: [
      {
        it: "Should pass for correct units",
        code: `
        styled.css\`
          height: 0;
          width: 700px;
          border-width: 1em;
        \`;
      `,
      },
      {
        it: "Should pass for variables with correct units",
        code: `
        const height = 50;
        styled.css\`
          height: \${height}px;
        \`;
      `,
      },
      {
        it: "Should skip functions",
        code: `
        styled.css\`
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16); 
        \`;
      `,
      },
    ],
    reject: [
      {
        it: "Should fail for no units",
        code: `
        styled.css\`
          height: 10;
        \`;
      `,
        text: messages.expectedUnit,
        line: 3,
        column: 19,
      },
      {
        it: "Should fail for variables with no units",
        code: `
        const height = 50;
        styled.css\`
          height: \${height};
        \`;
      `,
        text: messages.expectedUnit,
        line: 4,
        column: 19,
      },
    ],
  }));
