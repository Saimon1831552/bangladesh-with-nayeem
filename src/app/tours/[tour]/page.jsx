"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot, faClock, faUserGroup, faCheck, faXmark,
  faChevronLeft, faStar, faCalendarDays, faShieldHalved, faRoute,
  faLeaf, faWater, faBinoculars
} from '@fortawesome/free-solid-svg-icons';

const IMAGES = [
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=2000&auto=format&fit=crop",
];

const STATS = [
  { icon: faClock,        label: "Duration",   value: "3 Days, 2 Nights" },
  { icon: faUserGroup,    label: "Group Size", value: "Private (2–6)"    },
  { icon: faLeaf,         label: "Meals",      value: "All Included"     },
  { icon: faShieldHalved, label: "Security",   value: "Armed Guard"      },
];

const INCLUDED = [
  "English-speaking expert guide",
  "All meals & mineral water",
  "Private cabin accommodation",
  "Forest permits & armed guard",
];

const EXCLUDED = [
  "International flights",
  "Personal expenses & tipping",
  "Travel insurance",
];

const ITINERARY = [
  {
    day: 1, color: "#d97706",
    title: "Arrival & Boarding",
    desc: "Arrive in Khulna early morning. Board our premium private cruiser. Enjoy a traditional Bengali breakfast as we set sail towards the forest. Afternoon creek exploration on a small wooden boat.",
    icon: faWater,
  },
  {
    day: 2, color: "#15803d",
    title: "Deep Forest Safari",
    desc: "Full day exploring Kotka and Jamtola beach. Jungle walk to the observation tower. High chance of spotting deer, monkeys, and rare birds. BBQ dinner on the deck under the stars.",
    icon: faBinoculars,
  },
  {
    day: 3, color: "#15803d",
    title: "Koromjol & Departure",
    desc: "Morning visit to Koromjol Wildlife Rescue Center. See the crocodile breeding program. Sail back to Khulna port after a farewell lunch onboard. Tour concludes.",
    icon: faLeaf,
  },
];

export default function TourDetails({ params }) {
  const [activeImg, setActiveImg] = useState(0);
  const [guests, setGuests] = useState(2);
  const heroRef = useRef(null);

  // Slow parallax on hero
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const total = 299 * guests;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .page-wrap { font-family: 'DM Sans', sans-serif; background: #f8f6f1; min-height: 100vh; color: #1c1c1c; }
        .display-font { font-family: 'Cormorant Garamond', serif; }

        /* Hero */
        .hero { position: relative; height: 92vh; overflow: hidden; }
        .hero-img-wrap { position: absolute; inset: 0; overflow: hidden; }
        .hero-img { width: 100%; height: 110%; object-fit: cover; }
        .hero-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,8,0.92) 0%, rgba(10,10,8,0.45) 45%, rgba(10,10,8,0.1) 100%); }
        .hero-top { position: absolute; top: 0; left: 0; right: 0; padding: 28px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .back-btn { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 100px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.2s; letter-spacing: 0.02em; }
        .back-btn:hover { background: rgba(255,255,255,0.22); }
        .top-rated { display: flex; align-items: center; gap: 6px; background: #d97706; color: #fff; padding: 10px 18px; border-radius: 100px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

        /* Thumbnail strip */
        .thumb-strip { position: absolute; right: 40px; bottom: 120px; display: flex; flex-direction: column; gap: 10px; z-index: 20; }
        .thumb { width: 64px; height: 48px; border-radius: 10px; object-fit: cover; cursor: pointer; border: 2px solid transparent; opacity: 0.55; transition: opacity 0.25s, border-color 0.25s, transform 0.2s; }
        .thumb.active { opacity: 1; border-color: #d97706; transform: scale(1.08); }
        .thumb:hover { opacity: 0.85; }

        /* Hero content */
        .hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 40px 56px; z-index: 10; max-width: 820px; }
        .hero-tags { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
        .hero-tag { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); color: #d97706; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 14px; border-radius: 8px; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 700; color: #fff; line-height: 1.05; margin-bottom: 16px; letter-spacing: -0.01em; }
        .hero-title em { color: #d97706; font-style: italic; }
        .hero-sub { color: rgba(255,255,255,0.75); font-size: 16px; font-weight: 400; line-height: 1.7; max-width: 560px; }

        /* Stars row */
        .stars-row { display: flex; align-items: center; gap: 6px; margin-bottom: 14px; }
        .star-icon { color: #d97706; font-size: 13px; }
        .rating-text { font-size: 13px; font-weight: 600; color: #fff; }
        .review-text { font-size: 12px; color: rgba(255,255,255,0.5); }

        /* Image counter */
        .img-counter { position: absolute; bottom: 56px; right: 40px; font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; letter-spacing: 0.08em; z-index: 10; }

        /* Main layout */
        .main { max-width: 1280px; margin: 0 auto; padding: 64px 40px 80px; display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: start; }
        @media(max-width: 1024px){ .main { grid-template-columns: 1fr; } }
        @media(max-width: 640px){ .main { padding: 40px 20px 60px; } .hero-content{ padding: 0 20px 40px; } .hero-top{ padding: 20px; } .thumb-strip{ display: none; } }

        /* Stats bento */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 56px; }
        @media(max-width: 640px){ .stats-grid { grid-template-columns: repeat(2,1fr); } }
        .stat-card { background: #fff; border: 1px solid #ede9e0; border-radius: 20px; padding: 24px 16px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s; cursor: default; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .stat-icon-wrap { width: 48px; height: 48px; border-radius: 50%; background: #f0faf4; display: flex; align-items: center; justify-content: center; }
        .stat-label { font-size: 10px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.1em; }
        .stat-value { font-size: 14px; font-weight: 700; color: #1c1c1c; }

        /* Section headings */
        .section-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #d97706; margin-bottom: 8px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; font-weight: 700; color: #1c1c1c; line-height: 1.1; margin-bottom: 28px; }

        /* Overview */
        .overview-block { background: #fff; border: 1px solid #ede9e0; border-radius: 28px; padding: 44px; margin-bottom: 56px; }
        .overview-block p { font-size: 16px; line-height: 1.85; color: #555; margin-bottom: 16px; }
        .overview-block p:last-child { margin-bottom: 0; }

        /* Gallery strip inside overview */
        .gallery-strip { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 28px; border-radius: 16px; overflow: hidden; height: 220px; }
        .gallery-strip img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gallery-strip img:hover { transform: scale(1.04); }
        .gallery-right { display: grid; grid-template-rows: 1fr 1fr; gap: 12px; }

        /* Itinerary */
        .itinerary { margin-bottom: 56px; }
        .timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #d97706, #15803d, #15803d); border-radius: 2px; }
        .timeline-item { display: flex; gap: 24px; padding-bottom: 28px; position: relative; }
        .timeline-item:last-child { padding-bottom: 0; }
        .day-bubble { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #fff; flex-shrink: 0; z-index: 2; border: 3px solid #f8f6f1; }
        .timeline-card { background: #fff; border: 1px solid #ede9e0; border-radius: 20px; padding: 28px; flex: 1; transition: transform 0.2s, box-shadow 0.2s; }
        .timeline-card:hover { transform: translateX(6px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); }
        .timeline-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 700; color: #1c1c1c; margin-bottom: 8px; }
        .timeline-card p { font-size: 14px; line-height: 1.75; color: #666; }
        .day-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #d97706; margin-bottom: 4px; }

        /* Included/Excluded */
        .inc-exc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
        @media(max-width: 640px){ .inc-exc-grid { grid-template-columns: 1fr; } }
        .inc-card { background: #fff; border: 1px solid #d1fae5; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; }
        .exc-card { background: #fff; border: 1px solid #fee2e2; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; }
        .corner-blob { position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.5; }
        .inc-card h3, .exc-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 700; color: #1c1c1c; margin-bottom: 20px; position: relative; z-index: 1; }
        .inc-list, .exc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .inc-list li, .exc-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #444; font-weight: 400; line-height: 1.5; }
        .check-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 10px; }

        /* Booking widget */
        .booking-widget { background: #1c1c1a; border-radius: 28px; padding: 36px; color: #fff; position: sticky; top: 24px; }
        .widget-price { font-family: 'Cormorant Garamond', serif; font-size: 3.2rem; font-weight: 700; color: #fff; line-height: 1; }
        .widget-pp { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 400; }
        .widget-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 24px 0; }
        .widget-row { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; margin-bottom: 14px; }
        .widget-field { padding: 16px; cursor: pointer; transition: background 0.2s; }
        .widget-field:hover { background: rgba(255,255,255,0.05); }
        .widget-field:first-child { border-right: 1px solid rgba(255,255,255,0.12); }
        .widget-field label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .widget-field span { font-size: 13px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 6px; }
        .guest-row { border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
        .guest-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); display: block; margin-bottom: 2px; }
        .guest-count { font-size: 15px; color: #fff; font-weight: 600; }
        .guest-controls { display: flex; align-items: center; gap: 12px; }
        .guest-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); background: transparent; color: #fff; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; line-height: 1; }
        .guest-btn:hover { background: rgba(255,255,255,0.1); }
        .price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .price-row-label { font-size: 13px; color: rgba(255,255,255,0.5); }
        .price-row-val { font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 500; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 6px; margin-bottom: 24px; }
        .total-label { font-size: 15px; font-weight: 600; color: #fff; }
        .total-val { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: #d97706; }
        .reserve-btn { width: 100%; padding: 18px; border-radius: 16px; background: #d97706; border: none; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; font-family: 'DM Sans', sans-serif; }
        .reserve-btn:hover { background: #b45309; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(217,119,6,0.35); }
        .secure-badge { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500; margin-top: 16px; letter-spacing: 0.04em; }

        /* Fade-in animation */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
      `}</style>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-img-wrap">
            <img ref={heroRef} className="hero-img" src={IMAGES[activeImg]} alt="Sundarbans" />
          </div>
          <div className="hero-gradient" />

          {/* Top bar */}
          <div className="hero-top">
            <Link href="/tours" className="back-btn">
              <FontAwesomeIcon icon={faChevronLeft} />
              Back to Tours
            </Link>
            <div className="top-rated">
              <FontAwesomeIcon icon={faStar} />
              Top Rated
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="thumb-strip">
            {IMAGES.map((src, i) => (
              <img key={i} src={src} alt="" className={`thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)} />
            ))}
          </div>

          {/* Image counter */}
          <div className="img-counter">{activeImg + 1} / {IMAGES.length}</div>

          {/* Hero content */}
          <div className="hero-content">
            <div className="stars-row fade-up fade-up-1">
              {[1,2,3,4,5].map(i => <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />)}
              <span className="rating-text">4.9</span>
              <span className="review-text">· 124 reviews</span>
            </div>
            <div className="hero-tags fade-up fade-up-1">
              <span className="hero-tag"><FontAwesomeIcon icon={faLocationDot} /> Khulna, Bangladesh</span>
              <span className="hero-tag"><FontAwesomeIcon icon={faRoute} /> Wildlife Safari</span>
            </div>
            <h1 className="hero-title fade-up fade-up-2">
              Sundarbans<br /><em>Wildlife Safari</em>
            </h1>
            <p className="hero-sub fade-up fade-up-3">
              Journey deep into the world's largest mangrove forest and track the elusive Royal Bengal Tiger in ultimate comfort.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="main">

          {/* Left column */}
          <div>

            {/* Stats bento */}
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon-wrap">
                    <FontAwesomeIcon icon={s.icon} style={{ fontSize: 18, color: '#15803d' }} />
                  </div>
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="overview-block">
              <div className="section-eyebrow">About This Tour</div>
              <div className="section-title">Experience Overview</div>

              {/* 3-image gallery */}
              <div className="gallery-strip">
                <img src={IMAGES[0]} alt="Sundarbans view 1" />
                <div className="gallery-right">
                  <img src={IMAGES[1]} alt="Sundarbans view 2" />
                  <img src={IMAGES[2]} alt="Sundarbans view 3" />
                </div>
              </div>

              <p>Embark on an unforgettable journey into the heart of the Sundarbans, the largest contiguous mangrove forest in the world. This private tour is meticulously designed to give you an intimate, authentic experience with raw nature while maintaining premium comfort.</p>
              <p>Navigate narrow, mist-covered creeks on a silent wooden country boat, walk on untouched pristine islands, and keep your eyes peeled for the elusive Royal Bengal Tiger, spotted deer, and saltwater crocodiles.</p>
            </div>

            {/* Itinerary */}
            <div className="itinerary">
              <div className="section-eyebrow">Day by Day</div>
              <div className="section-title">Tour Itinerary</div>
              <div className="timeline">
                {ITINERARY.map((item) => (
                  <div key={item.day} className="timeline-item">
                    <div className="day-bubble" style={{ background: item.color }}>{item.day}</div>
                    <div className="timeline-card">
                      <div className="day-label">Day {item.day}</div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="inc-exc-grid">
              <div className="inc-card">
                <div className="corner-blob" style={{ background: '#d1fae5' }} />
                <h3>What's Included</h3>
                <ul className="inc-list">
                  {INCLUDED.map((item, i) => (
                    <li key={i}>
                      <span className="check-dot" style={{ background: '#dcfce7', color: '#16a34a' }}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="exc-card">
                <div className="corner-blob" style={{ background: '#fee2e2' }} />
                <h3>What's Excluded</h3>
                <ul className="exc-list">
                  {EXCLUDED.map((item, i) => (
                    <li key={i}>
                      <span className="check-dot" style={{ background: '#fee2e2', color: '#ef4444' }}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* ── BOOKING WIDGET ── */}
          <div>
            <div className="booking-widget">

              <div style={{ marginBottom: 6 }}>
                <span className="widget-pp">From</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span className="widget-price">$299</span>
                <span className="widget-pp">/ person</span>
              </div>

              <div className="widget-divider" />

              <div className="widget-row">
                <div className="widget-field">
                  <label>Check-in</label>
                  <span><FontAwesomeIcon icon={faCalendarDays} style={{ opacity: 0.5 }} /> Add date</span>
                </div>
                <div className="widget-field">
                  <label>Check-out</label>
                  <span>Add date</span>
                </div>
              </div>

              <div className="guest-row">
                <div>
                  <span className="guest-label">Guests</span>
                  <span className="guest-count">{guests} {guests === 1 ? 'Adult' : 'Adults'}</span>
                </div>
                <div className="guest-controls">
                  <button className="guest-btn" onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
                  <span style={{ color: '#fff', fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{guests}</span>
                  <button className="guest-btn" onClick={() => setGuests(g => Math.min(6, g + 1))}>+</button>
                </div>
              </div>

              <div className="price-row">
                <span className="price-row-label">$299 × {guests} persons</span>
                <span className="price-row-val">${(299 * guests).toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span className="price-row-label">Taxes & fees</span>
                <span className="price-row-val">$0</span>
              </div>

              <div className="total-row">
                <span className="total-label">Total (USD)</span>
                <span className="total-val">${total.toLocaleString()}</span>
              </div>

              <button className="reserve-btn">Reserve Now</button>

              <div className="secure-badge">
                <FontAwesomeIcon icon={faShieldHalved} />
                Secure & Encrypted Booking
              </div>

              <div className="widget-divider" />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', letterSpacing: '0.03em' }}>You won't be charged yet</p>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}