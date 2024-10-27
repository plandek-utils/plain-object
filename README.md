# @plandek-utils/plain-object

[![JSR Scope](https://jsr.io/badges/@plandek-utils)](https://jsr.io/@plandek-utils)
[![JSR](https://jsr.io/badges/@plandek-utils/plain-object)](https://jsr.io/@plandek-utils/plain-object)
[![JSR Score](https://jsr.io/badges/@plandek-utils/plain-object/score)](https://jsr.io/@plandek-utils/plain-object)
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
- Array of PlainObjectValue
- PlainObject

## Development

This package is developed with deno 2. The production code is in `src/mod.ts` and its test in
`src/__tests__/mod.spec.ts`

- `deno fmt`: format files
- `deno lint`: lint files
- `deno dev`: run tests on each change in mod.ts
- `deno run test && deno run lcov && deno run html`: run the tests with coverage, then convert to lcov and prepare in
  `html_cov` an HTML export of the coverage info.
