import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const hand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "Babul-Portfolio",
  description: "Fullstack Web & Mobile Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hand.variable} antialiased bg-[#2b2b2b] bg-[url('/blackboard-bg.jpg')] bg-cover bg-fixed bg-center min-h-screen text-white font-hand overflow-x-hidden`}
      >
        <div className="fixed inset-0 bg-black/10 pointer-events-none z-0" />
        <Navbar />
        <main className="relative z-10 w-full min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
