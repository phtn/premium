import { type Metadata } from "next";
export const generateMetadata = (): Metadata => ({ title: "Recovery" });
export default async function RecoveryPage() {
  return <h1>Recovery</h1>;
}
