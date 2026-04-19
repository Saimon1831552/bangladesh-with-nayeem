import React from 'react'

export default function PaymentPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">Payment Policy – Private Tours in Bangladesh with Naim</h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">Just Transparent, Traveller-First Payments</h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base leading-relaxed">
            Planning a trip should feel exciting—not stressful. That's why I've designed a <strong>simple, transparent, and secure payment process</strong> for booking private tours in Bangladesh. This page explains exactly how payments work, so you can book with confidence and no surprises.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">💳 1. Booking Confirmation & Deposit</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">To reserve your private tour, a <strong>25% deposit</strong> is required.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base mb-3">
            <li>This confirms your booking and secures your dates.</li>
            <li>The remaining <strong>75% balance</strong> is due <strong>14 days before your tour starts.</strong></li>
          </ul>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <p className="text-gray-700 text-sm font-medium">Last-minute bookings (less than 14 days): Full payment is required at the time of booking.</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🌍 2. Accepted Payment Methods</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">I currently accept the following trusted international payment options:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base mb-3">
            <li><strong>Payoneer</strong> (most popular with my international guests)</li>
            <li><strong>Western Union</strong></li>
            <li><strong>International bank transfer</strong> (available on request)</li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base">All payments are made in <strong>US Dollars (USD)</strong> for clarity and consistency. If you prefer EUR or GBP, I'm happy to provide current exchange rates.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">💱 3. Currency & Transfer Fees</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Any <strong>bank fees, transfer charges, or currency conversion costs</strong> are the responsibility of the traveler.</li>
            <li>The total amount received should match the agreed tour price.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🔐 4. Secure & Reliable Transactions</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">Your security matters. All payments are handled through <strong>trusted and widely used platforms</strong> with strong security systems. I personally ensure:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Clear communication before and after payment</li>
            <li>Confirmation for every transaction</li>
            <li>Safe handling of your booking details</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">📩 5. Payment Confirmation & Booking Details</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">Once your payment is received, you will get:</p>
          <ul className="space-y-2 text-gray-700 text-sm md:text-base">
            <li className="flex items-center gap-2">✅ A <strong>payment confirmation email</strong></li>
            <li className="flex items-center gap-2">✅ A <strong>complete tour itinerary</strong></li>
            <li className="flex items-center gap-2">✅ A <strong>booking confirmation document</strong></li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base mt-3">This serves as your official reservation. I recommend saving a copy on your phone or email for easy access during your trip.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">❓ 6. Common Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">How long does payment take?</p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1 space-y-1">
                <li>Payoneer: usually within <strong>24–48 hours</strong></li>
                <li>Bank transfer: <strong>2–5 business days</strong></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">What if my payment is delayed?</p>
              <p className="text-gray-700 text-sm mt-1">No problem — just inform me in advance. I'm flexible and will guide you.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm md:text-base">Is my booking guaranteed after payment?</p>
              <p className="text-gray-700 text-sm mt-1">Yes. Once your deposit or full payment is confirmed, your tour dates and arrangements are secured.</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">🤝 A Personal Note</h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            For me, payment is not just a transaction — it's the <strong>first step in building trust</strong> with my guests. I've worked with travelers from different countries, and I understand that sending money internationally can feel uncertain. That's why I keep everything clear, honest, and flexible. If you ever have questions or need help choosing the best payment method, feel free to contact me anytime.
          </p>
        </div>

      </div>
    </div>
  )
}