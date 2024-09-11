import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { categories } from "./category";
import { admins } from "./admin";

// Products table
export const products = sqliteTable("product", {
  productId: text("productId").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  material: text("material"),
  imageListId: text("image_list_id"),
  slug: text("slug"),
  dimensions: text("dimensions"),
  dimensionsUnit: text("dimensions_unit"),
  short: text("short"),
  size: integer("size"),
  sizeUnit: text("size_unit"),
  count: integer("count"),
  countUnit: text("count_unit"),
  imageUrl: text("image_url"),
  weight: integer("weight"),
  weightUnit: text("weight_unit"),
  volume: integer("volume"),
  volumeUnit: text("volume_unit"),
  usage: text("usage"),
  category: text("category"),
  subcategory: text("subcategory"),
  brand: text("brand"),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.categoryId),
  active: integer("active", { mode: "boolean" }).default(true).notNull(),
  liveMode: integer("liveMode", { mode: "boolean" }).default(false),
  remarks: text("remarks"),
  createdBy: text("createdBy")
    .notNull()
    .references(() => admins.userId),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// export const ingredients = sqliteTable("ingredients", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull().unique(),
// });

// export const productIngredients = sqliteTable("product_ingredients", {
//   productId: text("product_id").references(() => products.productId),
//   ingredientId: text("ingredient_id").references(() => ingredients.id),
//   concentration: real("concentration"),
// });

// export const skinConcerns = sqliteTable("skin_concerns", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull().unique(),
// });

// export const productSkinConcerns = sqliteTable("product_skin_concerns", {
//   productId: text("product_id").references(() => products.productId),
//   skinConcernId: integer("skin_concern_id").references(() => skinConcerns.id),
// });
// , (t) => ({
//   pk: sql`PRIMARY KEY (${t.productId}, ${t.skinConcernId})`,
// }));

// export const skinTypes = sqliteTable("skin_types", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull().unique(),
// });

// export const productSkinTypes = sqliteTable("product_skin_types", {
//   productId: text("product_id").references(() => products.productId),
//   skinTypeId: integer("skin_type_id").references(() => skinTypes.id),
// });
// , (t) => ({
//   pk: sql`PRIMARY KEY (${t.productId}, ${t.skinTypeId})`,
// }));

export const productImages = sqliteTable("productImage", {
  imageId: text("imageId").primaryKey().notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.productId),
  url: text("url").notNull(),
  description: text("description"),
  createdBy: text("createdBy").notNull(),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Featured Products table
export const featuredItems = sqliteTable("featuredItem", {
  featuredId: text("productId").primaryKey().notNull(),
  productId: text("productId")
    .notNull()
    .references(() => products.productId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.categoryId),
  liveMode: integer("liveMode", { mode: "boolean" }).default(false),
  createBy: text("createdBy")
    .notNull()
    .references(() => admins.userId),
  createdAt: integer("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

export const imagelist = [
  {
    imageId: "img1",
    productId: "m0txcjqt",
    url: "https://pyxis.nymag.com/v1/imgs/6e7/88c/48cb84543f4969c005cb5c2054a02020ba-mac-sku-NY9N37-1x1-0.rsquare.w600.png",
    description: "matte",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:32:42",
  },
  {
    imageId: "img2",
    productId: "m0txcoq6",
    url: "https://piliani.com.ph/cdn/shop/files/PA-IHFC.jpg?v=1706746911&width=1080",
    description: "For soft, smooth, hydrated skin",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:36:59",
  },
  {
    imageId: "img3",
    productId: "m0txcsb5",
    url: "https://thebodyshop.com.ph/cdn/shop/products/Discover_Your_Glow_Vitamin_C_Skincare_Routine_01_1296x.jpg?v=1698319267",
    description: "face and body",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:37:58",
  },
  {
    imageId: "img4",
    productId: "m0txctg0",
    url: "https://i.etsystatic.com/26666759/r/il/e4251c/3872826872/il_600x600.3872826872_ejfm.jpg",
    description: "yoni oil",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:39:04",
  },
  {
    imageId: "img5",
    productId: "m0txcubu",
    url: "https://i.etsystatic.com/15182755/r/il/12b9b7/5697223658/il_1588xN.5697223658_9jfq.jpg",
    description: "yoni scrub",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:39:52",
  },
  {
    imageId: "img6",
    productId: "m0tzf65u",
    url: "https://i.etsystatic.com/12245095/r/il/a4a85a/6189932526/il_1588xN.6189932526_jv96.jpg",
    description: "mermaid kisses",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:40:43",
  },
  {
    imageId: "img7",
    productId: "prod001",
    url: "https://piliani.com.ph/cdn/shop/files/pili-ani-intense-hydrating-face-cream-moisturize-luxury-skincare-2_e4e7e8d1-4e28-44c5-9017-f5813217af31_2048x.jpg?v=1706746891",
    description: "intense",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:41:30",
  },
  {
    imageId: "img8",
    productId: "prod003",
    url: "https://www.realsimple.com/thmb/oTEnLb-GHwCf3bmQEcenlZR0Gik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/merit-signature-lip-lightweight-lipstick-maison-c3fec2c6e6f840a6ab59a24c9e48692a.jpg",
    description: "all matte everything",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:42:57",
  },
  {
    imageId: "img9",
    productId: "m0vyhqy9",
    url: "https://www.sephora.com/productimages/sku/s2742567-main-zoom.jpg?imwidth=1224",
    description: "pressed powder",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:44:33",
  },
  {
    imageId: "img10",
    productId: "m0vyl7jp",
    url: "https://www.sephora.com/productimages/sku/s2326890-main-zoom.jpg?imwidth=1224",
    description: "best skin sephora",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:45:56",
  },
  {
    imageId: "img11",
    productId: "m0vyv9y6",
    url: "https://m.media-amazon.com/images/I/71Q1xP0+80L._AC_SX679_.jpg",
    description: "extra mile",
    createdBy: "xpriori",
    createdAt: "2024-09-10 05:47:41",
  },
];

export const products_backup = [
  {
    productId: "m0txcjqt",
    name: "Lipstick",
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    price: 30,
    stock: 10,
    material: "Cotton",
    photoURLId: null,
    slug: "skin-care/lipstick",
    dimensions: "Intelligent",
    short: "matte seduce matte",
    unit: "unit",
    imageUrl: "imageUrl",
    usage: "usage",
    category: "category",
    subcategory: "subcategory",
    brand: "brand",
    categoryId: "m0txakzd",
    active: true,
    liveMode: false,
    remarks: "Bespoke",
    createdBy: "m0twy921",
    createdAt: "2024-09-08 18:45:46",
  },
  {
    productId: "m0txcoq6",
    name: "Mint Pili Lip Butter",
    description:
      " Lips are better with butter. Formulated using PILI ANI's proprietary Pili Active OIls, this moisturzing Lip Butter in Mint moisturizes dry, dull, cracked and chapped lips.",
    price: 800,
    stock: 10,
    material: "Steel",
    photoURLId: null,
    slug: "skin-care/face",
    dimensions: "Practical",
    short: "fragrance free moisturizer.",
    unit: "unit",
    imageUrl: "imageUrl",
    usage: "usage",
    category: "category",
    subcategory: "subcategory",
    brand: "brand",
    categoryId: "m0txakzd",
    active: true,
    liveMode: false,
    remarks: "Pili Butter",
    createdBy: "m0twy921",
    createdAt: "2024-09-08 18:45:51",
  },
];

export const categories_backup = [
  {
    categoryId: "m0txakzd",
    subcategory: "subcategory",
    demographic: "demographic",
    name: "skin care",
    description:
      "ev up your skincare routine with key skincare ingredients like collagen, hyaluronic acid and salicylic acid that can make a real difference for your skin.",
    photoURL:
      "https://piliani.com.ph/cdn/shop/files/PA-IHFC_2048x2048.jpg?v=1706746911",
    slug: "skin-care",
    active: true,
    liveMode: false,
    remarks: "Luxurious",
    createdBy: "m0twy921",
    createdAt: "2024-09-08 18:44:22",
  },
  {
    categoryId: "m0vxvecv",
    subcategory: "subcategory",
    demographic: "demographic",
    name: "Make-up",
    description: "Make-up, Cosmetics, & other Beauty products.",
    photoURL:
      "https://hyperli.com/cdn/shop/products/makeup-full-face-4_jonf.webp?v=1682330757",
    slug: "make-up",
    active: true,
    liveMode: false,
    remarks: "For women only.",
    createdBy: "m0twy921",
    createdAt: "2024-09-10 04:35:59",
  },
  {
    categoryId: "m0vy2e45",
    subcategory: "subcategory",
    demographic: "demographic",
    name: "Gifts",
    description:
      "Gifts and presents, perfect for weddings, anniversaries, and holidays.",
    photoURL:
      "https://thebodyshop.com.ph/cdn/shop/products/Discover_Your_Glow_Vitamin_C_Skincare_Routine_01_1296x.jpg?v=1698319267",
    slug: "gifts",
    active: true,
    liveMode: false,
    remarks: "For men & women.",
    createdBy: "m0twy921",
    createdAt: "2024-09-10 04:41:25",
  },
];
