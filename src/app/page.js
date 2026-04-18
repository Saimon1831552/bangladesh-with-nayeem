import DayTour from "@/components/shared/day-tour/day-tour";
import FeaturedTours from "@/components/shared/featured-tours/featuredTours";
import GuideProfile from "@/components/shared/Guide-profile/guide-profile";
import Hero from "@/components/shared/Hero/hero";
import Holiday from "@/components/shared/holiday-tour/holiday-tour";
import SpeechDraft from "@/components/shared/landing-page-speech/speech-draft";
import Multiday from "@/components/shared/multiday-tour/multiday-tour";
import Testimonials from "@/components/shared/testimonials/testimonials";
import Gallery from "@/components/shared/tours-gallary/gallary";

export default function Home() {
  return (
    <main>
      <Hero />
      <GuideProfile />
      <FeaturedTours />
      <SpeechDraft />
      <DayTour />
      <Gallery />
      <Multiday />
      <Testimonials />
      <Holiday />
    </main>
  );
}