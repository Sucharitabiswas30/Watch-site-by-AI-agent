import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { collectionProducts } from "../../collection-data";
import ProductDetail from "./ProductDetail";

type ProductPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return collectionProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = collectionProducts.find((item) => item.id === id);
  if (!product) return { title: "Watch not found — Aevum Watch Co.", description: "The requested Aevum watch could not be found.", openGraph: { title: "Watch not found — Aevum Watch Co.", description: "The requested Aevum watch could not be found.", images: [] }, twitter: { title: "Watch not found — Aevum Watch Co.", description: "The requested Aevum watch could not be found.", images: [] } };

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}${product.image}`;
  const title = `${product.name} — Aevum Watch Co.`;
  const description = `${product.wearer}'s ${product.category.toLowerCase()} watch with a ${product.size.toLowerCase()} case and ${product.movement.toLowerCase()} movement.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image, alt: product.name }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = collectionProducts.find((item) => item.id === id);
  if (!product) notFound();
  const related = collectionProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <ProductDetail product={product} related={related} />;
}
