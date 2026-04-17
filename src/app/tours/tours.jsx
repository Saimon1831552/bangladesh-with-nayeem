"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot, faClock, faUserGroup, faStar, faArrowRight,
  faSpinner, faTriangleExclamation, faSliders, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://bangladesh-with-nayeem-production.up.railway.app/api';

// ── Data fetching ─────────────────────────────────────────────────────────────
async function fetchTours(filters = {}) {
  const params = new URLSearchParams();
  if (filters.tour_type) params.set('tour_type', filters.tour_type);
  if (filters.location)  params.set('location',  filters.location);
  const res = await fetch(`${API_BASE}/tours?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch tours (${res.status})`);
  const json = await res.json();
  return json.data || [];
}

const TOUR_TYPES = ['day', 'multiday', 'holiday', 'adventure', 'wildlife', 'cultural'];

// ── Tour Card (identical visuals to original) ─────────────────────────────────
export function TourCard({ tour }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  const fullStars = Math.floor(tour.rating || 0);
  // Price: prefer `price` field, support both "$180" string or 180 number
  const priceDisplay = tour.price
    ? (typeof tour.price === 'number' ? `$${tour.price}` : tour.price)
    : '—';

  return (
    <>
      <style>{`
        .tour-card { transition: transform 0.08s ease-out; }
        .tour-card img { transition: transform 0.7s ease; }
        .tour-card:hover img { transform: scale(1.08); }
        .tour-card:hover .shimmer-inner { transform: translateX(200%); }
        .shimmer-inner { transform: translateX(-200%); transition: transform 0.7s ease-in-out; }
        .tour-card:hover .price-badge { transform: translateY(-5px); }
        .price-badge { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1); }
        .tour-card:hover .loc-badge { transform: translateX(5px); }
        .loc-badge { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1); }
        .tour-card:hover .card-title { color: #86efac; }
        .card-title { transition: color 0.3s; }
        .tour-card:hover .cta-btn { background: #15803d; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); }
        .cta-btn { transition: background 0.25s, transform 0.2s, box-shadow 0.3s; }
        .tour-card:hover .cta-arrow { transform: translateX(5px); }
        .cta-arrow { transition: transform 0.25s cubic-bezier(.34,1.56,.64,1); }
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(0); }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-120px) scale(1.5); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .tour-card-enter { animation: cardIn 0.4s ease both; }
      `}</style>

      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tour-card tour-card-enter group"
        style={{
          position: 'relative',
          height: '440px',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid #f1f5f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Background image */}
        <img
          src={tour.image_url}
          alt={tour.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80'; }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.04) 100%)',
        }} />

        {/* Shimmer */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="shimmer-inner" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
          }} />
        </div>

        {/* Float particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{
            position: 'absolute',
            width: 4, height: 4,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            left: `${15 + i * 14}%`,
            bottom: 0,
            animation: `floatUp ${2 + i * 0.4}s ${i * 0.5}s linear infinite`,
          }} />
        ))}

        {/* Price badge */}
        <div className="price-badge" style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(8px)',
          borderRadius: 12,
          padding: '8px 14px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}>
          <span style={{ display: 'block', fontSize: 20, fontWeight: 800, color: '#111', lineHeight: 1 }}>{priceDisplay}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>per person</span>
        </div>

        {/* Location badge */}
        <div className="loc-badge" style={{
          position: 'absolute', top: 16, left: 16, zIndex: 10,
          background: 'rgba(22,163,74,0.92)',
          backdropFilter: 'blur(6px)',
          borderRadius: 8,
          padding: '5px 11px',
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 10, fontWeight: 700, color: '#fff',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 10 }} />
          {tour.location}
        </div>

        {/* Card body */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, zIndex: 10 }}>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: 11, color: i < fullStars ? '#fbbf24' : 'rgba(255,255,255,0.25)' }} />
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{tour.rating}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>({tour.review_count} reviews)</span>
          </div>

          {/* Title */}
          <h3 className="card-title" style={{
            fontSize: 20, fontWeight: 800, color: '#fff',
            lineHeight: 1.25, marginBottom: 12,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {tour.title}
          </h3>

          {/* Meta pills */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 13 }}>
            {[
              { icon: faClock,     label: tour.duration   },
              { icon: faUserGroup, label: tour.group_size },
            ].map(({ icon, label }) => label && (
              <span key={label} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(4px)',
                border: '0.5px solid rgba(255,255,255,0.22)',
                borderRadius: 30,
                padding: '5px 11px',
                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
              }}>
                <FontAwesomeIcon icon={icon} style={{ fontSize: 10, opacity: 0.75 }} />
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/tours/${tour.slug}`}
            className="cta-btn"
            aria-label={`View details for ${tour.title}`}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', height: 46,
              borderRadius: 12,
              background: '#16a34a',
              color: '#fff',
              fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              overflow: 'hidden',
            }}
          >
            View Tour Details
            <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
          </Link>
        </div>
      </article>
    </>
  );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      height: 440, borderRadius: 20, overflow: 'hidden',
      background: 'linear-gradient(90deg,#e8e4da 25%,#f0ece2 50%,#e8e4da 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmerSk 1.4s ease infinite',
    }}>
      <style>{`@keyframes shimmerSk{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorBanner({ msg, onRetry }) {
  return (
    <div style={{
      textAlign: 'center', padding: '64px 24px',
      background: '#fff9f9', border: '1px solid #fde8e8',
      borderRadius: 24, maxWidth: 480, margin: '0 auto',
    }}>
      <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: 36, color: '#ef4444', marginBottom: 16 }} />
      <p style={{ fontSize: 16, color: '#c53030', fontWeight: 600, marginBottom: 8 }}>Failed to load tours</p>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>{msg}</p>
      <button onClick={onRetry} style={{
        padding: '10px 28px', borderRadius: 12, background: '#16a34a',
        color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
      }}>Try again</button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Tour() {
  const [tours,      setTours]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [search,     setSearch]     = useState('');
  const [activeType, setActiveType] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTours({ tour_type: activeType });
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when type filter changes
  useEffect(() => { load(); }, [activeType]); // eslint-disable-line

  // Client-side search filter on already-fetched tours
  const filtered = tours.filter(t =>
    !search ||
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f8f6f1] min-h-screen py-24 md:py-32 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-amber-500 rounded-full" />
            <span className="text-sm font-extrabold tracking-widest text-green-800 uppercase">Choose Your Adventure</span>
            <span className="w-12 h-0.5 bg-amber-500 rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Our Exclusive <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">Private Tours</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Carefully curated experiences designed for international travelers seeking authenticity, comfort, and unforgettable memories.
          </p>
        </div>

        {/* ── Search + Filter bar ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
          background: '#fff', borderRadius: 16, padding: '12px 16px',
          border: '1px solid #e5e0d6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: 32,
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: 14 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tours or destinations…"
              style={{
                width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9,
                border: '1px solid #e5e0d6', borderRadius: 10, fontSize: 14,
                color: '#333', background: '#faf9f6', outline: 'none',
              }}
            />
          </div>

          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faSliders} style={{ color: '#888', fontSize: 14 }} />
            {['', ...TOUR_TYPES].map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  border: activeType === t ? '1.5px solid #16a34a' : '1.5px solid #e5e0d6',
                  background: activeType === t ? '#16a34a' : 'transparent',
                  color: activeType === t ? '#fff' : '#555',
                  cursor: 'pointer', transition: 'all .15s',
                  textTransform: 'capitalize',
                }}
              >
                {t || 'All'}
              </button>
            ))}
          </div>

          {/* Live count */}
          {!loading && (
            <span style={{ fontSize: 13, color: '#999', fontWeight: 500, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
              {filtered.length} tour{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ── Grid ── */}
        {error ? (
          <ErrorBanner msg={error} onRetry={load} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: 18, color: '#999', fontWeight: 500 }}>No tours match your search.</p>
            <button onClick={() => { setSearch(''); setActiveType(''); }} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 12, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}