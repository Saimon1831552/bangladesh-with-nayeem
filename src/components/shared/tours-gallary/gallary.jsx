"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark, faExpand } from '@fortawesome/free-solid-svg-icons';

export default function Gallery() {
  // Array of placeholder images with varying aspect ratios to show off the masonry effect
  const images = [
    "https://images.unsplash.com/photo-1587222318667-31212ce2828d?q=80&w=800&auto=format&fit=crop", 
    "https://i.ibb.co.com/V08Hr3cP/0e6e0e79-db11-4a30-9292-a201d3995d4c.jpg", // Portrait
    "https://i.ibb.co.com/0jhY9sWZ/Whats-App-Image-2026-03-29-at-9-35-28-PM.jpg", 
    "https://i.ibb.co.com/BVKwKB7H/Whats-App-Image-2026-03-29-at-9-35-29-PM-1.jpg", // Tall Portrait
    "https://i.ibb.co.com/JYcT3J5/Whats-App-Image-2026-03-29-at-9-35-29-PM.jpg", 
    "https://i.ibb.co.com/mrfDMSzs/Whats-App-Image-2026-03-29-at-9-35-30-PM.jpg",
    "https://i.ibb.co.com/Rtr7wd0/Whats-App-Image-2026-03-29-at-9-35-31-PM.jpg"
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  const nextImage = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="bg-slate-50 py-20 relative overflow-hidden border-t border-gray-200">
      
      {/* Decorative Ambient Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Polished Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-green-700 uppercase mb-3 block">
            Tourist Gallery
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Shared Memories in <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500">
               Beautiful Bangladesh
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            If you’re looking for one of the best holiday experiences of your life, we’re excited to make it happen—filled with fun, authenticity, and ease.
          </p>
          <p className="font-bold text-gray-900 text-xl">
            Private Tours. <span className="text-green-700">Fair Prices.</span> Real Experiences.
          </p>
        </div>

        {/* Beautiful Masonry Layout using Tailwind CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={src} 
                alt={`Tourist shared memory ${index + 1}`} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              
              {/* Premium Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Expand Icon Animation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white shadow-lg border border-white/30">
                  <FontAwesomeIcon icon={faExpand} size="lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Call to Action Button */}
        <div className="mt-16 flex justify-center">
            <button className="bg-gray-900 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-colors shadow-lg hover:shadow-green-700/30">
                Follow us on Instagram
            </button>
        </div>
      </div>

      {/* Lightbox / Slider Modal - Glassmorphism UI */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center transition-opacity duration-300"
          onClick={closeLightbox}
        >
          {/* Top Bar Navigation */}
          <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
            <div className="text-white/70 font-medium tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
            <button 
              className="text-white hover:text-green-400 transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
              onClick={closeLightbox}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 md:left-8 text-white hover:text-green-400 transition-colors bg-white/5 hover:bg-white/20 p-5 rounded-full backdrop-blur-md z-50"
            onClick={prevImage}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          </button>

          {/* Main Focused Image */}
          <div className="relative w-full max-w-6xl max-h-[90vh] px-16 flex justify-center items-center">
            <img 
              src={images[currentIndex]} 
              alt={`Fullscreen view ${currentIndex + 1}`} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          <button 
            className="absolute right-4 md:right-8 text-white hover:text-green-400 transition-colors bg-white/5 hover:bg-white/20 p-5 rounded-full backdrop-blur-md z-50"
            onClick={nextImage}
          >
            <FontAwesomeIcon icon={faChevronRight} size="xl" />
          </button>
        </div>
      )}
    </section>
  );
}