'use client';

import { useRef, useState } from 'react';
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

/* ── palette ── */
const AVATAR_PALETTES = [
  { bg: '#DBEAFE', color: '#1E40AF' }, // soft blue
  { bg: '#D1FAE5', color: '#065F46' }, // soft green
  { bg: '#FEF3C7', color: '#92400E' }, // soft amber
  { bg: '#FCE7F3', color: '#9D174D' }, // soft pink
  { bg: '#EDE9FE', color: '#5B21B6' }, // soft violet
  { bg: '#FFEDD5', color: '#9A3412' }, // soft orange
];

/* ── helpers ── */
function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FontAwesomeIcon
          key={s}
          icon={s <= rating ? faStar : faStarEmpty}
          className="text-amber-400"
          style={{ fontSize: 13 }}
        />
      ))}
    </div>
  );
}

function Avatar({ initials, palette }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold flex-shrink-0"
      style={{ backgroundColor: palette.bg, color: palette.color }}
    >
      {initials}
    </div>
  );
}

/* ── single card ── */
function ReviewCard({ review, palette }) {
  return (
    <div
      className="relative flex flex-col h-full rounded-3xl p-7 border"
      style={{
        background: '#fdfcfb',
        borderColor: '#e8e4dc',
        minWidth: 'calc(33.333% - 11px)',
        marginRight: '16px',
      }}
    >
      {/* decorative quote */}
      <div
        className="absolute top-5 right-6 text-5xl leading-none select-none"
        style={{ color: palette.bg, fontFamily: 'Georgia, serif' }}
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
        <StarRating rating={review.rating} />
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
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{review.helpful_votes} helpful</span>
        </div>
      </div>
    </div>
  );
}

/* ── stats bar ── */
function StatsBar({ reviews }) {
  const total = reviews.length;
  const avg = total
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / total).toFixed(1)
    : '0.0';
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  const stats = [
    { value: avg, label: 'Average rating' },
    { value: `${total}+`, label: 'Happy travelers' },
    { value: `${total ? Math.round((fiveStars / total) * 100) : 0}%`, label: '5-star reviews' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-14 text-center">
      {stats.map(({ value, label }) => (
        <div key={label}>
          <p className="text-4xl font-extrabold" style={{ color: '#3B6D11' }}>{value}</p>
          <p className="text-sm text-gray-400 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── main export ── */
const VISIBLE = 3;

export default function TestimonialsPage({ reviews = [] }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const maxIndex = Math.max(0, safeReviews.length - VISIBLE);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const goTo = (idx) => {
    const next = Math.max(0, Math.min(idx, maxIndex));
    setCurrent(next);
    if (trackRef.current?.firstChild) {
      const w = trackRef.current.firstChild.getBoundingClientRect().width + 16;
      trackRef.current.style.transform = `translateX(-${next * w}px)`;
    }
  };

  const showControls = safeReviews.length > VISIBLE;

  return (
    <main className="min-h-screen" style={{ background: '#faf8f4' }}>

      {/* ── Hero ── */}
      <section
        className="relative py-24 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0faf0 0%, #fefce8 50%, #f0fdf4 100%)' }}
      >
        {/* soft decorative blobs */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 pointer-events-none"
          style={{ background: '#bbf7d0', filter: 'blur(80px)', transform: 'translate(-40%, -40%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: '#fde68a', filter: 'blur(70px)', transform: 'translate(40%, 40%)' }}
        />

        <div className="relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: '#D1FAE5', color: '#065F46' }}
          >
            Testimonials
          </span>
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#1a2e1a' }}
          >
            What Our Guests{' '}
            <span
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #16a34a, #ca8a04)',
                backgroundClip: 'text',
              }}
            >
              Say
            </span>
          </h1>
          <p className="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            Real stories from real travelers who explored Bangladesh with us.
          </p>
        </div>
      </section>

      {/* ── Stats + Slider ── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {safeReviews.length > 0 && <StatsBar reviews={safeReviews} />}

          {safeReviews.length === 0 ? (
            <p className="text-center text-gray-400 text-lg py-20">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <>
              {/* slider */}
              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex"
                  style={{ transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' }}
                >
                  {safeReviews.map((review, i) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      palette={AVATAR_PALETTES[i % AVATAR_PALETTES.length]}
                    />
                  ))}
                </div>
              </div>

              {/* controls */}
              {showControls && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    aria-label="Previous"
                    className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      borderColor: '#c6e4a8',
                      background: '#fff',
                      color: '#3B6D11',
                    }}
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
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: i === current ? 24 : 8,
                          background: i === current ? '#3B6D11' : '#c6e4a8',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goTo(current + 1)}
                    disabled={current >= maxIndex}
                    aria-label="Next"
                    className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      borderColor: '#c6e4a8',
                      background: '#fff',
                      color: '#3B6D11',
                    }}
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