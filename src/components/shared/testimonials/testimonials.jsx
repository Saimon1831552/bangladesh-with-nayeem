import React from 'react';
import Link from 'next/link'; // Assuming you are using Next.js based on your Navbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Testimonials() {
  // Sample review data - replace with your actual client reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      country: "United Kingdom",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "Nayeem made our trip absolutely unforgettable. His knowledge of the local culture and hidden spots was incredible. The attention to detail and 24/7 support made us feel completely safe and relaxed. Highly recommend the Sundarbans tour!",
      rating: 5,
    },
    {
      id: 2,
      name: "David & Emma",
      country: "Australia",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop",
      text: "We were initially hesitant about booking a private tour, but 'Bangladesh with Nayeem' exceeded all our Western expectations. The 5-star accommodations were spot on, and we saved so much compared to booking through a massive agency.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      country: "Singapore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "A truly authentic experience. We didn't just see Bangladesh; we felt it. The itinerary was perfectly balanced between sightseeing and actual cultural immersion. The transport was always punctual and comfortable.",
      rating: 5,
    }
  ];

  return (
    <section className="py-20 bg-green-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-green-700 uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            What Our Guests <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500">
               Say About Us
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Don't just take our word for it. Read the experiences of travelers from around the globe who chose to explore Bangladesh with us.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 pt-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative border border-gray-100 flex flex-col h-full mt-8 lg:mt-0"
            >
              {/* Large decorative quote icon in the background */}
              <FontAwesomeIcon 
                icon={faQuoteRight} 
                className="absolute top-6 right-8 text-gray-100 text-6xl rotate-12 z-0" 
              />

              {/* Overlapping Avatar Profile */}
              <div className="absolute -top-10 left-8">
                <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Card Content - pushed down to make room for avatar */}
              <div className="pt-10 flex-grow relative z-10">
                {/* Star Ratings */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-sm" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Info at the bottom */}
              <div className="border-t border-gray-100 pt-4 mt-auto relative z-10">
                <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                <p className="text-sm text-gray-500 font-medium">{review.country}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button - Show All Reviews */}
        <div className="mt-16 flex justify-center">
          {/* I noticed you had a '/review' link in your Navbar, so I linked this to that page */}
          <Link href="/review">
            <button className="group flex items-center justify-center gap-3 bg-white border-2 border-green-700 text-green-800 hover:bg-green-700 hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg">
              Read all {reviews.length}+ reviews
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}