import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audio-wide",
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TherapAI – AI-Powered Mental Health Support",
  description: "Accessible, stigma-free therapy sessions powered by AI. Support for individuals and organizations, anytime, anywhere.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} ${montserrat.variable} antialiased bg-[#121212]`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
