"use client";

import React, { useState, useMemo } from 'react';
import { Star, StarHalf, ThumbsUp, CheckCircle, Quote } from 'lucide-react';

function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => {
        const full = i <= Math.floor(rating);
        const half = !full && i - 0.5 === rating;
        if (full) return <Star key={i} size={size} fill="#d97706" color="#d97706" />;
        if (half) return <StarHalf key={i} size={size} fill="#d97706" color="#d97706" />;
        return <Star key={i} size={size} color="#d1d5db" />;
      })}
    </span>
  );
}

function Avatar({ initials, color, bg, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.33, flexShrink: 0,
      fontFamily: 'inherit', letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  );
}

export default function Review({ reviews = [] }) {
  const [helpfulClicked, setHelpfulClicked] = useState({});
  const [filter, setFilter] = useState('All');

  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const stats = useMemo(() => {
    const total = safeReviews.length;
    if (total === 0) return { avg: 0, breakdown: [], total: 0, label: "No Reviews" };

    let sum = 0;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    safeReviews.forEach(r => {
      const rating = r?.rating || 5;
      sum += rating;
      if (counts[rating] !== undefined) counts[rating]++;
    });

    const avg = (sum / total).toFixed(1);
    const breakdown = [5, 4, 3, 2, 1].map(stars => ({
      stars, count: counts[stars],
      pct: Math.round((counts[stars] / total) * 100),
    }));

    let label = "Good";
    if (avg >= 4.8) label = "Exceptional";
    else if (avg >= 4.0) label = "Very Good";
    else if (avg >= 3.0) label = "Average";

    return { avg, breakdown, total, label };
  }, [safeReviews]);

  const tours = useMemo(() => {
    const unique = Array.from(new Set(safeReviews.map(r => r?.tour_name).filter(Boolean)));
    return ['All', ...unique];
  }, [safeReviews]);

  const filtered = filter === 'All' ? safeReviews : safeReviews.filter(r => r?.tour_name === filter);

  const toggleHelpful = (id) => setHelpfulClicked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rv-page { font-family: 'DM Sans', sans-serif; background: #f8f6f1; }

        /* ══════════════════════════════════
           HERO — reference design
           Deep green · no blur · corner brackets
           lock icon · stats bar · wave · safe pill
        ══════════════════════════════════ */
        .rv-hero {
          position: relative;
          overflow: hidden;
          background: #0f3d22;
          padding: 88px 40px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media(max-width:640px){ .rv-hero { padding: 70px 20px 0; } }

        /* faint radial circles */
        .rv-hero::before {
          content: '';
          position: absolute; top: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }
        .rv-hero::after {
          content: '';
          position: absolute; bottom: 80px; right: -80px;
          width: 300px; height: 300px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }

        /* corner brackets */
        .rv-corner { position: absolute; width: 34px; height: 34px; pointer-events: none; }
        .rv-corner-tl { top: 22px; left: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .rv-corner-tr { top: 22px; right: 22px; border-top: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }
        .rv-corner-bl { bottom: 90px; left: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-left: 2px solid rgba(255,255,255,0.18); }
        .rv-corner-br { bottom: 90px; right: 22px; border-bottom: 2px solid rgba(255,255,255,0.18); border-right: 2px solid rgba(255,255,255,0.18); }

        /* lock icon box */
        .rv-hero-icon {
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
        .rv-hero-eyebrow {
          display: flex; align-items: center; gap: 14px;
          justify-content: center;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c8a84b;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .rv-hero-eyebrow::before,
        .rv-hero-eyebrow::after {
          content: '';
          width: 52px; height: 1px;
          background: linear-gradient(to right, transparent, #c8a84b);
        }
        .rv-hero-eyebrow::after {
          background: linear-gradient(to left, transparent, #c8a84b);
        }

        /* title */
        .rv-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4.6rem);
          font-weight: 900; color: #fff;
          line-height: 1.06; letter-spacing: -0.02em;
          margin-bottom: 10px;
          position: relative; z-index: 2;
        }

        /* italic subtitle */
        .rv-hero-subtitle {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 3.6rem);
          font-weight: 700; font-style: italic;
          color: #6fcf47;
          line-height: 1.1;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }

        /* description */
        .rv-hero-desc {
          font-size: clamp(14px, 2vw, 15.5px);
          color: rgba(255,255,255,0.65);
          line-height: 1.85; max-width: 580px; margin: 0 auto 36px;
          position: relative; z-index: 2;
        }
        .rv-hero-desc a { color: #fde68a; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .rv-hero-desc a:hover { color: #fbbf24; }

        /* stats box */
        .rv-hero-stats {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          overflow: hidden;
          max-width: 480px;
          width: 100%;
          margin: 0 auto 28px;
          position: relative; z-index: 2;
        }
        .rv-hero-stat {
          flex: 1; padding: 20px 20px; text-align: center;
        }
        .rv-hero-stat + .rv-hero-stat { border-left: 1px solid rgba(255,255,255,0.10); }
        .rv-hero-stat-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem; font-weight: 700; color: #fff;
          line-height: 1; margin-bottom: 6px;
        }
        .rv-hero-stat-lbl {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.42);
        }

        /* safe pill */
        .rv-safe-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px; padding: 10px 22px;
          font-size: 13px; font-weight: 600; color: #fff;
          margin-bottom: 52px;
          position: relative; z-index: 2;
        }
        .rv-safe-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6fcf47; flex-shrink: 0;
          animation: rv-pulse 2.4s ease-in-out infinite;
        }
        @keyframes rv-pulse {
          0%,100%{ box-shadow: 0 0 0 0 rgba(111,207,71,0.4); }
          50%{ box-shadow: 0 0 0 6px rgba(111,207,71,0); }
        }

        /* wave */
        .rv-hero-wave {
          position: relative; bottom: -1px; left: 0; right: 0;
          width: 100%; line-height: 0; z-index: 3;
        }
        .rv-hero-wave svg { display: block; width: 100%; }

        /* shimmer for subtitle variant */
        @keyframes rv-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        /* ── Body ── */
        .rv-wrap { padding: 56px 40px 80px; }
        @media(max-width:640px){ .rv-wrap { padding: 40px 20px 60px; } }
        .rv-inner { max-width: 1100px; margin: 0 auto; }

        .rv-summary {
          display: grid; grid-template-columns: auto 1fr; gap: 48px;
          align-items: center; background: #fff;
          border: 1px solid #ede9e0; border-radius: 24px;
          padding: 36px 40px; margin-bottom: 40px;
        }
        @media(max-width:640px){ .rv-summary { grid-template-columns: 1fr; gap: 28px; padding: 28px; } }
        .rv-big-score { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .rv-score-num { font-family: 'Playfair Display', Georgia, serif; font-size: 5rem; font-weight: 900; color: #1c1c1a; line-height: 1; }
        .rv-score-label { font-size: 12px; color: #999; font-weight: 500; }
        .rv-score-count { font-size: 13px; color: #666; }
        .rv-bars { display: flex; flex-direction: column; gap: 10px; }
        .rv-bar-row { display: flex; align-items: center; gap: 12px; }
        .rv-bar-label { font-size: 12px; color: #888; font-weight: 500; width: 36px; text-align: right; flex-shrink: 0; }
        .rv-bar-track { flex: 1; height: 6px; background: #ede9e0; border-radius: 99px; overflow: hidden; }
        .rv-bar-fill { height: 100%; border-radius: 99px; background: #d97706; transition: width 0.6s ease; }
        .rv-bar-count { font-size: 11px; color: #bbb; width: 24px; flex-shrink: 0; }

        .rv-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .rv-filter-btn { font-size: 12px; font-weight: 600; padding: 7px 16px; border-radius: 100px; border: 1px solid #ddd; background: #fff; color: #666; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .rv-filter-btn:hover { border-color: #15803d; color: #15803d; }
        .rv-filter-btn.active { background: #1c1c1a; border-color: #1c1c1a; color: #fff; }

        .rv-cards { display: flex; flex-direction: column; gap: 20px; }
        .rv-card { background: #fff; border: 1px solid #ede9e0; border-radius: 22px; padding: 32px; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .rv-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.07); }
        .rv-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; gap: 12px; }
        .rv-card-user { display: flex; align-items: center; gap: 14px; }
        .rv-user-info { display: flex; flex-direction: column; gap: 2px; }
        .rv-user-name { font-size: 15px; font-weight: 600; color: #1c1c1a; }
        .rv-user-meta { font-size: 12px; color: #999; }
        .rv-tour-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #3B6D11; background: #EAF3DE; padding: 4px 10px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; }
        .rv-card-rating { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .rv-card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 700; color: #1c1c1a; margin-bottom: 12px; line-height: 1.3; }
        .rv-card-body { font-size: 14px; line-height: 1.8; color: #555; margin-bottom: 20px; }
        .rv-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #f0ece4; }
        .rv-verified { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #15803d; }
        .rv-helpful-btn { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #999; background: none; border: 1px solid #e5e5e5; border-radius: 100px; padding: 6px 14px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .rv-helpful-btn:hover { border-color: #d97706; color: #d97706; }
        .rv-helpful-btn.clicked { border-color: #d97706; color: #d97706; background: #FAEEDA; }
        .rv-quote-icon { position: absolute; top: 24px; right: 28px; color: #f0ece4; pointer-events: none; }
      `}</style>

      <div className="rv-page">

        {/* ══════════════ HERO ══════════════ */}
        <div className="rv-hero">

          {/* corner brackets */}
          <div className="rv-corner rv-corner-tl" />
          <div className="rv-corner rv-corner-tr" />
          <div className="rv-corner rv-corner-bl" />
          <div className="rv-corner rv-corner-br" />

          {/* lock icon */}
          <div className="rv-hero-icon">⭐</div>

          {/* eyebrow */}
          <div className="rv-hero-eyebrow">Traveller Stories</div>

          {/* title */}
          <h1 className="rv-hero-title">Real Stories from</h1>

          {/* italic subtitle */}
          <div className="rv-hero-subtitle">Real Travelers</div>

          {/* description */}
          <p className="rv-hero-desc">
            Discover genuine experiences shared by travelers who explored Bangladesh with{' '}
            <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
              Bangladesh with Naim
            </a>. From cultural journeys and village homestays to hidden local experiences and
            unforgettable human connections — these reviews reflect authentic memories and trust.
          </p>

          {/* stats box */}
          <div className="rv-hero-stats">
            <div className="rv-hero-stat">
              <div className="rv-hero-stat-val">{stats.total}+</div>
              <div className="rv-hero-stat-lbl">Reviews</div>
            </div>
            <div className="rv-hero-stat">
              <div className="rv-hero-stat-val">{stats.avg}</div>
              <div className="rv-hero-stat-lbl">Avg Rating</div>
            </div>
            <div className="rv-hero-stat">
              <div className="rv-hero-stat-val">{stats.label}</div>
              <div className="rv-hero-stat-lbl">Score</div>
            </div>
          </div>

          {/* safe pill */}
          <div className="rv-safe-pill">
            <span className="rv-safe-dot" />
            Genuine reviews from verified travelers
          </div>

          {/* wave */}
          <div className="rv-hero-wave">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#f8f6f1"/>
            </svg>
          </div>
        </div>

        {/* ══════════════ BODY ══════════════ */}
        <div className="rv-wrap">
          <div className="rv-inner">

            {/* Summary bar */}
            <div className="rv-summary">
              <div className="rv-big-score">
                <span className="rv-score-num">{stats.avg}</span>
                <StarRow rating={Number(stats.avg)} size={16} />
                <span className="rv-score-label">{stats.label}</span>
                <span className="rv-score-count">{stats.total} reviews</span>
              </div>
              <div className="rv-bars">
                {stats.breakdown.map(r => (
                  <div key={r.stars} className="rv-bar-row">
                    <span className="rv-bar-label">{r.stars} ★</span>
                    <div className="rv-bar-track">
                      <div className="rv-bar-fill" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="rv-bar-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter pills */}
            <div className="rv-filters">
              {tours.map(t => (
                <button key={t} className={`rv-filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
                  {t}
                </button>
              ))}
            </div>

            {/* Review cards */}
            <div className="rv-cards">
              {filtered.length === 0 && (
                <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>No reviews found.</p>
              )}
              {filtered.map((r, index) => (
                <div key={r?.id || index} className="rv-card">
                  <Quote className="rv-quote-icon" size={40} />
                  <div className="rv-card-top">
                    <div className="rv-card-user">
                      <Avatar initials={r?.initials || 'U'} color={r?.color_hex || '#000'} bg={r?.bg_hex || '#eee'} size={48} />
                      <div className="rv-user-info">
                        <span className="rv-user-name">{r?.name || 'Anonymous'}</span>
                        <span className="rv-user-meta">{r?.country || 'Unknown'} · {r?.review_date}</span>
                      </div>
                    </div>
                    {r?.tour_name && typeof r.tour_name === 'string' && (
                      <span className="rv-tour-tag">{r.tour_name.split(' ').slice(0, 2).join(' ')}</span>
                    )}
                  </div>
                  <div className="rv-card-rating">
                    <StarRow rating={r?.rating || 5} size={13} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1a' }}>{(r?.rating || 5).toFixed(1)}</span>
                  </div>
                  <div className="rv-card-title">{r?.title || 'Review'}</div>
                  <div className="rv-card-body">{r?.body || ''}</div>
                  <div className="rv-card-footer">
                    <div className="rv-verified">
                      {r?.is_verified === 1 ? (
                        <><CheckCircle size={13} /> Verified traveller</>
                      ) : (
                        <span style={{ color: '#aaa', fontWeight: 500 }}>Unverified</span>
                      )}
                    </div>
                    <button
                      className={`rv-helpful-btn ${helpfulClicked[r.id] ? 'clicked' : ''}`}
                      onClick={() => toggleHelpful(r.id)}
                    >
                      <ThumbsUp size={11} />
                      Helpful ({helpfulClicked[r.id] ? r.helpful_votes + 1 : r.helpful_votes})
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}