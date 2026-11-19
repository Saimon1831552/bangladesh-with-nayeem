"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCheckCircle, faAward } from '@fortawesome/free-solid-svg-icons';

export default function GuideProfile() {
  return (
    <div className="bg-stone-50 py-16 px-4">
      <div className="w-full max-w-5xl mx-auto bg-[#fdfbf7] p-8 md:p-14 shadow-xl shadow-stone-200/50 border border-stone-100 rounded-2xl border-y-4 border-y-green-600 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">

          {/* Photo */}
          <div className="relative group shrink-0">
            <div className="bg-white p-4 pb-6 shadow-md transform -rotate-3 w-64 transition-all duration-500 ease-out group-hover:rotate-2 group-hover:scale-105 group-hover:shadow-xl border border-stone-200 rounded-sm">
              <div className="relative w-full aspect-square">
                <Image
                  src="https://i.ibb.co.com/wN3B0nsT/46463372-2343868569174862-5457719980747390976-n-jpg-1.jpg"
                  alt="Naim - Local Guide"
                  fill
                  sizes="256px"
                  className="object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/10 blur-md rounded-[100%] transition-all duration-500 group-hover:opacity-50" />
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-5 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide font-serif text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-amber-700">
              Hi, I'm Naim — Your Friend and Guide in Bangladesh.
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg md:text-xl font-light">
              I'm a local guide with a deep passion for sharing my country in a simple, honest, and personal way.
              From historic landmarks to rural village life, I'll take you beyond the usual tourist path and show
              you the Bangladesh most travellers never get to experience.
              <br /><br />
              <span className="text-stone-600 leading-relaxed text-lg md:text-xl font-light">
                👉 Think of me not just as your guide — but as your local friend who makes everything easier, smoother, and more meaningful.
              </span>
            </p>
            <div className="inline-block bg-green-50 px-4 py-2 border-l-4 border-green-500 text-green-800 italic font-medium text-lg mt-2">
              "Let me take you on an unforgettable journey!"
            </div>
          </div>
        </div>

        {/* ✅ Fix: bg-linear-to-r → bg-gradient-to-r */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-stone-300 to-transparent my-10" />

        {/* Stats row */}
        <div className="flex flex-col md:flex-row justify-center md:justify-around items-center gap-4 text-stone-600 font-medium text-base md:text-lg">

          <div className="flex items-center gap-3 group cursor-default">
            <div className="bg-amber-100 p-2 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
              <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#b45309" }} />
            </div>
            <span className="group-hover:text-stone-900 transition-colors">Local Guide</span>
          </div>

          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-stone-300" />

          <div className="flex items-center gap-3 group cursor-default">
            <div className="bg-rose-100 p-2 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
              <FontAwesomeIcon icon={faHeart} className="text-rose-600 text-2xl" />
            </div>
            <span className="group-hover:text-stone-900 transition-colors">Private Tours</span>
          </div>

          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-stone-300" />

          <div className="flex items-center gap-3 group cursor-default">
            <div className="bg-green-100 p-2 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
            </div>
            <span className="group-hover:text-stone-900 transition-colors">Custom Itineraries </span>
          </div>

          <div className="flex items-center gap-3 group cursor-default">
            <div className="bg-green-100 p-2 rounded-full transition-transform duration-300 group-hover:-translate-y-1">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
            </div>
            <span className="group-hover:text-stone-900 transition-colors">Friendly Travel Support</span>
          </div>

        </div>
      </div>

      {/* Premium credential card */}
      <div className="w-full max-w-xl mx-auto mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/60 bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-6 py-5 text-white shadow-xl shadow-green-900/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber-300/70 bg-amber-400/15 text-amber-300 shadow-inner shadow-amber-100/10">
              <FontAwesomeIcon icon={faAward} className="text-2xl" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                A Registered Tour Guide in Bangladesh
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-green-100">
                Officially registered with the Bangladesh Tourism Board under the Ministry of Civil Aviation and Tourism.
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                Registration Number
              </p>
              <p className="mt-1 text-base font-extrabold tracking-widest text-white">
                TG405704700008
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-green-100">
                Bangladesh Tourism Board Registered Guide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
