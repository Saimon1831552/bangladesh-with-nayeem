import Gallery from "@/components/shared/tours-gallary/gallary";

export const dynamic = "force-dynamic";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.bangladeshwithnaim.com"
).replace(/\/api\/?$/, "");

export const metadata = {
  title: "Photo Gallery — Real Moments from Bangladesh | Bangladesh With Naim",
  description:
    "Explore photos from private tours across Bangladesh — Sundarbans safaris, heritage walks, tea gardens, and unforgettable traveler moments with Naim.",
};

// ── Gallery hero (matches site-wide hero style) ─────────────────────────────
function GalleryHero() {
  return (
    <div
      style={{
        position: "relative",
        background: "#0f3d22",
        overflow: "hidden",
        padding: "88px 40px 64px",
        textAlign: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .gh-wrap { font-family:'DM Sans',sans-serif; }
        .gh-eyebrow { display:flex; align-items:center; gap:14px; justify-content:center; font-size:11px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#c8a84b; margin-bottom:20px; }
        .gh-eyebrow::before, .gh-eyebrow::after { content:''; width:52px; height:1px; background:linear-gradient(to right, transparent, #c8a84b); }
        .gh-eyebrow::after { background:linear-gradient(to left, transparent, #c8a84b); }
        .gh-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.2rem,5vw,4rem); font-weight:900; color:#fff; line-height:1.08; letter-spacing:-.02em; margin-bottom:8px; }
        .gh-subtitle { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.5rem,3.4vw,2.6rem); font-weight:700; font-style:italic; color:#6fcf47; margin-bottom:20px; }
        .gh-desc { font-size:15px; color:rgba(255,255,255,0.65); line-height:1.85; max-width:600px; margin:0 auto; }
      `}</style>
      <div className="gh-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="gh-eyebrow">Photo Gallery</div>
        <h1 className="gh-title">Moments Captured</h1>
        <div className="gh-subtitle">Across Beautiful Bangladesh</div>
        <p className="gh-desc">
          A visual journey through the Sundarbans, tea gardens, heritage streets, and quiet villages —
          real photos from real private tours with Naim.
        </p>
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  let images = [];

  try {
    const res = await fetch(`${API_BASE}/api/gallery`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      images = (json.data || []).map((g) => ({
        src: g.image_url,
        label: g.tour_title || g.alt_text || "Bangladesh",
        country: g.tour_title && g.alt_text ? g.alt_text : undefined,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch gallery (server):", err);
    // Leave images empty — client component will retry on mount
  }

  return (
    <div>
      <GalleryHero />
      <Gallery images={images} />
    </div>
  );
}
