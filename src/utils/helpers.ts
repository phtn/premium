import { onError, onSuccess } from "@/components/ui/toaster";
import type { ResultSet } from "@libsql/client";
import type { Dispatch, ReactElement, SetStateAction } from "react";

export function toggleState(setState: Dispatch<SetStateAction<boolean>>): void {
  setState((prevState) => !prevState);
}

export const fileType = (file_type: string | undefined): string => {
  if (!file_type) {
    return "";
  }
  const match = file_type.match(/\/(\w+)$/);
  return match?.[1] ?? "";
};

export const fileSize = (bytes: number | undefined): string => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  if (!bytes) {
    return "";
  }

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  const roundedValue = unitIndex > 1 ? bytes.toFixed(2) : Math.round(bytes);

  return `${roundedValue} ${units[unitIndex]}`;
};

export const errHandler =
  <T>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<T>>,
  ) =>
  (e: T) => {
    onError("Panic!");
    setLoading(false);
    if (setError) setError(e);
  };
export const okHandler =
  <T>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setResult?: Dispatch<SetStateAction<T>>,
  ) =>
  (res: T) => {
    if (setResult) {
      setResult(res);
    }
    setLoading(false);
    onSuccess("Successful");
  };

export const Ok =
  (setLoading: Dispatch<SetStateAction<boolean>>, ...args: string[]) =>
  () => {
    setLoading(false);
    onSuccess(`${args[0]} ${args[1] ?? ""}`);
  };

export const opts = (...args: ReactElement[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export const encodeBase64 = (data: string | Buffer): string =>
  Buffer.from(data).toString("base64");

export const decodeBase64 = (str: string): Buffer => Buffer.from(str, "base64");

/**
 * @param (params: TParams) => Promise<TReturn>
 */
export const asyncP =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) =>
    await fn(params);

/**
 * @param async fn() => void
 */
export const asyncV =
  <TReturn>(fn: () => Promise<TReturn>) =>
  async () => {
    await fn();
  };

/**
 * @param async fn(params: TParams) => void
 */
export const asyncPV =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) => {
    await fn(params);
  };
/**
 * @name asyncSV -> async setState void
 * @description async fn without params and returns void
 * @param fn() => void
 */
export function asyncSetArr<T>(
  setStateFn: (
    fn: () => Promise<T>,
  ) => [Dispatch<SetStateAction<T | undefined>>, () => Promise<T>],
): () => Promise<void> {
  return async () => {
    const [setState, asyncFunction] = setStateFn(() =>
      Promise.resolve({} as T),
    );
    const result = await asyncFunction();
    setState(result);
  };
}

export async function asyncSet<T>(
  setStateAction: Dispatch<SetStateAction<T | undefined>>,
  asyncFunc: () => Promise<T>,
) {
  setStateAction((await asyncFunc()) as T);
}

export const asyncDelete = async <TParams extends object>(
  id: TParams,
  setLoading: Dispatch<SetStateAction<boolean>>,
  asyncFunc: (params: TParams) => Promise<ResultSet>,
  message?: string,
) => {
  setLoading(true);
  await asyncFunc(id)
    .then()
    .catch(errHandler)
    .finally(Ok(setLoading, message ?? `Deleted: ${Object.values(id)[0]}`));
};

/**
 * Generates a ref# with "Nx_" prefix.
 *
 * @returns A 15-character string prefixed with "Nx_"
 */
export function generateRef(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomPart = (length: number): string => {
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join("");
  };

  const prefix = "Nx-";
  const timestamp = Date.now()
    .toString(36)
    .split("")
    .reverse()
    .join("")
    .slice(-6); // Take last 6 chars of timestamp
  const randomSuffix = randomPart(6);
  const buf = Buffer.from(timestamp + randomSuffix)
    .toString("base64")
    .split("")
    .reverse()
    .join("");

  return prefix + buf;
}

export function formatAsMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
