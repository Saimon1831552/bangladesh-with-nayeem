'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faQuoteLeft,
  faThumbsUp,
  faCheckCircle,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

/* ─────────────────────────────────────────
   Global animation keyframes injected once
───────────────────────────────────────── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes floatA {
    0%,100% { transform: translate(-40%,-40%) scale(1); }
    50%      { transform: translate(-40%,-40%) scale(1.12) rotate(15deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translate(40%,40%) scale(1); }
    50%      { transform: translate(40%,40%) scale(1.15) rotate(-20deg); }
  }
  @keyframes floatC {
    0%,100% { transform: translate(-20%, 60%) scale(1); }
    50%      { transform: translate(-20%, 60%) scale(1.1) rotate(10deg); }
  }
  @keyframes starPop {
    0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
    70%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg);  opacity: 1; }
  }
  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,109,17,0.18); }
    50%       { box-shadow: 0 0 0 6px rgba(59,109,17,0); }
  }
  @keyframes slideInCard {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes quoteFloat {
    0%,100% { transform: translateY(0) rotate(0deg);   opacity: 0.18; }
    50%      { transform: translateY(-6px) rotate(6deg); opacity: 0.28; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .card-animated {
    animation: slideInCard 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .card-hover {
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.3s ease,
                border-color 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 20px 48px -12px rgba(59,109,17,0.15);
    border-color: #c6e4a8 !important;
  }
  .nav-btn-anim {
    transition: background 0.2s, color 0.2s, transform 0.15s;
  }
  .nav-btn-anim:hover:not(:disabled) {
    transform: scale(1.08);
  }
  .nav-btn-anim:active:not(:disabled) {
    transform: scale(0.95);
  }
  .star-anim {
    display: inline-block;
    animation: starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .badge-anim {
    animation: badgePulse 2.4s ease-in-out infinite, fadeIn 0.6s ease both;
  }
  .quote-float {
    animation: quoteFloat 4s ease-in-out infinite;
  }
  .stat-anim {
    animation: countUp 0.6s ease both;
  }
  .hero-title-anim {
    animation: fadeUp 0.7s ease both;
  }
  .hero-sub-anim {
    animation: fadeUp 0.7s 0.15s ease both;
  }
  .shimmer-text {
    background: linear-gradient(90deg, #16a34a 0%, #ca8a04 40%, #16a34a 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
`;

/* ── palette ── */
const PALETTES = [
  { bg: '#DBEAFE', color: '#1E40AF' },
  { bg: '#D1FAE5', color: '#065F46' },
  { bg: '#FEF3C7', color: '#92400E' },
  { bg: '#FCE7F3', color: '#9D174D' },
  { bg: '#EDE9FE', color: '#5B21B6' },
  { bg: '#FFEDD5', color: '#9A3412' },
];

/* ── useInView hook ── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ── AnimatedStat: counts up on scroll ── */
function AnimatedStat({ target, label, delay = 0 }) {
  const [ref, inView] = useInView();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const isFloat = target.includes('.');
    const isPercent = target.includes('%');
    const isPlus = target.includes('+');
    const num = parseFloat(target);
    const duration = 1200;
    const steps = 40;
    let step = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = num * eased;
        setDisplay(
          (isFloat ? val.toFixed(1) : Math.round(val)) +
          (isPercent ? '%' : isPlus ? '+' : '')
        );
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return (
    <div
      ref={ref}
      className="stat-anim"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <p className="text-4xl font-extrabold" style={{ color: '#3B6D11' }}>{display}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

/* ── StarRating with staggered pop ── */
function StarRating({ rating = 5, animate = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={animate ? 'star-anim' : ''}
          style={animate ? { animationDelay: `${s * 80}ms` } : {}}
        >
          <FontAwesomeIcon
            icon={s <= rating ? faStar : faStarEmpty}
            className="text-amber-400"
            style={{ fontSize: 13 }}
          />
        </span>
      ))}
    </div>
  );
}

/* ── Avatar ── */
function Avatar({ initials, palette }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
      style={{
        backgroundColor: palette.bg,
        color: palette.color,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {initials}
    </div>
  );
}

/* ── ReviewCard ── */
function ReviewCard({ review, palette, animDelay = 0, isVisible = true }) {
  return (
    <div
      className={`card-hover relative flex flex-col h-full rounded-3xl p-7 border ${isVisible ? 'card-animated' : ''}`}
      style={{
        background: '#fdfcfb',
        borderColor: '#e8e4dc',
        minWidth: 'calc(33.333% - 11px)',
        marginRight: '16px',
        animationDelay: `${animDelay}ms`,
        animationFillMode: 'both',
        opacity: isVisible ? undefined : 0.5,
      }}
    >
      {/* floating quote icon */}
      <div
        className="quote-float absolute top-5 right-6 text-5xl leading-none select-none"
        style={{ color: palette.color }}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>

      {/* avatar + name */}
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <Avatar initials={review.initials} palette={palette} />
        <div>
          <h4 className="font-bold text-gray-800 text-base leading-tight">{review.name}</h4>
          <p className="text-sm font-medium mt-0.5" style={{ color: palette.color }}>
            {review.country}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{review.review_date}</p>
        </div>
      </div>

      {/* stars + tour badge */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <StarRating rating={review.rating} animate={isVisible} />
        {review.tour_name && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: palette.bg, color: palette.color }}
          >
            {review.tour_name}
          </span>
        )}
      </div>

      {/* title */}
      {review.title && (
        <h5 className="font-bold text-gray-700 text-sm mb-2 relative z-10">{review.title}</h5>
      )}

      {/* body */}
      <p className="text-gray-500 text-sm leading-relaxed flex-grow relative z-10 italic">
        "{review.body?.trim()}"
      </p>

      {/* footer */}
      <div
        className="flex items-center justify-between pt-4 mt-5 relative z-10 border-t"
        style={{ borderColor: '#ede9e0' }}
      >
        {review.is_verified === 1 ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <FontAwesomeIcon icon={faCheckCircle} />
            Verified Traveler
          </div>
        ) : <span />}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{review.helpful_votes} helpful</span>
        </div>
      </div>
    </div>
  );
}

/* ── StatsBar ── */
function StatsBar({ reviews }) {
  const total = reviews.length;
  const avg = total
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / total).toFixed(1)
    : '0.0';
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  const stats = [
    { target: avg, label: 'Average rating', delay: 0 },
    { target: `${total}+`, label: 'Happy travelers', delay: 150 },
    { target: `${total ? Math.round((fiveStars / total) * 100) : 0}%`, label: '5-star reviews', delay: 300 },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-14 text-center">
      {stats.map(({ target, label, delay }) => (
        <AnimatedStat key={label} target={target} label={label} delay={delay} />
      ))}
    </div>
  );
}

/* ── Main ── */
const VISIBLE = 3;

export default function TestimonialsPage({ reviews = [] }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const maxIndex = Math.max(0, safeReviews.length - VISIBLE);
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const trackRef = useRef(null);
  const [sectionRef, sectionInView] = useInView();

  const goTo = useCallback((idx) => {
    const next = Math.max(0, Math.min(idx, maxIndex));
    setCurrent(next);
    setAnimKey((k) => k + 1);
    if (trackRef.current?.firstChild) {
      const w = trackRef.current.firstChild.getBoundingClientRect().width + 16;
      trackRef.current.style.transform = `translateX(-${next * w}px)`;
    }
  }, [maxIndex]);

  const showControls = safeReviews.length > VISIBLE;

  return (
    <main className="min-h-screen" style={{ background: '#faf8f4' }}>
      <style>{STYLES}</style>

      {/* ── Hero ── */}
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0faf0 0%, #fefce8 50%, #f0fdf4 100%)' }}
      >
        {/* animated blobs */}
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: '#bbf7d0',
            filter: 'blur(80px)',
            opacity: 0.35,
            animation: 'floatA 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: '#fde68a',
            filter: 'blur(70px)',
            opacity: 0.25,
            animation: 'floatB 9s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: '#a7f3d0',
            filter: 'blur(60px)',
            opacity: 0.18,
            animation: 'floatC 11s ease-in-out infinite',
          }}
        />

        <div className="relative z-10">
          <span
            className="badge-anim inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: '#D1FAE5', color: '#065F46' }}
          >
            Testimonials
          </span>
          <h1
            className="hero-title-anim text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#1a2e1a' }}
          >
            What Our Guests{' '}
            <span className="shimmer-text">Say</span>
          </h1>
          <p className="hero-sub-anim text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Real stories from real travelers who explored Bangladesh with us.
          </p>
        </div>
      </section>

      {/* ── Stats + Slider ── */}
      <section className="py-16 px-4" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">

          {safeReviews.length > 0 && sectionInView && (
            <StatsBar reviews={safeReviews} />
          )}

          {safeReviews.length === 0 ? (
            <p className="text-center text-gray-400 text-lg py-20">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <>
              {/* slider track */}
              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex"
                  style={{ transition: 'transform 0.48s cubic-bezier(0.4,0,0.2,1)' }}
                >
                  {safeReviews.map((review, i) => (
                    <ReviewCard
                      key={`${review.id}-${animKey}`}
                      review={review}
                      palette={PALETTES[i % PALETTES.length]}
                      animDelay={Math.max(0, (i - current) * 80)}
                      isVisible={i >= current && i < current + VISIBLE}
                    />
                  ))}
                </div>
              </div>

              {/* prev · dots · next */}
              {showControls && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    aria-label="Previous"
                    className="nav-btn-anim w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ borderColor: '#c6e4a8', background: '#fff', color: '#3B6D11' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#3B6D11'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#3B6D11'; }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 14 }} />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="h-2 rounded-full"
                        style={{
                          width: i === current ? 24 : 8,
                          background: i === current ? '#3B6D11' : '#c6e4a8',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'width 0.3s ease, background 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goTo(current + 1)}
                    disabled={current >= maxIndex}
                    aria-label="Next"
                    className="nav-btn-anim w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ borderColor: '#c6e4a8', background: '#fff', color: '#3B6D11' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#3B6D11'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#3B6D11'; }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 14 }} />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </main>
  );
}