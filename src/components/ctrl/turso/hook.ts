import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";
import { insertUser } from "@/lib/db/user";
import { errHandler, Ok } from "@/utils/helpers";
import { InsertUserSchema } from "@/server/db/zod.user";
import type { InsertAdmin, InsertUser } from "@/server/db/schema";
import {
  type InsertCategory,
  InsertCategorySchema,
} from "@/server/db/zod.category";
import { insertCategory } from "@/lib/db/category";
import {
  type InsertProduct,
  InsertProductSchema,
} from "@/server/db/zod.product";
import { insertProduct } from "@/lib/db/product";
import { InsertAdminSchema } from "@/server/db/zod.admin";
import { insertAdmin } from "@/lib/db/admin";

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
  const [cat, setCat] = useState<InsertCategory>();
  const [validCat, setValidCat] = useState(false);
  const [catLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createCat = () => {
    const newCat = randomCat();
    setCat(newCat);
    setValidCat(InsertCategorySchema.safeParse(newCat).success);
  };

  const catInsert = useCallback(() => {
    setLoading(true);
    if (!cat && !validCat) return;
    insertCategory(cat!)
      .then(Ok(setLoading, cat?.name ?? "", "added"))
      .catch(errHandler(setLoading, setError));
  }, [cat, validCat]);

  return { createCat, cat, validCat, catLoading, catInsert, error };
}

const randomCat = () =>
  ({
    categoryId: Date.now().toString(36),
    name: "Gifts",
    slug: "gifts",
    description:
      "Gifts and presents, perfect for weddings, anniversaries, and holidays.",
    createdBy: "m0twy921",
    photoURL:
      "https://thebodyshop.com.ph/cdn/shop/products/Discover_Your_Glow_Vitamin_C_Skincare_Routine_01_1296x.jpg?v=1698319267",
    remarks: "For men & women.",
  }) satisfies InsertCategory;

export function useProductDB() {
  const [product, setProduct] = useState<InsertProduct>();
  const [validProduct, setValidProduct] = useState(false);
  const [productLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createProduct = () => {
    // const newProduct = randomProduct();
    setProduct(dummyProduct);
    setValidProduct(InsertProductSchema.safeParse(dummyProduct).success);
  };

  const productInsert = useCallback(() => {
    setLoading(true);
    if (!product && !validProduct) return;
    insertProduct(product!)
      .then(Ok(setLoading, product?.name ?? "", "added"))
      .catch(errHandler(setLoading, setError));
  }, [product, validProduct]);

  return {
    createProduct,
    product,
    validProduct,
    productLoading,
    productInsert,
    error,
  };
}

export const randomProduct = () =>
  ({
    productId: Date.now().toString(36),
    categoryId: "m0txakzd",
    price: parseFloat(faker.commerce.price()),
    stock: 10,
    active: true,
    name: faker.commerce.product(),
    slug: `skin-care/${faker.commerce.product().toLowerCase()}`,
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    dimensions: faker.commerce.productAdjective(),
    remarks: faker.commerce.productAdjective(),
    short: faker.commerce.productAdjective(),
    createdBy: "m0twy921",
  }) satisfies InsertProduct;

const dummyProduct = {
  productId: Date.now().toString(36),
  name: "Secura Extra Large",
  description:
    "Transparent, silky smooth condoms Extra Large from Secura Condoms with more size and comfort for the larger penis. With silicone-based coating and reservoir. Odourless and tasteless. Length 180 mm, nominal width 60 mm. 48 pieces",
  price: 2250,
  stock: 200,
  material: "Synthetic Skin",
  imageUrl: "img003",
  slug: "make-up/lipstick",
  dimensions: "4g",
  short: "For hung.",
  categoryId: "m0txakzd", // Assuming categoryId for skincare
  active: true,
  liveMode: false,
  remarks: "Best seller",
  createdBy: "m0twy921",
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
