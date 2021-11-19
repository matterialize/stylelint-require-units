"use strict";

const { createPlugin, utils } = require("stylelint");
const { difference, isArray, every, isBoolean, isString } = require("lodash");
const valueParser = require("postcss-value-parser");
const ruleName = "matterialize/stylelint-require-units";

const messages = utils.ruleMessages(ruleName, {
  expectedUnit: "Expected unit for number",
  unknownUnits: unit => 'Unexpected unknown unit "' + unit + '"',
});

let checkedProperties = [
  "border",
  "border-bottom",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-width",
  "border-image-outset",
  "border-image-width",
  "border-left",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-width",
  "border-spacing",
  "border-top",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-width",
  "border-width",
  "bottom",
  "box-shadow",
  "column-rule-width",
  "column-width",
  "columns",
  "font-size",
  "grid-auto-columns",
  "grid-auto-rows",
  "grid-column-gap",
  "grid-gap",
  "grid-row-gap",
  "grid-template",
  "height",
  "left",
  "letter-spacing",
  "line-height",
  "margin",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "object-position",
  "outline",
  "outline-offset",
  "outline-width",
  "padding",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "perspective",
  "perspective-origin",
  "right",
  "text-indent",
  "text-shadow",
  "top",
  "transform",
  "transform-origin",
  "width",
  "word-spacing",
];

const checkedUnits = [
  "cm",
  "mm",
  "in",
  "px",
  "pt",
  "pc",
  "em",
  "ex",
  "ch",
  "rem",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "%",
];

// Group 1 & 2 = number
// Group 1 = $dummyValue
// Group 4 = units
const unitsRegex = /(?<!#)(([0-9]+([,.][0-9]+)?)|\$dummyValue|\$\{[^}]+\})(.+)?/g;

const isStringArray = value => isArray(value) && every(value, isString);

module.exports = createPlugin(ruleName, (enabled, options) => {
  return (postcssRoot, postcssResult) => {
    if (!options) {
      options = {};
    }

    const {
      checkUnknownUnits,
      forceZeroToRequireUnits,
      whitelistedProperties,
      blacklistedProperties,
      checkedFunctions,
      additionalProperties,
    } = options;

    let validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": First option should be a boolean whether to enable to plugin',
      {
        actual: enabled,
        possible: isBoolean,
      }
    );

    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "checkUnknownUnits" should be a boolean whether to throw an error for unknown units',
      {
        actual: checkUnknownUnits,
        possible: isBoolean,
        optional: true,
      }
    );

    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "forceZeroToRequireUnits" should be a boolean whether to force properties that have 0 to have a unit',
      {
        actual: forceZeroToRequireUnits,
        possible: isBoolean,
        optional: true,
      }
    );

    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "whitelistedProperties" should be an array of string properties that are the only ones checked',
      {
        actual: whitelistedProperties,
        possible: isStringArray,
        optional: true,
      }
    );

    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "blacklistedProperties" should be an array of string properties that are not checked',
      {
        actual: blacklistedProperties,
        possible: isStringArray, 
        optional: true,
      }
    );

    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "checkedFunctions" should be an array of strings (function names) that are checked',
      {
        actual: checkedFunctions,
        possible: isStringArray,
        optional: true,
      }
    );
    validOptions = utils.validateOptions(
      postcssResult,
      '"' +
        ruleName +
        '": Second option\'s "additionalProperties" should be an array of strings that are additional properties to check',
      {
        actual: additionalProperties,
        possible: isStringArray,
        optional: true,
      }
    );

    if (!validOptions || !enabled) {
      return;
    }

    if (whitelistedProperties && blacklistedProperties) {
      throw new Error(
        'Only either whitelistedProperties or blackedlistedProperties can be used for rule "' +
          ruleName +
          '"'
      );
    }

    if (whitelistedProperties) {
      checkedProperties = whitelistedProperties;
    }

    if (blacklistedProperties) {
      checkedProperties = difference(
        checkedProperties,
        blacklistedProperties
      );
    }

    if (additionalProperties) {
      checkedProperties = checkedProperties.concat(additionalProperties);
    }

    postcssRoot.walkDecls(decl => {
      if (checkedProperties.includes(decl.prop)) {
        const line = decl.source.start.line;
        const parsed = valueParser(decl.value);
        parsed.walk(({ index, type, value }) => {
          // Functions are ignored by default
          if (
            !(
              type === "word" ||
              (checkedFunctions &&
                type === "function" &&
                checkedFunctions.includes(value))
            )
          ) {
            return false;
          }
          const baseReport = {
            ruleName,
            result: postcssResult,
            node: decl,
            index,
            word: value,
            line,
          };
          let match;
          while ((match = unitsRegex.exec(value))) {
            const number = match[1];
            const isAZero = parseInt(number) === 0;
            const units = match[4];
            const isEmptyUnit = units ? units.trim().length === 0 : true;
            const isValidUnit = !checkUnknownUnits || checkedUnits.includes(units);
            // Check for unknown units that unit-no-unknown doesn't catch
            if (!isEmptyUnit && !isValidUnit) {
              utils.report({
                ...baseReport,
                message: messages.unknownUnits(units),
              });
            }
            // Zero is allow to not have units by default
            if ((forceZeroToRequireUnits || !isAZero) && isEmptyUnit) {
              utils.report({
                ...baseReport,
                message: messages.expectedUnit,
              });
            }
          }
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
