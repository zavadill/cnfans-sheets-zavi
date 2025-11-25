import type { Metadata } from "next";
import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";


export const metadata: Metadata = {
  title: 'TheVault - Best Finds with Links',
  description: 'Discover the best items, shoes, hoodies, and accessories. Photos, links, and the best prices all in one place.',
  keywords: ['finds', 'qc photos', 'fashion', 'sneakers', 'cnfans', 'links', 'TheVault', 'spreadsheet'],
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
