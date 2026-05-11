'use client';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faCompass,
  faHandshake,
  faStar,
  faShield,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';

const reasons = [
  {
    icon: faUserTie,
    title: 'Guide Guarantee',
    body: 'I (Naim) will personally guide your trip. No handovers, no unknown guides — I stay with you and guide your experience myself.',
    accent: 'bg-green-100 text-green-800',
    iconColor: 'text-green-700',
    accentBar: 'bg-green-500',
  },
  {
    icon: faCompass,
    title: 'Authentic Experiences',
    body: 'Experience the true culture, history, cuisine, people, and hidden beauty of Bangladesh beyond traditional tourist paths.',
    accent: 'bg-emerald-100 text-emerald-800',
    iconColor: 'text-emerald-700',
    accentBar: 'bg-emerald-500',
  },
  {
    icon: faHandshake,
    title: 'Honest & Transparent Service',
    body: 'Expect clear communication, fair pricing, and genuine hospitality — never hidden surprises or confusing arrangements.',
    accent: 'bg-teal-100 text-teal-800',
    iconColor: 'text-teal-700',
    accentBar: 'bg-teal-500',
  },
  {
    icon: faStar,
    title: 'Personalized Attention',
    body: 'Travel the way you want. Your comfort, interests, and personal style always come first.',
    accent: 'bg-amber-100 text-amber-800',
    iconColor: 'text-amber-600',
    accentBar: 'bg-amber-400',
  },
  {
    icon: faShield,
    title: 'Safe & Comfortable Travel',
    body: 'Travel with confidence and peace of mind — every detail from transportation to local support is arranged for your comfort.',
    accent: 'bg-green-100 text-green-800',
    iconColor: 'text-green-700',
    accentBar: 'bg-green-500',
  },
  {
    icon: faPhoneVolume,
    title: 'No Middleman',
    body: 'Contact me directly for quick response, flexible plans, and fair local prices without extra commissions.',
    accent: 'bg-emerald-100 text-emerald-800',
    iconColor: 'text-emerald-700',
    accentBar: 'bg-emerald-500',
  },
];

function AnimatedCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      <div className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col gap-5 overflow-hidden cursor-default h-full">
        
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-green-400 opacity-0 group-hover:opacity-10 scale-75 group-hover:scale-110 transition-all duration-500" />

        <div className={`absolute top-0 left-8 right-8 h-[3px] rounded-b-full ${item.accentBar} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.accent} flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
          <FontAwesomeIcon icon={item.icon} className={`text-2xl ${item.iconColor}`} />
        </div>

        {/* Text */}
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors duration-300">
            {item.title}
          </h3>
          {/* <p className="text-gray-500 leading-relaxed text-sm">{item.body}</p> */}
        </div>

      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-green-700 uppercase mb-3 block">
            Why Choose me
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Bangladesh with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500">
              Naim
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Not just a tour — a personal promise. Here&apos;s what makes every journey with Naim different.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <AnimatedCard key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}