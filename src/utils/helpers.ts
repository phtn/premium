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
