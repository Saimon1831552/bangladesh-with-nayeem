import React from 'react'

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">Clear Guidelines</h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">Transparent Journeys</h2>
          <p className="mt-5 text-gray-700 text-sm md:text-base leading-relaxed">
            These Terms and Conditions constitute a legal agreement between <strong>Bangladesh with Naim</strong> (the "Guide") and the traveler (the "Guest"). By confirming your booking through a deposit or full payment, you acknowledge that you have read, understood, and agreed to these terms.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">💰 Personalized Booking & Payments</h3>
          <p className="text-gray-700 text-sm md:text-base mb-3">
            <strong>The Boutique Guarantee:</strong> As a boutique operator, I personally lead every journey. To secure your dates on my calendar, a deposit is required at the time of booking.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Final Balance:</strong> The remaining balance must be settled no later than 14 days prior to the tour start date.</li>
            <li><strong>Late Payments:</strong> Failure to complete the final payment by the due date may result in the cancellation of your booking and the forfeiture of your deposit, as I reserve these dates exclusively for you.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">✖️ Cancellations & Secure Refunds</h3>
          <p className="text-gray-700 text-sm md:text-base mb-2">
            My commitment to transparency is paramount. Detailed information regarding cancellations, timelines, and refund eligibility can be found on my dedicated{' '}
            <a href="/refund-policy" className="text-amber-500 underline font-medium">Refund Policy</a> and{' '}
            <a href="/cancellation-policy" className="text-amber-500 underline font-medium">Cancellation Policy</a> pages.
          </p>
          <p className="text-gray-700 text-sm md:text-base">All refunds are processed strictly according to those stated conditions to ensure fairness for both the guest and the guide.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">👤 Guest Responsibilities & Safety</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Documentation:</strong> Guests are responsible for maintaining valid travel documents, including passports (with 6 months' validity), visas, and necessary permits for Bangladesh.</li>
            <li><strong>Insurance:</strong> I strictly require guests to carry comprehensive travel insurance. This must cover medical emergencies, trip interruptions, and personal liability.</li>
            <li><strong>Local Conduct:</strong> Guests must adhere to Bangladesh's laws, cultural etiquette, and safety instructions provided during the tour.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🏥 Health, Mobility & Dietary Needs</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Advance Notice:</strong> Please disclose any medical conditions, mobility concerns, or specific dietary requirements during the initial consultation.</li>
            <li><strong>Risk Acknowledgment:</strong> While I take every precaution to ensure your safety and hygiene, participation in tours involves inherent risks. Bangladesh with Naim is not liable for illness, injury, or loss unless caused by my direct negligence.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🔵 Professional Liability Disclaimer</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Coordination:</strong> I act as an expert coordinator between you and third-party providers (hotels, boat operators, and transport). While I vet these partners for quality, I am not responsible for their independent failures or delays.</li>
            <li><strong>Force Majeure:</strong> I am not liable for expenses or losses resulting from "Acts of God," including natural disasters, political strikes (hartals), or unforeseen government restrictions.</li>
            <li><strong>Limit of Liability:</strong> Total liability for any claim is strictly limited to the total amount paid for the specific tour in question.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">🗓️ Itinerary Flexibility</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
            <li><strong>Dynamic Travel:</strong> Bangladesh is a beautiful, fast-changing country. Unforeseen traffic, weather shifts, or site closures may require adjustments.</li>
            <li><strong>Expert Adjustments:</strong> I reserve the right to modify routes or activities to prioritize your safety and provide the best possible alternative experience.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">📷 Media & Storytelling</h3>
          <p className="text-gray-700 text-sm md:text-base mb-2">I often capture high-quality photos and videos of our journeys to share the beauty of Bangladesh. I may use this media for my professional portfolio or social media.</p>
          <p className="text-gray-700 text-sm md:text-base"><strong>Privacy:</strong> If you prefer not to be featured in promotional materials, please notify me in writing prior to the tour start date.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">⚖️ Legal Jurisdiction</h3>
          <p className="text-gray-700 text-sm md:text-base">These terms are governed by the laws of the People's Republic of Bangladesh.</p>
          <p className="text-gray-700 text-sm md:text-base mt-2">Any disputes arising from these services shall be settled under the jurisdiction of the courts in Dhaka, Bangladesh.</p>
        </div>

      </div>
    </div>
  )
}