import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimations from "./ScrollAnimations";

export const metadata: Metadata = {
  title: "Aevum Watches",
  description: "Considered watches for modern life.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
