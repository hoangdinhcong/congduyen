import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cong & Duyen | Wedding Invitation",
  description: "Join us to celebrate our special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-white text-secondary`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
