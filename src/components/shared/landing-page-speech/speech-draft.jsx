import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faLanguage, 
    faHeadset, 
    faFileShield, 
    faStar, 
    faTags,
    faScaleBalanced
} from '@fortawesome/free-solid-svg-icons';

export default function SpeechDraft() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                <div className="relative order-2 lg:order-1">
                    <div className="absolute -inset-4 bg-green-100 rounded-3xl transform rotate-3 -z-10 hidden md:block"></div>
                    <img 
                        
                        src="https://i.ibb.co.com/htvtSnx/nature-photographer-29ez-CWt-Mtn-M-unsplash.jpg" 
                        alt="Tourists exploring Bangladesh" 
                        className="rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    />
                </div>

                <div className="order-1 lg:order-2">
                    <h2 className="text-3xl md:text-4xl lg:text-[28px] font-extrabold text-gray-900 leading-tight mb-8 text-center md:text-left">
                        Why Travellers Keep Fait IN<p className='text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500'>NAIM</p>
                    </h2>

                    {/* Features List */}
                    <ul className="space-y-6 mb-10">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                                <FontAwesomeIcon icon={faLanguage} size="lg" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg text-gray-700 font-medium"><span className='font-extrabold'>Cultural Translator:</span> I help bridge the gap, ensuring your high-end expectations align comfortably with local realities.</p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                                <FontAwesomeIcon icon={faHeadset} size="lg" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg text-gray-700 font-medium"><span className='font-extrabold'>Always Connected:</span> 24/7 Direct WhatsApp and email support.</p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                                <FontAwesomeIcon icon={faFileShield} size="lg" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg text-gray-700 font-medium"><span className='font-extrabold'>Pure Transparency:</span> Honest contracts, fair refunds, and Cancellation. What you see is exactly what you get.</p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                                <FontAwesomeIcon icon={faStar} size="lg" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg text-gray-700 font-medium"><span className='font-extrabold'>Vetted Luxury:</span> I recommend only elite 4* and 5* stays that have met my personal standards for comfort and safety.</p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mt-1">
                                <FontAwesomeIcon icon={faTags} size="lg" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg text-gray-700 font-medium"><span className='font-extrabold'>Direct Access:</span> Skip the agency markups And, Save 15%–30% by cutting out agency commissions.</p>
                            </div>
                        </li>
                    </ul>

                    
                    <div className="bg-gray-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <FontAwesomeIcon icon={faScaleBalanced} className="text-amber-500" size="xl" />
                            <h3 className="text-xl font-bold text-gray-900">Bangladesh with Nayeem vs Other Operators</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            All our tours are private by default and fully flexible. We design each experience to be budget-friendly without compromising on quality. Our tour prices cover up to two guests at no additional cost. More guests can be added for a minimal fee.
                        </p>
                    </div>

                    <div className="bg-gray-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <FontAwesomeIcon icon={faScaleBalanced} className="text-amber-500" size="xl" />
                            <h3 className="text-xl font-bold text-gray-900">Foreign Platforms vs Bangladesh with Nayeem</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Major platforms such as ToursByLocals, Viator, TripAdvisor, Expedia, Booking.com, Trip.com, GetYourGuide, TourHQ, Klook, Airbnb Experiences, Tiqets, GoCity, GoZayaan, etc. charge commissions of up to 30%
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}