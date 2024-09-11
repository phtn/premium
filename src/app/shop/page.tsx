import { ShopGrid } from "./shop-grid";
export interface ShopPageProps {
  params: {
    slug: string[] | undefined;
  };
}
export default async function ShopPage({ params }: ShopPageProps) {
  return <ShopGrid slug={params.slug} />;
}
