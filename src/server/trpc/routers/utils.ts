import type { ZodObject, ZodRawShape } from "zod";
import { procedure as p } from "..";

// Procedure Generator
export const procedure = <T extends ZodRawShape>(schema: ZodObject<T>) =>
  p.input(schema);

export const queryAll = () => p;

/** async/await wrapper */
export const asyncFn =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) =>
    await fn(params);

/** Async/Await tRPC */
interface RParams<T> {
  input: T;
}

export const asyncR =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async ({ input }: RParams<TParams>) =>
    await fn(input);

export const asyncArr =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn[]>) =>
  async ({ input }: RParams<TParams>) =>
    await fn(input);
