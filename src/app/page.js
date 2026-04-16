import DayTour from "@/components/shared/day-tour/day-tour";
import FeaturedTours from "@/components/shared/featured-tours/featuredTours";
import ToursData from "@/components/shared/featured-tours/toursData";
import GuideProfile from "@/components/shared/Guide-profile/guide-profile";
import Hero from "@/components/shared/Hero/hero";
import Holiday from "@/components/shared/holiday-tour/holiday-tour";
import SpeechDraft from "@/components/shared/landing-page-speech/speech-draft";
import Multiday from "@/components/shared/multiday-tour/multiday-tour";
import Testimonials from "@/components/shared/testimonials/testimonials";
import Gallery from "@/components/shared/tours-gallary/gallary";


export default function Home() {
  return (
    <section >
         <Hero></Hero>
         <GuideProfile></GuideProfile>
         <FeaturedTours></FeaturedTours>
         <SpeechDraft></SpeechDraft>
         <DayTour></DayTour>
         <Gallery></Gallery>
         <Multiday></Multiday>
         <Testimonials></Testimonials>
         <Holiday></Holiday>

    </section>
  );
}
