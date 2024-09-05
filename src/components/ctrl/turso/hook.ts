import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";
import { insertUser } from "@/lib/db/user";
import { errHandler, Ok } from "@/utils/helpers";
import { InsertUserSchema } from "@/server/db/zod.user";
import type { InsertUser } from "@/server/db/schema";
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
    name: faker.commerce.department(),
    description: faker.commerce.product(),
    createdBy: faker.internet.userName(),
    photoURL: faker.image.avatarGitHub(),
    remarks: faker.commerce.productAdjective(),
  }) satisfies InsertCategory;

export function useProductDB() {
  const [product, setProduct] = useState<InsertProduct>();
  const [validProduct, setValidProduct] = useState(false);
  const [productLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const createProduct = () => {
    const newProduct = randomProduct();
    setProduct(newProduct);
    setValidProduct(InsertProductSchema.safeParse(newProduct).success);
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

const randomProduct = () =>
  ({
    productId: Date.now().toString(36),
    categoryId: "m0oo0wsa",
    price: parseFloat(faker.commerce.price()),
    stock: 10,
    active: true,
    name: faker.commerce.product(),
    description: faker.commerce.productMaterial(),
    remarks: faker.commerce.productAdjective(),
    createdBy: faker.internet.userName(),
  }) satisfies InsertProduct;
