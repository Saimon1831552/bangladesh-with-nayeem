import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLanguage, faHeadset, faFileShield,
  faStar, faTags, faScaleBalanced
} from '@fortawesome/free-solid-svg-icons';

export default function SpeechDraft() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-green-100 rounded-3xl transform rotate-3 -z-10 hidden md:block" />
            {/* ✅ Fix: <img> → <Image> */}
            <div className="relative w-full h-100 md:h-125 lg:h-150 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/dx4o0i6c2/image/upload/f_auto,q_auto/debotakhum-natural-beauty-bangladesh-home-page_zoudty"
                alt="Tourists exploring Bangladesh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            {/* ✅ Fix: Typo "Fait IN" → "Faith In", <p> inside <h2> → <span> */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-8 text-center md:text-left">
              Why Travellers Keep Faith In{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-700 to-green-500">
                NAIM
              </span>
            </h2>

            <ul className="space-y-6 mb-10">
              {[
                { icon: faLanguage,     title: 'Cultural Translator',  body: 'I help bridge the gap, ensuring your high-end expectations align comfortably with local realities.' },
                { icon: faHeadset,      title: 'Always Connected',     body: '24/7 Direct WhatsApp and email support.' },
                { icon: faFileShield,   title: 'Pure Transparency',    body: 'Honest contracts, fair refunds, and Cancellation. What you see is exactly what you get.' },
                { icon: faStar,         title: 'Vetted Luxury',        body: 'I recommend only elite 4★ and 5★ stays that have met my personal standards for comfort and safety.' },
                { icon: faTags,         title: 'Direct Access',        body: 'Skip the agency markups. Save 15%–30% by cutting out agency commissions.' },
              ].map(({ icon, title, body }) => (
                <li key={title} className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                    <FontAwesomeIcon icon={icon} size="lg" />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-gray-700 font-medium">
                      <span className="font-extrabold">{title}:</span> {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              {[
                { title: 'Bangladesh with Naim vs Other Operators',     body: 'All of my trips are private, so you can enjoy the pace that suits you best. I aim to provide excellent service at a fair price, which is why the basic rate covers up to two guests at no extra cost. If you have a larger group, you can add more people for a small fee and still enjoy the unique experience that Naim is known for.' },
                { title: 'Global Travel Platforms vs Bangladesh with Naim',   
                  body: 'Why let a middleman come between you and the real Bangladesh? Many major travel platforms, including ToursByLocals, Viator, TripAdvisor, Expedia, Booking.com, Trip.com, GetYourGuide, TourHQ, Klook, Airbnb Experiences, Tiqets, GoCity, and GoZayaan, charge commissions of up to 30%.  When you book directly with me, you avoid those extra marketplace fees. Your money goes straight into top-quality logistics, domestic flights, and my signature "Naim Standard" service, instead of hidden platform charges. It’s a direct, honest, and trust-based experience.' },
              ].map(({ title, body }) => (
                <div key={title} className="bg-gray-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FontAwesomeIcon icon={faScaleBalanced} className="text-amber-500" size="xl" />
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}