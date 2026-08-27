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
        url: "/logo-preview.png",
        secureUrl: "https://saj-jewelers.vercel.app/logo-preview.png",
        width: 500,
        height: 500,
        type: "image/png",
        alt: "Saj Jewelers Logo",
      },
      {
        url: "/logo-preview.jpg",
        secureUrl: "https://saj-jewelers.vercel.app/logo-preview.jpg",
        width: 500,
        height: 500,
        type: "image/jpeg",
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
    images: ["/logo-preview.png"],
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
      <head>
        <meta property="og:image" content="https://saj-jewelers.vercel.app/logo-preview.png" />
        <meta property="og:image:secure_url" content="https://saj-jewelers.vercel.app/logo-preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content="Saj Jewelers Logo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://saj-jewelers.vercel.app/logo-preview.png" />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
