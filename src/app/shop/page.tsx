import { getAllCategories } from "@/lib/static-api/get";
import CategoryGrid from "@/components/shop/cat-grid";

export default async function ShopHomePage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Welcome to Our Shop</h1>
      <CategoryGrid categories={categories} />
    </div>
  );
}
