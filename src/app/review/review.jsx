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

        /* ── Hero ── */
        .rv-hero {
          position: relative; overflow: hidden;
          background: #14532d;
          padding: 88px 40px 80px;
          text-align: center;
        }
        @media(max-width:640px){ .rv-hero { padding: 64px 20px 60px; } }
        .rv-hero-blob-a {
          position: absolute; top: -60px; left: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: #bbf7d0; filter: blur(100px); opacity: 0.1; pointer-events: none;
        }
        .rv-hero-blob-b {
          position: absolute; bottom: -40px; right: -40px;
          width: 260px; height: 260px; border-radius: 50%;
          background: #fde68a; filter: blur(90px); opacity: 0.1; pointer-events: none;
        }
        .rv-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .rv-hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
        .rv-hero-label {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .rv-hero-label-line { width: 28px; height: 1px; background: #d97706; }
        .rv-hero-label-text {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #d97706;
        }
        .rv-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900; color: #fff;
          line-height: 1.1; letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .rv-hero-title-accent {
          background: linear-gradient(90deg, #86efac 0%, #fde68a 60%, #86efac 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rv-shimmer 3s linear infinite;
          font-style: italic;
        }
        @keyframes rv-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .rv-hero-desc {
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255,255,255,0.6);
          line-height: 1.85; max-width: 680px; margin: 0 auto 32px;
        }
        .rv-hero-desc a {
          color: #fde68a; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .rv-hero-desc a:hover { color: #fbbf24; }
        .rv-hero-stats {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: center; gap: 32px;
        }
        .rv-hero-stat-num { font-size: 24px; font-weight: 800; color: #fff; line-height: 1; }
        .rv-hero-stat-lbl { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }
        .rv-hero-stat-div { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }
        .rv-hero-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 56px; pointer-events: none;
          background: linear-gradient(to bottom, transparent, #f8f6f1);
        }

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

        {/* ── Hero header ── */}
        <div className="rv-hero">
          <div className="rv-hero-blob-a" />
          <div className="rv-hero-blob-b" />
          <div className="rv-hero-grid" />

          <div className="rv-hero-inner">
            <div className="rv-hero-label">
              <span className="rv-hero-label-line" />
              <span className="rv-hero-label-text">Traveller Stories</span>
              <span className="rv-hero-label-line" />
            </div>

            <h1 className="rv-hero-title">
              Real Stories from{' '}
              <span className="rv-hero-title-accent">Real Travelers</span>
            </h1>

            <p className="rv-hero-desc">
              Discover genuine experiences shared by travelers who explored Bangladesh with{' '}
              <a href="https://www.bangladeshwithnaim.com" target="_blank" rel="noopener noreferrer">
                Bangladesh with Naim
              </a>. From cultural journeys and village homestays to hidden local experiences and
              unforgettable human connections, these reviews reflect the authentic memories, trust,
              and personal experiences created throughout each journey across Bangladesh.
            </p>

            <div className="rv-hero-stats">
              <div>
                <div className="rv-hero-stat-num">{stats.total}+</div>
                <div className="rv-hero-stat-lbl">Reviews</div>
              </div>
              <div className="rv-hero-stat-div" />
              <div>
                <div className="rv-hero-stat-num">{stats.avg}</div>
                <div className="rv-hero-stat-lbl">Avg Rating</div>
              </div>
              <div className="rv-hero-stat-div" />
              <div>
                <div className="rv-hero-stat-num">{stats.label}</div>
                <div className="rv-hero-stat-lbl">Overall Score</div>
              </div>
            </div>
          </div>

          <div className="rv-hero-fade" />
        </div>

        {/* ── Body ── */}
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