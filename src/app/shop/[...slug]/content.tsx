"use client";

import { ProductList } from "@/components/shop/product-list";
import { ProductDetails } from "@/components/shop/product-details";
import { Loader } from "@/components/ui/loader";
import { useDBContext } from "@/app/ctx";

export const ShopContent = (props: { slug: string[] | undefined }) => {
  const slug = props.slug?.join("/");
  const productSlug = props.slug?.slice(0, 1).join("/");

  const { products, categories, loading } = useDBContext();

  const category = categories?.find((c) => c.slug === slug) ?? null;
  const product =
    productSlug &&
    products
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
  }

  // const productsByCat = products?.filter((product) =>
  //   product.slug?.startsWith(slug),
  // );
};
