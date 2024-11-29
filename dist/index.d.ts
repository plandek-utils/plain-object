import { z } from "zod";
export declare const plainObjectValuePrimitiveSchema: z.ZodUnion<[z.ZodUndefined, z.ZodNull, z.ZodBoolean, z.ZodNumber, z.ZodString, z.ZodType<Date, z.ZodTypeDef, Date>, z.ZodUnion<[z.ZodType<import("dayjs").Dayjs, z.ZodTypeDef, import("dayjs").Dayjs>, z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate, z.ZodType<import("dayjs").Dayjs, z.ZodTypeDef, import("dayjs").Dayjs>]>, import("dayjs").Dayjs, string | number | Date | import("dayjs").Dayjs>]>]>;
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
export type PlainObjectValue = PlainObjectValuePrimitive | PlainObjectValue[] | readonly PlainObjectValue[] | {
    [prop: string]: PlainObjectValue;
};
export declare const plainObjectValueSchema: z.ZodType<PlainObjectValue>;
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
export declare function isPlainObjectValue(x: unknown): x is PlainObjectValue;
export declare const plainObjectSchema: z.ZodRecord<z.ZodString, z.ZodType<PlainObjectValue, z.ZodTypeDef, PlainObjectValue>>;
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
export declare function isPlainObject(o: PlainObjectValue): o is Record<string, unknown> & PlainObject;
/**
 * Extension of PlainObjectValue that allows for a generic type to be added as a valid value.
 */
export type PlainObjectValueExtended<T> = PlainObjectValuePrimitive | T | PlainObjectValueExtended<T>[] | readonly PlainObjectValueExtended<T>[] | {
    [prop: string]: PlainObjectValueExtended<T>;
};
/**
 * Extension of PlainObject that uses PlainObjectValueExtended to add extra possible values.
 */
export type PlainObjectExtended<T> = {
    [prop: string]: PlainObjectValueExtended<T>;
};
/**
 * Returns true if the given value is a valid primitive: null, undefined, boolean, string, Dayjs, or number.
 */
export declare function isValidPrimitive(x: unknown): x is PlainObjectValuePrimitive;
/**
 * Returns true if the given value is a valid array: array where all elements are PlainObjectValues.
 */
export declare function isValidArray(x: unknown): x is PlainObjectValue[];
