import React from 'react';
import TestimonialsPage from './testimonials';

export default async function Page() {
  let reviews = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      reviews = json.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }

  return (
    <div>
       <TestimonialsPage reviews={reviews} />
    </div>
  );
}