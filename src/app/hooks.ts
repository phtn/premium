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
import { errHandler } from "@/utils/helpers";
import { useEffect, useState } from "react";

// const cachedGetAllUsers = cache(getAllUsers);
// const cachedGetAllCategories = cache(getAllCategories);
// const cachedGetAllProducts = cache(getAllProducts);

export function useFetchDB() {
  const [users, setUsers] = useState<SelectUser[] | undefined>();
  const [categories, setCategories] = useState<SelectCategory[] | undefined>();
  const [products, setProducts] = useState<SelectProduct[] | undefined>();
  const [admins, setAdmins] = useState<SelectAdmin[] | undefined>();

  const getUsers = async () => {
    const all = await getAllUsers();
    setUsers(all);
  };
  const getAdmins = async () => {
    const all = await getAllAdmins();
    setAdmins(all);
  };

  const getCategories = async () => {
    const all = await getAllCategories();
    setCategories(all);
  };

  const getProducts = async () => {
    const all = await getAllProducts();
    setProducts(all);
  };

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
    getUsers().catch(errHandler);
    getCategories().catch(errHandler);
    getProducts().catch(errHandler);
    getAdmins().catch(errHandler);
  }, []);

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
  };
}
