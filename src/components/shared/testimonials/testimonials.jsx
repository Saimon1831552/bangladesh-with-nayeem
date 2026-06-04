'use client';

import { useEffect, useState, useRef, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faQuoteLeft,
  faThumbsUp,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

/* ── Keyframes ── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatA {
    0%,100% { transform: translate(-40%,-40%) scale(1); }
    50%      { transform: translate(-40%,-40%) scale(1.12) rotate(15deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translate(40%,40%) scale(1); }
    50%      { transform: translate(40%,40%) scale(1.15) rotate(-20deg); }
  }
  @keyframes quoteFloat {
    0%,100% { transform: translateY(0) rotate(0deg);   opacity: 0.12; }
    50%      { transform: translateY(-6px) rotate(6deg); opacity: 0.22; }
  }
  @keyframes starPop {
    0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
    70%  { transform: scale(1.3) rotate(5deg); opacity: 1; }
    100% { transform: scale(1)  rotate(0deg);  opacity: 1; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0   rgba(59,109,17,0.18); }
    50%      { box-shadow: 0 0 0 6px rgba(59,109,17,0); }
  }
  .shimmer-text {
    background: linear-gradient(90deg,#16a34a 0%,#ca8a04 40%,#16a34a 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .card-hover:hover {
    transform: translateY(-7px) scale(1.015) !important;
    box-shadow: 0 24px 48px -12px rgba(59,109,17,0.14) !important;
    border-color: #b6dfa0 !important;
  }
  .star-anim {
    display: inline-block;
    animation: starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .quote-float { animation: quoteFloat 4s ease-in-out infinite; }
  .badge-pulse { animation: badgePulse 2.4s ease-in-out infinite; }
`;

/* ── Palettes ── */
const PALETTES = [
  { bg: '#D1FAE5', color: '#065F46' },
  { bg: '#DBEAFE', color: '#1E40AF' },
  { bg: '#FEF3C7', color: '#92400E' },
  { bg: '#EDE9FE', color: '#5B21B6' },
  { bg: '#FCE7F3', color: '#9D174D' },
  { bg: '#FFEDD5', color: '#9A3412' },
];

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!ref || inView) return; // Prevent re-observing if already in view
    
    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setInView(true); 
          obs.disconnect(); 
        } 
      },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold, inView]);
  
  return [setRef, inView];
}

/* ── AnimatedStat ── */
function AnimatedStat({ target, label, delay = 0, inView }) {
  const [display, setDisplay] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Sync state if the incoming target prop updates
  useEffect(() => {
    setDisplay(target);
    setHasAnimated(false);
  }, [target]);

  useEffect(() => {
    if (!inView || hasAnimated) return;

    // Safely cast to string to prevent `.includes` crashes on raw numbers
    const targetStr = String(target);
    const isFloat   = targetStr.includes('.');
    const isPercent = targetStr.includes('%');
    const isPlus    = targetStr.includes('+');
    const num = parseFloat(targetStr) || 0;
    
    const steps = 40;
    const duration = 1200;
    let step = 0;
    let iv;

    // Set to '0' format right before interval begins
    setDisplay((isFloat ? '0.0' : '0') + (isPercent ? '%' : isPlus ? '+' : ''));

    const t = setTimeout(() => {
      iv = setInterval(() => {
        step++;
        const eased = 1 - Math.pow(1 - step / steps, 3);
        const val = num * eased;
        
        if (step >= steps) {
          clearInterval(iv);
          setDisplay(targetStr); // Guarantee exact final output string
          setHasAnimated(true);
        } else {
          setDisplay(
            (isFloat ? val.toFixed(1) : Math.round(val)) +
            (isPercent ? '%' : isPlus ? '+' : '')
          );
        }
      }, duration / steps);
    }, delay);

    // Strict cleanup handles unmounts gracefully
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
      if (!hasAnimated) setDisplay(targetStr); // Resolve to final value if aborted
    };
  }, [inView, hasAnimated, target, delay]);

  return (
    <div
      className="text-center"
      style={{
        animation: inView ? `countUp 0.6s ease ${delay}ms both` : 'none',
        opacity: inView ? undefined : 0,
      }}
    >
      <p className="text-3xl md:text-4xl font-extrabold" style={{ color: '#3B6D11' }}>
        {display}
      </p>
      <p className="text-xs md:text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

/* ── StarRating ── */
function StarRating({ rating = 5, animate = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={animate ? 'star-anim' : ''}
          style={animate ? { animationDelay: `${s * 70}ms` } : {}}
        >
          <FontAwesomeIcon
            icon={s <= rating ? faStar : faStarEmpty}
            className="text-amber-400"
            style={{ fontSize: 12 }}
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
      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-base md:text-lg font-extrabold flex-shrink-0"
      style={{ backgroundColor: palette.bg, color: palette.color }}
    >
      {initials}
    </div>
  );
}

/* ── ReviewCard ── */
const ReviewCard = memo(function ReviewCard({ review, palette, delay = 0 }) {
  const [setRef, inView] = useInView(0.1);

  const transition = [
    `opacity 0.55s ease ${delay}ms`,
    `transform 0.55s ease ${delay}ms`,
    'box-shadow 0.35s ease',
    'border-color 0.35s ease',
  ].join(', ');

  // Extract initials properly with a fallback
  const userInitials = review.initials || review.name?.charAt(0).toUpperCase() || '?';

  return (
    <div
      ref={setRef}
      className="card-hover relative flex flex-col h-full rounded-3xl p-6 md:p-7 border bg-white"
      style={{
        borderColor: '#e8e4dc',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(1)',
        transition,
      }}
    >
      <div
        className="quote-float absolute top-4 right-5 text-4xl md:text-5xl leading-none select-none pointer-events-none"
        style={{ color: palette.color, opacity: 0.15 }}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>

      <div className="flex items-center gap-3 mb-4 relative z-10">
        <Avatar initials={userInitials} palette={palette} />
        <div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{review.name}</h4>
          <p className="text-xs md:text-sm font-semibold mt-0.5" style={{ color: palette.color }}>{review.country}</p>
          <p className="text-xs text-gray-400 mt-0.5">{review.review_date}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
        <StarRating rating={review.rating} animate={inView} />
        {review.tour_name && (
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: palette.bg, color: palette.color }}
          >
            {review.tour_name}
          </span>
        )}
      </div>

      {review.title && (
        <h5 className="font-bold text-gray-700 text-xs md:text-sm mb-2 relative z-10">{review.title}</h5>
      )}

      {/* <p className="text-gray-500 text-xs md:text-sm leading-relaxed flex-grow relative z-10 italic">
        &quot;{review.body?.trim()}&quot;
      </p> */}

      <div
        className="flex items-center justify-between pt-4 mt-4 relative z-10 border-t"
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
});

/* ── StatsBar ── */
function StatsBar({ reviews, inView }) {
  const total = reviews.length;
  const avg = total
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / total).toFixed(1)
    : '0.0';
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xs md:max-w-xl mx-auto mb-12 md:mb-16">
      <AnimatedStat target={avg}                                         label="Average rating"  delay={0}   inView={inView} />
      <AnimatedStat target={`${total}+`}                                 label="Happy travelers" delay={150} inView={inView} />
      <AnimatedStat target={`${total ? Math.round((fiveStars / total) * 100) : 0}%`} label="5-star reviews"  delay={300} inView={inView} />
    </div>
  );
}

/* ── Slider extra styles ── */
const SLIDER_STYLES = `
  .slider-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  .slider-btn {
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .slider-btn:hover:not(:disabled) {
    background: #3B6D11 !important;
    color: #fff !important;
    transform: scale(1.08);
    box-shadow: 0 8px 24px -6px rgba(59,109,17,0.35);
  }
  .slider-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .dot-pill {
    border-radius: 9999px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
  }
`;

/* ── Main ── */
export default function TestimonialsPage({ reviews = [] }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const [setStatsRef, statsInView] = useInView(0.1);
  const [perPage, setPerPage] = useState(3);
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerPage(w < 640 ? 1 : w < 1024 ? 2 : 3);
      setCurrent(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(safeReviews.length / perPage);

  useEffect(() => {
    const max = Math.max(0, totalPages - 1);
    if (current > max) setCurrent(max);
  }, [perPage, totalPages]);

  const prev = () => setCurrent((p) => Math.max(0, p - 1));
  const next = () => setCurrent((p) => Math.min(totalPages - 1, p + 1));

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  return (
    <main className="min-h-screen" style={{ background: '#faf8f4' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES + SLIDER_STYLES }} />

      {/* ── Hero ── */}
      <section
        className="relative py-20 md:py-28 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#f0faf0 0%,#fefce8 50%,#f0fdf4 100%)' }}
      >
        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 rounded-full pointer-events-none"
          style={{ background: '#bbf7d0', filter: 'blur(80px)', opacity: 0.3, animation: 'floatA 7s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-56 md:w-80 h-56 md:h-80 rounded-full pointer-events-none"
          style={{ background: '#fde68a', filter: 'blur(70px)', opacity: 0.22, animation: 'floatB 9s ease-in-out infinite' }} />
        <div className="relative z-10">
          <span className="badge-pulse inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: '#D1FAE5', color: '#065F46' }}>
            Testimonials
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#1a2e1a', animation: 'fadeUp 0.6s ease both' }}>
            What Our Guests{' '}
            <span className="shimmer-text">Say About Us</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-sm md:max-w-lg mx-auto leading-relaxed"
            style={{ animation: 'fadeUp 0.6s 0.12s ease both' }}>
            Real stories from real travelers who explored Bangladesh with us.
          </p>
        </div>
      </section>

      {/* ── Stats + Slider ── */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {safeReviews.length > 0 && (
            <div ref={setStatsRef}>
              <StatsBar reviews={safeReviews} inView={statsInView} />
            </div>
          )}

          {safeReviews.length === 0 ? (
            <p className="text-center text-gray-400 text-lg py-20">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <>
              {/* Slider viewport */}
              <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
                  {Array.from({ length: totalPages }).map((_, pageIdx) => (
                    <div
                      key={pageIdx}
                      style={{ minWidth: '100%', display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}
                    >
                      {safeReviews
                        .slice(pageIdx * perPage, pageIdx * perPage + perPage)
                        .map((review, i) => (
                          <div key={review.id} style={{ flex: `0 0 calc(${100 / perPage}% - ${((perPage - 1) * 24) / perPage}px)`, minWidth: 0 }}>
                            <ReviewCard
                              review={review}
                              palette={PALETTES[(pageIdx * perPage + i) % PALETTES.length]}
                              delay={i * 100}
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-10 md:mt-12">
                  <button
                    onClick={prev}
                    disabled={current === 0}
                    className="slider-btn w-11 h-11 rounded-full border flex items-center justify-center text-xl font-bold select-none"
                    style={{ background: '#fff', color: '#3B6D11', borderColor: '#b6dfa0' }}
                    aria-label="Previous"
                  >
                    ‹
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="dot-pill"
                        style={{
                          width: i === current ? 28 : 8,
                          height: 8,
                          background: i === current ? '#3B6D11' : '#c6e6b0',
                        }}
                        aria-label={`Page ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    disabled={current === totalPages - 1}
                    className="slider-btn w-11 h-11 rounded-full border flex items-center justify-center text-xl font-bold select-none"
                    style={{ background: '#fff', color: '#3B6D11', borderColor: '#b6dfa0' }}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-gray-400 mt-3">
                {current + 1} / {totalPages}
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}