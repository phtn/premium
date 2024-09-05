import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/shop/product-details";
import CategoryListing from "@/components/shop/cat-list";
// import { getAllCategories } from "@/lib/db/category";
// import { getAllProducts } from "@/lib/db/product";
import { useContext } from "react";
import { DB } from "@/app/ctx";

export default async function ShopPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const ctxDB = useContext(DB);

  const getCategoryBySlug = (slug: string) =>
    ctxDB?.categories?.find((c) => c.name === slug) ?? null;

  const getProductsByCategory = (slug: string) =>
    ctxDB?.products?.filter((product) => product.name.startsWith(slug));

  const slug = params.slug.join("/");

  // Try to fetch product
  const product = ctxDB?.products?.find((p) => p.name === slug);
  if (product) {
    return <ProductDetails product={product} />;
  }

  // If not a product, try to fetch category
  const category = getCategoryBySlug(slug);
  if (category) {
    const products = getProductsByCategory(category.name);
    return <CategoryListing category={category} products={products ?? []} />;
  }

  // If neither product nor category found, return 404
  notFound();
}

// export async function generateStaticParams() {
//   const products = await getAllProducts();
//   const categories = await getAllCategories();

//   return [
//     ...products.map((product) => ({ slug: product.name.split("/") })),
//     ...categories.map((category) => ({ slug: category.name.split("/") })),
//   ];
// }
