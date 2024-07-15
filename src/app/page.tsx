import { PageContent } from "./content";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-500 to-amber-400/50 text-white">
      <PageContent />
    </main>
  );
}
