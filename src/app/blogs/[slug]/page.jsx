"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://bangladesh-with-nayeem-production.up.railway.app";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=2000&q=80";

// ── Reading progress bar ──────────────────────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setPct((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "#e8e4dc" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(to right, #1a5c35, #3d9e68)", transition: "width .1s linear" }} />
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div data-blog-page="true" style={{ position: "fixed", inset: 0, zIndex: 9999, overflowY: "auto", background: "#f5f2ec" }}>
      <style>{`
        @keyframes sk { 0%,100%{opacity:1} 50%{opacity:.4} }
        .sk { background: #e2ddd5; border-radius: 8px; animation: sk 1.6s ease infinite; }
      `}</style>
      <div className="sk" style={{ height: "75vh" }} />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 24px" }}>
        <div className="sk" style={{ height: 20, width: "40%", marginBottom: 32 }} />
        <div className="sk" style={{ height: 52, marginBottom: 12 }} />
        <div className="sk" style={{ height: 36, width: "70%", marginBottom: 48 }} />
        {[100, 88, 95, 72, 90, 80, 65].map((w, i) => (
          <div key={i} className="sk" style={{ height: 16, width: `${w}%`, marginBottom: 14 }} />
        ))}
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState() {
  return (
    <div data-blog-page="true" style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#f5f2ec", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 18, color: "#4a4540", fontWeight: 600 }}>Article not found.</p>
      <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a5c35", color: "#fff", padding: "10px 24px", borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
        ← Back to Journal
      </Link>
    </div>
  );
}

// ── Format date ───────────────────────────────────────────────────────────────
function fmtDate(str) {
  if (!str) return "";
  try {
    return new Date(str).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { return str; }
}

// ── Share button ──────────────────────────────────────────────────────────────
function ShareBtn({ label, color, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      padding: "8px 18px", borderRadius: 100,
      background: color, color: "#fff",
      fontSize: 12, fontWeight: 700, textDecoration: "none",
      transition: "opacity .15s",
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
      {label}
    </a>
  );
}

// ── Author avatar (handles broken images) ────────────────────────────────────
function AuthorAvatar({ author, authorImg, size = 54, className = "" }) {
  const [err, setErr] = useState(false);
  if (authorImg && !err) {
    return (
      <div style={{ position: "relative", width: size, height: size, borderRadius: "50%", overflow: "hidden", border: "3px solid #e8e2d8", flexShrink: 0 }}>
        <Image src={authorImg} alt={author || "Author"} fill sizes={`${size}px`} className="object-cover" onError={() => setErr(true)} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "#d4e8dc", color: "#1a5c35", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: size * 0.42, fontWeight: 700, flexShrink: 0 }}>
      {author?.charAt(0)?.toUpperCase() || "A"}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [heroImgSrc, setHeroImgSrc] = useState(null);
  const heroImgRef = useRef(null);

  // ── Hide site header/footer while mounted ────────────────────────────────
  useEffect(() => {
    const toHide = [];
    ["header", "footer", "nav"].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest("[data-blog-page]")) {
          toHide.push({ el, prev: el.style.cssText });
          el.style.setProperty("display", "none", "important");
        }
      });
    });
    return () => toHide.forEach(({ el, prev }) => { el.style.cssText = prev; });
  }, []);

  // ── Fetch blog ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;
    setError(false);
    setBlog(null);
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        if (!data?.data) throw new Error("Empty response");
        setBlog(data);
        setHeroImgSrc(data.data.image_url || FALLBACK_IMG);
      })
      .catch(() => setError(true));
  }, [slug]);

  // ── Parallax hero on scroll ───────────────────────────────────────────────
  useEffect(() => {
    const el = heroImgRef.current;
    if (!el || !blog) return;
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.28}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [blog]);

  // ── Copy link (safe window access) ───────────────────────────────────────
  const copyLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }, []);

  if (error) return <ErrorState />;
  if (!blog) return <Skeleton />;

  const d = blog.data;
  const date = fmtDate(d.publish_date);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .bdp { font-family: 'DM Sans', sans-serif; background: #f5f2ec; color: #1c1a16; min-height: 100vh; -webkit-font-smoothing: antialiased; }
        .bdp-hero { position: relative; height: 88vh; min-height: 520px; overflow: hidden; }
        .bdp-hero-imgwrap { position: absolute; inset: 0; overflow: hidden; }
        .bdp-hero-img { width: 100%; height: 115%; object-fit: cover; will-change: transform; }
        .bdp-hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,9,7,.97) 0%, rgba(10,9,7,.55) 42%, transparent 70%),
                      linear-gradient(to right, rgba(10,9,7,.4) 0%, transparent 60%);
        }
        .bdp-back-btn {
          position: absolute; top: 32px; left: 40px; z-index: 20;
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,.1); backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.18); color: #fff;
          padding: 10px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600; text-decoration: none;
          letter-spacing: .02em; transition: background .2s;
        }
        .bdp-back-btn:hover { background: rgba(255,255,255,.22); }
        .bdp-hero-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 40px 60px; z-index: 10; max-width: 920px; }
        .bdp-cat-pill { display: inline-flex; align-items: center; gap: 6px; background: #1a5c35; color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; padding: 6px 16px; border-radius: 100px; margin-bottom: 18px; }
        .bdp-featured-pill { display: inline-flex; align-items: center; gap: 5px; background: linear-gradient(135deg,#c8a84b,#e8c96b); color: #5a3d00; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; padding: 6px 14px; border-radius: 100px; margin-bottom: 18px; margin-left: 8px; }
        .bdp-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.06; letter-spacing: -.02em; margin-bottom: 22px; }
        .bdp-hero-meta { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .bdp-meta-item { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: rgba(255,255,255,.55); font-weight: 500; }
        .bdp-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.25); }
        .bdp-layout { display: grid; grid-template-columns: 1fr 290px; gap: 64px; max-width: 1160px; margin: 0 auto; padding: 72px 40px 100px; align-items: start; }
        @media(max-width:1020px){ .bdp-layout { grid-template-columns:1fr; gap:40px; padding:48px 24px 80px; } }
        @media(max-width:600px){ .bdp-hero-body{padding:0 20px 36px;} .bdp-back-btn{top:20px;left:20px;} .bdp-hero-title{font-size:2rem;} }
        .bdp-author { display: flex; align-items: center; gap: 16px; background: #fff; border-radius: 20px; padding: 20px 24px; border: 1px solid #e8e2d8; margin-bottom: 44px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .bdp-body { font-family: 'Lora', Georgia, serif; font-size: 18.5px; line-height: 1.88; color: #2d2a24; }
        .bdp-body p { margin-bottom: 26px; }
        .bdp-body h2 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #1c1a16; line-height: 1.15; margin: 52px 0 18px; }
        .bdp-body h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: #1c1a16; margin: 36px 0 14px; }
        .bdp-body blockquote { margin: 40px 0; padding: 6px 0 6px 28px; border-left: 3px solid #1a5c35; font-style: italic; font-size: 1.22rem; color: #4a4540; line-height: 1.7; }
        .bdp-body ul, .bdp-body ol { padding-left: 22px; margin-bottom: 26px; }
        .bdp-body li { margin-bottom: 8px; }
        .bdp-body a { color: #1a5c35; text-decoration: underline; text-underline-offset: 3px; }
        .bdp-body img { width: 100%; border-radius: 16px; margin: 32px 0; }
        .bdp-divider { height: 1px; background: #e4dfd5; margin: 48px 0; }
        .bdp-rule { width: 48px; height: 2px; background: #c8a84b; border-radius: 2px; margin-bottom: 22px; }
        .bdp-share { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .bdp-share-lbl { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #b0a898; margin-right: 2px; }
        .bdp-copy { display: inline-flex; align-items: center; padding: 8px 18px; border-radius: 100px; border: 1.5px solid #d8d2c8; background: transparent; color: #4a4540; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s; }
        .bdp-copy:hover { border-color: #1a5c35; color: #1a5c35; }
        .bdp-copy.ok { border-color: #1a5c35; background: #edf7f1; color: #1a5c35; }
        .bdp-sidebar { position: sticky; top: 28px; display: flex; flex-direction: column; gap: 18px; }
        .bdp-card { background: #fff; border-radius: 20px; border: 1px solid #e8e2d8; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .bdp-card-head { background: #1a5c35; padding: 16px 22px; font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 700; color: #fff; letter-spacing: .01em; }
        .bdp-card-body { padding: 20px 22px; }
        .bdp-row { display: flex; align-items: flex-start; gap: 12px; padding: 11px 0; border-bottom: 1px solid #f0ece5; }
        .bdp-row:last-child { border-bottom: none; padding-bottom: 0; }
        .bdp-row-icon { width: 32px; height: 32px; border-radius: 8px; background: #edf7f1; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
        .bdp-row-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #b0a898; margin-bottom: 3px; }
        .bdp-row-val { font-size: 13.5px; font-weight: 600; color: #1c1a16; }
        .bdp-all-link { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 14px; background: #1c1a16; color: #fff; font-size: 13.5px; font-weight: 700; text-decoration: none; transition: background .18s, transform .15s; letter-spacing: .02em; }
        .bdp-all-link:hover { background: #1a5c35; transform: translateY(-1px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .f1 { animation: fadeUp .55s .05s ease both; }
        .f2 { animation: fadeUp .6s .18s ease both; }
        .f3 { animation: fadeUp .6s .32s ease both; }
        .f5 { animation: fadeUp .65s .1s ease both; }
      `}</style>

      <ReadingProgress />

      <div className="bdp" data-blog-page="true" style={{ position: "fixed", inset: 0, zIndex: 9999, overflowY: "auto" }}>

        {/* ── HERO — uses plain <img> intentionally for parallax ref ── */}
        <div className="bdp-hero">
          <div className="bdp-hero-imgwrap">
            {/* NOTE: Next.js <Image fill> can't be used here because we need a
                direct DOM ref for the parallax transform. Plain <img> is
                acceptable for a single above-the-fold hero where you control
                the src. Add the domain to next.config.mjs remotePatterns. */}
            <img
              ref={heroImgRef}
              className="bdp-hero-img"
              src={heroImgSrc}
              alt={d.title}
              onError={() => setHeroImgSrc(FALLBACK_IMG)}
            />
          </div>
          <div className="bdp-hero-grad" />
          <Link href="/blogs" className="bdp-back-btn">← Back to Journal</Link>

          <div className="bdp-hero-body">
            <div className="f1" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {d.category && <span className="bdp-cat-pill">● {d.category}</span>}
              {d.is_featured === 1 && <span className="bdp-featured-pill">★ Featured</span>}
            </div>
            <h1 className="bdp-hero-title f2">{d.title}</h1>
            <div className="bdp-hero-meta f3">
              {date && <span className="bdp-meta-item">📅 {date}</span>}
              {date && d.read_time && <div className="bdp-meta-dot" />}
              {d.read_time && <span className="bdp-meta-item">⏱ {d.read_time}</span>}
              {d.author && <><div className="bdp-meta-dot" /><span className="bdp-meta-item">✍ {d.author}</span></>}
            </div>
          </div>
        </div>

        {/* ── BODY LAYOUT ── */}
        <div className="bdp-layout">

          {/* LEFT — article */}
          <div>
            {/* Author strip */}
            <div className="bdp-author f5">
              <AuthorAvatar author={d.author} authorImg={d.author_img} size={54} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1c1a16", marginBottom: 3 }}>{d.author || "Editorial Team"}</div>
                <div style={{ fontSize: 12, color: "#9a9280" }}>{date}{d.read_time ? ` · ${d.read_time}` : ""}</div>
              </div>
              {d.is_featured === 1 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#c8a84b", background: "#fdf8ed", border: "1px solid #e8d98a", padding: "4px 12px", borderRadius: 100 }}>
                  Featured
                </span>
              )}
            </div>

            {/* Excerpt lede */}
            {d.excerpt && (
              <p className="f5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.32rem", fontStyle: "italic", color: "#4a4540", lineHeight: 1.65, borderLeft: "3px solid #c8a84b", paddingLeft: 24, marginBottom: 40 }}>
                {d.excerpt}
              </p>
            )}

            <div className="bdp-rule" />

            {/* Article body — safe fallback content if no DB content field */}
            <div className="bdp-body">
              {d.content ? (
                
                <div dangerouslySetInnerHTML={{ __html: d.content }} />
              ) : (
                <>
                  <p>Bangladesh is a land of extraordinary contrasts — where the world's largest mangrove forest meets misty tea-covered hills, where ancient Mughal architecture rises above labyrinthine river deltas, and where the warmth of its people rivals the richness of its landscapes.</p>
                  <blockquote>"Every journey through Bangladesh reveals a layer of beauty and culture that most travelers never discover."</blockquote>
                  <p>Whether you are navigating the narrow channels of the Sundarbans on a silent country boat, sipping fresh Sylheti tea at dawn as mist lifts off the garden rows, or wandering through the incense-heavy lanes of Dhaka's old quarter — this is a destination that rewards the curious and the unhurried.</p>
                  <h2>Planning Your Visit</h2>
                  <p>The ideal window is November through March, when humidity drops, skies clear, and the landscape turns lush after the monsoon. Advance booking is essential for private tours — particularly for forest permits and cruiser accommodation.</p>
                  <h2>What to Bring</h2>
                  <p>Light, moisture-wicking clothing in neutral colours, quality insect repellent, binoculars, and a sense of patient wonder. The Sundarbans reveals itself slowly to those who wait and watch.</p>
                </>
              )}
            </div>

            <div className="bdp-divider" />

            {/* Share row */}
            <div className="bdp-share">
              <span className="bdp-share-lbl">Share</span>
              <ShareBtn label="𝕏 Twitter"  color="#000"    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(d.title)}&url=${encodeURIComponent(shareUrl)}`} />
              <ShareBtn label="Facebook"   color="#1877F2" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} />
              <ShareBtn label="WhatsApp"   color="#25D366" href={`https://wa.me/?text=${encodeURIComponent(d.title + " " + shareUrl)}`} />
              <button className={`bdp-copy${copied ? " ok" : ""}`} onClick={copyLink}>
                {copied ? "✓ Copied!" : "Copy link"}
              </button>
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <aside className="bdp-sidebar">
            <div className="bdp-card">
              <div className="bdp-card-head">Article Details</div>
              <div className="bdp-card-body">
                {[
                  { icon: "📅", label: "Published", value: date || "—" },
                  { icon: "⏱", label: "Read time",  value: d.read_time || "—" },
                  { icon: "🏷", label: "Category",   value: d.category || "—" },
                  { icon: "✍", label: "Author",     value: d.author || "—" },
                  { icon: "⭐", label: "Status",     value: d.is_featured === 1 ? "Featured" : "Standard" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bdp-row">
                    <div className="bdp-row-icon">{icon}</div>
                    <div>
                      <div className="bdp-row-lbl">{label}</div>
                      <div className="bdp-row-val">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {d.author && (
              <div className="bdp-card">
                <div className="bdp-card-head">About the Author</div>
                <div className="bdp-card-body" style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                    <AuthorAvatar author={d.author} authorImg={d.author_img} size={72} />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#1c1a16", marginBottom: 8 }}>{d.author}</p>
                  <p style={{ fontSize: 12.5, color: "#9a9280", lineHeight: 1.65 }}>
                    Travel writer & guide specialising in authentic experiences across Bangladesh and South Asia.
                  </p>
                </div>
              </div>
            )}

            <Link href="/blogs" className="bdp-all-link">← All Articles</Link>
          </aside>
        </div>
      </div>
    </>
  );
}