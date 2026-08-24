import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimations from "./ScrollAnimations";

export const metadata: Metadata = {
  title: "Aevum Watches",
  description: "Considered watches for modern life.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ScrollAnimations />{children}</body>
    </html>
  );
}
