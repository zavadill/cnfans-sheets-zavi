import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import QrCode from "./components/QrCode";
import Footer from "./components/Footer";



export default function RootLayout({



  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        <QrCode />
        {children}
        <Footer />
      </body>
    </html>
  );
}
