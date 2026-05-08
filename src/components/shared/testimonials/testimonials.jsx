
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteRight, faThumbsUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={star <= rating ? faStar : faStarEmpty}
          className="text-amber-400 text-sm"
        />
      ))}
    </div>
  );
}

function Avatar({ initials, color_hex, bg_hex }) {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold shadow-md border-4 border-white"
      style={{ backgroundColor: bg_hex, color: color_hex }}
    >
      {initials}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative border border-gray-100 flex flex-col h-full">
      {/* Background quote icon */}
      <FontAwesomeIcon
        icon={faQuoteRight}
        className="absolute top-6 right-8 text-gray-100 text-6xl rotate-12 z-0"
      />

      {/* Header: avatar + name */}
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <Avatar
          initials={review.initials}
          color_hex={review.color_hex}
          bg_hex={review.bg_hex}
        />
        <div>
          <h4 className="font-bold text-gray-900 text-lg leading-tight">{review.name}</h4>
          <p className="text-sm text-gray-500 font-medium">{review.country}</p>
          <p className="text-xs text-gray-400 mt-0.5">{review.review_date}</p>
        </div>
      </div>

      {/* Stars + tour name */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <StarRating rating={review.rating} />
        {review.tour_name && (
          <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full border border-green-100">
            {review.tour_name}
          </span>
        )}
      </div>

      {/* Title */}
      {review.title && (
        <h5 className="font-bold text-gray-800 mb-2 relative z-10">{review.title}</h5>
      )}

      {/* Body */}
      <p className="text-gray-600 leading-relaxed italic flex-grow relative z-10">
        "{review.body?.trim()}"
      </p>

      {/* Footer: verified + helpful votes */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-5 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold">
          {review.is_verified === 1 && (
            <>
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
              Verified Traveler
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{review.helpful_votes} found this helpful</span>
        </div>
      </div>
    </div>
  );
}

function StatsBar({ reviews }) {
  const total = reviews.length;
  const avg = total
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / total).toFixed(1)
    : '0.0';
  const fiveStars = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16 text-center">
      <div>
        <p className="text-4xl font-extrabold text-green-700">{avg}</p>
        <p className="text-sm text-gray-500 mt-1">Average Rating</p>
      </div>
      <div>
        <p className="text-4xl font-extrabold text-green-700">{total}+</p>
        <p className="text-sm text-gray-500 mt-1">Happy Travelers</p>
      </div>
      <div>
        <p className="text-4xl font-extrabold text-green-700">
          {total ? Math.round((fiveStars / total) * 100) : 0}%
        </p>
        <p className="text-sm text-gray-500 mt-1">5-Star Reviews</p>
      </div>
    </div>
  );
}

export default function TestimonialsPage({ reviews = [] }) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  return (
    <main className="min-h-screen bg-green-50/50">

      {/* ── Hero ── */}
      <section className="bg-green-800 text-white py-24 px-4 text-center">
        <span className="text-sm font-bold tracking-widest text-green-300 uppercase mb-3 block">
          Testimonials
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          What Our Guests Say
        </h1>
        <p className="text-lg text-green-100 max-w-xl mx-auto leading-relaxed">
          Real stories from real travelers who explored Bangladesh with us.
        </p>
      </section>

      {/* ── Stats + Grid ── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {safeReviews.length > 0 && <StatsBar reviews={safeReviews} />}

          {safeReviews.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {safeReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}