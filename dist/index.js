"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  isPlainObject: () => isPlainObject,
  isPlainObjectValue: () => isPlainObjectValue,
  isValidArray: () => isValidArray,
  isValidPrimitive: () => isValidPrimitive,
  plainObjectSchema: () => plainObjectSchema,
  plainObjectValuePrimitiveSchema: () => plainObjectValuePrimitiveSchema,
  plainObjectValueSchema: () => plainObjectValueSchema
});
module.exports = __toCommonJS(src_exports);
var import_ts_parse_dayjs = require("@plandek-utils/ts-parse-dayjs");
var import_zod = require("zod");
var plainObjectValuePrimitiveSchema = import_zod.z.union([
  import_zod.z.undefined(),
  import_zod.z.null(),
  import_zod.z.boolean(),
  import_zod.z.number().finite(),
  import_zod.z.string(),
  import_zod.z.instanceof(Date),
  import_ts_parse_dayjs.dayjsSchema
]);
var plainObjectValueSchema = import_zod.z.lazy(
  () => import_zod.z.union([
    plainObjectValuePrimitiveSchema,
    import_zod.z.array(plainObjectValueSchema),
    import_zod.z.array(plainObjectValueSchema).readonly(),
    import_zod.z.record(plainObjectValueSchema)
  ])
);
function isPlainObjectValue(x) {
  return plainObjectValueSchema.safeParse(x).success;
}
var plainObjectSchema = import_zod.z.record(plainObjectValueSchema);
function isPlainObject(o) {
  return plainObjectSchema.safeParse(o).success;
}
function isValidPrimitive(x) {
  return plainObjectValuePrimitiveSchema.safeParse(x).success;
}
function isValidArray(x) {
  return Array.isArray(x) && x.every(isPlainObjectValue);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPlainObject,
  isPlainObjectValue,
  isValidArray,
  isValidPrimitive,
  plainObjectSchema,
  plainObjectValuePrimitiveSchema,
  plainObjectValueSchema
});
//# sourceMappingURL=index.js.map