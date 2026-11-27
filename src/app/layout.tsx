import type { Metadata, Viewport } from "next";
import { Newsreader, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import ProgressBar from "@/components/ProgressBar";
import SideIndex from "@/components/SideIndex";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  adjustFontFallback: false,
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giorgi Dalakishvili",
  description: "AI Solution Engineer in Tbilisi. What I have shipped and how I build.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${hand.variable}`}
    >
      <body>
        <ProgressBar />
        <div className="wrap">
          <SideIndex />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
