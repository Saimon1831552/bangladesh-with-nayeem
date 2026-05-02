import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/shared/Navber/navber";
import Footer from "@/components/ui/Footer/footer";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://bangladeshwithnaim.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Explore Bangladesh With Naim — Private Local Tours",
    template: "%s | Bangladesh With Naim",
  },

  description:
    "Discover Bangladesh with Naim — a trusted local guide offering private, affordable tour packages to Dhaka, Sundarbans, Srimangal, Cox's Bazar & more. Skip the agencies. Save 15–30%.",

  keywords: [
    "Bangladesh tour packages",
    "Bangladesh private tour",
    "Bangladesh local guide",
    "Sundarbans tour",
    "Dhaka heritage tour",
    "Srimangal tea garden tour",
    "Cox's Bazar tour",
    "Bangladesh with Naim",
    "Bangladesh travel guide",
    "affordable Bangladesh tours",
    "cultural tour Bangladesh",
    "international tourist Bangladesh",
  ],

  authors: [{ name: "Naim", url: SITE_URL }],
  creator: "Naim",
  publisher: "Bangladesh With Naim",

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bangladesh With Naim",
    title: "Explore Bangladesh With Naim — Private Local Tours",
    description:
      "Private, personalized tours across Bangladesh. Heritage walks, Sundarbans safaris, tea garden escapes & more — all guided by your trusted local friend, Naim.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beautiful Bangladesh landscape — Bangladesh With Naim tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Explore Bangladesh With Naim — Private Local Tours",
    description:
      "Skip the agencies. Book private Bangladesh tours directly with Naim — save 15–30% and travel like a local.",
    images: ["/og-image.jpg"],
    creator: "@bangladeshwithnaim",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "google0112f4e428fe015b",
  },
};

// Pages where Navber + Footer should be hidden
const HIDE_LAYOUT_PATTERNS = [
  /^\/tours\/[^/]+$/,   // /tours/any-slug
];

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";

  const hideLayout = HIDE_LAYOUT_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!hideLayout && <Navber />}
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}