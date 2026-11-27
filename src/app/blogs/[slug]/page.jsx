// page.jsx
import Blogclient from "./Blogclient";
import { stripHtml } from "@/lib/richText";

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

  // Keep this identical to the preferred hostname used in the sitemap and
  // redirects. A non-www canonical here tells Google a different URL is the
  // primary version of the same article.
  const url = `https://www.bangladeshwithnaim.com/blogs/${slug}`;
  // Title and excerpt may contain formatting; search engines need plain text.
  const title = stripHtml(blog.title);
  const description = stripHtml(blog.excerpt);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: blog.image_url, width: 1200, height: 630 }],
      publishedTime: blog.publish_date,
      authors: blog.author ? [blog.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.image_url],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return <Blogclient slug={slug} initialBlog={blog} />;
}
