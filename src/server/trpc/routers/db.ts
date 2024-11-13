import {
  DeleteUserSchema,
  GetUserSchema,
  InsertUserSchema,
  UpdateUserSchema,
} from "@/server/db/zod.user";
import { router } from "..";
import { asyncR, asyncRx, procedure, queryAll } from "./utils";
import {
  deleteUser,
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
} from "@/server/db/queries/user";
import {
  DeleteCategorySchema,
  GetCategorySchema,
  // InsertCategorySchema,
  UpdateCategorySchema,
} from "@/server/db/zod.category";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  // insertCategory,
  updateCategory,
} from "@/server/db/queries/category";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  // insertProduct,
  updateProduct,
} from "@/server/db/queries/product";
import {
  DeleteProductSchema,
  GetProductSchema,
  // InsertProductSchema,
  UpdateProductSchema,
} from "@/server/db/zod.product";
import {
  DeleteAdminSchema,
  GetAdminSchema,
  InsertAdminSchema,
  UpdateAdminSchema,
} from "@/server/db/zod.admin";
import {
  deleteAdmin,
  getAdmin,
  getAllAdmins,
  insertAdmin,
  updateAdmin,
} from "@/server/db/queries/admin";

export const sqlRouter = router({
  insertAdmin: procedure(InsertAdminSchema).mutation(asyncRx(insertAdmin)),
  getAdmin: procedure(GetAdminSchema).query(asyncR(getAdmin)),
  deleteAdmin: procedure(DeleteAdminSchema).mutation(asyncRx(deleteAdmin)),
  updateAdmin: procedure(UpdateAdminSchema).mutation(asyncR(updateAdmin)),
  getAllAdmins: queryAll().query(asyncR(getAllAdmins)),

  insertUser: procedure(InsertUserSchema).mutation(asyncRx(insertUser)),
  getUser: procedure(GetUserSchema).query(asyncR(getUser)),
  deleteUser: procedure(DeleteUserSchema).mutation(asyncRx(deleteUser)),
  updateUser: procedure(UpdateUserSchema).mutation(asyncR(updateUser)),
  getAllUsers: queryAll().query(asyncR(getAllUsers)),

  // insertCategory: procedure(InsertCategorySchema).mutation(
  //   asyncRx(insertCategory),
  // ),
  getCategory: procedure(GetCategorySchema).mutation(asyncR(getCategory)),
  updateCategory: procedure(UpdateCategorySchema).mutation(
    asyncR(updateCategory),
  ),
  deleteCategory: procedure(DeleteCategorySchema).mutation(
    asyncRx(deleteCategory),
  ),
  getAllCategories: queryAll().query(asyncR(getAllCategories)),

  // insertProduct: procedure(InsertProductSchema).mutation(
  //   asyncRx(insertProduct),
  // ),
  getProduct: procedure(GetProductSchema).query(asyncR(getProduct)),
  updateProduct: procedure(UpdateProductSchema).mutation(asyncR(updateProduct)),
  deleteProduct: procedure(DeleteProductSchema).mutation(
    asyncRx(deleteProduct),
  ),
  getAllProducts: queryAll().query(asyncR(getAllProducts)),
});
