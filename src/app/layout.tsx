import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3Security",
  description: "Secure Your Web3 Assets with Confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0D0D0D] text-white font-sans">
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col gap-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
