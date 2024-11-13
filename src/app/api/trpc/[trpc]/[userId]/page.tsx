import { CartContent } from "./content";

interface CartPageProps {
  params: {
    userId: string | null;
  };
}
export default async function CartPage({ params }: CartPageProps) {
  return <CartContent userId={params.userId} />;
}
