import { createContext, type PropsWithChildren, useContext } from "react";
import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import { env } from "@/env";
import { api } from "@vex/api";
import { type InsertCategory } from "convex/categories/create";
import { type Category } from "@/server/db/zod.category";
import { type Product } from "@/server/db/zod.product";
import { type InsertProduct } from "convex/products/create";

export const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

interface VexCtxValues {
  product: {
    create: (
      args: InsertProduct,
    ) => Promise<(string & { __tableName: "products" }) | null>;
    get: {
      all: () => Product[] | undefined;
      byId: (id: string) => Promise<Product | null>;
    };
    delete: {
      byId: (id: string) => Promise<null>;
    };
  };
  category: {
    create: (
      args: InsertCategory,
    ) => Promise<(string & { __tableName: "categories" }) | null>;
    get: {
      all: () => Category[] | undefined;
      byId: (id: string) => Promise<Category | null>;
    };
    delete: {
      byId: (id: string) => Promise<null>;
    };
  };
}

export const Vex = ({ children }: PropsWithChildren) => {
  return (
    <ConvexProvider client={convex}>
      <VexCtxProvider>{children}</VexCtxProvider>
    </ConvexProvider>
  );
};

const VexCtxProvider = ({ children }: PropsWithChildren) => {
  const createProduct = useMutation(api.products.create.default);
  const deleteProduct = useMutation(api.products.delete.byId);
  const getAllProducts = useQuery(api.products.get.all);
  const getProductById = useMutation(api.products.get.byId);

  const product = {
    create: (args: InsertProduct) => createProduct(args),
    get: {
      all: () => getAllProducts,
      byId: (id: string) => getProductById({ product_id: id }),
    },
    delete: {
      byId: (id: string) => deleteProduct({ product_id: id }),
    },
  };

  const createCategory = useMutation(api.categories.create.default);
  const deleteCategory = useMutation(api.categories.delete.byId);
  const getAllCategory = useQuery(api.categories.get.all);
  const getCategoryById = useMutation(api.categories.get.byId);

  const category = {
    create: (args: InsertCategory) => createCategory(args),
    get: {
      all: () => getAllCategory,
      byId: (id: string) => getCategoryById({ category_id: id }),
    },
    delete: {
      byId: (id: string) => deleteCategory({ category_id: id }),
    },
  };
  return (
    <VexCtx.Provider value={{ product, category }}>{children}</VexCtx.Provider>
  );
};

const VexCtx = createContext<VexCtxValues | null>(null);
export const useVex = () => {
  const context = useContext(VexCtx);
  if (!context) throw new Error();
  return context;
};
