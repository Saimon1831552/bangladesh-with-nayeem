
import TourDetails from "./TourCardDetails";

const SITE_URL = "https://www.bangladeshwithnaim.com";
const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// ── Server-side data fetching (shared by metadata + page) ──────────────────
async function getTour(slug) {
  try {
    const res = await fetch(`${API_BASE}/tours/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

async function getGallery(tourId) {
  try {
    const res = await fetch(`${API_BASE}/gallery?tour_id=${tourId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

async function getReviews(tourId) {
  try {
    const res = await fetch(`${API_BASE}/reviews?tour_id=${tourId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

function parsePrice(p) {
  if (!p) return null;
  if (typeof p === "number") return p;
  return parseFloat(String(p).replace(/[^0-9.]/g, "")) || null;
}

// ── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Bangladesh With Naim",
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/tours/${slug}`;
  const description =
    tour.overview
      ? tour.overview.replace(/<[^>]*>/g, "").slice(0, 155).trim()
      : `Join a private, guided ${tour.title} in ${tour.location || "Bangladesh"}. ${tour.duration || ""} · Personally led by Naim, your trusted local guide.`.trim();

  const image = tour.image_url || `${SITE_URL}/og-image.jpg`;

  return {
    title: tour.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${tour.title} | Bangladesh With Naim`,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | Bangladesh With Naim`,
      description,
      images: [image],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function Page({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  let gallery = [];
  let reviews = [];
  if (tour) {
    [gallery, reviews] = await Promise.all([
      getGallery(tour.id),
      getReviews(tour.id),
    ]);
  }

  // TouristTrip structured data — only when we actually have a tour
  const tourSchema = tour
    ? {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tour.title,
        description: (tour.overview || "").replace(/<[^>]*>/g, "").slice(0, 500),
        image: tour.image_url ? [tour.image_url] : undefined,
        touristType: "International Travelers",
        provider: {
          "@type": "TravelAgency",
          name: "Bangladesh With Naim",
          "@id": `${SITE_URL}/#business`,
        },
        ...(tour.location && {
          itinerary: {
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: tour.location },
            ],
          },
        }),
        ...(tour.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(tour.rating),
            reviewCount: String(tour.review_count || reviews.length || 1),
          },
        }),
        offers: {
          "@type": "Offer",
          price: parsePrice(tour.price) || undefined,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/tours/${slug}`,
        },
      }
    : null;

  return (
    <>
      {tourSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
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
