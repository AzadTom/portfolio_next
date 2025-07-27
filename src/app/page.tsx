import ContactUs from "@/components/Form/ContactUs";
import HeroSection from "@/components/HeroSection/HeroSection";
import NavigationWrapper from "@/components/NavigationDrawer/NavigationWrapper";
import SocialSection from "@/components/SocialSection/SocialSection";


export default function Home() {
  return (
    <main>
      <NavigationWrapper />
      <div className="relative h-[100vh]">
         <HeroSection />
         <SocialSection/>
      </div>
      <div>
        <ContactUs/>
      </div>
    </main>
  );
}



















