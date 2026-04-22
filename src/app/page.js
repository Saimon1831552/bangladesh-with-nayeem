import DayTour from "@/components/shared/day-tour/day-tour";
import FeaturedTours from "@/components/shared/featured-tours/featuredTours";
import GuideProfile from "@/components/shared/Guide-profile/guide-profile";
import Hero from "@/components/shared/Hero/hero";
import Holiday from "@/components/shared/holiday-tour/holiday-tour";
import SpeechDraft from "@/components/shared/landing-page-speech/speech-draft";
import Multiday from "@/components/shared/multiday-tour/multiday-tour";
import Testimonials from "@/components/shared/testimonials/testimonials";
import Gallery from "@/components/shared/tours-gallary/gallary";

const SITE_URL = "https://bangladeshwithnaim.com";

// ── Structured Data (JSON-LD) ─────────────────────────────────────────────────

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "Bangladesh With Naim",
  alternateName: "Bangladesh With Nayeem",
  description:
    "Private, personalized tour packages across Bangladesh — Dhaka, Sundarbans, Srimangal, Cox's Bazar & more. Guided by Naim, a trusted local expert with 3+ years of experience.",
  url: SITE_URL,
  telephone: "+880-XXXXXXXXX", // ← replace with real number
  email: "naim@bangladeshwithnaim.com", // ← replace with real email
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dhaka",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.8103,
    longitude: 90.4125,
  },
  areaServed: [
    { "@type": "Country", name: "Bangladesh" },
    { "@type": "City", name: "Dhaka" },
    { "@type": "City", name: "Khulna" },
    { "@type": "City", name: "Sylhet" },
    { "@type": "City", name: "Cox's Bazar" },
  ],
  priceRange: "$$",
  currenciesAccepted: "USD, BDT, GBP, EUR, AUD",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [
    "https://www.instagram.com/bangladeshwithnaim", // ← update
    "https://www.facebook.com/bangladeshwithnaim",  // ← update
    "https://www.tripadvisor.com/",                 // ← update with real profile
  ],
  image: `${SITE_URL}/og-image.jpg`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "4000",
    bestRating: "5",
    worstRating: "1",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#naim`,
  name: "Naim",
  alternateName: "Nayeem",
  jobTitle: "Private Tour Guide",
  description:
    "Local tour guide from Bangladesh with 3+ years of experience leading cultural, heritage, and adventure tours for international travellers.",
  url: SITE_URL,
  image:
    "https://i.ibb.co.com/wN3B0nsT/46463372-2343868569174862-5457719980747390976-n-jpg-1.jpg",
  knowsAbout: [
    "Bangladesh Tourism",
    "Sundarbans Mangrove Forest",
    "Dhaka Heritage",
    "Tea Gardens Srimangal",
    "Cox's Bazar",
    "Cultural Tours",
    "Wildlife Tours",
    "River Cruises Bangladesh",
  ],
  worksFor: { "@id": `${SITE_URL}/#business` },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Bangladesh With Naim",
  url: SITE_URL,
  description:
    "Discover Bangladesh with a trusted local guide. Private tour packages for international travellers.",
  publisher: { "@id": `${SITE_URL}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/tours?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tours",
      item: `${SITE_URL}/tours`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a tour with Naim in Bangladesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book directly through our website at bangladeshwithnaim.com or contact Naim via WhatsApp or email. All tours are private and fully customizable.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in Bangladesh With Naim tour packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our packages typically include private transportation, accommodation at vetted 4★ or 5★ hotels, guided tours, and 24/7 support. Each package is customized to your preferences.",
      },
    },
    {
      "@type": "Question",
      name: "Why book directly with Naim instead of using an agency or platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Booking directly saves you 15–30% compared to platforms like Viator, TripAdvisor, or GetYourGuide, which charge up to 30% commission. You also get a more personal, flexible experience.",
      },
    },
    {
      "@type": "Question",
      name: "What destinations does Bangladesh With Naim cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We cover all major destinations including Dhaka, Sundarbans, Srimangal tea gardens, Cox's Bazar, Bagerhat, Sylhet, Barisal, and many off-the-beaten-path locations.",
      },
    },
    {
      "@type": "Question",
      name: "Is Bangladesh safe for international tourists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Bangladesh is a welcoming destination for international travellers. With Naim as your local guide, you get expert knowledge of safe routes, trusted accommodations, and cultural etiquette — making your trip smooth and secure.",
      },
    },
  ],
};

// ── Page Metadata ─────────────────────────────────────────────────────────────

export const metadata = {
  title: "Bangladesh Tour Packages | Explore Bangladesh With Naim",
  description:
    "Discover Bangladesh with Naim — a trusted local guide offering private, affordable tour packages to Dhaka, Sundarbans, Srimangal, Cox's Bazar & more. Skip the agencies. Save 15–30%.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bangladesh Tour Packages | Explore Bangladesh With Naim",
    description:
      "Private, personalized tours across Bangladesh. Heritage walks, Sundarbans safaris, tea garden escapes & more — guided by your trusted local friend, Naim.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beautiful Bangladesh — Private Tours with Naim",
      },
    ],
  },
};

// ── Page Component ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ── Structured Data injection ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Page Content ── */}
      <main>
        <Hero />
        <GuideProfile />
        <FeaturedTours />
        <SpeechDraft />
        <DayTour />
        <Gallery />
        <Multiday />
        <Testimonials />
        <Holiday />
      </main>
    </>
  );
}