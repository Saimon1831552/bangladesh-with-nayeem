import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/shared/Navber/navber";
import Footer from "@/components/ui/Footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bangladesh Tour Packages | Explore Bangladesh With Naim",
  description: "Discover Bangladesh with expert local guides. Book affordable tour packages in Dhaka, Sundarbans, Srimangal & more.",

  robots: {
    index: true,
    follow: true,
    nocache: true, 
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navber></Navber>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}