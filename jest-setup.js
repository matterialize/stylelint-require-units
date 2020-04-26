"use strict";

const stylelint = require("stylelint");

const makeConfig = (options, code) => ({
  config: {
    plugins: ["./src/stylelint-require-units.js"],
    rules: {
      "matterialize/stylelint-require-units": options,
    },
  },
  code,
  syntax: "css-in-js",
});

global.runTests = ({ options, accept, reject }) => {
  accept.forEach(({ it: itText, code }) => {
    it(itText, () => (
      stylelint
        .lint(makeConfig(options, code))
        .then(({ results }) => {
          expect(results[0].warnings[0]).toBeUndefined();
        })
    ));
  });
  reject.forEach(({ it: itText, code, text, line, column }) => {
    it(itText, () => (
      stylelint
        .lint(makeConfig(options, code))
        .then(({ results }) => {
          const error = results[0].warnings[0];
          expect(error.text).toBe(text);
          expect(error.line).toBe(line);
          expect(error.column).toBe(column);
        })
    ));
  });
};
