import { Button } from "../ui/button";
import NavBar from "./NavBar";
import StatsSection from "./StatsSection";
import TestimonialSection from "./Testimonial/TestimonialSection";
import FaqSection from "./FaqSection";
import FooterSectionComponent from "./Footer";
import ProcessSection from "./ProcessSection";
import { Badge } from "../ui/badge";
import Link from "next/link";

const SponserPage = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <TestimonialSection />
      <ProcessSection />
      <FaqSection />
      <FooterSectionComponent />
    </main>
  );
};

export default SponserPage;

const HeroSection = () => {
  return (
    <>
      <NavBar className="bg-white py-4 px-4" />
      <section className="bg-white flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24">
        {/* Hero Content */}
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-muted flex items-center gap-2.5 rounded-full border px-2 py-1 text-sm">
            <Badge className="bg-zinc-900 text-white">AI-Powered</Badge>
            <span className="text-muted-foreground">
              Solution for client-facing businesses
            </span>
          </div>

          <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
            Reach Millions Through
            <br />
            <span className="relative">
              Trusted
              <svg
                width="223"
                height="12"
                viewBox="0 0 223 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden"
              >
                <path
                  d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                  stroke="url(#paint0_linear_10365_68643)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_10365_68643"
                    x1="18.8541"
                    y1="3.72033"
                    x2="42.6487"
                    y2="66.6308"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--primary)" />
                    <stop offset="1" stopColor="var(--primary-foreground)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            Tech!
          </h1>

          <p className="text-muted-foreground">
            Authentic reviews, comparisons, and hands-on demos that help
            audiences buy with confidence. <br /> Partner on campaigns that
            build trust and drive measurable results.
          </p>

          <Link
            href="#contact"
            className="bg-gradient-to-b text-base from-blue-500 to-blue-900 rounded-md px-4 py-2 text-white transition-all duration-300 hover:-translate-y-1"
          >
            {`
          Book a Call`}
          </Link>
        </div>

        {/* Image */}
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-19.png"
          alt="Dishes"
          className="min-h-67 w-full object-cover"
        />
      </section>
    </>
  );
};
