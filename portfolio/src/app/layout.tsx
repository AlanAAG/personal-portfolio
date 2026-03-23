import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/layout/Header";
import SocialLinks from "@/components/ui/SocialLinks";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StickyNav from "@/components/layout/StickyNav";
import Footer from "@/components/layout/Footer";

import CanvasSystem from "@/components/layout/CanvasSystem";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Alan Ayala — Creative Developer",
  description:
    "Full-stack engineer & creative developer building high-end digital experiences. Based globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white antialiased selection:bg-white/20`}
      >
        <CanvasSystem />
        <CustomCursor />
        <SocialLinks />
        <ScrollProgress />
        <StickyNav />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
