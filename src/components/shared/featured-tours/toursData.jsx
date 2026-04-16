// import React from 'react'
// import FeaturedTours from './featuredTours';


// export default async function ToursData() {
//     let tours = [];

//   try { 
//     const res = await fetch("http://localhost:5000/api/tours?isFeatured=true", {
//       cache: 'no-store'
//     });
//     if (res.ok) {
//       const json = await res.json();
//       tours = json.data || [];
//     }
//   } catch (error) {
//     console.error("Failed to fetch tours:", error);
//   }

//   return (
//     <div>
//       <FeaturedTours key={tours} tours={tours} />
      
//     </div>
//   )
// }
