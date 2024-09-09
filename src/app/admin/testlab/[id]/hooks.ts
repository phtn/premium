import { deleteAdmin, getAllAdmins } from "@/lib/db/admin";
import { deleteCategory, getAllCategories } from "@/lib/db/category";
import { deleteProduct, getAllProducts } from "@/lib/db/product";
import { deleteUser, getAllUsers, updateUser } from "@/lib/db/user";
import type {
  SelectAdmin,
  SelectCategory,
  SelectProduct,
  SelectUser,
} from "@/server/db/schema";
import type { DeleteAdmin } from "@/server/db/zod.admin";
import type { DeleteCategory } from "@/server/db/zod.category";
import type { DeleteProduct } from "@/server/db/zod.product";
import type { DeleteUser, UpdateUser } from "@/server/db/zod.user";
import { asyncSet, errHandler, Ok } from "@/utils/helpers";
import { useCallback, useEffect, useState } from "react";

export default function useDb() {
  const [users, setUsers] = useState<SelectUser[] | undefined>();
  const [categories, setCategories] = useState<SelectCategory[] | undefined>();
  const [products, setProducts] = useState<SelectProduct[] | undefined>();
  const [admins, setAdmins] = useState<SelectAdmin[] | undefined>();
  const [loading, setLoading] = useState(false);

  const getAdmins = useCallback(() => asyncSet(setAdmins, getAllAdmins), []);

  const getUsers = useCallback(() => asyncSet(setUsers, getAllUsers), []);
  const getProducts = useCallback(
    () => asyncSet(setProducts, getAllProducts),
    [],
  );
  const getCategories = useCallback(
    () => asyncSet(setCategories, getAllCategories),
    [],
  );

  const updateUserById = async (params: UpdateUser) => await updateUser(params);

  const deleteAdminById = async (id: DeleteAdmin) => {
    setLoading(true);
    await deleteAdmin(id)
      .catch(errHandler)
      .finally(Ok(setLoading, deleteMessage(id)));
  };
  const deleteUserById = async (id: DeleteUser) => {
    setLoading(true);
    await deleteUser(id)
      .catch(errHandler)
      .finally(Ok(setLoading, deleteMessage(id)));
  };

  const deleteCategoryById = async (id: DeleteCategory) => {
    setLoading(true);
    await deleteCategory(id)
      .then((res) => console.log(JSON.parse(res)))
      .catch(errHandler)
      .finally(Ok(setLoading, deleteMessage(id)));
  };

  const deleteProductById = async (id: DeleteProduct) => {
    setLoading(true);
    await deleteProduct(id)
      .catch(errHandler)
      .finally(Ok(setLoading, deleteMessage(id)));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getUsers(), getProducts(), getCategories(), getAdmins()])
      .catch(errHandler)
      .finally(() => setLoading(false));
  }, [getCategories, getUsers, getProducts, getAdmins]);

  return {
    users,
    getUsers,
    deleteUserById,
    updateUserById,
    admins,
    getAdmins,
    deleteAdminById,
    categories,
    getCategories,
    deleteCategoryById,
    products,
    getProducts,
    deleteProductById,
    loading,
  };
}

const deleteMessage = <T extends object>(id: T, message?: string) =>
  message ?? `Deleted: ${Object.values(id)[0]}`;
