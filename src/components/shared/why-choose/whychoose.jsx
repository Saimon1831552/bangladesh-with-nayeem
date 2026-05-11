// ─── components/WhyChoose.jsx ─────────────────────────────────────────────────

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
  },
  {
    icon: faCompass,
    title: 'Authentic Experiences',
    body: 'Experience the true culture, history, cuisine, people, and hidden beauty of Bangladesh beyond traditional tourist paths.',
    accent: 'bg-emerald-100 text-emerald-800',
    iconColor: 'text-emerald-700',
  },
  {
    icon: faHandshake,
    title: 'Honest & Transparent Service',
    body: 'Expect clear communication, fair pricing, and genuine hospitality — never hidden surprises or confusing arrangements.',
    accent: 'bg-teal-100 text-teal-800',
    iconColor: 'text-teal-700',
  },
  {
    icon: faStar,
    title: 'Personalized Attention',
    body: 'Travel the way you want. Your comfort, interests, and personal style always come first.',
    accent: 'bg-amber-100 text-amber-800',
    iconColor: 'text-amber-600',
  },
  {
    icon: faShield,
    title: 'Safe & Comfortable Travel',
    body: 'Travel with confidence and peace of mind — every detail from transportation to local support is arranged for your comfort.',
    accent: 'bg-green-100 text-green-800',
    iconColor: 'text-green-700',
  },
  {
    icon: faPhoneVolume,
    title: 'No Middleman',
    body: 'Contact me directly for quick response, flexible plans, and fair local prices without extra commissions.',
    accent: 'bg-emerald-100 text-emerald-800',
    iconColor: 'text-emerald-700',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-widest text-green-700 uppercase mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Bangladesh with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500">
              Naim
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Not just a tour — a personal promise. Here's what makes every journey with Naim different.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-5 overflow-hidden"
            >
              {/* Subtle background blob */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-10 bg-green-400 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.accent} flex-shrink-0`}>
                <FontAwesomeIcon icon={item.icon} className={`text-2xl ${item.iconColor}`} />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}