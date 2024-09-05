import { eq } from "drizzle-orm";
import { db } from "..";
import { categories, type InsertCategory } from "../schema";
import type {
  DeleteCategory,
  GetCategory,
  UpdateCategory,
} from "../zod.category";
import { asyncFn } from "@/server/trpc/routers/utils";

export const insertCategory = async (values: InsertCategory) => {
  await db.insert(categories).values(values);
};

export const getCategory = asyncFn((params: GetCategory) =>
  db
    .select()
    .from(categories)
    .where(eq(categories.categoryId, params.categoryId)),
);

export const deleteCategory = asyncFn((params: DeleteCategory) =>
  db.delete(categories).where(eq(categories.categoryId, params.categoryId)),
);

export const updateCategory = asyncFn((params: UpdateCategory) =>
  db
    .select()
    .from(categories)
    .where(eq(categories.categoryId, params.categoryId))
    .values(params.values),
);

export const getAllCategories = asyncFn(() =>
  db.select().from(categories).limit(100),
);
