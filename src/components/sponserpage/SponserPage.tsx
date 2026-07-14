import StatsSection from "../stats-section";
import FaqSection from "./FaqSection";
import FooterSectionComponent from "./Footer";
import ProcessSection from "./ProcessSection";
import { HeroFinancial } from "../hero-financial";
import { AboutAgency } from "../about-agency";
import { GrowthPlans } from "../growth-plans";
import { SpotlightTestimonial } from "../spotlight-testimonial";
import TeamSection from "../team-section";
import CardStacking from "../card-stacking";
import ImageReveal2 from "../image-reveal2";

const SponserPage = () => {
  return (
    <main>
      <HeroFinancial/>
      <StatsSection />
      <ImageReveal2/>
      <AboutAgency/>
      <SpotlightTestimonial/>
      <TeamSection/>
      <ProcessSection />
      <GrowthPlans/>
      <CardStacking/>
      <FaqSection />
      <FooterSectionComponent />
    </main>
  );
};

export default SponserPage;

