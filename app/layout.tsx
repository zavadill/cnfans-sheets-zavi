import type { Metadata } from "next";
import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";


export const metadata: Metadata = {
  // Základní SEO
  title: {
    default: 'TheVault - Best Finds with Links',
    template: '%s | TheVault' // Např. "Shoes | TheVault"
  },
  description: 'Discover the best items, shoes, hoodies, and accessories. Verified QC photos, links, and the best prices all in one place.',
  
  // Klíčová slova pro vyhledávače
  keywords: ['cnfans', 'spreadsheet', 'finds', 'reps', 'fashion', 'jordan', 'nike', 'best finds'],
  
  // Autoři
  authors: [{ name: 'Zavi' }],
  
  // OpenGraph (Facebook, Discord, iMessage)
  openGraph: {
    title: 'TheVault - Best Finds with Links',
    description: 'Discover the best items, shoes, hoodies, and accessories.',
    url: 'https://thevaultfinds.com',
    siteName: 'TheVault Finds',
    images: [
      {
        url: '/og.avif', // Automaticky se načte z public/ nebo app/
        width: 1200,
        height: 630,
        alt: 'TheVault Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card (X) - důležité pro velký náhled
  twitter: {
    card: 'summary_large_image',
    title: 'TheVault - Best Finds',
    description: 'Discover the best items, shoes, and accessories.',
    images: ['/og.avif'],
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
