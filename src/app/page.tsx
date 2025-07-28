import AboutMe from "@/components/AboutMe/AboutMe";
import Footer from "@/components/Footer";
import ContactUs from "@/components/Form/ContactUs";
import HeroSection from "@/components/HeroSection/HeroSection";
import NavigationWrapper from "@/components/NavigationDrawer/NavigationWrapper";
import ProjectSection from "@/components/ProjectSection/ProjectSection";
import SocialSection, { InfiniteScrollTags } from "@/components/SocialSection/SocialSection";


export default function Home() {
  return (
    <main>
      <NavigationWrapper />
      <div className="relative h-[100vh]">
        <HeroSection />
        <SocialSection />
      </div>
      <ProjectSection />
      <InfiniteScrollTags />
      <AboutMe />
      <ContactUs />
      <Footer />
    </main>
  );
}



















