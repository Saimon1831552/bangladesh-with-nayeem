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
          <svg width="200" height="67" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" className="h-12 md:h-16 w-auto cursor-pointer">
            <defs>
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@600&display=swap');`}</style>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066"/>
                <stop offset="50%" stopColor="#FFA500"/>
                <stop offset="100%" stopColor="#FF8C00"/>
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000040"/>
              </filter>
            </defs>

            {/* Top decorative line */}
            <line x1="20" y1="20" x2="580" y2="20" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7"/>

            {/* Bangladesh script text */}
            <text x="290" y="115"
              fontFamily="'Dancing Script', 'Brush Script MT', cursive"
              fontSize="90"
              fontWeight="700"
              fill="white"
              textAnchor="middle"
              filter="url(#shadow)">Bangladesh</text>

            {/* Golden clover icon */}
            <g transform="translate(283, 22) scale(0.85)">
              <ellipse cx="0" cy="-9" rx="7" ry="9" fill="#FFD700"/>
              <ellipse cx="9" cy="0" rx="9" ry="7" fill="#FFD700"/>
              <ellipse cx="-9" cy="0" rx="9" ry="7" fill="#FFD700"/>
              <ellipse cx="0" cy="9" rx="7" ry="9" fill="#FFD700"/>
              <circle cx="0" cy="0" r="5" fill="#FF8C00"/>
              <line x1="0" y1="18" x2="0" y2="30" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
            </g>

            {/* WITH NAIM subtitle */}
            <text x="290" y="155"
              fontFamily="'Montserrat', Arial, sans-serif"
              fontSize="21"
              fontWeight="600"
              fill="url(#goldGrad)"
              textAnchor="middle"
              letterSpacing="7">WITH NAIM</text>

            {/* Dot accents */}
            <circle cx="140" cy="149" r="3" fill="#FFD700" opacity="0.9"/>
            <circle cx="128" cy="149" r="1.8" fill="#FFD700" opacity="0.5"/>
            <circle cx="440" cy="149" r="3" fill="#FFD700" opacity="0.9"/>
            <circle cx="452" cy="149" r="1.8" fill="#FFD700" opacity="0.5"/>

            {/* Travel icon - right side */}
            <g transform="translate(480, 82) scale(0.9)">
              <path d="M 5 42 A 30 30 0 0 1 65 42" fill="none" stroke="#FFD700" strokeWidth="2.2" opacity="0.95"/>
              <circle cx="35" cy="42" r="10" fill="#FFD700" opacity="0.9"/>
              <circle cx="22" cy="22" r="4" fill="#FFD700"/>
              <line x1="22" y1="26" x2="22" y2="37" stroke="#FFD700" strokeWidth="2.2"/>
              <line x1="22" y1="30" x2="16" y2="35" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="22" y1="30" x2="28" y2="35" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="22" y1="37" x2="18" y2="44" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="22" y1="37" x2="26" y2="44" stroke="#FFD700" strokeWidth="1.8"/>
              <circle cx="46" cy="22" r="4" fill="#FFD700"/>
              <line x1="46" y1="26" x2="46" y2="37" stroke="#FFD700" strokeWidth="2.2"/>
              <line x1="46" y1="30" x2="40" y2="35" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="46" y1="30" x2="52" y2="35" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="46" y1="37" x2="42" y2="44" stroke="#FFD700" strokeWidth="1.8"/>
              <line x1="46" y1="37" x2="50" y2="44" stroke="#FFD700" strokeWidth="1.8"/>
              <path d="M 0 58 Q 35 53 70 58 L 60 66 Q 35 70 10 66 Z" fill="#FFD700" opacity="0.85"/>
              <line x1="35" y1="44" x2="35" y2="56" stroke="#FFD700" strokeWidth="1.8"/>
              <path d="M 35 45 L 52 56 L 35 56 Z" fill="#FFD700" opacity="0.6"/>
              <path d="M -8 74 Q 10 70 25 74 Q 45 78 60 74 Q 72 70 80 74" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
            </g>

            {/* Bottom decorative line */}
            <line x1="20" y1="182" x2="580" y2="182" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7"/>
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