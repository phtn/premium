"use client";

import { ProductList } from "@/components/shop/product-list";
import { ProductDetails } from "@/components/shop/product-details";
import { Loader } from "@/components/ui/loader";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { type api } from "@vex/api";
import { useState } from "react";

interface ShopContentProps {
  slug: string[] | undefined;
  preloadedp: Preloaded<typeof api.products.get.all>;
  preloadedc: Preloaded<typeof api.categories.get.all>;
}
export const ShopContent = ({
  slug,
  preloadedp,
  preloadedc,
}: ShopContentProps) => {
  const [loading] = useState(false);
  const s = slug?.join("/");
  const productSlug = slug?.slice(0, 1).join("/");

  const products = usePreloadedQuery(preloadedp);
  const categories = usePreloadedQuery(preloadedc);

  const category = categories?.find((c) => c.slug === s) ?? null;
  const product =
    productSlug &&
    products
      ?.filter((p) => p.slug?.startsWith(productSlug))
      .find((p) => p.product_id === slug?.[2]);

  if (loading) {
    return <Loader label={"loading product details"} sm />;
  }

  if (category) {
    return <ProductList products={products} />;
  }

  if (product) {
    return <ProductDetails product={product} category={category} />;
  }

  // const productsByCat = products?.filter((product) =>
  //   product.slug?.startsWith(slug),
  // );
};
