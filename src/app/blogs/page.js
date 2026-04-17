import React from 'react';
import Blog from './blog';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://bangladesh-with-nayeem-production.up.railway.app/api';

export default async function BlogsPage() {
  let blogs = [];

  try {
    const res = await fetch(`${API_BASE}/blogs`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      blogs = json.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  return (
    <div>
      <Blog blogs={blogs} />
    </div>
  );
}