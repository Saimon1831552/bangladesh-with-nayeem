import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function GuideProfile() {
  return (
    <div className='bg-[#fdfbf7] py-10'>
         <div className="w-full max-w-5xl mx-auto my-10 bg-[#fdfbf7] p-8 md:p-12 shadow-sm border border-stone-200 rounded-sm">
      
                   <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                     
                     <div className="bg-white p-3 shadow-md transform -rotate-3 w-64 shrink-0 border border-stone-100 transition-transform hover:rotate-0 duration-300">
                       <img 
                         src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" 
                         alt="Naim - Local Guide" 
                         className="w-full h-auto object-cover aspect-square"
                       />
                     </div>
             
                     
                     <div className="flex-1 space-y-4 text-center md:text-left mt-4 md:mt-0">
                       <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-wide font-serif">
                         Hi, I'm Naim!
                       </h2>
                       <p className="text-stone-700 leading-relaxed text-lg">
                         I'm a local guide with a passion for showing you the real Bangladesh. 
                         From historic sites to rural villages, I share the culture, heritage and stories of my homeland.
                       </p>
                       <p className="italic text-stone-600 font-medium text-lg pt-2">
                         Let me take you on an unforgettable journey!
                       </p>
                     </div>
                     </div>
                
                     {/* Horizontal Divider */}
                     <hr className="border-t border-stone-300 my-8" />
                
                     {/* Bottom Features Bar */}
                     <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 text-stone-700 font-medium text-sm md:text-base">
                       
                       <div className="flex items-center gap-3">
                         <FontAwesomeIcon icon={faUser} className="text-amber-700 text-lg" />
                         <span>2+ Years Experience</span>
                       </div>
                       
                       {/* Little dot divider visible only on desktop */}
                       <div className="hidden md:block w-1 h-1 rounded-full bg-stone-300"></div>
                
                       <div className="flex items-center gap-3">
                         <FontAwesomeIcon icon={faHeart} className="text-amber-700 text-lg" />
                         <span>Cultural & Heritage Tours</span>
                       </div>
                
                       <div className="hidden md:block w-1 h-1 rounded-full bg-stone-300"></div>
                
                       <div className="flex items-center gap-3">
                         <FontAwesomeIcon icon={faCheckCircle} className="text-amber-700 text-lg" />
                         <span>Personalized Adventures</span>
                       </div>
                       
                     </div>
                   </div>
    </div>
  )
}
