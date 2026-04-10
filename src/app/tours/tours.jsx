"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faUserGroup, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const tours = [
  {
    id: 1,
    slug: "sundarbans-safari",
    title: "Sundarbans Wildlife Safari",
    image: "https://i.ibb.co.com/B51QQ7Dh/813.jpg",
    location: "Khulna, Bangladesh",
    duration: "3 Days, 2 Nights",
    groupSize: "2 - 6 People",
    price: "$299",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    slug: "sylhet-tea-gardens",
    title: "Sylhet Tea Gardens & Waterfalls",
    image: "https://i.ibb.co.com/G4s2z73j/41413.jpg",
    location: "Sylhet, Bangladesh",
    duration: "2 Days, 1 Night",
    groupSize: "2 - 8 People",
    price: "$180",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    slug: "old-dhaka-heritage",
    title: "Old Dhaka Heritage Walk",
    image: "https://i.ibb.co.com/N6LG9xNp/19899.jpg",
    location: "Dhaka, Bangladesh",
    duration: "Full Day",
    groupSize: "1 - 4 People",
    price: "$85",
    rating: 5.0,
    reviews: 210,
  },
];

export default function Tour() {
  return (
    <div className="bg-slate-50 min-h-screen py-24 md:py-32 font-sans text-gray-800">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-3 pt-8 mb-6">
            <span className="w-12 h-0.5 bg-amber-500 rounded-full"></span>
            <span className="text-sm font-extrabold tracking-widest text-green-800 uppercase">Choose Your Adventure</span>
            <span className="w-12 h-0.5 bg-amber-500 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
            Our Exclusive <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">Private Tours</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-8 mx-auto">
            Carefully curated experiences designed for international travelers seeking authenticity, comfort, and unforgettable memories.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 lg:gap-10">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

      </div>
    </div>
  );
}

function TourCard({ tour }) {
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

  const fullStars = Math.floor(tour.rating);

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
      `}</style>

      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tour-card group"
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
        {/* Background Image */}
        <img
          src={tour.image}
          alt={tour.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
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

        {/* Floating particles */}
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
          <span style={{ display: 'block', fontSize: 20, fontWeight: 800, color: '#111', lineHeight: 1 }}>{tour.price}</span>
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

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, zIndex: 10 }}>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: 11, color: i < fullStars ? '#fbbf24' : 'rgba(255,255,255,0.25)' }} />
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{tour.rating}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>({tour.reviews} reviews)</span>
          </div>

          {/* Title */}
          <h3 className="card-title" style={{
            fontSize: 20, fontWeight: 800, color: '#fff',
            lineHeight: 1.25, marginBottom: 12,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {tour.title}
          </h3>

          {/* Pills */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 13 }}>
            {[
              { icon: faClock, label: tour.duration },
              { icon: faUserGroup, label: tour.groupSize },
            ].map(({ icon, label }) => (
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

          {/* CTA Button */}
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