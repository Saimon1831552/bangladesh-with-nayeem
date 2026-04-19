"use client"
import React, { useState } from 'react'

const faqs = [
  {
    q: "Who will be my actual guide?",
    a: "Unlike large agencies that assign guides at random, I personally lead every journey booked through this website. From the moment we meet at the airport until your departure, you are traveling with me — The Naim Guarantee."
  },
  {
    q: "Is Bangladesh safe for international travelers?",
    a: "Bangladesh is known for its incredible hospitality. As your private \"fixer\" and guide, your safety is my #1 priority. I monitor local conditions daily, handle all logistics, and ensure we visit areas that are welcoming and secure for guests."
  },
  {
    q: "Are your boutique tours budget-friendly?",
    a: "I believe that luxury is about the quality of the experience, not just the price tag. Because I am a solo boutique operator, you are booking directly with your guide — there are no middleman commissions, high agency overheads, or hidden platform fees (like the 20–30% charged by international booking sites)."
  },
  {
    q: "Can I customize my itinerary after the tour starts?",
    a: "Absolutely. One of the biggest benefits of a boutique journey is flexibility. If you fall in love with a particular village or want to spend an extra hour at a mosque, we can adjust our pace. It is your holiday, not a rigid schedule."
  },
  {
    q: "What is included in the tour price?",
    a: "Typically, my quotes are \"all-inclusive\" within Bangladesh. This includes: my full-time professional guiding services, premium air-conditioned transport, high-quality 4★ or 5★ accommodations, domestic flights and boat rentals, entrance fees and most meals. International flights and visas are the responsibility of the guest."
  },
  {
    q: "What is the best time of year to visit?",
    a: "The \"Golden Window\" is from November to March when the weather is cool and dry — perfect for heritage walks and Sundarbans safaris. However, the monsoon season (June–August) offers a lush, green beauty that photographers often love."
  },
  {
    q: "How do I handle the visa process?",
    a: "Citizens of most countries require a visa. Dhaka Airport offers Visa on Arrival (VOA) for citizens of the EU, the US, Canada, Australia, New Zealand, Japan, Singapore, and several other countries. Please consult your country's embassy and airline before traveling for specific entry requirements."
  },
  {
    q: "What should I wear?",
    a: "Bangladesh is a conservative country. Men: trousers or long shorts with shirts. Women: long trousers or skirts with tops that cover the shoulders. In mosques and temples, both men and women need to dress modestly."
  },
  {
    q: "Is the food safe to eat?",
    a: "Absolutely — experiencing local flavors is a key part of the journey. As your private guide, I personally select every restaurant we visit, avoiding tourist traps and choosing high-end restaurants and reputable local vendors known for their hygiene standards. I provide chilled, bottled, or filtered drinking water for the entire journey."
  },
  {
    q: "Is it possible to pay using a credit card?",
    a: "Yes. We accept international cards (Visa and Mastercard), Payoneer, Western Union, and bank transfers. See our payment, refund, and cancellation policies for more details."
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm md:text-base pr-4">
          <span className="text-green-700 mr-2">{String(index + 1).padStart(2, '0')}.</span>
          {faq.q}
        </span>
        <span className={`text-amber-500 text-xl font-bold flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-4">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQS() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 uppercase tracking-wide leading-tight">
            Got Questions?
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 uppercase tracking-wide mt-1">
            We've Got Answers
          </h2>
          <p className="mt-5 text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know before booking your private tour in Bangladesh with Naim.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-6">Feel free to reach out — I'm happy to help before you book.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:info@panoramabangladesh.com"
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              ✉️ Email Naim
            </a>
            <a
              href="https://wa.me/8801783377429"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              📱 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}