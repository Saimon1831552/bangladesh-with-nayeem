import Blogclient from "./Blogclient";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.slug}`,
    {
      next: { revalidate: 3600 },
    }
  );

  const { data } = await res.json();

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [
        {
          url: data.image_url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Page() {
  return <Blogclient />;
}
