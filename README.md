# @plandek-utils/plain-object

[![npm version](https://badge.fury.io/js/%40plandek-utils%2Fplain-object.svg)](https://badge.fury.io/js/%40plandek-utils%2Fplain-object)
![CI](https://github.com/github/plandek-utils/plain-object/workflows/ci-master.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/8cbd695e92a5bd147519/maintainability)](https://codeclimate.com/github/plandek-utils/plain-object/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8cbd695e92a5bd147519/test_coverage)](https://codeclimate.com/github/plandek-utils/plain-object/test_coverage)

TypeScript types and predicate utils `isPlainObject` and `isPlainObjectValue`.

A PlainObject is a POJO where all values are PlainObjectValue.

A PlainObjectValue is one of:

- `null` or `undefined`
- Finite number (no NaN or Infinite)
- String
- Boolean
- Dayjs
- Array of PlainObjectValue (or readonly array of PlainObjectValue)
- PlainObject

## Usage

```ts
import { isPlainObject, isPlainObjectValue } from "@plandek-utils/plain-object";

isPlainObjectValue(null); // => true
isPlainObjectValue(undefined); // => true
isPlainObjectValue(1); // => true
isPlainObjectValue(Infinite); // => false
isPlainObjectValue(NaN); // => false
isPlainObjectValue("something"); // => true
isPlainObjectValue(true); // => true
isPlainObjectValue(false); // => true
isPlainObjectValue([]); // => true
isPlainObjectValue([1, 2]); // => true
isPlainObjectValue([1, "something", 2]); // => true
isPlainObjectValue([1, "something", [2, 3]]); // => true
isPlainObjectValue(() => "oh no"); // => false
isPlainObjectValue({ a: 1, b: "stuff", c: [1], d: {}, e: { e1: true } }); // => true
isPlainObjectValue({ a: 1, b: "stuff", c: [1], d: {}, e: { e1: () => "oh no" } }); // => false

isPlainObject(null); // => false
isPlainObject(undefined); // => false
isPlainObject(1); // => false
isPlainObject(Infinite); // => false
isPlainObject(NaN); // => false
isPlainObject("something"); // => false
isPlainObject(true); // => false
isPlainObject(false); // => false
isPlainObject([]); // => false
isPlainObject([1, 2]); // => false
isPlainObject([1, "something", 2]); // => false
isPlainObject([1, "something", [2, 3]]); // => false
isPlainObject(() => "oh no"); // => false
isPlainObject({ a: 1, b: "stuff", c: [1], d: {}, e: { e1: true } }); // => true
isPlainObject({ a: 1, b: "stuff", c: [1], d: {}, e: { e1: () => "oh no" } }); // => false
```

## Development

TypeScript types and predicate `isPlainObject` and `isPlainObjectValue`. PlainObject = POJO where all values are
PlainObjectValue. PlainObjectValue = serializable value (Dayjs, nil, number, string, boolean, PlainObjectValue[],
PlainObject)
