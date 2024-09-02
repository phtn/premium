import { type Product } from "@/types/shop";
import ProductImage from "./product-image";
import AddToCartButton from "./add-to-cart";

export async function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductImage src={product.name} />
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-xl font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6">{product.id}</p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
