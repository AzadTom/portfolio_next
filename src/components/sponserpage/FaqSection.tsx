"use client";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headingVariants, textVariants } from "../designSytem/DesignSytem";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What types of sponsorships do you offer?",
    answer:
      "I collaborate on dedicated reviews, product launches, integrations, giveaways, event coverage, and long-term brand partnerships tailored to your campaign goals.",
  },
  {
    question: "Who is your audience?",
    answer:
      "My audience consists primarily of technology enthusiasts, students, developers, and professionals interested in smartphones, laptops, software, AI, and productivity tools.",
  },
  {
    question: "How long does a sponsored campaign take?",
    answer:
      "Most campaigns are completed within 1–3 weeks depending on content complexity, review period, and publishing schedule.",
  },
  {
    question: "Do you provide campaign analytics?",
    answer:
      "Yes. After publication you'll receive a detailed performance report including views, watch time, engagement, CTR (if applicable), and audience demographics.",
  },
  {
    question: "Can brands review content before publishing?",
    answer:
      "Yes. Brands receive one review round for factual accuracy while preserving the authenticity of the content.",
  },
  {
    question: "How can we get started?",
    answer:
      "Simply submit the sponsorship inquiry form. I'll review your campaign requirements and respond within 24–48 hours.",
  },
];

function FaqItem({ question, answer }: FAQ) {
  return (
    <AccordionItem value={question} className="border-b border-b-zinc-900">
      <AccordionTrigger className="py-6 text-left capitalize text-base font-medium hover:no-underline">
        {question}
      </AccordionTrigger>

      <AccordionContent className="pb-6 text-basefont-thin text-zinc-500">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 lg:grid-cols-[440px_1fr]">
          {/* Left */}
          <div className="lg:sticky lg:top-28 h-fit">
            <span className="text-lg font-medium">
              FAQ
            </span>

            <h2 className="text-4xl font-bold mt-4">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-base text-zinc-500 font-thin">
              Everything you need to know about sponsorships, collaborations,
              timelines, and campaign delivery.
            </p>

            <Button variant={"outline"} className="mt-8 rounded-full">
              Reach Out
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right */}
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl border border-zinc-900 bg-background px-6 lg:px-10"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}