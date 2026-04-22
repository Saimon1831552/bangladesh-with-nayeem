

const SITE_URL = "https://bangladeshwithnaim.com";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bangladesh-with-nayeem-production.up.railway.app"
).replace(/\/api\/?$/, "");


const STATIC_ROUTES = [
  { url: "/",          priority: 1.0,  changeFrequency: "weekly"  },
  { url: "/tours",     priority: 0.9,  changeFrequency: "daily"   },
  { url: "/contact",   priority: 0.8,  changeFrequency: "monthly" },
  { url: "/review",    priority: 0.7,  changeFrequency: "weekly"  },
  { url: "/gallery",   priority: 0.6,  changeFrequency: "monthly" },
  { url: "/about",     priority: 0.6,  changeFrequency: "monthly" },
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

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const tours = await fetchTours();
  const tourEntries = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug || tour.id}`,
    lastModified: tour.updated_at ? new Date(tour.updated_at).toISOString() : now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticEntries, ...tourEntries];
}