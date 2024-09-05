import { getAllCategories } from "@/lib/db/category";
import { getAllProducts } from "@/lib/db/product";
import { getAllUsers } from "@/lib/db/user";
import {
  type SelectCategory,
  type SelectProduct,
  type SelectUser,
} from "@/server/db/schema";
import { errHandler } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function useDb() {
  const [users, setUsers] = useState<SelectUser[] | undefined>();
  const [categories, setCategories] = useState<SelectCategory[] | undefined>();
  const [products, setProducts] = useState<SelectProduct[] | undefined>();

  const getUsers = async () => {
    const all = await getAllUsers();
    setUsers(all);
  };

  const getCategories = async () => {
    const all = await getAllCategories();
    setCategories(all);
  };

  const getProducts = async () => {
    const all = await getAllProducts();
    setProducts(all);
  };

  useEffect(() => {
    getUsers().catch(errHandler);
    getCategories().catch(errHandler);
    getProducts().catch(errHandler);
  }, []);

  return { users, getUsers, categories, getCategories, products, getProducts };
}
