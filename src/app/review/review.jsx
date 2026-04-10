"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faThumbsUp, faCheckCircle, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "United Kingdom",
    initials: "SM",
    color: "#3B6D11",
    bg: "#EAF3DE",
    date: "March 2025",
    rating: 5,
    title: "An absolutely magical experience",
    body: "Words cannot describe how extraordinary this journey was. Our guide Karim knew every corner of the Sundarbans like his own backyard. We spotted a Royal Bengal Tiger on day two — I cried tears of joy. The private cruiser was impeccably clean and the food was outstanding.",
    tour: "Sundarbans Wildlife Safari",
    helpful: 34,
    verified: true,
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    country: "Japan",
    initials: "HT",
    color: "#854F0B",
    bg: "#FAEEDA",
    date: "February 2025",
    rating: 5,
    title: "Perfect in every detail",
    body: "I've done wildlife tours in 12 countries. This was the most intimate and authentic. Small group size made all the difference. The sunrise over the mangroves on day 3 is something I'll carry with me forever. Nayeem's team handled every logistics perfectly.",
    tour: "Sundarbans Wildlife Safari",
    helpful: 28,
    verified: true,
  },
  {
    id: 3,
    name: "Amara Osei",
    country: "Canada",
    initials: "AO",
    color: "#185FA5",
    bg: "#E6F1FB",
    date: "January 2025",
    rating: 4.5,
    title: "Exceeded all expectations",
    body: "The Sylhet tea garden tour was breathtaking. Rolling hills of emerald green as far as the eye can see. The waterfall hike was challenging but absolutely worth it. Only minor note — the road to the first garden is bumpy, but that's nature, not the tour operator's fault!",
    tour: "Sylhet Tea Gardens & Waterfalls",
    helpful: 19,
    verified: true,
  },
  {
    id: 4,
    name: "Elena Vasquez",
    country: "Spain",
    initials: "EV",
    color: "#993556",
    bg: "#FBEAF0",
    date: "December 2024",
    rating: 5,
    title: "Old Dhaka stole my heart",
    body: "The heritage walk was nothing like I expected — in the best possible way. Our guide took us through streets tourists never find. The Nawab's palace, the Armenian church, the rickshaw-pullers' district. We ate the most incredible street food. I felt like a local for a day.",
    tour: "Old Dhaka Heritage Walk",
    helpful: 41,
    verified: true,
  },
  {
    id: 5,
    name: "Marcus Webb",
    country: "Australia",
    initials: "MW",
    color: "#0F6E56",
    bg: "#E1F5EE",
    date: "November 2024",
    rating: 5,
    title: "Worth every penny and more",
    body: "Booked the Sundarbans tour as a solo traveller and was paired with a lovely couple from France. The armed forest guard added a thrilling edge. Saw spotted deer, monitor lizards, kingfishers, and yes — tiger paw prints fresh in the mud. Goosebumps.",
    tour: "Sundarbans Wildlife Safari",
    helpful: 22,
    verified: true,
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 98, pct: 79 },
  { stars: 4, count: 18, pct: 15 },
  { stars: 3, count: 6,  pct: 5  },
  { stars: 2, count: 1,  pct: 1  },
  { stars: 1, count: 1,  pct: 1  },
];

function StarRow({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => {
        const full = i <= Math.floor(rating);
        const half = !full && i - 0.5 === rating;
        return (
          <FontAwesomeIcon
            key={i}
            icon={full ? faStar : half ? faStarHalfAlt : faStarEmpty}
            style={{ fontSize: size, color: full || half ? '#d97706' : '#d1d5db' }}
          />
        );
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

export default function Review() {
  const [helpfulClicked, setHelpfulClicked] = useState({});
  const [filter, setFilter] = useState('All');

  const tours = ['All', 'Sundarbans Wildlife Safari', 'Sylhet Tea Gardens & Waterfalls', 'Old Dhaka Heritage Walk'];

  const filtered = filter === 'All' ? REVIEWS : REVIEWS.filter(r => r.tour === filter);

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

        .rv-summary { display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: center; background: #fff; border: 1px solid #ede9e0; border-radius: 24px; padding: 36px 40px; margin-bottom: 40px; }
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
        .rv-helpful-btn { display: flex; align-items: center; gap-6px; gap: 6px; font-size: 12px; color: #999; background: none; border: 1px solid #e5e5e5; border-radius: 100px; padding: 6px 14px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .rv-helpful-btn:hover { border-color: #d97706; color: #d97706; }
        .rv-helpful-btn.clicked { border-color: #d97706; color: #d97706; background: #FAEEDA; }
        .rv-quote-icon { position: absolute; top: 24px; right: 28px; font-size: 40px; color: #f0ece4; pointer-events: none; }
        .rv-date { font-size: 11px; color: #bbb; }
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
              <span className="rv-score-num">4.9</span>
              <StarRow rating={4.9} size={16} />
              <span className="rv-score-label">Exceptional</span>
              <span className="rv-score-count">124 reviews</span>
            </div>
            <div className="rv-bars">
              {RATING_BREAKDOWN.map(r => (
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
            {filtered.map(r => (
              <div key={r.id} className="rv-card">
                <FontAwesomeIcon icon={faQuoteLeft} className="rv-quote-icon" />

                <div className="rv-card-top">
                  <div className="rv-card-user">
                    <Avatar initials={r.initials} color={r.color} bg={r.bg} size={48} />
                    <div className="rv-user-info">
                      <span className="rv-user-name">{r.name}</span>
                      <span className="rv-user-meta">{r.country} · {r.date}</span>
                    </div>
                  </div>
                  <span className="rv-tour-tag">{r.tour.split(' ').slice(0, 2).join(' ')}</span>
                </div>

                <div className="rv-card-rating">
                  <StarRow rating={r.rating} size={13} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1a' }}>{r.rating.toFixed(1)}</span>
                </div>

                <div className="rv-card-title">{r.title}</div>
                <div className="rv-card-body">{r.body}</div>

                <div className="rv-card-footer">
                  <div className="rv-verified">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 13 }} />
                    Verified traveller
                  </div>
                  <button
                    className={`rv-helpful-btn ${helpfulClicked[r.id] ? 'clicked' : ''}`}
                    onClick={() => toggleHelpful(r.id)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 11 }} />
                    Helpful ({helpfulClicked[r.id] ? r.helpful + 1 : r.helpful})
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