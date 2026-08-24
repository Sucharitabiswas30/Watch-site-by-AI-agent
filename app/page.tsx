import type { Metadata } from "next";
import { headers } from "next/headers";
import Storefront from "./Storefront";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "Aevum Watches — Made for the moments that matter";
  const description = "Discover considered watches for modern life, crafted in small collections.";
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image, width: 1536, height: 1024, alt: "Aevum watch campaign" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function Home() {
  return <Storefront />;
}
