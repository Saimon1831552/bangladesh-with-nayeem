import Blogclient from "./Blogclient";

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return {};

    const { data } = await res.json();

    if (!data) return {};

    return {
      title: data.title,
      description: data.excerpt,

      openGraph: {
        title: data.title,
        description: data.excerpt,
        url: `https://www.bangladeshwithnaim.com/blogs/${params.slug}`,
        type: "article",
        images: [
          {
            url: data.image_url,
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.excerpt,
        images: [data.image_url],
      },
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default function Page() {
  return <Blogclient />;
}
