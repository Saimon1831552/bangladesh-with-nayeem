import React from 'react'
import Link from 'next/link'

export default function AboutNaim() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-12 text-center">
          <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Meet Your Guide</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 leading-tight">
            More Than a Guide:
          </h1>
          <h2 className="text-2xl md:text-4xl font-extrabold text-amber-500 mt-1">
            Your Private Fixer in the Delta.
          </h2>
        </div>

        {/* Story */}
        <div className="mb-12 bg-green-50 border border-green-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-green-900 mb-4">The Story</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            Growing up in the heart of Bangladesh, I didn't just learn about our history from books — I lived it in the vibrant chaos of Dhaka's streets, villages, and the whispers of our ancient rivers.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            My journey into professional guiding began with a simple realization: many travelers come to Bangladesh and only see the surface. They see the traffic, but they miss the soul. They see the monuments, but they don't hear the stories.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-semibold text-green-800">
            I founded <strong>Bangladesh with Naim</strong> to change that.
          </p>
        </div>

        {/* Why Me */}
        <div className="mb-12">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Boutique Journeys. Personally Led.</h3>
          <div className="w-16 h-1 bg-amber-400 rounded mb-6"></div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            I made a conscious choice to keep my operation small. I am not a big agency with a hundred rotating staff. When you book a tour here, you get <strong>me</strong>.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            From the moment you land at the airport until the moment we say goodbye, I am your navigator, your translator, and your local expert. Whether we are navigating the intricate terracotta of <strong>Kantajew Temple</strong> or sharing a meal with a family in the village, I ensure your experience is safe, seamless, and deeply authentic.
          </p>
        </div>

        {/* Commitments */}
        <div className="mb-12">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-2">My Commitment to You</h3>
          <div className="w-16 h-1 bg-amber-400 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 border border-gray-100 rounded-xl hover:border-green-300 transition-colors">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Total Transparency</p>
                <p className="text-gray-600 text-sm mt-1">No hidden fees, no commission-based "shopping stops," and no rigid schedules.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 border border-gray-100 rounded-xl hover:border-green-300 transition-colors">
              <span className="text-2xl">🙏</span>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Cultural Respect</p>
                <p className="text-gray-600 text-sm mt-1">I bridge the gap between Western travel expectations and local traditions, ensuring you travel with dignity and insight.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 border border-gray-100 rounded-xl hover:border-green-300 transition-colors">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-bold text-gray-800 text-sm md:text-base">Sustainable Travel</p>
                <p className="text-gray-600 text-sm mt-1">I believe in supporting local artisans and small-scale vendors, ensuring your visit leaves a positive footprint on my country.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="mb-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">The Personal Touch</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            When I'm not guiding, you'll likely find me exploring a new hiking trail or capturing the delta through my camera lens. I'm a storyteller at heart, and I can't wait to help you write your own Bangladesh story.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-green-900 rounded-2xl p-10">
          <h3 className="text-2xl font-extrabold text-white mb-2">Ready to see the real Bangladesh?</h3>
          <p className="text-green-200 text-sm mb-6">Let's start planning your custom itinerary.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-full transition-colors text-sm"
          >
            Send Naim a Message →
          </Link>
        </div>

      </div>
    </div>
  )
}