import React from 'react'

export default function ResponsibleTravel() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">Travel With Purpose</h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">Responsible Travel in Bangladesh</h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base leading-relaxed">
            Travel is more than just visiting new places—it's about respecting cultures, protecting nature, and creating a positive impact. At <strong>Bangladesh with Naim</strong>, responsible travel is at the heart of every journey. I believe that exploring Bangladesh should benefit not only travelers but also the local communities and environments that make this country so unique.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🌍 What is Responsible Travel?</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">Responsible travel means making conscious choices that:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base mb-3">
            <li>Respect local culture and traditions.</li>
            <li>Support local communities and businesses.</li>
            <li>Protect natural environments and wildlife.</li>
            <li>Minimize negative environmental impact.</li>
          </ul>
          <p className="text-green-700 font-semibold text-sm md:text-base">It's about traveling in a way that leaves places <em>better, not worse.</em></p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🌿 Why Responsible Travel Matters in Bangladesh</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            Bangladesh is rich in culture, biodiversity, and natural beauty — from the <strong>Sundarbans mangrove forest</strong> to the hills of <strong>Bandarban</strong> and the beaches of <strong>Cox's Bazar</strong>. However, these destinations are sensitive and require care.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-3">Responsible travel helps to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Preserve natural ecosystems</li>
            <li>Protect endangered wildlife, such as the Royal Bengal Tiger</li>
            <li>Support local livelihoods</li>
            <li>Maintain cultural authenticity</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">🤝 How I Practice Responsible Travel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="font-bold text-green-800 text-sm mb-2">🏘️ Supporting Local Communities</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Working with local guides, drivers, and small businesses</li>
                <li>Encouraging travelers to buy local products</li>
                <li>Promoting authentic cultural experiences</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-bold text-blue-800 text-sm mb-2">🌱 Eco-Friendly Travel Choices</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Reducing plastic use during tours</li>
                <li>Encouraging reusable water bottles</li>
                <li>Choosing environmentally responsible accommodations</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h4 className="font-bold text-amber-800 text-sm mb-2">🙏 Respect for Culture & Traditions</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Guiding travelers on local customs and etiquette</li>
                <li>Promoting respectful interactions with communities</li>
                <li>Avoiding activities that exploit people or traditions</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <h4 className="font-bold text-purple-800 text-sm mb-2">🐅 Protecting Nature & Wildlife</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Following ethical wildlife viewing practices</li>
                <li>Avoiding harmful activities like disturbing animals</li>
                <li>Promoting conservation awareness</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">✅ How You Can Travel Responsibly in Bangladesh</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">As a traveler, you play an important role. Here are simple ways to make your journey more responsible:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Respect local dress codes and traditions.</li>
            <li>Avoid single-use plastics whenever possible.</li>
            <li>Do not litter—especially in natural areas.</li>
            <li>Support local businesses instead of international chains.</li>
            <li>Ask permission before taking photos of people.</li>
            <li>Follow your guide's instructions in sensitive areas.</li>
          </ul>
          <p className="text-green-700 font-semibold text-sm md:text-base mt-3">👉 Small actions can create a big positive impact.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">🗺️ Sustainable Destinations to Explore</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { place: "Sundarbans", desc: "Protecting the world's largest mangrove forest" },
              { place: "Srimangal", desc: "Tea gardens and eco-tourism" },
              { place: "Bandarban", desc: "Indigenous culture and hill ecosystems" },
              { place: "Cox's Bazar", desc: "Coastal conservation and marine life" },
            ].map((d) => (
              <div key={d.place} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <span className="text-green-600 text-lg">📍</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{d.place}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Travel Better, Travel Responsibly</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
            When you choose responsible travel, you don't just see Bangladesh — you <strong>experience it with purpose</strong>. Let's explore this beautiful country in a way that respects its people, protects its nature, and creates a lasting positive impact.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          >
            Plan Your Responsible Journey →
          </a>
        </div>

      </div>
    </div>
  )
}