import { type Metadata } from "next";
import { AddContent } from "./content";
import { preloadQuery } from "convex/nextjs";
import { api } from "@vex/api";
export const metadata: Metadata = {
  title: "Admin - Add Entities",
  description: "CRUD ops",
  icons: [{ rel: "icon", url: "/svg/oh.svg" }],
};
interface AddPageProps {
  params: {
    tab: string;
  };
}

const AddPage = async ({ params }: AddPageProps) => {
  const preloadedProducts = await preloadQuery(api.products.get.all);
  const preloadedCategories = await preloadQuery(api.categories.get.all);
  return (
    <AddContent
      tab={params.tab}
      preloadedProducts={preloadedProducts}
      preloadedCategories={preloadedCategories}
    />
  );
};
export default AddPage;
