import Blogclient from "./Blogclient";

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return {};
    }

    const json = await res.json();

    if (!json?.data) {
      return {};
    }

    return {
      title: json.data.title,
      description: json.data.excerpt,
      openGraph: {
        images: [json.data.image_url],
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
