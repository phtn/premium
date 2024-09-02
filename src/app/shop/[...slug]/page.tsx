import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getCategoryBySlug,
  getAllProducts,
  getAllCategories,
} from "@/lib/static-api/get";
import { ProductDetails } from "@/components/shop/product-details";
import CategoryListing from "@/components/shop/cat-list";

export default async function ShopPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  console.log(slug);

  // Try to fetch product
  const product = await getProductBySlug(slug);
  if (product) {
    return <ProductDetails product={product} />;
  }

  // If not a product, try to fetch category
  const category = await getCategoryBySlug(slug);
  if (category) {
    return <CategoryListing category={category} />;
  }

  // If neither product nor category found, return 404
  notFound();
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return [
    ...products.map((product) => ({ slug: product.slug.split("/") })),
    ...categories.map((category) => ({ slug: category.slug.split("/") })),
  ];
}
