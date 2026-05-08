import React from 'react';
import Review from './review';
import TestimonialsPage from '@/components/shared/testimonials/testimonials';

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
      <Review reviews={reviews} />
      <TestimonialsPage reviews={reviews}></TestimonialsPage>
    </div>
  );
}