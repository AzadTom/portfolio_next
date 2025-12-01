import AboutMe from "@/components/portfolio/AboutMe";
import Footer from "@/components/portfolio/Footer";
import ContactUs from "@/components/portfolio/form/ContactUs";
import HeroSection from "@/components/portfolio/HeroSection";
import InfiniteScrollTags from "@/components/portfolio/InfiniteScrollTag";
import ProjectSection from "@/components/portfolio/ProjectSection";
import ScrollIntoView from "@/components/helpers/ScrollIntoView";
import SkillsSection from "@/components/portfolio/SkillsSection";
import SocialSection from "@/components/portfolio/SocialSection";
import { WorkExperienceSection } from "@/components/portfolio/WorkExperienceSection";
import NavigationWrapper from "@/components/portfolio/navigation/NavigationWrapper";
import Blogs_Components from "@/components/portfolio/Blogs_Components";

export default function Home() {
  return (
    <>
      <main>
        <ScrollIntoView />
        <NavigationWrapper />
        <div className="relative h-screen">
          <HeroSection />
        </div>
        <SocialSection />
        <AboutMe />
        <SkillsSection />
        <Blogs_Components/>
        <WorkExperienceSection />
        <ProjectSection />
        <InfiniteScrollTags />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
}
