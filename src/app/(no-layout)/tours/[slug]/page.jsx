import TourDetails from "./TourCardDetails";

const SITE_URL = "https://bangladeshwithnaim.com";
const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(url) {
  if (!url) return `${SITE_URL}/og-image.jpg`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function parsePrice(price) {
  if (price === null || price === undefined || price === "") {
    return null;
  }

  if (typeof price === "number") {
    return price;
  }

  const parsed = parseFloat(
    String(price).replace(/[^0-9.]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : null;
}

// ─────────────────────────────────────────────────────────────
// API Fetchers
// ─────────────────────────────────────────────────────────────

async function getTour(slug) {
  if (!slug || !process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }

  try {
    const res = await fetch(
      `${API_BASE}/tours/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return json?.data || null;
  } catch (error) {
    console.error("getTour error:", error);
    return null;
  }
}

async function getGallery(tourId) {
  if (!tourId || !process.env.NEXT_PUBLIC_API_URL) {
    return [];
  }

  try {
    const res = await fetch(
      `${API_BASE}/gallery?tour_id=${encodeURIComponent(tourId)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error("getGallery error:", error);
    return [];
  }
}

async function getReviews(tourId) {
  if (!tourId || !process.env.NEXT_PUBLIC_API_URL) {
    return [];
  }

  try {
    const res = await fetch(
      `${API_BASE}/reviews?tour_id=${encodeURIComponent(tourId)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error("getReviews error:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Dynamic Metadata
// ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tour = await getTour(slug);

  // Tour not found
  if (!tour) {
    return {
      title: "Tour Not Found | Bangladesh With Naim",

      description:
        "The requested tour could not be found.",

      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = cleanText(tour.title);

  const description = tour.overview
    ? cleanText(tour.overview).slice(0, 155)
    : `Join a private guided ${title} in ${
        tour.location || "Bangladesh"
      }. ${tour.duration || ""} · Personally led by Naim, your trusted local guide.`;

  const url = `${SITE_URL}/tours/${slug}`;

  const image = absoluteUrl(tour.image_url);

  return {
    title: `${title} | Bangladesh With Naim`,

    description,

    keywords: [
      title,
      `${title} Bangladesh`,
      `${tour.location || "Bangladesh"} tour`,
      "Bangladesh tour",
      "Bangladesh travel",
      "private tour Bangladesh",
      "guided tour Bangladesh",
      "Bangladesh With Naim",
    ],

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",

      locale: "en_US",

      url,

      siteName: "Bangladesh With Naim",

      title: `${title} | Bangladesh With Naim`,

      description,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${title} | Bangladesh With Naim`,

      description,

      images: [image],
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default async function Page({ params }) {
  const { slug } = await params;

  const tour = await getTour(slug);

  let gallery = [];
  let reviews = [];

  if (tour?.id) {
    [gallery, reviews] = await Promise.all([
      getGallery(tour.id),
      getReviews(tour.id),
    ]);
  }

  // ─────────────────────────────────────────────────────────
  // Schema Data
  // ─────────────────────────────────────────────────────────

  let tourSchema = null;
  let breadcrumbSchema = null;

  if (tour) {
    const title = cleanText(tour.title);

    const description = cleanText(
      tour.overview || `Explore ${title} in Bangladesh.`
    ).slice(0, 500);

    const image = absoluteUrl(tour.image_url);

    const price = parsePrice(tour.price);

    // ───────────────────────────────────────────────────────
    // TouristTrip Schema
    // ───────────────────────────────────────────────────────

    tourSchema = {
      "@context": "https://schema.org",

      "@type": "TouristTrip",

      "@id": `${SITE_URL}/tours/${slug}#tour`,

      name: title,

      description,

      url: `${SITE_URL}/tours/${slug}`,

      image: [image],

      touristType: [
        "International Travelers",
        "Adventure Travelers",
        "Cultural Travelers",
      ],

      provider: {
        "@type": "TravelAgency",

        "@id": `${SITE_URL}/#business`,

        name: "Bangladesh With Naim",

        url: SITE_URL,
      },

      ...(tour.location
        ? {
            itinerary: {
              "@type": "ItemList",

              itemListElement: [
                {
                  "@type": "ListItem",

                  position: 1,

                  name: cleanText(tour.location),
                },
              ],
            },
          }
        : {}),

      ...(tour.duration
        ? {
            duration: cleanText(tour.duration),
          }
        : {}),

      ...(price !== null
        ? {
            offers: {
              "@type": "Offer",

              url: `${SITE_URL}/tours/${slug}`,

              price: price,

              priceCurrency: "BDT",

              availability:
                "https://schema.org/InStock",

              seller: {
                "@type": "TravelAgency",

                name: "Bangladesh With Naim",

                url: SITE_URL,
              },
            },
          }
        : {}),
    };

    // ───────────────────────────────────────────────────────
    // Rating Schema
    // Only add when real rating + review count exists
    // ───────────────────────────────────────────────────────

    const rating = parseFloat(tour.rating);

    const reviewCount = parseInt(
      tour.review_count || reviews.length,
      10
    );

    if (
      Number.isFinite(rating) &&
      rating > 0 &&
      rating <= 5 &&
      Number.isFinite(reviewCount) &&
      reviewCount > 0
    ) {
      tourSchema.aggregateRating = {
        "@type": "AggregateRating",

        ratingValue: rating.toFixed(1),

        bestRating: "5",

        worstRating: "1",

        reviewCount: String(reviewCount),
      };
    }

    // ───────────────────────────────────────────────────────
    // Breadcrumb Schema
    // ───────────────────────────────────────────────────────

    breadcrumbSchema = {
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

          name: title,

          item: `${SITE_URL}/tours/${slug}`,
        },
      ],
    };
  }

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────

  return (
    <>
      {tourSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tourSchema),
          }}
        />
      )}

      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}

      <TourDetails
        slug={slug}
        initialTour={tour}
        initialGallery={gallery}
        initialReviews={reviews}
      />
    </>
  );
}
