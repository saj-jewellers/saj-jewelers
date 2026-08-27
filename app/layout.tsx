import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saj-jewelers.vercel.app"),
  title: {
    default: "Saj Jewelers - Exclusive Jewellery Collection",
    template: "%s | Saj Jewelers",
  },
  description: "Explore our latest exclusive collection of Gold, Diamond, and Silver Jewellery designs at Saj Jewelers.",
  openGraph: {
    title: "Saj Jewelers - Exclusive Jewellery Collection",
    description: "Explore our latest exclusive collection of Gold, Diamond, and Silver Jewellery designs at Saj Jewelers.",
    url: "https://saj-jewelers.vercel.app",
    siteName: "Saj Jewelers",
    images: [
      {
        url: "/logo.png",
        width: 760,
        height: 760,
        alt: "Saj Jewelers Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Saj Jewelers - Exclusive Jewellery Collection",
    description: "Explore our latest exclusive collection of Gold, Diamond, and Silver Jewellery designs at Saj Jewelers.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/logo.png" }
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
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
