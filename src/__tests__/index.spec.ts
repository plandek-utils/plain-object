import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { describe, expect, it } from "vitest";

import { isPlainObject, isPlainObjectValue } from "../index.ts";

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
