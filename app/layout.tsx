import type { Metadata } from "next";
import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"


const roboto = Roboto({
  weight: ['400', '500', '700'], // Vyber tloušťky, které potřebuješ
  subsets: ['latin'],
  variable: '--font-roboto', // Důležité: Jméno CSS proměnné
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair', // Důležité: Jméno CSS proměnné
  display: 'swap',
});

export const metadata: Metadata = {
  // Základní SEO
  title: {
    default: 'TheVault - Best Finds with Links',
    template: '%s | TheVault' // Např. "Shoes | TheVault"
  },
  description: 'Discover the best items, shoes, hoodies, and accessories. Verified QC photos, links, and the best prices all in one place.',
  
  // Klíčová slova pro vyhledávače
  keywords: ['cnfans', 'spreadsheet', 'finds', 'fashion', 'jordan', 'nike', 'best finds'],
  
  // OpenGraph (Facebook, Discord, iMessage)
  openGraph: {
    title: 'TheVault - Best Finds with Links',
    description: 'Discover the best items, shoes, hoodies, and accessories.',
    url: 'https://thevaultfinds.com',
    siteName: 'TheVault Finds',
    images: [
      {
        url: '/og.png', // Automaticky se načte z public/ nebo app/
        width: 400,
        height: 250,
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
    images: ['/og.png'],
  },
};


export default function RootLayout({



  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${playfair.variable} relative font-sans antialiased`}>
        <NavBar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
