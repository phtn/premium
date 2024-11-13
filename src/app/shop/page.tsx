import { preloadQuery } from "convex/nextjs";
import { ShopGrid } from "./shop-grid";
import { api } from "@vex/api";
export interface ShopPageProps {
  params: {
    slug: string[] | undefined;
  };
}
export default async function ShopPage({ params }: ShopPageProps) {
  const preloadedProducts = await preloadQuery(api.products.get.all);
  const preloadedCategories = await preloadQuery(api.categories.get.all);
  return (
    <ShopGrid
      slug={params.slug}
      preloadedp={preloadedProducts}
      preloadedc={preloadedCategories}
    />
  );
}
