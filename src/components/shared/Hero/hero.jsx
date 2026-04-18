import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      <div className="w-full relative h-[70vh] md:h-[80vh] lg:h-screen">

        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://i.ibb.co.com/KpqXnXhX/mamun-srizon-qay3l-NDSHzc-unsplash.jpg"
            alt="Beautiful Bangladesh Landscape"
            fill
            sizes="100vw"
            className="object-cover"
            priority  // LCP image — always priority on hero
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start justify-center h-full text-center md:text-left text-white px-6 md:px-12 lg:ml-40 max-w-3xl mx-auto lg:mx-0">

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            Discover Beautiful <br className="hidden md:block" /> Bangladesh
          </h1>

          <p className="text-base md:text-xl lg:text-2xl font-medium max-w-2xl drop-shadow-md mb-8">
            Join Naim for an unforgettable journey through the hidden gems of the delta.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/tours"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg text-center"
            >
              View Tours
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg text-center"
            >
              Plan your Trip
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}