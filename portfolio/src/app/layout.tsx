import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/layout/Header";
import SocialLinks from "@/components/ui/SocialLinks";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StickyNav from "@/components/layout/StickyNav";
import FluidBackground from "@/components/canvas/FluidBackground";
import NoiseCanvas from "@/components/canvas/NoiseCanvas";

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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white antialiased selection:bg-white/20`}
      >
        <FluidBackground />
        <NoiseCanvas />
        <CustomCursor />
        <SocialLinks />
        <ScrollProgress />
        <StickyNav />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
