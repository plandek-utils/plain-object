import type { ComposedKeySet, KeySet } from "@eturino/key-set";
import type { Dayjs, DayjsInput } from "@plandek-utils/ts-parse-dayjs";
import { isDayjs } from "@plandek-utils/ts-parse-dayjs";
// @ts-types="@types/lodash-es"
import { isArray, isFunction, isNil, isObject } from "lodash-es";

/**
 * Union of all possible values of a Plain Object field.
 *
 * That means:
 * - It can be `undefined` or `null`.
 * - It can be a boolean, number, or string.
 * - It can be a Dayjs object.
 * - It can be an array of Plain Object values.
 * - It can be a Plain Object where all values are Plain Object values.
 *
 * No other types are allowed, including functions.
 */
export type PlainObjectValue =
  | undefined
  | null
  | boolean
  | number
  | string
  | Dayjs
  | PlainObjectValue[]
  | { [prop: string]: PlainObjectValue };

/**
 * Check if the given value is either a Plain Object or a valid value of a Plain Object field.
 *
 * That means:
 * - It can be `undefined` or `null`.
 * - It can be a boolean, number, or string.
 * - It can be a Dayjs object.
 * - It can be an array of Plain Object values.
 * - It can be a Plain Object where all values are Plain Object values.
 *
 * No other types are allowed, including functions.
 */
export function isPlainObjectValue(x: unknown): x is PlainObjectValue {
  if (isFunction(x)) return false;

  return (
    isValidPrimitive(x) ||
    isValidArray(x) ||
    isValidObject(x)
  );
}

/**
 * Object where all values are Plain Object values.
 */
export type PlainObject = { [prop: string]: PlainObjectValue };

/**
 * Union of Plain Object and an array of Plain Objects.
 */
export type PlainObjectOrArray = PlainObject | PlainObject[];

/**
 * Checks if the given value is a PlainObject.
 *
 * @param o
 * @returns
 */
export function isPlainObject(
  o: PlainObjectValue,
): o is Record<string, unknown> & PlainObject {
  return !isArray(o) && !isFunction(o) && isValidObject(o);
}

export type PlainObjectValueExtended<T> =
  | undefined
  | null
  | boolean
  | number
  | string
  | T
  | Array<PlainObjectValueExtended<T>>
  | { [prop: string]: PlainObjectValueExtended<T> };

export type PlainObjectExtended<
  T = DayjsInput | ComposedKeySet<string> | KeySet<string>,
> = {
  [prop: string]: PlainObjectValueExtended<T>;
};

// internal helper functions
function isValidPrimitive(x: unknown): x is null | undefined | boolean | string | Dayjs | number {
  return (
    isNil(x) ||
    typeof x === "boolean" ||
    typeof x === "string" ||
    isDayjs(x) ||
    (typeof x === "number" && isFinite(x))
  );
}

function isValidArray(x: unknown): x is PlainObjectValue[] {
  return isArray(x) && x.every(isPlainObjectValue);
}

function isValidObject(x: unknown): x is { [prop: string]: PlainObjectValue } {
  return isObject(x) && Object.values(x).every(isPlainObjectValue);
}
