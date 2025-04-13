import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppProvider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  title: "Công & Duyên | Thiệp mời cưới",
  description: "Trân trọng kính mời quý vị đến dự lễ cưới của chúng tôi",
  metadataBase: new URL('https://congduyen.vercel.app'),
  applicationName: 'Công & Duyên Wedding',
  keywords: ['đám cưới', 'thiệp mời', 'lễ cưới', 'Công và Duyên'],
  authors: [{ name: 'Công & Duyên' }],
  creator: 'Công & Duyên',
  publisher: 'Công & Duyên',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Công & Duyên | Thiệp mời cưới',
    description: 'Trân trọng kính mời quý vị đến dự lễ cưới của chúng tôi',
    siteName: 'Đám cưới Công & Duyên',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Thiệp mời cưới Công & Duyên',
      },
      {
        url: '/hero1.jpg', // Alternative image for platforms that may support multiple images
        width: 1200,
        height: 630,
        alt: 'Thiệp mời cưới Công & Duyên',
      }
    ],
    locale: 'vi_VN',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Công & Duyên | Thiệp mời cưới',
    description: 'Trân trọng kính mời quý vị đến dự lễ cưới của chúng tôi',
    images: ['/hero.jpg'],
    creator: '@congduyen',
    site: '@congduyen',
  },
  other: {
    // WhatsApp optimization
    'og:image:width': '1200',
    'og:image:height': '630',

    // Mobile app tags
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Công & Duyên',
    'mobile-web-app-capable': 'yes',

    // Character encoding ensures proper display of Vietnamese characters
    'charset': 'UTF-8',
  },
  icons: {
    icon: '/favicon.svg',
    apple: [
      { url: '/favicon.svg' }
    ],
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
          <SpeedInsights />
        </AppProvider>
      </body>
    </html>
  );
}
