import { onError, onSuccess } from "@/components/ui/toaster";
import type { Dispatch, ReactElement, SetStateAction } from "react";

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
    console.log(e);
    if (setError) setError(e);
  };
export const okHandler =
  <T>(
    setLoading: Dispatch<SetStateAction<boolean>>,
    setResult?: Dispatch<SetStateAction<T>>,
  ) =>
  (res: T) => {
    console.log(res);
    if (setResult) {
      setResult(res);
    }
    setLoading(false);
    onSuccess("Success!");
  };

export const opts = (...args: ReactElement[]) => {
  if (!args[1]) return null;
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

export const encodeBase64 = (data: string | Buffer): string =>
  Buffer.from(data).toString("base64");

export const decodeBase64 = (str: string): Buffer => Buffer.from(str, "base64");
