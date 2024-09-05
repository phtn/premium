import Link from "next/link";
// import { getProductsByCategory } from "@/lib/static-api/get";
import ProductImage from "./product-image";
import type { SelectProduct, SelectCategory } from "@/server/db/schema";

async function CategoryListing(props: {
  category: SelectCategory;
  products: SelectProduct[] | null;
}) {
  // const products = await getProductsByCategory(category.name);
  const { category, products } = props;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{category.name}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <Link
            href={`/shop/${product.name}`}
            key={product.productId}
            className="group"
          >
            <div className="rounded-lg border p-4 transition-shadow hover:shadow-lg">
              <ProductImage
                src={category.photoURL ?? ""}
                className="mb-4 h-48 w-full object-cover"
              />
              <h2 className="mb-2 text-lg font-semibold group-hover:text-blue-600">
                {product.name}
              </h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryListing;
