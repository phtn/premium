import { getAllCategories } from "@/lib/db/category";
import { getAllProducts } from "@/lib/db/product";
import { getAllUsers } from "@/lib/db/user";
import {
  type SelectCategory,
  type SelectProduct,
  type SelectUser,
} from "@/server/db/schema";
import { asyncSet, errHandler } from "@/utils/helpers";
import { useCallback, useEffect, useState } from "react";

export default function useDb() {
  const [users, setUsers] = useState<SelectUser[] | undefined>();
  const [categories, setCategories] = useState<SelectCategory[] | undefined>();
  const [products, setProducts] = useState<SelectProduct[] | undefined>();
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(() => asyncSet(setUsers, getAllUsers), []);
  const getCategories = useCallback(
    () => asyncSet(setCategories, getAllCategories),
    [],
  );
  const getProducts = useCallback(
    () => asyncSet(setProducts, getAllProducts),
    [],
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([getUsers(), getCategories(), getProducts().catch(errHandler)])
      .then(() => setLoading(false))
      .catch(errHandler(setLoading));
  }, [getUsers, getProducts, getCategories]);

  return {
    users,
    getUsers,
    categories,
    getCategories,
    products,
    getProducts,
    loading,
  };
}
