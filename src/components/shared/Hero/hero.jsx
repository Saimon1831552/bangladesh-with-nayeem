import React from 'react'

export default function Hero() {
  return (
    <section>
         <div className="relative h-screen w-full">
           <div className="absolute inset-0 -z-10">
             <img 
               className="h-full w-full object-cover" 
               src="https://i.ibb.co.com/KpqXnXhX/mamun-srizon-qay3l-NDSHzc-unsplash.jpg" 
               alt="Beautiful Bangladesh Landscape" 
             />
             <div className="absolute inset-0 bg-black/30"></div>
           </div>
     
           <div className="flex flex-col items-start justify-center h-full text-start text-white px-4 ml-40">
             <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
               Discover Beautiful <br /> Bangladesh <br />
             </h1>
             <p className="text-lg md:text-2xl font-medium max-w-2xl drop-shadow-md">
               Join Naim for an unforgettable journey through the hidden gems of the delta.
             </p>
             <div className='flex flex-row justify-between items-center gap-2.5'>
                   <button className="mt-8 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                   View Tours
                 </button>
                 <button className="mt-8 bg-amber-500 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                   Plan your Trips
                 </button>
             </div>
           </div>
         </div>
    </section>
  )
}
