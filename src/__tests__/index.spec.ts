import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { describe, expect, it } from "vitest";

import {
  isPlainObject,
  isPlainObjectValue,
  isPlainObjectValueAnArrayOfObjects,
  isPlainObjectValueAnObject,
  isValidArray,
  isValidPrimitive,
  plainObjectSchema,
} from "../index.ts";

describe("isPlainObjectValue", () => {
  it("should return true for nil values", () => {
    expect(isPlainObjectValue(null)).toBe(true);
    expect(isPlainObjectValue(undefined)).toBe(true);
  });

  it("should return true for boolean values", () => {
    expect(isPlainObjectValue(true)).toBe(true);
    expect(isPlainObjectValue(false)).toBe(true);
  });

  it("should return true for number values", () => {
    expect(isPlainObjectValue(42)).toBe(true);
  });

  it("should return true for string values", () => {
    expect(isPlainObjectValue("hello")).toBe(true);
    expect(isPlainObjectValue("42")).toBe(true);
  });

  it("should return true for Dayjs objects", () => {
    const dayjsObj = parseDayjsOrError("2023-01-01");
    expect(isPlainObjectValue(dayjsObj)).toBe(true);
  });

  it("should return false for non-primitive values", () => {
    expect(isPlainObjectValue(() => "whatever")).toBe(false);
  });

  it("should return false for Infinity, -Infinity and NaN", () => {
    expect(isPlainObjectValue(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isPlainObjectValue(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(isPlainObjectValue(Number.NaN)).toBe(false);
  });

  it("should return false for symbol", () => {
    expect(isPlainObjectValue(Symbol("foo"))).toBe(false);
  });

  it("should recursively check arrays", () => {
    const arrayWithPrimitives = [42, "hello", true];
    expect(arrayWithPrimitives.every(isPlainObjectValue)).toBe(true);
    expect(isPlainObjectValue(arrayWithPrimitives)).toBe(true);
  });

  it("should recursively check arrays fail nested", () => {
    const arrayWithPrimitives = [42, "hello", true, () => "whatever"];
    expect(isPlainObjectValue(arrayWithPrimitives)).toBe(false);
  });

  it("should recursively check nested objects", () => {
    const nestedObj = { a: 42, b: "hello", c: { d: true } };
    expect(Object.values(nestedObj).every(isPlainObjectValue)).toBe(true);
    expect(isPlainObjectValue(nestedObj)).toBe(true);
    expect(isPlainObjectValue({ a: 42, b: "hello", c: { d: () => "oh no" } })).toBe(false);
  });
});

describe("isPlainObject", () => {
  it("should return true for plain objects", () => {
    const obj = { a: 42, b: "hello", c: true };
    expect(isPlainObject(obj)).toBe(true);
  });

  it("should return true for empty plain objects", () => {
    expect(isPlainObject({})).toBe(true);
  });

  it("should return false for arrays", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it("should return false for null and undefined", () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });
});

describe("isValidPrimitive", () => {
  it("should return true for valid primitives", () => {
    expect(isValidPrimitive(null)).toBe(true);
    expect(isValidPrimitive(undefined)).toBe(true);
    expect(isValidPrimitive(true)).toBe(true);
    expect(isValidPrimitive(false)).toBe(true);
    expect(isValidPrimitive(42)).toBe(true);
    expect(isValidPrimitive("hello")).toBe(true);
    expect(isValidPrimitive(parseDayjsOrError("2023-01-01"))).toBe(true);
  });

  it("should return false for invalid primitives", () => {
    expect(isValidPrimitive(() => "whatever")).toBe(false);
    expect(isValidPrimitive(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isValidPrimitive(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(isValidPrimitive(Number.NaN)).toBe(false);
    expect(isValidPrimitive(Symbol("foo"))).toBe(false);
  });
});

describe("isValidArray", () => {
  it("should return true for an array of PlainObjectValues", () => {
    const arrayWithPrimitives = [42, "hello", true];
    expect(isValidArray(arrayWithPrimitives)).toBe(true);
  });

  it("should return false for an array with non-PlainObjectValues", () => {
    const arrayWithPrimitives = [42, "hello", true, () => "whatever"];
    expect(isValidArray(arrayWithPrimitives)).toBe(false);
  });
});

describe("isPlainObjectValueAnObject", () => {
  it("should return true for plain objects", () => {
    const obj = { a: 42, b: "hello", c: true };
    expect(isPlainObjectValueAnObject(obj)).toBe(true);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject(obj)).toBe(isPlainObject(obj));
  });

  it("should return true for empty plain objects", () => {
    expect(isPlainObjectValueAnObject({})).toBe(true);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject({})).toBe(isPlainObject({}));
  });

  it("should return true for nested objects", () => {
    const nestedObj = { a: { b: { c: 42 } }, d: "hello" };
    expect(isPlainObjectValueAnObject(nestedObj)).toBe(true);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject(nestedObj)).toBe(isPlainObject(nestedObj));
  });

  it("should return false for arrays", () => {
    expect(isPlainObjectValueAnObject([])).toBe(false);
    expect(isPlainObjectValueAnObject([1, 2, 3])).toBe(false);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject([])).toBe(isPlainObject([]));
    expect(isPlainObjectValueAnObject([1, 2, 3])).toBe(isPlainObject([1, 2, 3]));
  });

  it("should return false for null and undefined", () => {
    expect(isPlainObjectValueAnObject(null)).toBe(false);
    expect(isPlainObjectValueAnObject(undefined)).toBe(false);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject(null)).toBe(isPlainObject(null));
    expect(isPlainObjectValueAnObject(undefined)).toBe(isPlainObject(undefined));
  });

  it("should return false for Dayjs objects", () => {
    const dayjsObj = parseDayjsOrError("2023-01-01");
    expect(isPlainObjectValueAnObject(dayjsObj)).toBe(false);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject(dayjsObj)).toBe(isPlainObject(dayjsObj));
  });

  it("should return false for Date objects", () => {
    const dateObj = new Date();
    expect(isPlainObjectValueAnObject(dateObj)).toBe(false);
    // Verify alignment with isPlainObject
    expect(isPlainObjectValueAnObject(dateObj)).toBe(isPlainObject(dateObj));
  });
});

describe("Performance comparison", () => {
  it("should compare performance between isPlainObject and isPlainObjectValueAnObject", () => {
    const complexObject = {
      level1: {
        a: 1,
        b: "string",
        c: true,
        level2: {
          d: null,
          e: undefined,
          f: [1, 2, 3],
          level3: {
            g: parseDayjsOrError("2023-01-01"),
            h: new Date(),
            i: { nested: "value" },
          },
        },
      },
    };

    // Warm up
    isPlainObject(complexObject);
    isPlainObjectValueAnObject(complexObject);

    console.time("isPlainObject");
    for (let i = 0; i < 1000; i++) {
      isPlainObject(complexObject);
    }
    console.timeEnd("isPlainObject");

    console.time("isPlainObjectValueAnObject");
    for (let i = 0; i < 1000; i++) {
      isPlainObjectValueAnObject(complexObject);
    }
    console.timeEnd("isPlainObjectValueAnObject");

    // Verify both functions return the same result
    expect(isPlainObjectValueAnObject(complexObject)).toBe(isPlainObject(complexObject));
  });
});

describe("isPlainObjectValueAnArrayOfObjects", () => {
  it("should return true for array of plain objects", () => {
    const arr = [
      { a: 1, b: "hello" },
      { c: true, d: null },
    ];
    expect(isPlainObjectValueAnArrayOfObjects(arr)).toBe(true);
  });

  it("should return true for empty array", () => {
    expect(isPlainObjectValueAnArrayOfObjects([])).toBe(true);
  });

  it("should return true for array of nested objects", () => {
    const arr = [{ a: { b: { c: 42 } } }, { d: { e: { f: "hello" } } }];
    expect(isPlainObjectValueAnArrayOfObjects(arr)).toBe(true);
  });

  it("should return false for array with non-object elements", () => {
    expect(isPlainObjectValueAnArrayOfObjects([1, 2, 3])).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects(["a", "b", "c"])).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects([{ a: 1 }, "string"])).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects([{ a: 1 }, 42])).toBe(false);
  });

  it("should return false for array with Dayjs objects", () => {
    const dayjsObj = parseDayjsOrError("2023-01-01");
    expect(isPlainObjectValueAnArrayOfObjects([dayjsObj])).toBe(false);
  });

  it("should return false for array with Date objects", () => {
    expect(isPlainObjectValueAnArrayOfObjects([new Date()])).toBe(false);
  });

  it("should return false for non-array values", () => {
    expect(isPlainObjectValueAnArrayOfObjects({ a: 1 })).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects(null)).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects(undefined)).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects("string")).toBe(false);
    expect(isPlainObjectValueAnArrayOfObjects(42)).toBe(false);
  });
});

describe("Performance comparison for array checks", () => {
  it("should compare performance between schema validation and isPlainObjectValueAnArrayOfObjects", () => {
    const complexArray = [
      {
        level1: {
          a: 1,
          b: "string",
          level2: {
            c: null,
            d: [1, 2, 3],
            level3: {
              e: parseDayjsOrError("2023-01-01"),
              f: { nested: "value" },
            },
          },
        },
      },
      {
        level1: {
          x: true,
          y: "test",
          level2: {
            z: undefined,
            w: [4, 5, 6],
            level3: {
              v: new Date(),
              u: { nested: "another" },
            },
          },
        },
      },
    ];

    // Warm up
    plainObjectSchema.array().safeParse(complexArray);
    isPlainObjectValueAnArrayOfObjects(complexArray);

    console.time("schema validation for array");
    for (let i = 0; i < 1000; i++) {
      plainObjectSchema.array().safeParse(complexArray);
    }
    console.timeEnd("schema validation for array");

    console.time("isPlainObjectValueAnArrayOfObjects");
    for (let i = 0; i < 1000; i++) {
      isPlainObjectValueAnArrayOfObjects(complexArray);
    }
    console.timeEnd("isPlainObjectValueAnArrayOfObjects");

    // Verify both approaches return the same result
    expect(isPlainObjectValueAnArrayOfObjects(complexArray)).toBe(
      plainObjectSchema.array().safeParse(complexArray).success,
    );
  });
});
