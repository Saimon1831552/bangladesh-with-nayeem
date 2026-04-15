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

  // Ensure reviews is actually an array to prevent mapping errors
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  // 1. Dynamically calculate overall statistics
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
      stars,
      count: counts[stars],
      pct: Math.round((counts[stars] / total) * 100)
    }));

    let label = "Good";
    if (avg >= 4.8) label = "Exceptional";
    else if (avg >= 4.0) label = "Very Good";
    else if (avg >= 3.0) label = "Average";

    return { avg, breakdown, total, label };
  }, [safeReviews]);

  // 2. Extract unique tour names for the filter tabs
  const tours = useMemo(() => {
    const uniqueTours = Array.from(new Set(safeReviews.map(r => r?.tour_name).filter(Boolean)));
    return ['All', ...uniqueTours];
  }, [safeReviews]);

  // 3. Filter the reviews based on the active tab
  const filtered = filter === 'All' ? safeReviews : safeReviews.filter(r => r?.tour_name === filter);

  const toggleHelpful = (id) => {
    setHelpfulClicked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .rv-wrap { font-family: 'DM Sans', sans-serif; background: #f8f6f1; padding: 72px 40px 80px; }
        @media(max-width:640px){ .rv-wrap { padding: 48px 20px 60px; } }
        .rv-inner { max-width: 1100px; margin: 0 auto; }
        .rv-header { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 52px; }
        .rv-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #d97706; margin-bottom: 8px; }
        .rv-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; color: #1c1c1a; line-height: 1.1; margin-bottom: 0; }
        .rv-title em { color: #15803d; font-style: italic; }

        .rv-summary { display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center; background: rgb(255, 255, 255); border: 1px solid #ede9e0; border-radius: 24px; padding: 36px 40px; margin-bottom: 40px; }
        @media(max-width:640px){ .rv-summary { grid-template-columns: 1fr; gap: 28px; padding: 28px; } }
        .rv-big-score { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .rv-score-num { font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 700; color: #1c1c1a; line-height: 1; }
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
        .rv-quote-icon { position: absolute; top: 24px; right: 28px; font-size: 40px; color: #f0ece4; pointer-events: none; }
      `}</style>

      <div className="rv-wrap">
        <div className="rv-inner">

          <div className="rv-header">
            <div className="rv-eyebrow">Traveller Stories</div>
            <h2 className="rv-title">What our guests <em>say</em></h2>
          </div>

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
                  {/* Strictly check that tour_name is a string before splitting */}
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
                      <>
                        <CheckCircle size={13} />
                        Verified traveller
                      </>
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
    </>
  );
}