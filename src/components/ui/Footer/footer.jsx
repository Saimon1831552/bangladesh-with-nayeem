"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faYoutube, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faLocationDot, 
  faEnvelope, 
  faPhone,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-gray-300 pt-20 pb-10 relative overflow-hidden">
      
      {/* Decorative Top Border (Matches your Amber theme) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-green-500 to-amber-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Bangladesh with <span className="text-amber-500">Nayeem</span>
              </h3>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner for private, authentic, and unforgettable journeys through the hidden gems of the delta. Experience true hospitality.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/tours" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Our Tours
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Guest Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faLocationDot} className="text-amber-500 mt-1" />
                <span className="text-sm">Dhaka, Bangladesh<br/>(Available for nationwide tours)</span>
              </li>
              <li className="flex items-center gap-4">
                <FontAwesomeIcon icon={faWhatsapp} className="text-amber-500 text-lg" />
                <a href="https://wa.me/8801783377429" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  +880 1783 377429
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-amber-500" />
                <a href="mailto:info@bangladeshwithnayeem.com" className="text-sm hover:text-white transition-colors">
                  info@bangladeshwithnayeem.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest travel updates, hidden gem reveals, and exclusive offers.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-gray-500"
                required
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-400 text-green-950 w-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {currentYear} Bangladesh with Nayeem. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}