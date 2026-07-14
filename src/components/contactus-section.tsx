"use client";

import { motion,Variants} from "motion/react";

const fields = [
  { label: "What would you like to discuss?", type: "text" },
  { label: "Estimated Budget", type: "text" },
  { label: "How did you hear about me?", type: "text" },
  { label: "Full Name", type: "text" },
  { label: "Company (Optional)", type: "text" },
  { label: "Email Address", type: "email" },
];

const container:Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item:Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-neutral-300 pt-8 lg:pt-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="text-5xl font-light tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl">
              Contact
            </h2>

            <div className="flex flex-wrap gap-5 sm:gap-8 text-sm uppercase tracking-[0.18em] text-neutral-500">
              {["Facebook", "Instagram", "LinkedIn"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="border-b border-neutral-300 pb-1 transition-all duration-300 hover:border-black hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-16 md:grid-cols-2 lg:mt-20"
        >
          {fields.map((field) => (
            <motion.div
              key={field.label}
              variants={item}
              className="relative"
            >
              <input
                type={field.type}
                placeholder=" "
                className="peer w-full border-0 border-b border-neutral-300 bg-transparent py-4 text-base text-neutral-900 outline-none transition-all duration-300 focus:border-black sm:text-lg"
              />

              <label className="pointer-events-none absolute left-0 top-4 origin-left text-neutral-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:scale-75">
                {field.label}
              </label>
            </motion.div>
          ))}

          {/* Message */}
          <motion.div variants={item} className="md:col-span-2">
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full resize-none border-0 border-b border-neutral-300 bg-transparent py-4 text-base text-neutral-900 outline-none transition-all duration-300 focus:border-black sm:text-lg"
            />
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={item}
            className="md:col-span-2 mt-4 flex flex-col gap-8 border-t border-neutral-300 pt-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="space-y-4 text-sm text-neutral-600">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-400 accent-black"
                />
                <span>
                  I agree to the processing of my personal data.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-400 accent-black"
                />
                <span>Subscribe to the newsletter.</span>
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="w-full rounded-full border border-neutral-900 px-10 py-4 text-sm font-medium uppercase tracking-[0.18em] text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white sm:w-auto sm:min-w-[220px]"
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}