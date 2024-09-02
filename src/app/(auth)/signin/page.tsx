import { type Metadata } from "next";
import { Lobby } from "./content";

export const generateMetadata = (): Metadata => ({ title: "Sign in" });
export default async function SigninPage() {
  return <Lobby />;
}
