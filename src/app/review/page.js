import React from 'react';
import Review from './review'; 

export default async function Page() {
  let reviews = [];

  try {
    
    const res = await fetch("https://bangladesh-with-nayeem-production.up.railway.app/api/reviews", {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const json = await res.json();
      reviews = json.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return (
    <div>
     
      <Review reviews={reviews} />
    </div>
  );
}