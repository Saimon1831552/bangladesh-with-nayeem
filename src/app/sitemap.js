const SITE_URL = "https://bangladeshwithnaim.com";
const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.bangladeshwithnaim.com"
).replace(/\/api\/?$/, "");

const STATIC_ROUTES = [
  { url: "/",          priority: 1.0,  changeFrequency: "weekly"  },
  { url: "/tours",     priority: 0.9,  changeFrequency: "daily"   },
  { url: "/blogs",     priority: 0.8,  changeFrequency: "daily"   },
  { url: "/contact",   priority: 0.8,  changeFrequency: "monthly" },
  { url: "/review",    priority: 0.7,  changeFrequency: "weekly"  },
  { url: "/gallery",   priority: 0.6,  changeFrequency: "monthly" },
  { url: "/about",     priority: 0.6,  changeFrequency: "monthly" },
  { url: "/refund-policy",     priority: 0.9,  changeFrequency: "monthly"   },
  { url: "/payment-policy",     priority: 0.8,  changeFrequency: "monthly"   },
  { url: "/cancellation-policy",   priority: 0.8,  changeFrequency: "monthly" },
  { url: "/responsible-travel",    priority: 0.7,  changeFrequency: "monthly"  },
  { url: "/privacy-policy",   priority: 0.6,  changeFrequency: "monthly" },
  { url: "/terms-conditions",     priority: 0.6,  changeFrequency: "monthly" },
  { url: "/faqs",     priority: 0.9,  changeFrequency: "daily"   },
];

async function fetchTours() {
  try {
    const res = await fetch(`${API_BASE}/api/tours`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

async function fetchBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const [tours, blogs] = await Promise.all([fetchTours(), fetchBlogs()]);

  const tourEntries = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug || tour.id}`,
    lastModified: tour.updated_at ? new Date(tour.updated_at).toISOString() : now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogEntries = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug || blog.id}`,
    lastModified: blog.updated_at ? new Date(blog.updated_at).toISOString() : now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticEntries, ...tourEntries, ...blogEntries];
}
