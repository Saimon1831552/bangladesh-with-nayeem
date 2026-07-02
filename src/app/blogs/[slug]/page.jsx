// page.jsx
import Blogclient from "./Blogclient";

async function getBlog(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article Not Found | Bangladesh With Naim" };

  const url = `https://bangladeshwithnaim.com/blogs/${slug}`;
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url,
      images: [{ url: blog.image_url, width: 1200, height: 630 }],
      publishedTime: blog.publish_date,
      authors: blog.author ? [blog.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image_url],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return <Blogclient slug={slug} initialBlog={blog} />;
}
