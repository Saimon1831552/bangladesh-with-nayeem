
import BlogShow from '@/components/shared/blog-show/blog-show';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || 'https://api.bangladeshwithnaim.com'
).replace(/\/api\/?$/, '');

export default async function HomePage() {
  let blogs = [];

  try {
    const res = await fetch(`${API_BASE}/api/blogs`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      blogs = json.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch blogs for homepage:', error);
  }

  return (
    <div>
      <BlogShow blogs={blogs} />
    </div>
  );
}
