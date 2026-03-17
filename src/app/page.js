import FeaturedTours from "@/components/shared/featured-tours/featuredTours";
import GuideProfile from "@/components/shared/Guide-profile/guide-profile";
import Hero from "@/components/shared/Hero/hero";


export default function Home() {
  return (
    <section >
         <Hero></Hero>
         <GuideProfile></GuideProfile>
         <FeaturedTours></FeaturedTours>
    </section>
  );
}
