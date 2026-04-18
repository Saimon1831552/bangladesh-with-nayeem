import React from 'react'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">
            Because Real Journeys
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">
            Deserve Complete Peace of Mind
          </h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base">
            Travel plans can change — and <strong>we believe your trust shouldn't suffer</strong> because of it.
          </p>
          <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
            Our refund policy is designed to be transparent, fair, and human. No fine print tricks, no uncomfortable surprises — just clear terms that respect both your time and your investment, while allowing us to deliver high-quality, responsibly run journeys across Bangladesh.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🔍 Transparent and Fair Refunds
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Panorama Bangladesh offers a fair and transparent refund process. Our goal is to protect both our guests and local partners while ensuring you know exactly what to expect before you book.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            📌 Standard Refund Rules
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>30 days or more before the tour start date: We provide a <strong>100%</strong> refund of your deposit and any payments made.</li>
            <li>15–29 days before the tour start date: We refund <strong>50%</strong> of the total tour cost.</li>
            <li>Less than 14 days before the tour start date, we do not provide refunds.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            ⚠️ Non-Refundable Situations
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Tours booked less than 14 days before the start date are non-refundable.</li>
            <li>Once the trip begins, we cannot issue refunds for unused services (such as meals, tickets, or activities).</li>
            <li>We do not offer a refund for late arrivals, early departures, or missed activities due to personal choice.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🏔️ Force Majeure (Unforeseen Circumstances)
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            If events outside our control affect your tour—such as natural disasters, strikes, political unrest, or government restrictions—we will:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Work with you to reschedule your tour at no additional cost (subject to availability), or</li>
            <li>Offer a partial refund for services we were unable to deliver, based on the expenses we have already incurred.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🗓️ How Refunds Are Processed
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>We issue refunds through the same payment method you used at the time of booking (e.g., credit card, PayPal, bank transfer).</li>
            <li>We process refunds within 14 business days of receiving your written cancellation confirmation.</li>
            <li>You are responsible for any bank charges, currency conversion fees, or transfer costs.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🔄 Flexibility Over Cancellation
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            We encourage you to <strong>reschedule</strong> rather than <span className="text-red-500 font-semibold">cancel</span> whenever possible.
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-1">
            Rescheduling often saves you money and ensures your travel experience can still happen on new dates.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            ❓ Contact Us for Refund Queries
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            For all refund-related questions, don't hesitate to get in touch with us:
          </p>
          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p>✉️ <strong>Email:</strong> info@panoramabangladesh.com</p>
            <p>📱 <strong>WhatsApp:</strong> +880 1601-652669</p>
          </div>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            Our team will guide you through the process step by step.
          </p>
        </div>

      </div>
    </div>
  )
}