import {
  DeleteUserSchema,
  GetUserSchema,
  InsertUserSchema,
  UpdateUserSchema,
} from "@/server/db/zod.user";
import { router } from "..";
import { asyncR, procedure, queryAll } from "./utils";
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
  InsertCategorySchema,
  UpdateCategorySchema,
} from "@/server/db/zod.category";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
} from "@/server/db/queries/category";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "@/server/db/queries/product";
import {
  DeleteProductSchema,
  GetProductSchema,
  InsertProductSchema,
  UpdateProductSchema,
} from "@/server/db/zod.product";

export const sqlRouter = router({
  insertUser: procedure(InsertUserSchema).mutation(asyncR(insertUser)),
  getUser: procedure(GetUserSchema).query(asyncR(getUser)),
  deleteUser: procedure(DeleteUserSchema).mutation(asyncR(deleteUser)),
  updateUser: procedure(UpdateUserSchema).mutation(asyncR(updateUser)),
  getAllUsers: queryAll().query(asyncR(getAllUsers)),

  insertCategory: procedure(InsertCategorySchema).mutation(
    asyncR(insertCategory),
  ),
  getCategory: procedure(GetCategorySchema).mutation(asyncR(getCategory)),
  updateCategory: procedure(UpdateCategorySchema).mutation(
    asyncR(updateCategory),
  ),
  deleteCategory: procedure(DeleteCategorySchema).mutation(
    asyncR(deleteCategory),
  ),
  getAllCategories: queryAll().query(asyncR(getAllCategories)),

  insertProduct: procedure(InsertProductSchema).mutation(asyncR(insertProduct)),
  getProduct: procedure(GetProductSchema).query(asyncR(getProduct)),
  updateProduct: procedure(UpdateProductSchema).mutation(asyncR(updateProduct)),
  deleteProduct: procedure(DeleteProductSchema).mutation(asyncR(deleteProduct)),
  getAllProducts: queryAll().query(asyncR(getAllProducts)),
});
