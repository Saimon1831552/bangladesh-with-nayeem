"use client";

import React, { useRef, useState, useEffect, use } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHandPointRight } from "react-icons/fa6";
import {
  faLocationDot, faClock, faUserGroup, faCheck, faXmark,
  faChevronLeft, faStar, faCalendarDays, faShieldHalved, faRoute,
  faLeaf, faWater, faBinoculars, faSpinner, faTriangleExclamation,
  faImage, faTag, faCircleInfo, faArrowRotateLeft, faMagnifyingGlass,
  faUsers, faBus, faPlus, faBolt
} from '@fortawesome/free-solid-svg-icons';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://bangladesh-with-nayeem-production.up.railway.app/api';

async function fetchTour(slug) {
  const res = await fetch(`${API_BASE}/tours/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Tour not found (${res.status})`);
  const json = await res.json();
  return json.data;
}

async function fetchGallery(tourId) {
  try {
    const res = await fetch(`${API_BASE}/gallery?tour_id=${tourId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

async function fetchReviews(tourId) {
  try {
    const res = await fetch(`${API_BASE}/reviews?tour_id=${tourId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const parsePrice = (p) => {
  if (!p) return 0;
  if (typeof p === 'number') return p;
  return parseFloat(String(p).replace(/[^0-9.]/g, '')) || 0;
};

const formatPrice = (p) => {
  if (!p) return '—';
  if (typeof p === 'number') return `$${p}`;
  return String(p).startsWith('$') ? p : `$${p}`;
};

function getHighlights(tour) {
  let parsed = tour.highlights;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { return []; }
  }
  return Array.isArray(parsed) ? parsed : [];
}

function getWhyChoose(tour) {
  let parsed = tour.why_choose;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { return []; }
  }
  return Array.isArray(parsed) ? parsed : [];
}

function getFaq(tour) {
  let parsed = tour.faq;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { return []; }
  }
  return Array.isArray(parsed) ? parsed : [];
}

function buildItinerary(tour) {
  let parsedItinerary = tour.itinerary;
  if (typeof parsedItinerary === 'string') {
    try { parsedItinerary = JSON.parse(parsedItinerary); } catch (e) {}
  }
  if (Array.isArray(parsedItinerary) && parsedItinerary.length > 0) return parsedItinerary;

  const durationStr = tour.duration || '1 Day';
  const dayMatch = durationStr.match(/(\d+)\s*day/i);
  const days = dayMatch ? parseInt(dayMatch[1]) : 1;
  const dayColors = ['#d97706', '#15803d', '#1d4ed8', '#7c3aed', '#b91c1c'];

  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    color: dayColors[i % dayColors.length],
    title: i === 0 ? 'Arrival & Orientation' : i === days - 1 ? 'Farewell & Departure' : `Exploration Day ${i + 1}`,
    desc: `Day ${i + 1} of your ${tour.title} experience. Your expert guide will lead you through the highlights of this incredible destination.`,
    icon: i === 0 ? faWater : i === days - 1 ? faLeaf : faBinoculars,
  }));
}

function buildStats(tour) {
  const stats = [];
  if (tour.duration)   stats.push({ icon: faClock,        label: 'Duration',   value: tour.duration });
  if (tour.group_size) stats.push({ icon: faUserGroup,    label: 'Group Size', value: tour.group_size });
  stats.push({ icon: faLeaf,         label: 'Meals',      value: 'Included' });
  stats.push({ icon: faShieldHalved, label: 'Security',   value: 'Expert Guide' });
  return stats;
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <>
      <style>{`
        @keyframes skShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .sk{background:linear-gradient(90deg,#e8e4da 25%,#f0ece2 50%,#e8e4da 75%);background-size:200% 100%;animation:skShimmer 1.4s ease infinite;border-radius:12px;}
      `}</style>
      <div style={{ height: '92vh' }} className="sk" />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[90, 40, 60, 200, 300].map((h, i) => <div key={i} className="sk" style={{ height: h }} />)}
        </div>
        <div className="sk" style={{ height: 480, borderRadius: 28 }} />
      </div>
    </>
  );
}

// ── Error page ────────────────────────────────────────────────────────────────
function ErrorPage({ msg }) {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
      <FontAwesomeIcon icon={faTriangleExclamation} style={{ fontSize: 48, color: '#ef4444', marginBottom: 20 }} />
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 8 }}>Tour Not Found</h2>
      <p style={{ color: '#888', marginBottom: 28 }}>{msg}</p>
      <Link href="/tours" style={{ padding: '12px 28px', borderRadius: 12, background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
        ← Back to Tours
      </Link>
    </div>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function FaqSection({ faqItems }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="faq-section">
      <div className="section-eyebrow">Got Questions?</div>
      <div className="section-title" style={{ fontSize: '1.8rem', marginBottom: 20 }}>Frequently Asked</div>
      {faqItems.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <span>{item.question || item.q || item}</span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`faq-chevron ${openIdx === i ? 'open' : ''}`}
              style={{ transform: openIdx === i ? 'rotate(-90deg)' : 'rotate(-90deg) scaleY(-1)' }}
            />
          </button>
          {openIdx === i && (
            <div className="faq-answer">
              {item.answer || item.a || ''}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TourDetails({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [tour,      setTour]      = useState(null);
  const [gallery,   setGallery]   = useState([]);
  const [reviews,   setReviews]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [guests,    setGuests]    = useState(2);
  const heroRef = useRef(null);
  const navRef  = useRef(null);

  // Active nav link on scroll
  useEffect(() => {
    const ids = ['overview','highlights','itinerary','price','inclusion','why-naim','trip-note','faq','booking'];
    const onScroll = () => {
      const offset = 130;
      let active = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) active = id;
      }
      if (!navRef.current) return;
      navRef.current.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === `#${active}`) {
          a.classList.add('nav-active');
          a.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        } else {
          a.classList.remove('nav-active');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const tourData = await fetchTour(slug);
        setTour(tourData);
        const [galleryData, reviewsData] = await Promise.all([
          fetchGallery(tourData.id),
          fetchReviews(tourData.id),
        ]);
        setGallery(galleryData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => { hero.style.transform = `translateY(${window.scrollY * 0.3}px)`; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return <PageSkeleton />;
  if (error || !tour) return <ErrorPage msg={error || 'Tour data unavailable.'} />;

  // ── Derived data ──────────────────────────────────────────────────────────
  const images = gallery.length > 0
    ? gallery.map(g => g.image_url)
    : tour.image_url
      ? [tour.image_url]
      : ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=2000&q=80'];

  const priceNum  = parsePrice(tour.price);
  const priceFmt  = formatPrice(tour.price);
  const total     = priceNum * guests;
  const stats     = buildStats(tour);
  const itinerary = buildItinerary(tour);
  const highlights  = getHighlights(tour);
  const whyChoose   = getWhyChoose(tour);
  const faqItems    = getFaq(tour);
  const tripNote    = tour.trip_note || '';
  const rating      = tour.rating || 0;
  const fullStars   = Math.floor(rating);
  const typeTags    = (tour.tour_type || '').split(',').map(t => t.trim()).filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Base ── */
        .page-wrap { font-family: 'DM Sans', sans-serif; background: #f8f6f1; min-height: 100vh; color: #1c1c1c; }
        .display-font { font-family: 'Cormorant Garamond', serif; }

        /* ── Hero (UNCHANGED) ── */
        .hero { position: relative; height: 92vh; overflow: hidden; }
        .hero-img-wrap { position: absolute; inset: 0; overflow: hidden; }
        .hero-img { width: 100%; height: 110%; object-fit: cover; }
        .hero-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,8,0.92) 0%, rgba(10,10,8,0.45) 45%, rgba(10,10,8,0.1) 100%); }
        .hero-top { position: absolute; top: 0; left: 0; right: 0; padding: 28px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .back-btn { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 20px; border-radius: 100px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.2s; letter-spacing: 0.02em; }
        .back-btn:hover { background: rgba(255,255,255,0.22); }
        .top-rated { display: flex; align-items: center; gap: 6px; background: #d97706; color: #fff; padding: 10px 18px; border-radius: 100px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .thumb-strip { position: absolute; right: 40px; bottom: 120px; display: flex; flex-direction: column; gap: 10px; z-index: 20; }
        .thumb { width: 64px; height: 48px; border-radius: 10px; object-fit: cover; cursor: pointer; border: 2px solid transparent; opacity: 0.55; transition: opacity 0.25s, border-color 0.25s, transform 0.2s; }
        .thumb.active { opacity: 1; border-color: #d97706; transform: scale(1.08); }
        .thumb:hover { opacity: 0.85; }
        .hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 40px 56px; z-index: 10; max-width: 820px; }
        .hero-tags { display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
        .hero-tag { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); color: #d97706; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 14px; border-radius: 8px; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 700; color: #fff; line-height: 1.05; margin-bottom: 16px; letter-spacing: -0.01em; }
        .hero-title em { color: #d97706; font-style: italic; }
        .hero-sub { color: rgba(255,255,255,0.75); font-size: 16px; font-weight: 400; line-height: 1.7; max-width: 560px; }
        .stars-row { display: flex; align-items: center; gap: 6px; margin-bottom: 14px; }
        .star-icon { color: #d97706; font-size: 13px; }
        .rating-text { font-size: 13px; font-weight: 600; color: #fff; }
        .review-text { font-size: 12px; color: rgba(255,255,255,0.5); }
        .img-counter { position: absolute; bottom: 56px; right: 40px; font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; letter-spacing: 0.08em; z-index: 10; }

        /* ── Main two-column layout ── */
        .main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 60px;
          align-items: start;
        }
        @media(max-width: 1024px) { .main { grid-template-columns: 1fr; } }
        @media(max-width: 640px) {
          .main { padding: 40px 20px 60px; }
          .hero-content { padding: 0 20px 40px; }
          .hero-top { padding: 20px; }
          .thumb-strip { display: none; }
        }

        /* ── Right column sticky wrapper ── */
        .right-col {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media(max-width: 1024px) {
          .right-col {
            position: static;
          }
        }

        /* ── Stats grid ── */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 48px; }
        @media(max-width: 640px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        .stat-card { background: #fff; border: 1px solid #ede9e0; border-radius: 20px; padding: 24px 16px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s; cursor: default; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .stat-icon-wrap { width: 48px; height: 48px; border-radius: 50%; background: #f0faf4; display: flex; align-items: center; justify-content: center; }
        .stat-label { font-size: 10px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.1em; }
        .stat-value { font-size: 14px; font-weight: 700; color: #1c1c1c; }

        /* ── Section headings ── */
        .section-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #d97706; margin-bottom: 8px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: #1c1c1c; line-height: 1.1; margin-bottom: 24px; }

        /* ── Section spacing ── */
        .section-block { margin-bottom: 52px; }
        .section-block:last-child { margin-bottom: 0; }

        /* ── Overview ── */
        .overview-block { background: #fff; border: 1px solid #ede9e0; border-radius: 28px; padding: 40px; }
        .overview-block p { font-size: 16px; line-height: 1.85; color: #555; margin-bottom: 16px; }
        .overview-block p:last-child { margin-bottom: 0; }
        .gallery-strip { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 28px; border-radius: 16px; overflow: hidden; height: 220px; }
        .gallery-strip img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gallery-strip img:hover { transform: scale(1.04); }
        .gallery-right { display: grid; grid-template-rows: 1fr 1fr; gap: 12px; }

        /* ── Highlights ── */
        .highlights-list { padding-left: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .highlights-list li { font-size: 15.5px; color: #555; line-height: 1.6; display: flex; align-items: flex-start; gap: 10px; list-style: none; }
        .highlight-icon { color: #d97706; margin-top: 3px; flex-shrink: 0; }

        /* ── Itinerary ── */
        .timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
        .timeline::before { content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #d97706, #15803d); border-radius: 2px; }
        .timeline-item { display: flex; gap: 24px; padding-bottom: 28px; position: relative; }
        .timeline-item:last-child { padding-bottom: 0; }
        .day-bubble { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #fff; flex-shrink: 0; z-index: 2; border: 3px solid #f8f6f1; }
        .timeline-card { background: #fff; border: 1px solid #ede9e0; border-radius: 20px; padding: 28px; flex: 1; transition: transform 0.2s, box-shadow 0.2s; }
        .timeline-card:hover { transform: translateX(6px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); }
        .timeline-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 700; color: #1c1c1c; margin-bottom: 8px; }
        .timeline-card p { font-size: 14px; line-height: 1.75; color: #666; }
        .day-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #d97706; margin-bottom: 4px; }

        /* ── Included / Excluded ── */
        .inc-exc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width: 640px) { .inc-exc-grid { grid-template-columns: 1fr; } }
        .inc-card { background: #fff; border: 1px solid #d1fae5; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; }
        .exc-card { background: #fff; border: 1px solid #fee2e2; border-radius: 24px; padding: 32px; position: relative; overflow: hidden; }
        .corner-blob { position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; border-radius: 50%; opacity: 0.5; }
        .inc-card h3, .exc-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 700; color: #1c1c1c; margin-bottom: 20px; position: relative; z-index: 1; }
        .inc-list, .exc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .inc-list li, .exc-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #444; font-weight: 400; line-height: 1.5; }
        .check-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; font-size: 10px; }

        /* ── Why Choose ── */
        .why-grid { display: flex; flex-direction: column; gap: 12px; }
        .why-card { background: #fff; border: 1px solid #ede9e0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: flex-start; gap: 14px; transition: transform 0.2s, box-shadow 0.2s; }
        .why-card:hover { transform: translateX(6px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); }
        .why-icon { width: 36px; height: 36px; border-radius: 50%; background: #f0faf4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .why-text { font-size: 14.5px; color: #444; line-height: 1.65; font-weight: 400; }

        /* ── Trip Note ── */
        .trip-note-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 20px; padding: 28px 32px; }
        .trip-note-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .trip-note-icon { font-size: 16px; color: #b45309; flex-shrink: 0; }
        .trip-note-title { font-size: 14px; font-weight: 700; color: #92400e; }
        .trip-note-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .trip-note-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #555; line-height: 1.7; }
        .trip-note-bullet { width: 6px; height: 6px; border-radius: 50%; background: #d97706; flex-shrink: 0; margin-top: 8px; }

        /* ── Price & Offers ── */
        .price-offers-box { background: #fff; border: 1px solid #ede9e0; border-radius: 28px; padding: 36px; }
        .price-tour-subtitle { font-size: 13px; font-weight: 700; color: #15803d; background: #f0faf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 14px; margin-bottom: 20px; }
        .price-row-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; margin-bottom: 12px; line-height: 1.6; }
        .price-row-icon { width: 20px; text-align: center; flex-shrink: 0; margin-top: 1px; }
        .price-highlight { font-weight: 700; color: #1c1c1c; }
        .price-italic-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05rem; color: #15803d; margin: 20px 0; font-weight: 600; }
        .price-divider { height: 1px; background: #ede9e0; margin: 20px 0; }
        .price-sub-heading { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1c1c1c; margin-bottom: 12px; }
        .price-bullet-list { list-style: none; padding: 0; margin: 0 0 4px; display: flex; flex-direction: column; gap: 9px; }
        .price-bullet-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: #555; line-height: 1.6; }
        .price-bullet-dot { width: 6px; height: 6px; border-radius: 50%; background: #d97706; flex-shrink: 0; margin-top: 7px; }
        .contact-link { color: #15803d; font-weight: 700; text-decoration: none; }
        .contact-link:hover { text-decoration: underline; }

        /* ── Reviews ── */
        .review-card { background: #fff; border: 1px solid #ede9e0; border-radius: 20px; padding: 28px; margin-bottom: 14px; }
        .review-card:last-child { margin-bottom: 0; }
        .review-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }

        /* ── Booking Widget ── */
        .booking-widget { background: #1c1c1a; border-radius: 20px; padding: 22px; color: #fff; }
        .widget-price { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1; }
        .widget-pp { font-size: 12px; color: rgba(255,255,255,0.45); font-weight: 400; }
        .widget-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 14px 0; }
        .widget-row { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; overflow: hidden; margin-bottom: 10px; }
        .widget-field { padding: 10px 12px; cursor: pointer; transition: background 0.2s; }
        .widget-field:hover { background: rgba(255,255,255,0.05); }
        .widget-field:first-child { border-right: 1px solid rgba(255,255,255,0.12); }
        .widget-field label { display: block; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
        .widget-field span { font-size: 12px; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 5px; }
        .guest-row { border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .guest-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); display: block; margin-bottom: 2px; }
        .guest-count { font-size: 13px; color: #fff; font-weight: 600; }
        .guest-controls { display: flex; align-items: center; gap: 10px; }
        .guest-btn { width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); background: transparent; color: #fff; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; line-height: 1; }
        .guest-btn:hover { background: rgba(255,255,255,0.1); }
        .price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .price-row-label { font-size: 12px; color: rgba(255,255,255,0.5); }
        .price-row-val { font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 500; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 4px; margin-bottom: 16px; }
        .total-label { font-size: 13px; font-weight: 600; color: #fff; }
        .total-val { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: #d97706; }
        .reserve-btn { width: 100%; padding: 13px; border-radius: 12px; background: #d97706; border: none; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; font-family: 'DM Sans', sans-serif; }
        .reserve-btn:hover { background: #b45309; transform: translateY(-2px); box-shadow: 0 10px 22px rgba(217,119,6,0.35); }
        .secure-badge { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 10px; color: rgba(255,255,255,0.35); font-weight: 500; margin-top: 12px; letter-spacing: 0.04em; }

        /* ── FAQ (right column) ── */
        .faq-section { margin-bottom: 0; }
        .faq-item { background: #fff; border: 1px solid #ede9e0; border-radius: 16px; margin-bottom: 10px; overflow: hidden; transition: box-shadow 0.2s; }
        .faq-item:last-child { margin-bottom: 0; }
        .faq-item:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
        .faq-question { width: 100%; background: none; border: none; text-align: left; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 16px; }
        .faq-question span { font-size: 14px; font-weight: 600; color: #1c1c1c; line-height: 1.5; }
        .faq-chevron { font-size: 12px; color: #d97706; flex-shrink: 0; transition: transform 0.25s; }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer { padding: 0 22px 18px; font-size: 13.5px; color: #666; line-height: 1.8; }

        /* ── Animations ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }

        /* ── Section Nav ── */
        .section-nav {
          position: sticky;
          top: 70px;
          z-index: 90;
          background: rgba(248,246,241,0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #ede9e0;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
        }
        .section-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .section-nav-inner::-webkit-scrollbar { display: none; }
        .section-nav-inner a {
          flex-shrink: 0;
          display: block;
          padding: 14px 15px;
          font-size: 11.5px;
          font-weight: 600;
          color: #666;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .section-nav-inner a:hover,
        .section-nav-inner a.nav-active {
          color: #d97706;
          border-bottom-color: #d97706;
        }
        @media(max-width: 1024px) { .section-nav { top: 60px; } }
        @media(max-width: 640px) {
          .section-nav { top: 56px; }
          .section-nav-inner { padding: 0 12px; }
          .section-nav-inner a { padding: 12px 10px; font-size: 10px; }
        }

        /* ── Scroll offset for sticky nav + site header ── */
        #hero, #overview, #highlights, #itinerary,
        #price, #inclusion, #why-naim, #trip-note,
        #faq, #booking {
          scroll-margin-top: 120px;
        }
        @media(max-width: 640px) {
          #hero, #overview, #highlights, #itinerary,
          #price, #inclusion, #why-naim, #trip-note,
          #faq, #booking {
            scroll-margin-top: 104px;
          }
        }

        /* ── Text justify ── */
        .text-justify { text-align: justify; }
        .overview-block p { text-align: justify; }
        .timeline-card p { text-align: justify; }
        .highlights-list li { text-align: justify; }
        .inc-list li, .exc-list li { text-align: justify; }
        .why-text { text-align: justify; }
        .trip-note-list li { text-align: justify; }
        .price-row-item { text-align: justify; }
        .price-bullet-list li { text-align: justify; }
        .faq-answer { text-align: justify; }
        .review-card p { text-align: justify; }
      `}</style>

      <div className="page-wrap">

        {/* ══════════════════════════════ HERO (UNCHANGED) ══════════════════════════════ */}
        <div id="hero" className="hero">
          <div className="hero-img-wrap">
            <img ref={heroRef} className="hero-img" src={images[activeImg]} alt={tour.title}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=2000&q=80'; }} />
          </div>
          <div className="hero-gradient" />

          <div className="hero-top">
            <Link href="/tours" className="back-btn">
              <FontAwesomeIcon icon={faChevronLeft} /> Back to Tours
            </Link>
            {rating >= 4.5 && (
              <div className="top-rated">
                <FontAwesomeIcon icon={faStar} /> Top Rated
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumb-strip">
              {images.slice(0, 5).map((src, i) => (
                <img key={i} src={src} alt="" className={`thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  onError={e => { e.target.style.display = 'none'; }} />
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="img-counter">{activeImg + 1} / {images.length}</div>
          )}

          <div className="hero-content">
            <div className="stars-row fade-up fade-up-1">
              {[1,2,3,4,5].map(i => (
                <FontAwesomeIcon key={i} icon={faStar} className="star-icon"
                  style={{ color: i <= fullStars ? '#d97706' : 'rgba(255,255,255,0.25)' }} />
              ))}
              <span className="rating-text">{rating}</span>
              <span className="review-text">· {tour.review_count} reviews</span>
            </div>
            <div className="hero-tags fade-up fade-up-1">
              <span className="hero-tag"><FontAwesomeIcon icon={faLocationDot} /> {tour.location}</span>
              {typeTags.slice(0, 2).map(t => (
                <span key={t} className="hero-tag"><FontAwesomeIcon icon={faRoute} /> {t}</span>
              ))}
            </div>
            <h1 className="hero-title fade-up fade-up-2">
              {tour.title.includes(' ')
                ? <>{tour.title.split(' ').slice(0, Math.ceil(tour.title.split(' ').length / 2)).join(' ')}<br /><em>{tour.title.split(' ').slice(Math.ceil(tour.title.split(' ').length / 2)).join(' ')}</em></>
                : tour.title
              }
            </h1>
            <p className="hero-sub fade-up fade-up-3">
              {`Journey through ${tour.location} on this exclusive private tour, crafted for travelers who demand comfort, authenticity, and unforgettable memories.`}
            </p>
          </div>
        </div>
        {/* ══════════════════════════════ END HERO ══════════════════════════════ */}



        {/* ══════════════════════════════ MAIN CONTENT ══════════════════════════════ */}
        <div className="main">

          {/* ════════════════ LEFT COLUMN ════════════════ */}
          <div>

            {/* Stats bar */}
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon-wrap">
                    <FontAwesomeIcon icon={s.icon} style={{ fontSize: 18, color: '#15803d' }} />
                  </div>
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>

            {/* 1. Overview */}
            <div id="overview" className="section-block">
              <div className="overview-block">
                <div className="section-eyebrow">About This Tour</div>
                <div className="section-title">Experience Overview</div>

                {images.length >= 2 && (
                  <div className="gallery-strip">
                    <img src={images[0]} alt={`${tour.title} view 1`} onError={e => e.target.style.display='none'} />
                    <div className="gallery-right">
                      <img src={images[1] || images[0]} alt={`${tour.title} view 2`} onError={e => e.target.style.display='none'} />
                      {images[2] && <img src={images[2]} alt={`${tour.title} view 3`} onError={e => e.target.style.display='none'} />}
                    </div>
                  </div>
                )}

                <div className='text-justify' dangerouslySetInnerHTML={{ __html: tour.overview || `Embark on an unforgettable journey to ${tour.location}. This private tour is meticulously designed to give you an intimate, authentic experience while maintaining premium comfort.` }} />
              </div>
            </div>

            {/* 2. Highlights */}
            {highlights.length > 0 && (
              <div id="highlights" className="section-block">
                <div className="section-eyebrow">What You'll See</div>
                <div className="section-title">Tour Highlights</div>
                <ul className="highlights-list">
                  {highlights.map((h, i) => (
                    <li key={i}>
                      <span className="highlight-icon"><FaHandPointRight /></span>
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Itinerary */}
            <div id="itinerary" className="section-block">
              <div className="section-eyebrow">Day by Day</div>
              <div className="section-title">Tour Itinerary</div>
              <div className="timeline">
                {itinerary.map((item) => (
                  <div key={item.day} className="timeline-item">
                    <div className="day-bubble" style={{ background: item.color }}>{item.day}</div>
                    <div className="timeline-card">
                      <div className="day-label">{(item.day>1)? `Day ${item.day}` : 'Day'}</div>
                      <h3 className='text-justify'>{item.title}</h3>
                      <p className='text-justify'>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* 7. Price & Offers */}
            <div id="price" className="section-block">
              <div className="section-eyebrow">Pricing</div>
              <div className="section-title">Tour Price &amp; Offers</div>
              <div className="price-offers-box">
                <div className="price-tour-subtitle">
                  🔒 {tour.title} – Affordable Private Experience
                </div>

                <div className="price-row-item">
                  <span className="price-row-icon" style={{ color: '#15803d' }}>$</span>
                  <span><strong>Start:</strong> The first <span className="price-highlight">1–2 guests</span> are a flat fee of{' '}
                    <span className="price-highlight">{priceFmt} USD total.</span>
                  </span>
                </div>
                <div className="price-row-item">
                  <span className="price-row-icon" style={{ color: '#1d4ed8' }}><FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} /></span>
                  <span><strong>Add-On:</strong> Each additional guest (up to 2 more) is <span className="price-highlight">$70 USD per person</span></span>
                </div>
                <div className="price-row-item">
                  <span className="price-row-icon" style={{ color: '#7c3aed' }}><FontAwesomeIcon icon={faUsers} style={{ fontSize: 12 }} /></span>
                  <span><strong>Group Size:</strong> A maximum of <span className="price-highlight">6 guests</span> on <span className="price-highlight">regular departures</span></span>
                </div>
                <div className="price-row-item">
                  <span className="price-row-icon" style={{ color: '#d97706' }}><FontAwesomeIcon icon={faBus} style={{ fontSize: 12 }} /></span>
                  <span><strong>Custom Tour?</strong> Solo, groups &amp; families — <a href="/contact" className="contact-link">contact us</a> for a personalised quote.</span>
                </div>

                <p className="price-italic-tagline">Your Day, Your Way – A Fully Tailored Tour for Ultimate Experience</p>

                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faBolt} style={{ fontSize: 14, color: '#d97706' }} /> Special Offer</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Early-Bird Deals:</strong> Save <strong>flat 10%</strong> when you <strong>book 60+ days in advance.</strong></span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Multi-Tour Bonus:</strong> Book <strong>1+ days</strong> and <strong>receive a handicraft souvenir.</strong></span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Free Airport Transfer:</strong> Complimentary transfers with any <strong>multi-day tour.</strong></span></li>
                </ul>

                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faTag} style={{ fontSize: 14, color: '#d97706' }} /> Fair Pricing Promise</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Transparent Inclusions:</strong> All entry fees, rickshaw &amp; boat rides included.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>No Surprise Costs:</strong> No "factory" visits or shopping commissions—ever.</span></li>
                </ul>

                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faArrowRotateLeft} style={{ fontSize: 14, color: '#d97706' }} /> Free Rescheduling &amp; Cancellation</div>
                <ul className="price-bullet-list">
                  <li><span className="price-bullet-dot" /><span><strong>Complimentary Rescheduling:</strong> Change your date up to 72 hours before the tour.</span></li>
                  <li><span className="price-bullet-dot" /><span><strong>Fair Cancellation:</strong> Full refund if cancelled 30+ days before; see <a href="/cancellation-policy" className="contact-link">cancellation policy.</a></span></li>
                </ul>

                <div className="price-divider" />
                <div className="price-sub-heading"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 14, color: '#d97706' }} /> Fixed Departures or B2B Tours?</div>
                <p style={{ fontSize: 13.5, color: '#555', lineHeight: 1.7, marginTop: 4 }}>
                  We offer fixed-departure group tours and bespoke B2B packages. <a href="/contact" className="contact-link">Get in touch</a> to discuss your requirements.
                </p>
              </div>
            </div>

            {/* 4. Included / Excluded */}
            <div id="inclusion" className="section-block">
              <div className="section-eyebrow">What's Covered</div>
              <div className="section-title">Inclusions &amp; Exclusions</div>
              <div className="inc-exc-grid">
                <div className="inc-card">
                  <div className="corner-blob" style={{ background: '#d1fae5' }} />
                  <h3>What's Included</h3>
                  <ul className="inc-list">
                    {(tour.included || [
                      'English-speaking expert guide',
                      'All meals & mineral water',
                      'Private accommodation',
                      'All permits & entrance fees',
                    ]).map((item, i) => (
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
                    {(tour.excluded || [
                      'International flights',
                      'Personal expenses & tipping',
                      'Travel insurance',
                    ]).map((item, i) => (
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



            {/* 6. Trip Note */}
            {tripNote && (
              <div id="trip-note" className="section-block">
                <div className="section-eyebrow">Important</div>
                <div className="section-title">Trip Note</div>
                <div className="trip-note-box">
                  <div className="trip-note-header">
                    <FontAwesomeIcon icon={faCircleInfo} className="trip-note-icon" />
                    <span className="trip-note-title">Please read before booking</span>
                  </div>
                  <ul className="trip-note-list">
                  {(() => {
                    const raw = tripNote.trim();
                    // If data uses <strong> tags as bullet headers, split before each <strong>
                    const items = raw.includes('<strong>')
                      ? raw.split(/(?=<strong>)/).map(s => s.trim()).filter(s => s.length > 0)
                      : raw.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 4);
                    return items.map((item, i) => (
                      <li key={i}>
                        <span className="trip-note-bullet text-justify" />
                        <span dangerouslySetInnerHTML={{ __html: item.trim() }} />
                      </li>
                    ));
                  })()}
                </ul>
                </div>
              </div>
            )}


           {/* 5. Why Choose Us */}
            {whyChoose.length > 0 && (
              <div id="why-naim" className="section-block">
                <div className="section-eyebrow">Our Promise</div>
                <div className="section-title">Why Book This Tour With Naim?</div>
                <div className="why-grid">
                  {whyChoose.map((item, i) => (
                    <div key={i} className="why-card">
                      
                      <span className="why-text" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Reviews */}
            {reviews.length > 0 && (
              <div className="section-block">
                <div className="section-eyebrow">What Travelers Say</div>
                <div className="section-title">Guest Reviews</div>
                {reviews.map(r => (
                  <div key={r.id} className="review-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <div className="review-avatar" style={{ background: r.bg_hex || '#EAF3DE', color: r.color_hex || '#3B6D11' }}>
                        {r.initials || r.name?.charAt(0) || 'A'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 15, color: '#1c1c1c' }}>{r.name}</span>
                            {r.country && <span style={{ fontSize: 12, color: '#999', marginLeft: 8 }}>{r.country}</span>}
                          </div>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {[1,2,3,4,5].map(i => (
                              <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: 12, color: i <= r.rating ? '#d97706' : '#e5e7eb' }} />
                            ))}
                          </div>
                        </div>
                        {r.title && <p style={{ fontWeight: 600, fontSize: 14, color: '#333', marginBottom: 6 }}>{r.title}</p>}
                        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{r.body}</p>
                        <p style={{ fontSize: 11, color: '#bbb', marginTop: 8 }}>{r.review_date}{r.is_verified ? ' · ✓ Verified' : ''}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
          {/* ════════════════ END LEFT COLUMN ════════════════ */}

          {/* ════════════════ RIGHT COLUMN (sticky) ════════════════ */}
          <div className="right-col">

            {/* 1. Booking Widget */}
            <div id="booking" className="booking-widget">
              <div style={{ marginBottom: 6 }}>
                <span className="widget-pp">From</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span className="widget-price">{priceFmt}</span>
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
                  <button className="guest-btn" onClick={() => setGuests(g => Math.min(12, g + 1))}>+</button>
                </div>
              </div>

              {priceNum > 0 && (
                <>
                  <div className="price-row">
                    <span className="price-row-label">{priceFmt} × {guests} persons</span>
                    <span className="price-row-val">${total.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span className="price-row-label">Taxes & fees</span>
                    <span className="price-row-val">$0</span>
                  </div>
                  <div className="total-row">
                    <span className="total-label">Total (USD)</span>
                    <span className="total-val">${total.toLocaleString()}</span>
                  </div>
                </>
              )}

              <button className="reserve-btn">Booking Now</button>

              <div className="secure-badge">
                <FontAwesomeIcon icon={faShieldHalved} />
                Secure & Encrypted Booking
              </div>

              <div className="widget-divider" />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', letterSpacing: '0.03em' }}>You won't be charged yet</p>
            </div>

            {/* 2. FAQ */}
            {faqItems.length > 0 && (
              <div id="faq">
                <FaqSection faqItems={faqItems} />
              </div>
            )}

          </div>
          {/* ════════════════ END RIGHT COLUMN ════════════════ */}

        </div>
        {/* ══════════════════════════════ END MAIN CONTENT ══════════════════════════════ */}

      </div>
    </>
  );
}