import CategoryGrid from "@/components/shop/cat-grid";

export default async function ShopPage() {
  return (
    <div className="container mx-auto">
      <CategoryGrid categories={[]} />
    </div>
  );
}
