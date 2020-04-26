# stylelint-require-unit

A customizable [stylelint](https://github.com/stylelint/stylelint) rule to require units for certain css properties.

By default the properties that are checked for units are:

[border](https://developer.mozilla.org/en-US/docs/Web/CSS/border),
[border-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom),
[border-bottom-left-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius),
[border-bottom-right-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius),
[border-bottom-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width),
[border-image-outset](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset),
[border-image-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width),
[border-left](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left),
[border-left-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width),
[border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius),
[border-right](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right),
[border-right-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width),
[border-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing),
[border-top](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top),
[border-top-left-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius),
[border-top-right-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius),
[border-top-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width),
[border-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width),
[bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom),
[box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow),
[column-rule-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width),
[column-width](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width),
[columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns),
[font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size),
[grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns),
[grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows),
[grid-column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap),
[grid-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap),
[grid-row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap),
[grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template),
[height](https://developer.mozilla.org/en-US/docs/Web/CSS/height),
[left](https://developer.mozilla.org/en-US/docs/Web/CSS/left),
[letter-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing),
[line-height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height),
[margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin),
[margin-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom),
[margin-left](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left),
[margin-right](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right),
[margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top),
[max-height](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height),
[max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width),
[min-height](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height),
[min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width),
[object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position),
[outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline),
[outline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset),
[outline-width](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width),
[padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding),
[padding-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom),
[padding-left](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left),
[padding-right](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right),
[padding-top](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top),
[perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective),
[perspective-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin),
[right](https://developer.mozilla.org/en-US/docs/Web/CSS/right),
[text-indent](https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent),
[text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow),
[top](https://developer.mozilla.org/en-US/docs/Web/CSS/top),
[transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform),
[transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin),
[width](https://developer.mozilla.org/en-US/docs/Web/CSS/width),
[word-spacing](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing)

It will only check when numbers, or in the case of [styled components](https://github.com/styled-components/styled-components), variables are used.

Functions are skipped by default, but there is an option to specify functions that are desired to be checked.

## Installation

1. Install `stylelint` (if you have not done so yet):

```shell
yarn add stylelint --dev
```

or

```shell
npm install stylelint --save-dev
```

2. Install `stylelint-require-units`:

```shell
yarn add stylelint-require-units -dev
```

or

```shell
npm install stylelint-require-units -save-dev
```

2. Create the `.stylelintrc` config file (if you have not done so yet), add `matterialize/stylelint-require-units` to the plugins array with the desired options as shown below.

### Default activation
**NOTE:** `true` is required to activate the plugin
```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": true
}
```

### Custom options
All of the options below need to be keys in the second element object of the array with the first element of the array being `true`.

#### Option: Check unknown units
By default the type of units are not checked by this plugin, just that the units exist. This option is added because [styled components](https://github.com/styled-components/styled-components) units are not linted when variables are used before a unit. This is an extra check to ensure variables are followed by units.
```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "checkUnknownUnits": true
  }]
}
```

#### Option: Force 0 to require units
By default 0 is not required to have units. If you have a stylist preference to include units for 0 this flag can be set to throw an error if 0 does not have units.
```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "forceZeroToRequireUnits": true
  }]
}
```

#### Option: Whitelisted properties
If you only want to check certain properties then you can use `whitelistedProperties` and only those properties listed in the array will be checked.

**NOTE:** This can not be used with `blackListedProperties`. It is either or.

```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "whitelistedProperties": ["width", "border"],
  }]
}
```

#### Option: Blacklisted properties
If you only want to check all default properties, but want to remove one or more properties from the default list, then you can use `blacklistedProperties` and only those properties listed in the default array will not be checked.
```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "blacklistedProperties": ["width", "border"],
  }]
}
```

**NOTE:** This can not be used with `whiteListedProperties`. It is either or.

#### Option: Checked functions
If you want to check specific functions and you pass the function name(s) in the `checkedFunctions` array.
```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "checkedFunctions": ["myCustomFunction1", "myCustomFunction2"],
  }]
}
```

#### Option: Additional Properties
New properties are added periodically and in order to future proof or provide extended properties that are not here, add these properties to `additionalProperties`.

**NOTE:** These properties are additional to `whitelistedProperties` or `blacklistedProperties`.

```json
{
  "plugins": ["stylelint-require-units"],
  "matterialize/stylelint-require-units": [true, {
    "additionalProperties": ["newProperty1", "newProperty2"],
  }]
}
```
