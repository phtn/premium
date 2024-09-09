"use client";

import type {
  SelectAdmin,
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
import { createContext, type PropsWithChildren } from "react";
import { useFetchDB } from "./hooks";

interface DBValues {
  users: SelectUser[] | undefined;
  admins: SelectAdmin[] | undefined;
  products: SelectProduct[] | undefined;
  categories: SelectCategory[] | undefined;
}
export const DB = createContext<DBValues | null>(null);

export const ContextDB = ({ children }: PropsWithChildren) => {
  const { users, products, categories, admins } = useFetchDB();
  return (
    <DB.Provider value={{ users, products, categories, admins }}>
      {children}
    </DB.Provider>
  );
};
