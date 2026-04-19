import React from 'react'

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">Plans Change</h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">Your Peace of Mind Shouldn't</h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base leading-relaxed">
            Planning a trip should feel exciting—not stressful. At <strong>Bangladesh with Naim</strong>, I aim to keep everything clear, fair, and transparent from the very beginning. This cancellation policy explains how bookings, changes, and refunds work for private tours across Bangladesh.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">✉️ 1. How to Cancel Your Tour Booking</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">If you need to cancel your tour, please inform me as early as possible.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>All cancellations must be submitted <strong>in writing</strong>, either by email or message.</li>
            <li>The cancellation date is counted from when your request is received.</li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base mt-3 text-amber-600 font-medium">👉 The earlier you reach out, the more flexible options I may be able to offer.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">🗓️ 2. Cancellation Charges & Refund Timeline</h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">Every tour involves advance planning such as hotel bookings, transport arrangements, and local services. Because of this, the following cancellation terms apply:</p>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-bold text-green-700 text-sm mb-1">More than 30 Days Before Tour Start</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Cancellation is accepted.</li>
                <li>Refund processed in accordance with the refund policy.</li>
                <li>Deposit remains non-refundable.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-bold text-yellow-700 text-sm mb-1">15–29 Days Before Tour Start</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Partial cancellation charges will apply.</li>
                <li>A portion of your payment is retained to cover confirmed bookings.</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-bold text-red-700 text-sm mb-1">Less than 14 Days Before Tour Start</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Full cancellation charges apply.</li>
                <li>No refund is available, as all services are already secured.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">⚡ 3. Last-Minute Bookings & Cancellations</h3>
          <p className="text-gray-700 text-sm md:text-base mb-2">For bookings made within 14 days of the tour start date:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>These bookings are considered <strong>final</strong>.</li>
            <li>No refunds are available upon cancellation.</li>
            <li>Arrangements are confirmed immediately with service providers.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🔄 4. Flexible Options Instead of Cancellation</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">Before canceling, I always recommend checking if your plans can be adjusted. You may be able to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Change your travel dates.</li>
            <li>Modify your itinerary.</li>
            <li>Adjust the duration of your trip.</li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base mt-3 text-amber-600 font-medium">👉 In many cases, changes can be arranged with little or no extra cost, depending on availability.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🌪️ 5. Force Majeure (Uncontrollable Situations)</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">Sometimes, unexpected events can affect travel plans. These may include natural disasters, government travel restrictions, or political unrest.</p>
          <p className="text-gray-700 text-sm md:text-base">In such cases, standard cancellation rules may not apply. I will work with you to reschedule your tour or offer suitable alternatives.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🤝 6. A Fair & Transparent Approach</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">I work closely with reliable hotels, drivers, and local partners across Bangladesh. Many of these services require advance payments that cannot be refunded once confirmed. This policy is designed to be fair to both travelers and local service providers, set clear expectations before booking, and avoid misunderstandings later.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">❓ 7. Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">Can I cancel my tour for free?</p>
              <p className="text-gray-700 text-sm mt-1">Free cancellation is only possible if no costs have been incurred. In most cases, the deposit is non-refundable.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">What if I have an emergency?</p>
              <p className="text-gray-700 text-sm mt-1">Please get in touch with me directly. I always try to handle genuine situations with understanding and flexibility.</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">🧭 My Personal Commitment to You</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            This is more than just a cancellation policy—it's about <strong>trust</strong>. I understand that booking a private tour in Bangladesh can feel uncertain, especially if it's your first visit. That's why I focus on clear and honest communication, transparent pricing and policies, and flexible support whenever possible. From your first message to the end of your journey, I'm here to make your travel experience smooth, safe, and memorable.
          </p>
        </div>

      </div>
    </div>
  )
}