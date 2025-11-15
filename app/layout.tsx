import type { Metadata } from "next";
import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: 'TheVault - Best QC Photos & Links',
  description: 'Discover the best items, shoes, hoodies, and accessories. QC photos, links, and the best prices all in one place.',
  // Můžeš přidat i klíčová slova (i když Google je spíš ignoruje)
  keywords: ['finds', 'qc photos', 'fashion', 'sneakers'],
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
      </body>
    </html>
  );
}
