"use client";

import { Tab, Tabs } from "@nextui-org/react";
import useDb from "./hooks";
// import CategoryGrid from "@/components/shop/cat-grid";
import { ProductList } from "@/components/shop/product-list";

export const ShopGrid = () => {
  const { categories, products } = useDb();
  const productsByCategory = (categorySlug: string) =>
    products?.filter((product) => product.slug?.startsWith(categorySlug));

  return (
    <div className="flex w-full flex-col px-4">
      <Tabs>
        <Tab
          key={"all"}
          title={
            <div className="flex items-center space-x-2 px-2 capitalize">
              <span>{"All"}</span>
            </div>
          }
        >
          <ProductList products={products} />
        </Tab>
        {categories?.map((category) => (
          <Tab
            key={category.categoryId}
            title={
              <div className="flex items-center space-x-2 capitalize">
                <span>{category.name}</span>
              </div>
            }
          >
            <ProductList products={productsByCategory(category.slug!)} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
