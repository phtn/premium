import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  price: real("price").notNull(),
  size: real("size").notNull(),
  sizeUnit: text("size_unit").notNull(),
  description: text("description"),
  usageInstructions: text("usage_instructions"),
  imageUrl: text("image_url"),
});

export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const productIngredients = sqliteTable(
  "product_ingredients",
  {
    productId: integer("product_id").references(() => products.id),
    ingredientId: integer("ingredient_id").references(() => ingredients.id),
    concentration: real("concentration"),
  },
  // (t) => ({
  //   pk: sql`PRIMARY KEY (${t.productId}, ${t.ingredientId})`,
  // }),
);

export const skinConcerns = sqliteTable("skin_concerns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const productSkinConcerns = sqliteTable(
  "product_skin_concerns",
  {
    productId: integer("product_id").references(() => products.id),
    skinConcernId: integer("skin_concern_id").references(() => skinConcerns.id),
  },
  // (t) => ({
  //   pk: sql`PRIMARY KEY (${t.productId}, ${t.skinConcernId})`,
  // }),
);

export const skinTypes = sqliteTable("skin_types", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const productSkinTypes = sqliteTable(
  "product_skin_types",
  {
    productId: integer("product_id").references(() => products.id),
    skinTypeId: integer("skin_type_id").references(() => skinTypes.id),
  },
  // (t) => ({
  //   pk: sql`PRIMARY KEY (${t.productId}, ${t.skinTypeId})`,
  // }),
);

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").references(() => products.id),
  userId: integer("user_id"),
  rating: integer("rating").notNull(),
  reviewText: text("review_text"),
  reviewDate: integer("review_date", { mode: "timestamp" }).notNull(),
});
