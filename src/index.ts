import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { isDayjs, parseDayjs } from "@plandek-utils/ts-parse-dayjs";
import { z } from "zod";

// see https://github.com/colinhacks/zod/discussions/1259#discussioncomment-3954250
export const dayjsSchemaStrict = z.instanceof(dayjs as unknown as typeof Dayjs);

export const serializedDateSchema = z.string().refine(
  (x) => {
    const d = parseDayjs(x);
    return !!d;
  },
  { message: "String must be a serialized date that can be parsed" },
);

export const serializedDateSchemaForParsing = z
  .union([z.string(), z.number(), z.date(), dayjsSchemaStrict])
  .transform((x, ctx) => {
    const res = parseDayjs(x);
    if (!res) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "String must be a serialized date that can be parsed",
      });
      return z.NEVER;
    }

    return res;
  });

export const serializedDateSchemaForSerialize = z
  .union([z.string(), z.number(), z.date(), dayjsSchemaStrict])
  .transform((x, ctx) => {
    const res = parseDayjs(x);
    if (!res) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "String must be a serialized date that can be parsed",
      });
      return z.NEVER;
    }

    return res.toISOString();
  });

export const dayjsSchema = z.union([dayjsSchemaStrict, serializedDateSchemaForParsing]);

export const plainObjectValuePrimitiveSchema = z.union([
  z.undefined(),
  z.null(),
  z.boolean(),
  z.number(),
  z.string(),
  z.instanceof(Date),
  dayjsSchema,
]);

/**
 * Union of all possible primitive values (non-array, non-nested-object) of a Plain Object field.
 *
 * That means:
 * - It can be `undefined` or `null`.
 * - It can be a boolean, number, or string.
 * - It can be a Date object.
 * - It can be a Dayjs object.
 */
export type PlainObjectValuePrimitive = z.infer<typeof plainObjectValuePrimitiveSchema>;

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
  | PlainObjectValuePrimitive
  | PlainObjectValue[]
  | readonly PlainObjectValue[]
  | { [prop: string]: PlainObjectValue };
export const plainObjectValueSchema: z.ZodType<PlainObjectValue> = z.lazy(() =>
  z.union([
    plainObjectValuePrimitiveSchema,
    z.array(plainObjectValueSchema),
    z.array(plainObjectValueSchema).readonly(),
    z.record(plainObjectValueSchema),
  ]),
);

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
  if (typeof x === "function") return false;

  return isValidPrimitive(x) || isValidArray(x) || isValidObject(x);
}

export const plainObjectSchema = z.record(plainObjectValueSchema);
/**
 * Object where all values are Plain Object values.
 */
export type PlainObject = z.infer<typeof plainObjectSchema>;
/**
 * Union of Plain Object and an array of Plain Objects.
 */
export type PlainObjectOrArray = PlainObject | PlainObject[];

/**
 * Checks if the given PlainObjectValue is a PlainObject.
 *
 * Since the given value is a PlainObjectValue, we just need to discard the primitive values and arrays.
 *
 * @param o
 * @returns
 */
export function isPlainObject(o: PlainObjectValue): o is Record<string, unknown> & PlainObject {
  return !Array.isArray(o) && !isValidPrimitive(o) && isObject(o);
}

/**
 * Extension of PlainObjectValue that allows for a generic type to be added as a valid value.
 */
export type PlainObjectValueExtended<T> =
  | PlainObjectValuePrimitive
  | T
  | PlainObjectValueExtended<T>[]
  | readonly PlainObjectValueExtended<T>[]
  | { [prop: string]: PlainObjectValueExtended<T> };

/**
 * Extension of PlainObject that uses PlainObjectValueExtended to add extra possible values.
 */
export type PlainObjectExtended<T> = {
  [prop: string]: PlainObjectValueExtended<T>;
};

/**
 * Returns true if the given value is a valid primitive: null, undefined, boolean, string, Dayjs, or number.
 */
export function isValidPrimitive(x: unknown): x is PlainObjectValuePrimitive {
  return (
    isNullOrUndefined(x) ||
    typeof x === "boolean" ||
    typeof x === "string" ||
    isDayjs(x) ||
    (typeof x === "number" && Number.isFinite(x))
  );
}

/**
 * Returns true if the given value is a valid array: array where all elements are PlainObjectValues.
 */
export function isValidArray(x: unknown): x is PlainObjectValue[] {
  return Array.isArray(x) && x.every(isPlainObjectValue);
}

/**
 * Returns true if the given value is a valid object: POJO where all values are PlainObjectValues.
 */
export function isValidObject(x: unknown): x is { [prop: string]: PlainObjectValue } {
  return isObject(x) && Object.values(x).every(isPlainObjectValue);
}

/**
 * see https://docs.deno.com/api/node/util/~/isNullOrUndefined
 *
 * @param value
 * @returns
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === undefined || value === null;
}

/**
 * see https://docs.deno.com/api/node/util/~/isObject
 * @param value
 * @returns
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}
