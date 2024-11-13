/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as categories_create from "../categories/create.js";
import type * as categories_delete from "../categories/delete.js";
import type * as categories_get from "../categories/get.js";
import type * as products_create from "../products/create.js";
import type * as products_delete from "../products/delete.js";
import type * as products_get from "../products/get.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "categories/create": typeof categories_create;
  "categories/delete": typeof categories_delete;
  "categories/get": typeof categories_get;
  "products/create": typeof products_create;
  "products/delete": typeof products_delete;
  "products/get": typeof products_get;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
