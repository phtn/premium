import { type Metadata } from "next";
export const generateMetadata = (): Metadata => ({ title: "Sign up" });
export default async function SignupPage() {
  return <h1>Sign up</h1>;
}
