const SITE_URL = "https://www.bangladeshwithnaim.com";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.bangladeshwithnaim.com"
).replace(/\/api\/?$/, "");

const STATIC_ROUTES = [
  {
    url: "/",
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    url: "/tours",
    priority: 0.9,
    changeFrequency: "daily",
  },
  {
    url: "/blogs",
    priority: 0.8,
    changeFrequency: "daily",
  },
  {
    url: "/contact",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    url: "/review",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    url: "/gallery",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: "/about",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: "/refund-policy",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    url: "/payment-policy",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    url: "/cancellation-policy",
    priority: 0.5,
    changeFrequency: "monthly",
  },
  {
    url: "/responsible-travel",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    url: "/privacy-policy",
    priority: 0.3,
    changeFrequency: "monthly",
  },
  {
    url: "/terms-conditions",
    priority: 0.3,
    changeFrequency: "monthly",
  },
  {
    url: "/faqs",
    priority: 0.8,
    changeFrequency: "monthly",
  },
];

// ─────────────────────────────────────────────
// Fetch Tours
// ─────────────────────────────────────────────

async function fetchTours() {
  try {
    const res = await fetch(`${API_BASE}/api/tours`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      console.error("Sitemap tours API error:", res.status);
      return [];
    }

    const json = await res.json();

    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error("Sitemap tours fetch error:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Fetch Blogs
// ─────────────────────────────────────────────

async function fetchBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      console.error("Sitemap blogs API error:", res.status);
      return [];
    }

    const json = await res.json();

    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error("Sitemap blogs fetch error:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Safe Date
// ─────────────────────────────────────────────

function safeDate(date, fallback) {
  if (!date) {
    return fallback;
  }

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? fallback
    : parsed.toISOString();
}

// ─────────────────────────────────────────────
// Sitemap
// ─────────────────────────────────────────────

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticEntries = STATIC_ROUTES.map(
    ({ url, priority, changeFrequency }) => ({
      url: `${SITE_URL}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  // Dynamic content
  const [tours, blogs] = await Promise.all([
    fetchTours(),
    fetchBlogs(),
  ]);

  // Tour pages
  const tourEntries = tours
    .filter((tour) => tour?.slug || tour?.id)
    .map((tour) => ({
      url: `${SITE_URL}/tours/${encodeURIComponent(
        tour.slug || tour.id
      )}`,

      lastModified: safeDate(
        tour.updated_at,
        now
      ),

      changeFrequency: "weekly",

      priority: 0.85,
    }));

  // Blog pages
  const blogEntries = blogs
    .filter((blog) => blog?.slug || blog?.id)
    .map((blog) => ({
      url: `${SITE_URL}/blogs/${encodeURIComponent(
        blog.slug || blog.id
      )}`,

      lastModified: safeDate(
        blog.updated_at,
        now
      ),

      changeFrequency: "weekly",

      priority: 0.75,
    }));

  return [
    ...staticEntries,
    ...tourEntries,
    ...blogEntries,
  ];
}
