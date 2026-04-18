import React from 'react'

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">
            Plans Change
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">
            Your Peace of Mind Shouldn't
          </h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base font-semibold">
            Travel should feel exciting—not risky.
          </p>
          <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
            At Panorama Bangladesh, we keep our cancellation and rescheduling policy transparent, fair, and human. Whether your plans shift due to scheduling, weather, or life itself, we aim to offer flexibility wherever possible—without hidden clauses or fine-print surprises.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Our Approach to Cancellations 🙌
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            At Panorama Bangladesh, we understand that travel plans can change unexpectedly. For that reason, we created a cancellation policy that stays fair, transparent, and easy to understand.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Standard Cancellation Terms 🗓️
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>30 days or more</strong> before the tour start date: We give a <strong>full refund</strong> of your deposit and all payments you have made.</li>
            <li><strong>15–29 days before</strong> the tour start date: We <strong>refund 50%</strong> of the total tour cost.</li>
            <li><strong>Less than 14 days</strong> before the tour start date: We <strong>do not provide</strong> any refund.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Special Conditions ⚠️
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Last-minute bookings:</strong> If you confirm a tour less than 14 days before departure, we <strong>treat</strong> the booking as non-refundable.</li>
            <li><strong>Partially used tours:</strong> Once you start a tour, we <strong>cannot refund</strong> unused services (meals, transport, tickets).</li>
            <li><strong>Force majeure:</strong> In rare cases involving natural disasters, political unrest, or government restrictions, Panorama Bangladesh <strong>works</strong> with you to reschedule your tour or <strong>offers</strong> a fair partial refund based on the costs already incurred.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            How to Cancel a Booking ✉️
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            To cancel your booking, please send a written request by email to{' '}
            <a href="mailto:support@panoramabangladesh.com" className="text-amber-500 underline">
              support@panoramabangladesh.com
            </a>.
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-2">
            Your <span className="text-amber-500 font-semibold">cancellation becomes valid</span> only when <strong>Panorama Bangladesh confirms it in writing.</strong>
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Refund Processing Time ⏳
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>We <strong>process</strong> refunds within <strong>14 business days</strong> of a confirmed cancellation.</li>
            <li>We <strong>issue</strong> refunds through the same payment method you used initially.</li>
            <li>You <strong>cover</strong> any transfer or transaction fees.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Flexibility Promise 🤝
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            Instead of cancelling altogether, we encourage you to <strong>reschedule</strong> your tour at no extra charge (subject to availability).
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-1">
            This option often saves you time and money while keeping your travel plans to Bangladesh on track.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            Contact for Cancellations 📞
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            If you need to cancel or reschedule, please get in touch with us:
          </p>
          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p>✉️ <strong>Email:</strong> info@panoramabangladesh.com</p>
            <p>📱 <strong>WhatsApp:</strong> +880 1601-652669</p>
          </div>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            Our team will assist you promptly.
          </p>
        </div>

      </div>
    </div>
  )
}