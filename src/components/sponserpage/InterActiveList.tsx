"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

const data = [
  {
    id: 1,
    title: "UI Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 2,
    title: "Web Apps",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },
  {
    id: 3,
    title: "Dashboards",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 4,
    title: "Animations",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 5,
    title: "Branding",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];


export type InteractiveListItem = {
  id: string | number;
  title: string;
  image: string;
  href?: string;
};

type InteractiveListSectionProps = {
  items?: InteractiveListItem[];
  className?: string;
};

function InteractiveItem({ item }: { item: InteractiveListItem }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 300,
    damping: 25,
  });

  const smoothY = useSpring(y, {
    stiffness: 300,
    damping: 25,
  });

  return (
    <motion.a
      ref={ref}
      href={item.href ?? "#"}
      className="group relative block overflow-visible border-y border-transparent py-3 text-[clamp(3rem,8vw,8rem)] font-light text-white/30 transition-colors duration-300 hover:border-white hover:text-white"
      onMouseMove={(e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
    >
      <span className="relative z-20">{item.title}</span>

      <motion.img
        src={item.image}
        alt={item.title}
        style={{
          left: smoothX,
          top: smoothY,
        }}
        initial={false}
        className="pointer-events-none absolute z-10 w-[min(40vw,450px)] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-xl object-cover opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
      />
    </motion.a>
  );
}

export default function InteractiveListSection({
  items = data,
  className,
}: InteractiveListSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const translateY = useMotionValue(0);

  const smoothY = useSpring(translateY, {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      className={`overflow-hidden bg-black ${className ?? ""}`}
      onMouseMove={(e) => {
        if (!containerRef.current) return;

        const percent = e.clientY / window.innerHeight;

        translateY.set(
          -(percent * containerRef.current.scrollHeight * 0.4)
        );
      }}
    >
      <motion.div
        ref={containerRef}
        style={{ y: smoothY }}
        className="flex flex-col px-6 py-20 md:px-16"
      >
        {items.map((item) => (
          <InteractiveItem key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  );
}