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
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://i.ibb.co.com/htvtSnx/nature-photographer-29ez-CWt-Mtn-M-unsplash.jpg"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">
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
                { title: 'Bangladesh with Nayeem vs Other Operators',     body: 'All our tours are private by default and fully flexible. We design each experience to be budget-friendly without compromising on quality. Our tour prices cover up to two guests at no additional cost.' },
                { title: 'Foreign Platforms vs Bangladesh with Nayeem',   body: 'Major platforms such as ToursByLocals, Viator, TripAdvisor, Expedia, Booking.com, GetYourGuide, Klook, Airbnb Experiences, and others charge commissions of up to 30%.' },
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