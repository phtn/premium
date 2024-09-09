import { ShopGrid } from "./shop-grid";

export interface ShopPageProps {
  params: {
    slug: string[] | undefined;
  };
}
export default async function ShopPage({ params }: ShopPageProps) {
  console.log(params);
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mx-auto flex h-[calc(100vh*0.2)] w-full flex-col justify-end space-y-3 p-6 px-4 py-8 leading-none text-neutral-950">
        <h1 className="font-ibm text-3xl tracking-tight">
          {params.slug?.length === 1 ? `Products` : "Shop by category"}
        </h1>
        <div>
          <p className="text-sm font-light tracking-tight">
            From community favourites to about-to-sell-out items, see them all
            here.
          </p>
        </div>
        <p className="w-fit rounded-full bg-default-800 px-2.5 py-1 text-xs font-medium text-white">
          Categories
        </p>
      </div>
      <ShopGrid />
    </div>
  );
}
