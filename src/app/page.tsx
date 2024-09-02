import { PageCont } from "./content";
import type { Metadata } from "next";
export const generateMetadata = (): Metadata => ({ title: "Main" });
export default async function Main() {
  return <PageCont />;
}
