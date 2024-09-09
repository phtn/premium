"use client";

import { ProductList } from "@/components/shop/product-list";
import { ProductDetails } from "@/components/shop/product-details";
import useDb from "../hooks";
import { Loader } from "@/components/ui/loader";

export const ShopContent = (props: { slug: string[] }) => {
  const slug = props.slug.join("/");
  const productSlug = props.slug.slice(0, 1).join("/");

  const { products, categories, loading } = useDb();

  const category = categories?.find((c) => c.slug === slug) ?? null;
  const product = products
    ?.filter((p) => p.slug?.startsWith(productSlug))
    .find((p) => p.productId === props.slug?.[2]);

  if (loading) {
    return <Loader label={"loading product details"} sm />;
  }

  if (category) {
    return <ProductList products={products} />;
  }

  if (product) {
    return <ProductDetails product={product} category={category} />;
  } else {
    // notFound();
  }

  // const productsByCat = products?.filter((product) =>
  //   product.slug?.startsWith(slug),
  // );
};
