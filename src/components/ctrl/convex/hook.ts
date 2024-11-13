import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";
import { insertUser } from "@/lib/db/user";
import { errHandler, Ok } from "@/utils/helpers";
import { InsertUserSchema } from "@/server/db/zod.user";
import type { InsertAdmin, InsertUser } from "@/server/db/schema";
import { CategorySchema } from "@/server/db/zod.category";
// import { insertProduct } from "@/lib/db/product";
import { InsertAdminSchema } from "@/server/db/zod.admin";
import { insertAdmin } from "@/lib/db/admin";
import { type InsertCategory } from "convex/categories/create";
import { type InsertProduct } from "convex/products/create";
import { useVex } from "@/app/ctx/convex";

export function useAdminDB() {
  const [validAdmin, setValidAdmin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<InsertAdmin>();
  const [adminLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createAdmin = () => {
    const newAdmin = randomAdmin();
    setAdmin(newAdmin);
    setValidAdmin(InsertAdminSchema.safeParse(newAdmin).success);
  };
  const adminInsert = useCallback(() => {
    setLoading(true);
    if (!admin && !validAdmin) return;
    insertAdmin(admin!)
      .then(Ok(setLoading, admin?.displayName ?? "", "added"))
      .catch(errHandler(setLoading, setError));
  }, [admin, validAdmin]);

  return { createAdmin, admin, validAdmin, adminInsert, adminLoading, error };
}

const randomAdmin = () =>
  ({
    userId: Date.now().toString(36),
    displayName: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number(),
    photoURL: faker.image.avatarGitHub(),
    active: faker.datatype.boolean(),
    createdBy: "xpriori",
    master: false,
    verified: false,
  }) satisfies InsertAdmin;

export function useUserDB() {
  const [validUser, setValidUser] = useState<boolean>(false);
  const [user, setUser] = useState<InsertUser>();
  const [userLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createUser = () => {
    const newUser = randomUser();
    setUser(newUser);
    setValidUser(InsertUserSchema.safeParse(newUser).success);
  };
  const userInsert = useCallback(() => {
    setLoading(true);
    if (!user && !validUser) return;
    insertUser(user!)
      .then(Ok(setLoading, user?.displayName ?? "", "added"))
      .catch(errHandler(setLoading, setError));
  }, [user, validUser]);

  return { createUser, user, validUser, userInsert, userLoading, error };
}

const randomUser = () =>
  ({
    userId: Date.now().toString(36),
    displayName: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number(),
    photoURL: faker.image.avatarGitHub(),
    active: faker.datatype.boolean(),
    verified: false,
  }) satisfies InsertUser;

export function useCatDB() {
  const [cat, setCat] = useState<InsertCategory>(randomCategory);
  const [validCat, setValidCat] = useState(false);
  const [catLoading, setLoading] = useState(false);
  const [error] = useState<Error>();

  const { category } = useVex();

  const createCategory = () => {
    setCat(randomCategory);
    setValidCat(CategorySchema.safeParse(randomCategory).success);
  };

  const catInsert = useCallback(() => {
    setLoading(true);
    if (!cat && !validCat) return;
    category
      .create(cat)
      .then(Ok(setLoading, "1 category added."))
      .catch(errHandler(setLoading));
  }, [cat, validCat, category]);

  return { cat, createCategory, validCat, catLoading, catInsert, error };
}

const randomCategory = {
  uid: "admin",
  name: "Fragrance",
  slug: "fragrance",
  description:
    "Rule society and command attention with your signature scent. Dive into our collection of frarances and let it choose you. Your next move is to tell your story.",
  photo_url:
    "https://rustans.com/cdn/shop/products/nars-_0004s_0010_2648868-Bronzing_Powder_Laguna.jpg?v=1582772405&width=800",
  remarks: "For men and women.",
} satisfies InsertCategory;

export function useProductDB() {
  const [prod, setProduct] = useState<InsertProduct>(randomProduct);
  const [validProduct, setValidProduct] = useState(false);
  const [productLoading, setLoading] = useState(false);
  const [error] = useState<Error>();

  const { product } = useVex();

  const createProduct = () => {
    setProduct(randomProduct);
    if (prod) {
      setValidProduct(true);
    }
  };

  const productInsert = useCallback(() => {
    setLoading(true);
    if (!product && !validProduct) return;
    product
      .create(prod)
      .then(Ok(setLoading, "1 product added."))
      .catch(errHandler(setLoading));
  }, [product, validProduct, prod]);

  return {
    createProduct,
    prod,
    validProduct,
    productLoading,
    productInsert,
    error,
  };
}

// export const randomProduct = () => ({
//   product_id: Date.now().toString(36),
//   category_id: "m0txakzd",
//   price: parseFloat(faker.commerce.price()),
//   in_stock: 10,
//   is_active: true,
//   name: faker.commerce.product(),
//   slug: `skin-care/${faker.commerce.product().toLowerCase()}`,
//   description: faker.commerce.productDescription(),
//   material: faker.commerce.productMaterial(),
//   dimensions: faker.commerce.productAdjective(),
//   remarks: faker.commerce.productAdjective(),
//   short_desc: faker.commerce.productAdjective(),
//   created_by: "m0twy921",
//   updated_at: Date.now(),
//   updated_by: "",
// });

const randomProduct = {
  uid: "admin",
  brand: "Kilian Paris",
  name: "Blue Moon Ginger Dash",
  description:
    "Blue Moon Ginger Dash Eau de Parfum is a limited fresh addition to The Liquors, inspired by Kilian Hennessy's summer cocktail, the cult beachside party drink from the 90's, Blue Lagoon, a mix of lemon, vodka and blue caraçao liquor.",
  short_desc: "Eau de Parfum quintessential summer cocktail in scent.",
  material: "Lemon, Calone, Vodka accord, Ginger, Ambroxan.",
  remarks: "Olfactive family: The Liquors",
  price: 3200,
  in_stock: 200,
  volume: "50",
  volume_unit: "ml",
  photo_url:
    "https://rustans.com/cdn/shop/files/KilianBlueMoonBottle_1_1.jpg?v=1726456541&width=1400",
  slug: "fragrance/women",
  category: "fragrance",
  category_id: "4d1d17fc-73ec-972f-2fc9-99c8879f30cb", // Assuming categoryId for skincare
  // Gifts 7872dfd5-70f3-9f47-79f7-b6222ecbc7ee
  // Skincare 4d1d17fc-73ec-972f-2fc9-99c8879f30cb
  // Makeup df50b66f-c005-bc76-0e4e-ebf6e9767ff7
  // Fragrance
} satisfies InsertProduct;

export const productImages = [
  "https://piliani.com.ph/cdn/shop/files/PA-IHFC_2048x2048.jpg?v=1706746911",
  "https://piliani.com.ph/cdn/shop/files/PA-IHFC50_2048x2048.jpg?v=1706746911",
  "https://adultsplay.shop/cdn/shop/products/416568x1.jpg?v=1699150839&width=1646",
  "https://giftswithlove.my/wp-content/uploads/2019/11/laneige.jpg",
];

// const sendWebhook = async (endpoint: string, message: object) => {
//   await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "applicatin/json",
//     },
//     body: JSON.stringify(message),
//   });
// };
