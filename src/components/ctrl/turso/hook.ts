import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";
import { insertUser } from "@/lib/db/user";
import { errHandler, guid, Ok } from "@/utils/helpers";
import { InsertUserSchema } from "@/server/db/zod.user";
import type { InsertAdmin, InsertUser } from "@/server/db/schema";
import { CategorySchema } from "@/server/db/zod.category";
import { type Product, ProductSchema } from "@/server/db/zod.product";
// import { insertProduct } from "@/lib/db/product";
import { InsertAdminSchema } from "@/server/db/zod.admin";
import { insertAdmin } from "@/lib/db/admin";
import { type InsertCategory } from "convex/categories/create";
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
  name: "Skin Care",
  slug: "skincare",
  description:
    "Discover the ultimate in skincare with our carefully curated collection, designed to nurture and rejuvenate every skin type. From luxurious moisturizers and gentle cleansers to potent serums and exfoliators, each product is crafted with the finest ingredients to help you achieve a radiant, healthy glow. Our skincare selection includes formulas that address a range of needs—whether it's hydration, anti-aging, acne control, or simply maintaining a balanced, natural complexion. Embrace a skincare routine that’s as unique as you are, and let your natural beauty shine every day. Explore our collection and find your new skincare essentials!",
  photo_url:
    "https://rustans.com/cdn/shop/files/LM_HR_PACKSHOTIMAGE_1_8_RGB.jpg?v=1725239864&width=1400",
  remarks: "For men & women.",
} satisfies InsertCategory;

export function useProductDB() {
  const [product, setProduct] = useState<object>({});
  const [validProduct, setValidProduct] = useState(false);
  const [productLoading, setLoading] = useState(false);
  const [error] = useState<Error>();

  const createProduct = () => {
    // const newProduct = randomProduct();
    setProduct(dummyProduct);
    setValidProduct(ProductSchema.safeParse(dummyProduct).success);
  };

  const productInsert = useCallback(() => {
    setLoading(true);
    if (!product && !validProduct) return;
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

export const randomProduct = () => ({
  product_id: Date.now().toString(36),
  category_id: "m0txakzd",
  price: parseFloat(faker.commerce.price()),
  in_stock: 10,
  is_active: true,
  name: faker.commerce.product(),
  slug: `skin-care/${faker.commerce.product().toLowerCase()}`,
  description: faker.commerce.productDescription(),
  material: faker.commerce.productMaterial(),
  dimensions: faker.commerce.productAdjective(),
  remarks: faker.commerce.productAdjective(),
  short_desc: faker.commerce.productAdjective(),
  created_by: "m0twy921",
  updated_at: Date.now(),
  updated_by: "",
});

const dummyProduct = {
  product_id: guid(),
  name: "Secura Extra Large",
  description:
    "Transparent, silky smooth condoms Extra Large from Secura Condoms with more size and comfort for the larger penis. With silicone-based coating and reservoir. Odourless and tasteless. Length 180 mm, nominal width 60 mm. 48 pieces",
  price: 2250,
  in_stock: 200,
  material: "Synthetic Skin",
  photo_url: "img003",
  slug: "make-up/lipstick",
  dimensions: "4g",
  short_desc: "For hung.",
  category_id: "m0txakzd", // Assuming categoryId for skincare
  is_active: true,
  is_live: false,
  remarks: "Best seller",
  created_by: "m0twy921",
  updated_at: Date.now(),
  updated_by: "admin",
} satisfies Omit<Product, "_id" | "_creationTime">;

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
