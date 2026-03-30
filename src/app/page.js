import FeaturedTours from "@/components/shared/featured-tours/featuredTours";
import GuideProfile from "@/components/shared/Guide-profile/guide-profile";
import Hero from "@/components/shared/Hero/hero";
import SpeechDraft from "@/components/shared/landing-page-speech/speech-draft";
import Testimonials from "@/components/shared/testimonials/testimonials";
import Gallery from "@/components/shared/tours-gallary/gallary";


export default function Home() {
  return (
    <section >
         <Hero></Hero>
         <GuideProfile></GuideProfile>
         <FeaturedTours></FeaturedTours>
         <SpeechDraft></SpeechDraft>
         <Gallery></Gallery>
         <Testimonials></Testimonials>
    </section>
  );
}
