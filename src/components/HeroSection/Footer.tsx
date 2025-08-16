'use client';
import { motion, animate } from "motion/react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    const controls = animate(window.scrollY, 0, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (value) => window.scrollTo(0, value),
    });
    return () => controls.stop();
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center justify-center gap-4 border-t border-white/10 py-10 bg-black text-white"
    >
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-6 bottom-6 md:right-10 md:bottom-10 bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-colors"
        aria-label="Back to Top"
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
