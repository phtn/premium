import { Dashboard } from "./content";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel",
  icons: [{ rel: "icon", url: "/svg/re-up_admin_logo.svg" }],
};
const AdminPage = () => <Dashboard />;
export default AdminPage;
