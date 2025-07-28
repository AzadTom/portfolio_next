'use client';
import { motion, animate } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    const controls = animate(window.scrollY, 0, {
      duration: 1.6,
      ease: [0.25, 0.1, 0.25, 1], // easeInOut
      onUpdate: (value) => window.scrollTo(0, value),
    });

    return () => controls.stop();
  };

  return (
    <footer className="relative flex flex-col items-center justify-center gap-3 border-t border-white/10 py-10 bg-black text-white outfit-500">
      <p className="text-xs text-white/40 tracking-widest uppercase">Since 2025</p>

      <p className="text-4xl font-bold">@azadtom</p>

      <p className="text-center text-white/60 max-w-xl px-6 text-base leading-relaxed">
        Thank you for stopping by. This space is a reflection of passion and purpose—
        designed to inspire, connect, and grow. You&apos;re always welcome here.
      </p>

      <p className="text-xs text-white/30 mt-6">© {new Date().getFullYear()} AzadTom. All rights reserved.</p>

      {/* Back to Top Button with float + animated scroll */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -6, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-6 bottom-6 md:right-10 md:bottom-10 bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-colors duration-200"
        aria-label="Back to Top"
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </motion.button>
    </footer>
  );
};

export default Footer;
