import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppProvider";
import { Analytics } from '@vercel/analytics/next';

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

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cong & Duyen | Wedding Invitation",
  description: "Join us to celebrate our special day",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${poppins.variable} antialiased bg-white`}
      >
        <AppProvider>
          {children}
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
