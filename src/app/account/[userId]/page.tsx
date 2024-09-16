import { AccountContent } from "./content";

interface AccountPageProps {
  params: {
    userId: string | null;
  };
}
export default async function AccountPage({ params }: AccountPageProps) {
  return <AccountContent userId={params.userId} />;
}
