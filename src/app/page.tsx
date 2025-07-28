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

export default function Home() {

  return (
    <main>
      <ScrollIntoView />
      <NavigationWrapper />
      <div className="relative h-[100vh]">
        <HeroSection />
        <SocialSection />
      </div>
      <AboutMe />
      <ProjectSection />
      <InfiniteScrollTags />
      <SkillsSection />
      <ContactUs />
      <Footer />
    </main>
  );
}



















