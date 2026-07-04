"use client";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import { headingVariants, textVariants } from "../../designSytem/DesignSytem";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200&q=80",
    company: "Apple",
    title: "Venom Tech helped us launch our latest MacBook campaign.",
    description:
      "The sponsored video reached over 2.5M viewers with exceptional engagement and generated one of our highest CTR campaigns.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    company: "Samsung",
    title: "A successful collaboration reaching millions of tech buyers.",
    description:
      "Professional communication, authentic reviews and outstanding audience trust delivered measurable campaign results.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    company: "Nothing",
    title: "Our smartphone launch reached the right audience.",
    description:
      "The campaign generated thousands of clicks and excellent product awareness within the first week.",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-[#f8f8fb] py-24">
      <div>
        <h2 className={cn(headingVariants({variant:"title"}),"text-center")}>Testimonials</h2>
        <p className={cn(headingVariants({variant:"subtitle"}), "text-center mb-8")}>Proven Brand Partnerships</p>
      </div>
      <div className="mx-4 md:mx-0">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={40}
          slidesPerView={1.2}
          centeredSlides
          loop
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1.35,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button className="prev-btn flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm transition hover:bg-slate-50">
            <ChevronLeft size={28} />
          </button>

          <div className="custom-pagination !relative !bottom-0 !w-auto" />

          <button className="next-btn flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm transition hover:bg-slate-50">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = ({ item }: { item: (typeof testimonials)[0] }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
      <div className="flex flex-col  md:flex-row ">
        <div className="relative min-h-64 flex-1">
          <Image
            src={item.image}
            alt={item.company}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
          <p className={cn(headingVariants({variant:"subtitle"}))}>{item.company}</p>

          <h2 className={cn(headingVariants({variant:"title"}), "mt-2")}>
            {item.title}
          </h2>

          <p className={cn(textVariants({variant:"description"}),"mt-8 text-black/50")}>
            {item.description}
          </p>

          <button className="mt-10 cursor-pointer flex w-fit items-center gap-3 rounded-full border border-slate-300 px-6 py-4 text-base font-medium transition hover:bg-slate-900 hover:text-white">
            Read More
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
