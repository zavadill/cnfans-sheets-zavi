import type { Metadata } from "next";
import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Důležité pro relativní cesty k obrázkům
  title: {
    default: 'TheVault - Best Finds with Links',
    template: '%s | TheVault'
  },
  description: 'Discover the best items, shoes, hoodies, and accessories. Photos, links, and the best prices all in one place.',
  keywords: ['finds', 'qc photos', 'fashion', 'sneakers', 'cnfans', 'links', 'TheVault', 'spreadsheet'],
  
  // --- ZDE JE OG IMAGE NASTAVENÍ ---
  openGraph: {
    title: 'TheVault - Best Finds with Links',
    description: 'Discover the best items, shoes, hoodies, and accessories.',
    url: 'https://thevaultfinds.com', // Tvoje doména
    siteName: 'TheVault',
    images: [
      {
        url: '/og.avifg', // Cesta k obrázku ve složce public
        width: 1200,
        height: 630,
        alt: 'TheVault Preview Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Nastavení pro Twitter (X)
  twitter: {
    card: 'summary_large_image',
    title: 'TheVault - Best Finds with Links',
    description: 'Discover the best items, shoes, hoodies, and accessories.',
    images: ['/og.avif'], // Stejná cesta
  },
};

export default function RootLayout({



  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
