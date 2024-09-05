import { type Metadata } from "next";
import { ListContent } from "./content";
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
const TestLabPage = ({ params }: TestLabPageProps) => (
  <ListContent {...params} />
);
export default TestLabPage;
