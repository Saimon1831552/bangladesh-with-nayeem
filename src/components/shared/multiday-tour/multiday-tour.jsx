"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TourCard } from '@/app/tours/tours';


export default function Multiday() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            const res = await fetch("https://bangladesh-with-nayeem-production.up.railway.app/api/tours");
            const json = await res.json();
            setTours(json.data || []);
        };
        fetchTours();
    }, []);
  return (
    <div style={{ background: '#f8f6f1', padding: '72px 32px 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
            <span style={{ width: 48, height: 2, background: '#f59e0b', borderRadius: 99, display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#166534' }}>
              Choose Your Adventure
            </span>
            <span style={{ width: 48, height: 2, background: '#f59e0b', borderRadius: 99, display: 'block' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1c1c1a',
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            Multiday <em style={{ color: '#15803d', fontStyle: 'italic' }}>Tours</em>
          </h2>
          <p style={{ fontSize: 15, color: '#888', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Carefully curated experiences designed for international travelers seeking authenticity and unforgettable memories.
          </p>
        </div>

        {/* Cards Grid — same TourCard from tours.jsx */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32,
        }}>
          {
            tours.filter((tour) => tour.tour_type === 'multiday').map((tour) => (
               <TourCard key={tour.id} tour={tour} />
            ))
          }
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <Link
            href="/tours"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 36px',
              borderRadius: 12,
              background: '#1c1c1a',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'background 0.2s',
            }}
          >
            View All Tours →
          </Link>
        </div>

      </div>
    </div>
  );
}