"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faInbox } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80';

export default function Blog({ blogs = [] }) {

  if (!blogs.length) {
    return (
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <FontAwesomeIcon icon={faInbox} style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
          <p style={{ fontSize: 18, color: '#9ca3af', fontWeight: 500 }}>No articles published yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const processedBlogs = blogs.map((b) => ({
    ...b,
    isFeatured: b.is_featured === 1 || b.isFeatured || false,
  }));

  const featuredBlog = processedBlogs.find(b => b.isFeatured) || processedBlogs[0];

  const finalBlogs = processedBlogs.map(b => ({
    ...b,
    isFeatured: b.id === featuredBlog?.id,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ══════════════════════════════════
           HERO — reference design
           Deep green · no blur · corner brackets
           book icon · stats bar · wave · safe pill
        ══════════════════════════════════ */
        .bl-hero {
          position: relative;
          background: #0f3d22;
          overflow: hidden;
          padding: 88px 40px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
        }
        @media(max-width:640px){ .bl-hero { padding: 70px 20px 0; } }

        /* faint radial circles */
        .bl-hero::before {
          content: '';
          position: absolute; top: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .bl-hero::after {
          content: '';
          position: absolute; bottom: 80px; right: -80px;
          width: 300px; height: 300px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }

        /* corner brackets */
        .bl-corner { position: absolute; width: 34px; height: 34px; pointer-events: none; }
        .bl-corner-tl { top: 22px; left: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .bl-corner-tr { top: 22px; right: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }
        .bl-corner-bl { bottom: 90px; left: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .bl-corner-br { bottom: 90px; right: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }

        /* icon box */
        .bl-hero-icon {
          width: 80px; height: 80px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          margin-bottom: 26px;
          position: relative; z-index: 2;
        }

        /* eyebrow with side lines */
        .bl-hero-eyebrow {
          display: flex; align-items: center; gap: 14px;
          justify-content: center;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c8a84b;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .bl-hero-eyebrow::before,
        .bl-hero-eyebrow::after {
          content: '';
          width: 52px; height: 1px;
          background: linear-gradient(to right, transparent, #c8a84b);
        }
        .bl-hero-eyebrow::after {
          background: linear-gradient(to left, transparent, #c8a84b);
        }

        /* main title */
        .bl-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4.6rem);
          font-weight: 900; color: #fff;
          line-height: 1.06; letter-spacing: -0.02em;
          margin-bottom: 10px;
          position: relative; z-index: 2;
        }

        /* italic subtitle — shimmer green */
        .bl-hero-subtitle {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 3.6rem);
          font-weight: 700; font-style: italic;
          color: #6fcf47;
          line-height: 1.1;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }

        /* description */
        .bl-hero-desc {
          font-size: clamp(14px, 2vw, 15.5px);
          color: rgba(255,255,255,0.65);
          line-height: 1.85; max-width: 600px; margin: 0 auto 36px;
          position: relative; z-index: 2;
        }
        .bl-hero-desc a { color: #fde68a; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .bl-hero-desc a:hover { color: #fbbf24; }

        /* stats box */
        .bl-hero-stats {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          overflow: hidden;
          max-width: 460px; width: 100%;
          margin: 0 auto 28px;
          position: relative; z-index: 2;
        }
        .bl-hero-stat { flex: 1; padding: 20px 20px; text-align: center; }
        .bl-hero-stat + .bl-hero-stat { border-left: 1px solid rgba(255,255,255,0.10); }
        .bl-hero-stat-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem; font-weight: 700; color: #fff;
          line-height: 1; margin-bottom: 6px;
        }
        .bl-hero-stat-lbl {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.42);
        }

        /* safe pill */
        .bl-safe-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px; padding: 10px 22px;
          font-size: 13px; font-weight: 600; color: #fff;
          margin-bottom: 52px;
          position: relative; z-index: 2;
          font-family: 'DM Sans', sans-serif;
        }
        .bl-safe-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6fcf47; flex-shrink: 0;
          animation: bl-pulse 2.4s ease-in-out infinite;
        }
        @keyframes bl-pulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(111,207,71,0.4); }
          50%{ box-shadow: 0 0 0 6px rgba(111,207,71,0); }
        }

        /* wave */
        .bl-hero-wave {
          position: relative; bottom: -1px;
          width: 100%; line-height: 0; z-index: 3;
        }
        .bl-hero-wave svg { display: block; width: 100%; }
      `}</style>

      <div className="bg-slate-50">

        {/* ══════════════ HERO ══════════════ */}
        <div className="bl-hero">

          {/* corner brackets */}
          <div className="bl-corner bl-corner-tl" />
          <div className="bl-corner bl-corner-tr" />
          <div className="bl-corner bl-corner-bl" />
          <div className="bl-corner bl-corner-br" />

          {/* icon */}
          <div className="bl-hero-icon">📖</div>

          {/* eyebrow */}
          <div className="bl-hero-eyebrow">Travel Journal</div>

          {/* title */}
          <h1 className="bl-hero-title">Discover the Untold Stories</h1>

          {/* italic subtitle */}
          <div className="bl-hero-subtitle">of Bangladesh</div>

          {/* description */}
          <p className="bl-hero-desc">
            Stories, travel guides, local culture, hidden destinations, and authentic experiences
            from across Bangladesh — by{' '}
            <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
              Bangladesh with Naim
            </a>
            . Helping travelers discover the people, traditions, food, and untold beauty beyond
            the usual tourist path.
          </p>

          {/* stats box */}
          <div className="bl-hero-stats">
            <div className="bl-hero-stat">
              <div className="bl-hero-stat-val">{blogs.length}+</div>
              <div className="bl-hero-stat-lbl">Articles</div>
            </div>
            <div className="bl-hero-stat">
              <div className="bl-hero-stat-val">100%</div>
              <div className="bl-hero-stat-lbl">Authentic</div>
            </div>
            <div className="bl-hero-stat">
              <div className="bl-hero-stat-val">∞</div>
              <div className="bl-hero-stat-lbl">Discoveries</div>
            </div>
          </div>

          {/* safe pill */}
          <div className="bl-safe-pill">
            <span className="bl-safe-dot" />
            Real stories from real travelers
          </div>

          {/* wave */}
          <div className="bl-hero-wave">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc"/>
            </svg>
          </div>
        </div>

        {/* ══════════════ BLOG GRID ══════════════ */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Section label */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-amber-500" />
                <span className="text-sm font-bold tracking-widest text-green-800 uppercase">
                  All Articles
                </span>
              </div>
              <span className="text-sm text-gray-400 font-medium">
                {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} published
              </span>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {finalBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

          </div>
        </section>

      </div>
    </>
  );
}

function BlogCard({ blog }) {
  const [imgSrc, setImgSrc] = useState(blog.image_url || FALLBACK_IMAGE);

  const href = blog.slug
    ? blog.slug.startsWith('/') ? blog.slug : `/blogs/${blog.slug}`
    : '#';

  const dateDisplay = blog.publish_date
    ? (() => {
        try {
          return new Date(blog.publish_date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          });
        } catch { return blog.publish_date; }
      })()
    : null;

  return (
    <Link href={href} className={`block group ${blog.isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
      <article
        className={`
          bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl
          border border-gray-100 transition-all duration-500 h-full flex flex-col
          ${blog.isFeatured ? 'md:flex-row' : ''}
          transform group-hover:-translate-y-1
        `}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${blog.isFeatured ? 'md:w-1/2 aspect-square md:aspect-auto' : 'w-full aspect-video'}`}>
          <Image
            src={imgSrc}
            alt={blog.title || 'Blog image'}
            fill
            sizes={blog.isFeatured ? '(max-width:768px) 100vw, 50vw' : '(max-width:768px) 100vw, 33vw'}
            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            priority={blog.isFeatured}
          />
          {blog.category && (
            <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
              {blog.category}
            </div>
          )}
          {blog.isFeatured && (
            <div className="absolute top-5 right-5 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg z-10">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col grow ${blog.isFeatured ? 'md:w-1/2 p-8 md:p-10 justify-center' : 'p-7'}`}>
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-amber-600 font-bold tracking-wide uppercase mb-4">
            {dateDisplay && <span>{dateDisplay}</span>}
            {dateDisplay && blog.read_time && <span className="w-1 h-1 rounded-full bg-gray-300" />}
            {blog.read_time && (
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} />
                {blog.read_time}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-snug line-clamp-3 ${blog.isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'}`}>
            {blog.title}
          </h3>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className={`text-gray-500 line-clamp-3 leading-relaxed grow ${blog.isFeatured ? 'text-base mb-8' : 'text-sm mb-6'}`}>
              {blog.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <AuthorAvatar author={blog.author} authorImg={blog.author_img} />
              {blog.author && (
                <span className="text-sm font-bold text-gray-900">{blog.author}</span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-green-700 group-hover:text-white transition-all duration-300 flex-shrink-0">
              <FontAwesomeIcon icon={faArrowRight} className="transform group-hover:rotate-45 transition-transform duration-300 text-sm" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function AuthorAvatar({ author, authorImg }) {
  const [imgError, setImgError] = useState(false);

  if (authorImg && !imgError) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm shrink-0">
        <Image src={authorImg} alt={author || 'Author'} fill sizes="36px" className="object-cover" onError={() => setImgError(true)} />
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-emerald-50 text-green-700 flex items-center justify-center font-extrabold text-sm shrink-0">
      {author?.charAt(0)?.toUpperCase() || 'A'}
    </div>
  );
}