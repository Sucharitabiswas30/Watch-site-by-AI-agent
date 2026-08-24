import type { Metadata } from "next";
import CollectionPage from "./CollectionPage";

export const metadata: Metadata = {
  title: "All Watches — Aevum Watch Co.",
  description: "Explore 60 demo watches across automatic, chronograph, leather, minimal, and field collections.",
};

export default async function CollectionsRoute({ searchParams }: { searchParams: Promise<{ wearer?: string; category?: string; search?: string }> }) {
  const params = await searchParams;
  const initialWearer = params.wearer === "Men" || params.wearer === "Women" ? params.wearer : "All";
  const initialCategory = params.category === "Automatic" || params.category === "Chronograph" || params.category === "Leather" || params.category === "Minimal" || params.category === "Field" ? params.category : "All";
  const initialQuery = typeof params.search === "string" ? params.search.slice(0, 80) : "";
  return <CollectionPage initialWearer={initialWearer} initialCategory={initialCategory} initialQuery={initialQuery} />;
}
