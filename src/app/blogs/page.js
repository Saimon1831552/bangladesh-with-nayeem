import Link from 'next/link';
import Blog from './blog';

export const dynamic = 'force-dynamic';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL)
  .replace(/\/api\/?$/, '');

export default async function BlogsPage() {
  let blogs = [];
  let fetchError = false;

  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
       next: { revalidate: 60 },
      });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    blogs = json.data || [];
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    fetchError = true;
  }

if (fetchError) {
  return (
    <section className="py-20 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-2xl font-bold text-gray-700 mb-3">Unable to load articles</p>
        <p className="text-gray-500 mb-6">Please check your connection or try again later.</p>

        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-colors"
        >
          Try again
        </Link>
      </div>
    </section>
  );
}

  return <Blog blogs={blogs} />;
}