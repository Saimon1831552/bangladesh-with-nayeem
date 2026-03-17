import React from 'react';
import Link from 'next/link';

// We store the tour data in an array to make the code clean and easy to manage.
// In the future, this data will come from your Node.js/MongoDB backend!
const toursData = [
  {
    id: 1,
    title: "Sonargaon Heritage Tour",
    description: "Explore the ancient capital of Bengal",
    // Replace with your actual image URLs
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80", 
    bannerClass: "bg-[#4a3b32]", // Dark brown
    btnClass: "bg-[#5b7a46] hover:bg-[#4a6339]", // Olive green
  },
  {
    id: 2,
    title: "Panam Nagar Walking Tour",
    description: "Discover the lost city of Panam",
    image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=600&q=80",
    bannerClass: "bg-[#54433a]", // Lighter brown
    btnClass: "bg-[#5b7a46] hover:bg-[#4a6339]",
  },
  {
    id: 3,
    title: "Sundarbans Wildlife Adventure",
    description: "Safari in the mangrove forest",
    image: "https://images.unsplash.com/photo-1544258804-97217a4216ee?auto=format&fit=crop&w=600&q=80",
    bannerClass: "bg-[#3e5238]", // Forest green
    btnClass: "bg-[#5b7a46] hover:bg-[#4a6339]",
  },
  {
    id: 4,
    title: "Old Dhaka Street & Food Tour",
    description: "Taste the Flavors of Old Dhaka",
    image: "https://images.unsplash.com/photo-1596894043941-8eb13c4731a5?auto=format&fit=crop&w=600&q=80",
    bannerClass: "bg-[#9c4535]", // Rust red
    btnClass: "bg-[#c26d36] hover:bg-[#a65929]", // Orange
  }
];

export default function FeaturedTours() {
  return (
    <div className="bg-[#fdfbf7] py-16 px-4 font-serif">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with lines on the sides */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-stone-300 w-16 md:w-32"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mx-6 tracking-wide">
            Featured Tours
          </h2>
          <div className="h-px bg-stone-300 w-16 md:w-32"></div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {toursData.map((tour) => (
            <div 
              key={tour.id} 
              className="bg-white p-3 shadow-md border border-stone-200 group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-sm flex flex-col"
            >
              {/* Image Container with Zoom effect */}
              <div className="overflow-hidden relative aspect-[4/3]">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Colored Title Banner */}
              <div className={`${tour.bannerClass} text-white text-center py-2 px-1`}>
                <h3 className="font-semibold text-sm md:text-base tracking-wide line-clamp-1">
                  {tour.title}
                </h3>
              </div>

              {/* Description & Button */}
              <div className="bg-[#fdfbf7] border border-t-0 border-stone-200 p-4 flex flex-col items-center flex-grow justify-between">
                <p className="text-stone-600 text-sm text-center mb-4 line-clamp-2 font-sans">
                  {tour.description}
                </p>
                
                <Link href={`/tours/${tour.id}`}>
                  <button className={`${tour.btnClass} text-white text-xs font-sans font-semibold py-2 px-6 rounded-sm shadow-sm transition-colors duration-300`}>
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}