"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Inquiry",
    description: "Tell us about your campaign goals.",
  },
  {
    number: "02",
    title: "Discovery Call",
    description: "Align on objectives and expectations.",
  },
  {
    number: "03",
    title: "Campaign Planning",
    description: "Build the strategy and timeline.",
  },
  {
    number: "04",
    title: "Content Production",
    description: "Create content tailored to your brand.",
  },
  {
    number: "05",
    title: "Brand Review",
    description: "Review and approve deliverables.",
  },
  {
    number: "06",
    title: "Publishing",
    description: "Launch across selected platforms.",
  },
  {
    number: "07",
    title: "Performance Report",
    description: "Measure results and share insights.",
  },
];

const ProcessSection = () => {
  return (
    <>
      <Example1 />
      <Example2 />
    </>
  );
};

export default ProcessSection;

const Example1 = () => {
  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="px-4 max-w-7xl mx-auto sm:px-0">
        {/* Heading */}

        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mt-3 text-zinc-950">
            Campaign Process
          </h2>
        </div>

        {/* ================= Desktop ================= */}

        <div className="hidden lg:block relative">
          {/* Timeline */}

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="absolute top-[70px] left-0 w-full h-[2px] bg-neutral-700 origin-left"
          />

          <div className="grid grid-cols-7 gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.12,
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-xs tracking-[0.35em] text-zinc-500 mb-8">
                  {step.number}
                </p>

                <div className="relative flex justify-center mb-10">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="w-14 h-14 rounded-full border border-zinc-500 bg-[#111] text-white flex items-center justify-center z-10"
                  >
                    <Check size={18} />
                  </motion.div>
                </div>

                <h3 className="font-semibold text-lg mb-3 text-zinc-900">{step.title}</h3>

                <p className="text-sm leading-6 text-zinc-500 font-thin">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= Mobile ================= */}

        <div className="lg:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-zinc-500 flex items-center justify-center bg-[#111] text-white">
                  <Check size={16} />
                </div>

                {index !== steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-neutral-700 my-2" />
                )}
              </div>

              <div className="pb-10">
                <p className="text-xs tracking-[0.35em] text-zinc-500 mb-2">
                  {step.number}
                </p>

                <h3 className="text-lg font-semibold mb-2 text-zinc-900">{step.title}</h3>

                <p className="text-sm text-zinc-500 leading-6">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Example2() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-10 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mt-3 text-zinc-950">
            Campaign Process
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[650px] border border-zinc-900   p-5 rounded-xl">
            {/* Header */}
            <div className="grid grid-cols-[70px_220px_1fr] border-b border-zinc-800 pb-4 text-xs md:text-sm uppercase tracking-wider text-zinc-900">
              <div>Step</div>
              <div>Title</div>
              <div>Description</div>
            </div>

            {/* Rows */}

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,.03)",
                }}
                className="grid grid-cols-[70px_250px_1fr] border-b border-zinc-800 py-6 md:py-8 transition-colors"
              >
                <div className="text-lg md:text-2xl font-light text-zinc-500">
                  {step.number}
                </div>

                <div className="font-medium text-base md:text-xl uppercase text-zinc-900">
                  {step.title}
                </div>

                <div className="text-sm md:text-base leading-6 text-zinc-500 font-light">
                  {step.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
