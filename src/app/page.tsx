import AboutMe from "@/components/AboutMe/AboutMe";
import Footer from "@/components/HeroSection/Footer";
import ContactUs from "@/components/Form/ContactUs";
import HeroSection from "@/components/HeroSection/HeroSection";
import InfiniteScrollTags from "@/components/InfiniteScrollTag/InfiniteScrollTag";
import NavigationWrapper from "@/components/NavigationDrawer/NavigationWrapper";
import ProjectSection from "@/components/ProjectSection/ProjectSection";
import ScrollIntoView from "@/components/HeroSection/ScrollIntoView";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
import SocialSection from "@/components/SocialSection/SocialSection";
import { WorkExperienceDemo } from "@/components/WorkExperience/WorkExperience";

export default function Home() {

  return (
    <>
      <main>
        <ScrollIntoView />
        <NavigationWrapper />
        <div className="h-[110vh] w-full bg-black relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "#000000",
              backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
              backgroundSize: "40px 40px",
            }}
          />
          <HeroSection />
          <SocialSection />
        </div>
        <AboutMe />
        <ProjectSection />
        <WorkExperienceDemo/>
        <SkillsSection />
        <InfiniteScrollTags />
        <ContactUs />
        <Footer />
      </main>
    </>


  );
}



















