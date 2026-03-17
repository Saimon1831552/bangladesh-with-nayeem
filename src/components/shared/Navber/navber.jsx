import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Navber() {
  return (
    <div>
        <div className='flex flex-row justify-between items-center px-10 py-3 bg-green-800/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/10'>
            
            <img className='h-10 rounded-lg' src="https://i.ibb.co.com/4wMWwjGV/Bangladesh-With-Naim-Logo.png" alt="Bangladesh with Naim" />

            {/* Added a <ul> wrapper for semantic HTML */}
            <nav>
                <ul className='flex flex-row justify-center gap-6 items-center list-none m-0 p-0'>
                    <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/">Home</Link></li>
                    <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/tours">Tours</Link></li>
                    <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/blogs">Blogs</Link></li>
                    <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/review">Review</Link></li>
                    <li className='font-bold text-white hover:text-green-400 transition-colors'><Link href="/contact">Contact Us</Link></li>
                </ul>
            </nav>

            <div className='flex flex-row gap-3.5 items-center bg-green-600 hover:bg-green-500 px-5 py-2 rounded-full transition-all cursor-pointer'>
                <span><FontAwesomeIcon icon={faWhatsapp} size="2xl" style={{color: "rgb(6, 255, 6)"}} /></span>
                <a 
                href="https://wa.me/8801783377429" 
                target="_blank" 
                rel="noopener noreferrer"
                
            > 
                <span className='text-white font-semibold ml-2'>Whatsapp</span>
            </a>
            </div>
            
        </div>
    </div>
  )
}