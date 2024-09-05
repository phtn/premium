"use client";

import type {
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
import { createContext, type PropsWithChildren } from "react";
import { useFetchDB } from "./hooks";

interface DBValues {
  users: SelectUser[] | undefined;
  products: SelectProduct[] | undefined;
  categories: SelectCategory[] | undefined;
}
export const DB = createContext<DBValues | null>(null);

export const ContextDB = ({ children }: PropsWithChildren) => {
  const { users, products, categories } = useFetchDB();
  return (
    <DB.Provider value={{ users, products, categories }}>
      {children}
    </DB.Provider>
  );
};
