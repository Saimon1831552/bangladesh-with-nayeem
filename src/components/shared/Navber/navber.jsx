"use client"; 
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='sticky top-0 z-50 bg-green-800/70 backdrop-blur-md border-b border-white/10'>
      <div className='flex flex-row justify-between items-center px-4 md:px-10 py-3'>
        
        {/* Inline SVG Logo */}
        <Link href="/">
          <svg width="200" height="67" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" className="h-14 md:h-16 w-auto">
              <defs>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@800&display=swap');`}</style>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE066"/>
                  <stop offset="50%" stopColor="#FFA500"/>
                  <stop offset="100%" stopColor="#FF8C00"/>
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000040"/>
                </filter>
              </defs>
            
              <line x1="20" y1="18" x2="580" y2="18" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7"/>
            
              {/* Bangladesh - bigger & bolder */}
              <text x="300" y="122"
                fontFamily="'Dancing Script', cursive"
                fontSize="115"
                fontWeight="700"
                fill="white"
                textAnchor="middle"
                filter="url(#shadow)">Bangladesh</text>
            
              {/* Golden clover */}
              <g transform="translate(290, 20) scale(1)">
                <ellipse cx="0" cy="-10" rx="8" ry="10" fill="#FFD700"/>
                <ellipse cx="10" cy="0" rx="10" ry="8" fill="#FFD700"/>
                <ellipse cx="-10" cy="0" rx="10" ry="8" fill="#FFD700"/>
                <ellipse cx="0" cy="10" rx="8" ry="10" fill="#FFD700"/>
                <circle cx="0" cy="0" r="6" fill="#FF8C00"/>
                <line x1="0" y1="20" x2="0" y2="33" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
              </g>
            
              {/* WITH NAIM - bigger & heavier weight */}
              <text x="300" y="168"
                fontFamily="'Montserrat', Arial, sans-serif"
                fontSize="26"
                fontWeight="800"
                fill="url(#goldGrad)"
                textAnchor="middle"
                letterSpacing="8">WITH NAIM</text>
            
              {/* Dot accents */}
              <circle cx="128" cy="162" r="3.5" fill="#FFD700" opacity="0.9"/>
              <circle cx="114" cy="162" r="2" fill="#FFD700" opacity="0.5"/>
              <circle cx="472" cy="162" r="3.5" fill="#FFD700" opacity="0.9"/>
              <circle cx="486" cy="162" r="2" fill="#FFD700" opacity="0.5"/>
            
              <line x1="20" y1="188" x2="580" y2="188" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7"/>
            </svg>
        </Link>

        <nav className='hidden md:block'>
          <ul className='flex flex-row justify-center gap-6 items-center list-none m-0 p-0'>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/">Home</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/tours">Tours</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/blogs">Blogs</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/review">Review</Link></li>
            <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

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

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white focus:outline-none p-2" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="xl" />
        </button>
      </div>

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