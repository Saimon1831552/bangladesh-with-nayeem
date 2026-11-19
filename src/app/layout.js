import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/shared/Navber/navber";
import Footer from "@/components/ui/Footer/footer";
import { getSeoSettings, seoMetadata, seoStructuredData } from "@/lib/seo";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata() {
  return seoMetadata(await getSeoSettings());
}

export default async function RootLayout({ children }) {
  const structuredData = seoStructuredData(await getSeoSettings());

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.business) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }} />
        {structuredData.faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }} />}
        <Navber />
        {children}
        <Footer />
      </body>
    </html>
  );
}
