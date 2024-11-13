import { ShopContent } from "./content";
import type { ShopPageProps } from "../page";
import { preloadQuery } from "convex/nextjs";
import { api } from "@vex/api";

export default async function ShopPage({ params }: ShopPageProps) {
  const preloadedProducts = await preloadQuery(api.products.get.all);
  const preloadedCategories = await preloadQuery(api.categories.get.all);
  return (
    <ShopContent
      slug={params?.slug}
      preloadedp={preloadedProducts}
      preloadedc={preloadedCategories}
    />
  );
}
