import React from "react";
import {
  Eye,
  Heart,
  PlayCircle,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { Heading, Text } from "../designSystem/DesignSytem";

type Stat = {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  {
    label: "Subscribers",
    value: "685K+",
    description:
      "A thriving community of developers and tech enthusiasts following every update.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Monthly Views",
    value: "4.8M",
    description:
      "Consistent monthly reach across tutorials, reviews, and educational content.",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    label: "Average Video Views",
    value: "180K",
    description:
      "Each upload attracts a highly engaged audience looking for trusted recommendations.",
    icon: <PlayCircle className="w-5 h-5" />,
  },
  {
    label: "Engagement Rate",
    value: "7.2%",
    description:
      "Strong audience interaction through likes, comments, and shares.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    label: "Videos Published",
    value: "540+",
    description:
      "Hundreds of high-quality educational videos published consistently.",
    icon: <Video className="w-5 h-5" />,
  },
  {
    label: "Audience Trust Score",
    value: "96%",
    description:
      "Built through authentic content, transparency, and long-term community trust.",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
];

const StatsSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Heading */}
        <div className="mb-16 text-center">
           <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Numbers That Sponsors Care About
          </h1>
          <p className="text-lg text-zinc-600">
              Quick Statistics
          </p>
        </div>

        {/* Existing Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group p-8 rounded-2xl relative overflow-hidden bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors"
            >
              <article className="relative z-10">
                <div className="size-8 rounded-lg bg-white group-hover:bg-zinc-900 border border-zinc-200 flex items-center justify-center text-lg font-bold text-zinc-900 mb-6 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <Text as={"h3"} variant={"label"} className="group-hover:text-zinc-100 text-zinc-400 mb-2">
                  {stat.label}
                </Text>
                <Heading as={"h2"} variant={"title"} className="font-semibold group-hover:text-white text-zinc-900 mb-4 ">
                  {stat.value}
                </Heading>
                <Text variant={"description"} className=" group-hover:text-zinc-100 text-zinc-500">
                  {stat.description}
                </Text>
              </article>
              <img
                src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="supportive img"
                className="absolute top-0 left-0 w-full object-fill opacity-0 group-hover:opacity-100 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
