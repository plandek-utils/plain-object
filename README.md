# @plandek/plain-object

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
