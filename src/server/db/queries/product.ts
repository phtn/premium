import { eq } from "drizzle-orm";
import { db } from "..";
import { type InsertProduct, products } from "../schema";
import type { DeleteProduct, GetProduct, UpdateProduct } from "../zod.product";
import { asyncFn } from "@/server/trpc/routers/utils";

export const insertProduct = async (values: InsertProduct) => {
  await db.insert(products).values(values);
};

export const getProduct = asyncFn((params: GetProduct) =>
  db.select().from(products).where(eq(products.productId, params.productId)),
);

export const deleteProduct = asyncFn((params: DeleteProduct) =>
  db.delete(products).where(eq(products.productId, params.productId)).run(),
);

export const updateProduct = asyncFn((params: UpdateProduct) =>
  db
    .select()
    .from(products)
    .where(eq(products.productId, params.productId))
    .values(params.values),
);

export const getAllProducts = asyncFn(() =>
  db.select().from(products).limit(100),
);
