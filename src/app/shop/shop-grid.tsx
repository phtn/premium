"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import { ProductList } from "@/components/shop/product-list";
import { useDBContext } from "../ctx";
import {
  useCallback,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { SwatchIcon } from "@heroicons/react/24/outline";
import { LoaderIcon } from "lucide-react";

interface ShopGridProps {
  slug: string[] | undefined;
  children?: ReactNode;
}
export const ShopGrid = ({ slug }: ShopGridProps) => {
  const { products, categories, loading } = useDBContext();

  const productsByCategory = useCallback(
    (categorySlug: string) =>
      products?.filter((product) => product.slug?.startsWith(categorySlug)),
    [products],
  );

  const [index, setIndex] = useState<number>(0);

  const Twilight = useCallback(
    ({ children }: PropsWithChildren) => {
      const themes: string[] = [
        "from-stone-50/50 via-zinc-50/50 to-default-50/50",
        "from-blue-100 via-pink-100 to-sky-100",
        "from-cyan-100 via-fuchsia-50 to-slate-100",
        "from-teal-100 via-gray-50 to-emerald-100",
        "from-stone-100 via-zinc-50 to-neutral-100",
        "from-yellow-100 via-cyan-50 to-teal-100",
        "from-sky-100 via-red-100 to-slate-50",
      ];

      const handleToss = () => {
        // const rand = Math.ceil(Math.round(Math.random() * 10) / themes.length - 1);
        const rand = Math.random() * themes.length;
        setIndex(Math.floor(rand));
      };
      return (
        <div
          className={cn(
            "h-[250px] overflow-auto px-16 leading-none text-gray-800 portrait:px-4",
            "relative flex w-full items-start",
            "bg-[conic-gradient(at_top_center,_var(--tw-gradient-stops))] backdrop-blur-lg",
            themes[index ?? 0],
          )}
        >
          <div className="z-[100] flex h-20 items-end space-x-8 portrait:h-12">
            <Button
              className="pointer-events-auto relative rounded-full"
              onClick={handleToss}
              isIconOnly
              size="sm"
              variant="solid"
              color="secondary"
            >
              <SwatchIcon className="size-5 stroke-1 text-default-600" />
            </Button>
          </div>
          {children}
        </div>
      );
    },
    [index],
  );

  return (
    <div className="relative mt-8 flex w-screen flex-col items-center justify-center overflow-x-clip border-t-[0.33px]">
      <Twilight>
        <div className="flex h-20 w-[10rem] items-end justify-end px-1 portrait:h-12 portrait:w-fit">
          <h1 className={cn("font-ibm text-lg font-medium", `${slug?.[0]}`)}>
            Shop by Category
          </h1>
        </div>
      </Twilight>
      <div className="absolute top-20 z-50 mx-2 flex flex-col items-center justify-center portrait:w-screen">
        <Tabs
          color="warning"
          variant="solid"
          className="my-6 rounded-xl opacity-100 shadow-md"
        >
          <Tab
            key={"all"}
            className="m-1.5"
            title={
              <div className="flex items-center space-x-2 capitalize">
                {loading ? (
                  <LoaderIcon className="size-4 text-gray-800" />
                ) : (
                  "All"
                )}
              </div>
            }
          >
            <div className="flex flex-col">
              <ProductList products={products} />
            </div>
          </Tab>
          {categories?.map((category) => (
            <Tab
              key={category.categoryId}
              className="m-1.5"
              title={
                <div className="flex items-center space-x-2 capitalize">
                  <span>{category.name}</span>
                </div>
              }
            >
              <div className="flex flex-col">
                <ProductList products={productsByCategory(category.slug!)} />
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
