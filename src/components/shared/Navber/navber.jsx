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
    <div className='sticky top-0 z-50 backdrop-blur-md border-b border-[#6fcf47]/20' style={{ background: '#0d1f0d' }}>
      <div className='flex flex-row justify-between items-center px-7 md:px-10 py-3'>
        
        {/* Logo */}
        <Link href="/">
          <div className=' overflow-hidden'>
            <img
              src='https://res.cloudinary.com/dx4o0i6c2/image/upload/f_auto,q_auto/bangladesh-with-naim-logo_o5c6z1'
              className='h-14 rounded-sm'
              alt="Bangladesh with Naim"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:block'>
          <ul className='flex flex-row justify-center gap-6 items-center list-none m-0 p-0'>
            {['/', '/tours', '/blogs', '/review', '/contact'].map((href, i) => (
              <li key={href}>
                <Link
                  href={href}
                  className='font-bold transition-colors duration-200'
                  style={{ color: '#a8d880' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#6fcf47'}
                  onMouseLeave={e => e.currentTarget.style.color = '#a8d880'}
                >
                  {['Home', 'Tours', 'Blogs', 'Review', 'Contact'][i]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* WhatsApp Button — Desktop */}
        <div className='hidden md:flex'>
          <a
            href="https://wa.me/8801602717233"
            target="_blank"
            rel="noopener noreferrer"
            className='flex flex-row gap-2.5 items-center px-5 py-2 rounded-full font-semibold transition-all duration-200 border'
            style={{
              borderColor: '#6fcf47',
              color: '#6fcf47',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#6fcf47';
              e.currentTarget.style.color = '#0d1f0d';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6fcf47';
            }}
          >
            <FontAwesomeIcon icon={faWhatsapp} size="xl" style={{ color: 'inherit' }} />
            <span>Whatsapp</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none p-2"
          style={{ color: '#a8d880' }}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full backdrop-blur-md border-b px-4 py-6 shadow-xl"
          style={{ background: '#0a180a', borderColor: '#6fcf47/20' }}
        >
          <nav>
            <ul className='flex flex-col items-center gap-6 list-none m-0 p-0'>
              {['/', '/tours', '/blogs', '/review', '/contact'].map((href, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={toggleMenu}
                    className='font-bold text-lg transition-colors duration-200'
                    style={{ color: '#a8d880' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#6fcf47'}
                    onMouseLeave={e => e.currentTarget.style.color = '#a8d880'}
                  >
                    {['Home', 'Tours', 'Blogs', 'Review', 'Contact Us'][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='flex justify-center mt-8'>
            <a
              href="https://wa.me/8801602717233"
              target="_blank"
              rel="noopener noreferrer"
              className='flex flex-row gap-3 items-center px-8 py-3 rounded-full font-semibold text-lg border transition-all duration-200'
              style={{ borderColor: '#6fcf47', color: '#6fcf47', background: 'transparent' }}
            >
              <FontAwesomeIcon icon={faWhatsapp} size="xl" style={{ color: '#6fcf47' }} />
              <span>Whatsapp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}