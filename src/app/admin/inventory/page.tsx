import { type Metadata } from "next";
import { InventoryContent } from "./content";
export const metadata: Metadata = {
  title: "Admin - Inventory",
  description: "Inventory Page",
  icons: [{ rel: "icon", url: "/svg/re-up_admin_logo.svg" }],
};
const InventoryPage = () => <InventoryContent />;
export default InventoryPage;
