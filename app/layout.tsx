import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saj Jewelers - Exclusive Jewellery Collection",
  description: "Explore our latest collection of Gold and Diamond Jewellery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
