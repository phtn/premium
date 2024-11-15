import { type Metadata } from "next";
import { TestLabContent } from "./content";
import { preloadQuery } from "convex/nextjs";
import { api } from "@vex/api";
export const metadata: Metadata = {
  title: "Admin - Inventory",
  description: "Inventory Page",
  icons: [{ rel: "icon", url: "/svg/re-up_admin_logo.svg" }],
};
interface TestLabPageProps {
  params: {
    id: string;
  };
}

const TestLabPage = async ({ params }: TestLabPageProps) => {
  const preloadedProducts = await preloadQuery(api.products.get.all);
  const preloadedCategories = await preloadQuery(api.categories.get.all);
  return (
    <TestLabContent
      {...params}
      preloadedProducts={preloadedProducts}
      preloadedCategories={preloadedCategories}
    />
  );
};
export default TestLabPage;
