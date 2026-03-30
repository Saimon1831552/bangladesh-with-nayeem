"use client"; // Required if using Next.js App Router
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'; // Import hamburger and close icons

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='sticky top-0 z-50 bg-green-800/70 backdrop-blur-md border-b border-white/10'>
      <div className='flex flex-row justify-between items-center px-4 md:px-10 py-3'>
        
        {/* Logo - Slightly smaller on mobile */}
        <img className='h-8 md:h-10 rounded-lg' src="https://i.ibb.co.com/4wMWwjGV/Bangladesh-With-Naim-Logo.png" alt="Bangladesh with Naim" />

        {/* Desktop Navigation (Hidden on Mobile/Tablet) */}
        <nav className='hidden md:block'>
          <ul className='flex flex-row justify-center gap-6 items-center list-none m-0 p-0'>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/">Home</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/tours">Tours</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/blogs">Blogs</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/review">Review</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Desktop WhatsApp CTA (Hidden on Mobile/Tablet) */}
        <div className='hidden md:flex flex-row gap-3.5 items-center bg-green-600 hover:bg-green-500 px-5 py-2 rounded-full transition-all cursor-pointer'>
          <a 
            href="https://wa.me/8801783377429" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          > 
            <FontAwesomeIcon icon={faWhatsapp} size="xl" style={{color: "rgb(6, 255, 6)"}} />
            <span className='text-white font-semibold ml-2'>Whatsapp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button (Hidden on Laptop) */}
        <button 
          className="md:hidden text-white focus:outline-none p-2" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="xl" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-green-900/95 backdrop-blur-md border-b border-white/10 px-4 py-6 shadow-xl transition-all duration-300">
          <nav>
            <ul className='flex flex-col items-center gap-6 list-none m-0 p-0'>
              <li className='font-bold text-white hover:text-green-400 transition-colors text-lg'><Link href="/" onClick={toggleMenu}>Home</Link></li>
              <li className='font-bold text-white hover:text-green-400 transition-colors text-lg'><Link href="/tours" onClick={toggleMenu}>Tours</Link></li>
              <li className='font-bold text-white hover:text-green-400 transition-colors text-lg'><Link href="/blogs" onClick={toggleMenu}>Blogs</Link></li>
              <li className='font-bold text-white hover:text-green-400 transition-colors text-lg'><Link href="/review" onClick={toggleMenu}>Review</Link></li>
              <li className='font-bold text-white hover:text-green-400 transition-colors text-lg'><Link href="/contact" onClick={toggleMenu}>Contact Us</Link></li>
            </ul>
          </nav>

          {/* Mobile WhatsApp CTA */}
          <div className='flex justify-center mt-8'>
            <a 
              href="https://wa.me/8801783377429" 
              target="_blank" 
              rel="noopener noreferrer"
              className='flex flex-row gap-3.5 items-center bg-green-600 hover:bg-green-500 px-8 py-3 rounded-full transition-all shadow-lg'
            > 
              <FontAwesomeIcon icon={faWhatsapp} size="xl" style={{color: "rgb(6, 255, 6)"}} />
              <span className='text-white font-semibold text-lg ml-2'>Whatsapp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}