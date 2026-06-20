export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tours/${slug}`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const tour = json.data;

    return {
      title: `${tour.title} | Bangladesh With Naim`,
      description:
        tour.meta_description ||
        `Book ${tour.title} tour in Bangladesh with Bangladesh With Naim.`,
    };
  } catch (error) {
    return {
      title: "Tour Details | Bangladesh With Naim",
    };
  }
}
