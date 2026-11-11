import { dayjsNow } from "@plandek-utils/ts-parse-dayjs";
import { describe, expect, it } from "vitest";
import { type PlainObject, type PlainObjectValue, plainObjectSchema } from "..";

type DeepEqual<T, U> = (T extends U ? (U extends T ? true : never) : never) &
  (keyof T extends keyof U ? (keyof U extends keyof T ? true : never) : never);

// Compile-time pin: the public type must not change shape across the zod 3 → zod 4 migration.
const _plainObjectIsARecord: DeepEqual<PlainObject, Record<string, PlainObjectValue>> = true;

// Pins behaviour that must not change across the zod 3 → zod 4 migration (PLAN-17573).
describe("zod 4 migration pins", () => {
  it("plainObjectSchema accepts a mixed, nested plain object (any string key)", () => {
    const value = {
      a: 1,
      b: "x",
      c: null,
      d: undefined,
      e: true,
      f: new Date(0),
      g: [1, [2]],
      h: { i: { j: "k" } },
      when: dayjsNow(),
    };
    expect(plainObjectSchema.safeParse(value).success).toBe(true);
  });

  it("plainObjectSchema rejects Infinity, NaN and functions as values", () => {
    expect(plainObjectSchema.safeParse({ a: Number.POSITIVE_INFINITY }).success).toBe(false);
    expect(plainObjectSchema.safeParse({ a: Number.NaN }).success).toBe(false);
    expect(plainObjectSchema.safeParse({ a: () => 1 }).success).toBe(false);
  });

  it("plainObjectSchema rejects a top-level array", () => {
    expect(plainObjectSchema.safeParse([1]).success).toBe(false);
  });
});
