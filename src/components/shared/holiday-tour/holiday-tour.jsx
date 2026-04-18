"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TourCard } from '@/app/tours/tours';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://bangladesh-with-nayeem-production.up.railway.app')
  .replace(/\/api\/?$/, '');

export default function Holiday() {
  const [tours,   setTours]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    // ✅ Filter server-side — don't fetch all tours
    fetch(`${API_BASE}/api/tours?tour_type=holiday`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => setTours(json.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#f8f6f1', padding: '72px 32px 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
            <span style={{ width: 48, height: 2, background: '#f59e0b', borderRadius: 99, display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#166534' }}>Choose Your Adventure</span>
            <span style={{ width: 48, height: 2, background: '#f59e0b', borderRadius: 99, display: 'block' }} />
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1c1c1a', lineHeight: 1.1, marginBottom: 12 }}>
            Holiday <em style={{ color: '#15803d', fontStyle: 'italic' }}>Tours</em>
          </h2>
          <p style={{ fontSize: 15, color: '#888', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Carefully curated experiences designed for international travelers seeking authenticity and unforgettable memories.
          </p>
        </div>

        {error ? (
          <p style={{ textAlign: 'center', color: '#ef4444', fontWeight: 600, padding: '40px 0' }}>Failed to load holiday tours. Please refresh.</p>
        ) : loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ height: 440, borderRadius: 20, background: 'linear-gradient(90deg,#e8e4da 25%,#f0ece2 50%,#e8e4da 75%)', backgroundSize: '200% 100%', animation: 'shimmerSk 1.4s ease infinite' }} />
            ))}
            <style>{`@keyframes shimmerSk{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
          </div>
        ) : tours.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>No holiday tours available.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <Link href="/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', borderRadius: 12, background: '#1c1c1a', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.03em' }}>
            View All Tours →
          </Link>
        </div>
      </div>
    </div>
  );
}