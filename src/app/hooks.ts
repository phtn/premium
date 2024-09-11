import { getAllAdmins } from "@/lib/db/admin";
import { deleteCategory, getAllCategories } from "@/lib/db/category";
import { deleteProduct, getAllProducts } from "@/lib/db/product";
import { deleteUser, getAllUsers, updateUser } from "@/lib/db/user";
import type {
  SelectAdmin,
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
import type { DeleteCategory } from "@/server/db/zod.category";
import type { DeleteProduct } from "@/server/db/zod.product";
import type { DeleteUser, UpdateUser } from "@/server/db/zod.user";
import { asyncSet, errHandler, onSettle } from "@/utils/helpers";
import { useCallback, useEffect, useState } from "react";

export function useFetchDB() {
  const [users, setUsers] = useState<SelectUser[] | undefined>();
  const [categories, setCategories] = useState<SelectCategory[] | undefined>();
  const [products, setProducts] = useState<SelectProduct[] | undefined>();
  const [admins, setAdmins] = useState<SelectAdmin[] | undefined>();
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(() => asyncSet(setUsers, getAllUsers), []);

  const getAdmins = useCallback(() => asyncSet(setAdmins, getAllAdmins), []);

  const getCategories = useCallback(
    () => asyncSet(setCategories, getAllCategories),
    [],
  );

  const getProducts = useCallback(
    () => asyncSet(setProducts, getAllProducts),
    [],
  );

  const deleteUserById = async (params: DeleteUser) => {
    await deleteUser(params);
  };

  const updateUserById = async (params: UpdateUser) => {
    await updateUser(params);
  };

  const deleteCategoryById = async (params: DeleteCategory) => {
    await deleteCategory(params);
  };

  const deleteProductById = async (params: DeleteProduct) => {
    await deleteProduct(params);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getUsers(), getCategories(), getProducts(), getAdmins()])
      .then(onSettle(setLoading))
      .catch(errHandler(setLoading));
  }, [getUsers, getCategories, getProducts, getAdmins]);

  return {
    users,
    getUsers,
    admins,
    getAdmins,
    deleteUserById,
    updateUserById,
    categories,
    getCategories,
    deleteCategoryById,
    products,
    getProducts,
    deleteProductById,
    loading,
  };
}
