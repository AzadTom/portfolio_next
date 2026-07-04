import { Heading } from "@/components/designSytem/DesignSytem";
import { Button } from "../ui/button";
import NavBar from "./NavBar";
import StatsSection from "./StatsSection";
import TestimonialSection from "./Testimonial/TestimonialSection";
import FaqSection from "./FaqSection";
import FooterSectionComponent from "./Footer";

const SponserPage = () => {
  return (
    <main>   
      <HeroSection />
      <StatsSection/>
      <TestimonialSection/>
      <FaqSection/>
      <FooterSectionComponent/>
    </main>
  );
};

export default SponserPage;

const HeroSection = () => {
  return (
    <section className="relative text-white w-full h-screen overflow-hidden flex justify-center md:items-center">
      <NavBar className="hidden md:flex absolute top-0 left-4 right-4 z-20"/>
      <picture className="absolute inset-0 w-full h-full object-cover">
        <source media="(max-width:767px)" srcSet="/img/youtuber_img3.png" />
        <source media="(min-width:768px)" srcSet="/img/youtuber_img.png" />
        <img src="/img/youtuber_img3.png" className="w-full h-full object-cover" />
      </picture>
      <div className="relative z-20 w-full flex flex-col gap-5 p-4">
         <NavBar className="py-0 md:hidden"/>
        <Heading className="max-w-4xl outfit-700">
          Reach Millions Through Trusted Tech
        </Heading>
        <Heading variant={"lead"} className="max-w-2xl font-sans">
         Authentic reviews, comparisons, and hands-on demos that help audiences buy with confidence.
Partner on campaigns that build trust and drive measurable results.
        </Heading>
        <div className="flex gap-4 items-center mt-5">
          <Button variant={"outline"} className="text-base">Book a Sponsorship</Button>
          <Button className="bg-gradient-to-b from-blue-500 to-blue-900 text-base px-4 py-2">
            Download Media Kit
          </Button>
        </div>
      </div>
    </section>
  );
};
