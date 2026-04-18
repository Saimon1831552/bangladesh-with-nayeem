import React from 'react'

export default function PaymentPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">
            No Hidden Charges, No Surprise Fees
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">
            Just Transparent, Traveller-First Payments
          </h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base">
            At Panorama Bangladesh, <strong>we believe trust begins with clarity.</strong>
          </p>
          <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
            Our payment policy is designed to be simple, secure, and completely transparent—so you know exactly what you're paying for and why. From private tours to tailor-made journeys, every payment reflects fair pricing, ethical practices, and zero hidden costs—allowing you to focus on the experience, not the fine print.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🔒 Secure and Transparent Payments
          </h3>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            At Panorama Bangladesh, we keep our payment process straightforward. Every booking confirmation includes a written breakdown of inclusions and costs, so you always know exactly what you are paying for.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            💰 Deposit and Balance
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>To confirm your private tour, we require a <strong>25%</strong> deposit of the total cost.</li>
            <li>You pay the remaining <strong>75%</strong> balance no later than 14 days before the tour start date.</li>
            <li>For last-minute bookings (less than 14 days before departure), you pay the <strong>full</strong> amount at the time of confirmation.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            💳 Accepted Payment Methods
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            We accept the following secure payment methods:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>International credit and debit cards (Visa, MasterCard)</li>
            <li>Western Union</li>
            <li>Payoneer</li>
            <li>International bank transfer (for select cases, on request)</li>
            <li>All payments are invoiced in <strong>USD</strong>. We can also provide equivalent pricing in EUR or GBP upon request.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            💱 Currency and Conversion
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>Prices are quoted in US Dollars (USD).</li>
            <li>If you pay in a currency other than the local currency, we base the conversion on the official exchange rate on the payment date.</li>
            <li>You are responsible for any transfer fees or bank charges.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            📋 Payment Confirmation
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            Once we receive your payment, you will receive:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li>An official payment receipt by Email.</li>
            <li>A final confirmation with your full booking details.</li>
            <li>Keep this confirmation as proof of your reservation.</li>
          </ol>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            🔒 Secure Transactions
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            We process all payments through encrypted, verified platforms to keep your information safe.
          </p>
          <p className="text-gray-700 text-sm md:text-base mt-1">
            Panorama Bangladesh <span className="text-red-500 font-semibold">does not store or share your payment details.</span>
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            ❓ Questions About Payment?
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-4">
            If you have questions about deposits, balances, or payment methods, please get in touch with us:
          </p>
          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p>✉️ <strong>Email:</strong> info@panoramabangladesh.com</p>
            <p>📱 <strong>WhatsApp:</strong> +880 1601-652669</p>
          </div>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            We are here to make your booking process smooth and transparent.
          </p>
        </div>

      </div>
    </div>
  )
}