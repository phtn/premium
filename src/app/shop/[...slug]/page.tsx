import { ShopContent } from "./content";
import type { ShopPageProps } from "../page";

export default async function ShopPage({ params }: ShopPageProps) {
  return <ShopContent slug={params?.slug} />;
}
