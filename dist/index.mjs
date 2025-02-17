// src/index.ts
import { dayjsSchema, isDayjs } from "@plandek-utils/ts-parse-dayjs";
import { z } from "zod";
var plainObjectValuePrimitiveSchema = z.union([
  z.undefined(),
  z.null(),
  z.boolean(),
  z.number().finite(),
  z.string(),
  z.instanceof(Date),
  dayjsSchema
]);
var plainObjectValueSchema = z.lazy(
  () => z.union([
    plainObjectValuePrimitiveSchema,
    z.array(plainObjectValueSchema),
    z.array(plainObjectValueSchema).readonly(),
    z.record(plainObjectValueSchema)
  ])
);
function isPlainObjectValue(x) {
  return plainObjectValueSchema.safeParse(x).success;
}
var plainObjectSchema = z.record(plainObjectValueSchema);
function isPlainObject(o) {
  return plainObjectSchema.safeParse(o).success;
}
function isValidPrimitive(x) {
  return plainObjectValuePrimitiveSchema.safeParse(x).success;
}
function isValidArray(x) {
  return Array.isArray(x) && x.every(isPlainObjectValue);
}
function isPlainObjectValueAnObject(x) {
  return !!x && typeof x === "object" && !Array.isArray(x) && !isDayjs(x) && !(x instanceof Date);
}
function isPlainObjectValueAnArrayOfObjects(x) {
  return Array.isArray(x) && x.every((item) => isPlainObjectValueAnObject(item));
}
export {
  isPlainObject,
  isPlainObjectValue,
  isPlainObjectValueAnArrayOfObjects,
  isPlainObjectValueAnObject,
  isValidArray,
  isValidPrimitive,
  plainObjectSchema,
  plainObjectValuePrimitiveSchema,
  plainObjectValueSchema
};
//# sourceMappingURL=index.mjs.map