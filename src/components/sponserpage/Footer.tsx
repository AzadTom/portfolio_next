"use client";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import React, { type FormEvent, useRef, useState, useEffect } from "react";

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const ref = useRef(null);
  const isInView = useInView(ref);

  const variants = {
    visible: (i: any) => ({
      translateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i * 0.03,
      },
    }),

    hidden: { translateY: 200 },
  };

  useEffect(() => {
    if (formState === "success") {
      const timer = setTimeout(() => {
        setFormState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  const handleNewsLetterData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setFormState("submitting");
    console.log("Subscribing with email:", email);

    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section>
      <div className="relative h-full sm:pt-14 pt-8 text-white bg-zinc-950" ref={container}>
        <div className="sm:container  px-4 mx-auto">
          <div className="md:flex justify-between w-full">
            <div>
              <h1 className="md:text-4xl text-2xl font-semibold">
                Let&lsquo;s do great work together
              </h1>
              <div className="pt-2 pb-6 md:w-99  ">
                <p className="md:text-2xl text-xl  py-4">
                  Sign up for our newsletter*
                </p>
                <div className=" hover-button relative bg-black flex justify-between items-center border-2 overflow-hidden  border-black rounded-full  text-white hover:text-black md:text-2xl">
                  <form
                    onSubmit={handleNewsLetterData}
                    className="relative z-2 grid grid-cols-6 w-full h-full"
                  >
                    <input
                      type="email"
                      name="newsletter_email"
                      className="border-none text-white bg-zinc-900  py-3 px-6  col-span-5"
                      placeholder="Your Email * "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={formState === "submitting"}
                    />
                    <button
                      type="submit"
                      className="cursor-pointer w-full hover:bg-primaryColor bg-white text-black h-full cols-span-1 disabled:opacity-50"
                      disabled={formState === "submitting"}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        className="w-full h-[80%] "
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="#000"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
                {formState === "success" && (
                  <p className="text-green-400 mt-2 text-sm">
                    Thanks for subscribing!
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-10">
              <ul>
                <li className="text-2xl pb-2 text-foreground font-semibold">
                  SITEMAP
                </li>
                <li className="text-xl font-medium">
                  <Link href="/">Home</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/about">About us</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/services">Our Services</Link>
                </li>

                <li className="text-xl font-medium">
                  <Link href="/projects">Projects</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/contact-us">Contact</Link>
                </li>
              </ul>
              <ul>
                <li className="text-2xl pb-2 text-foreground font-semibold">
                  SOCIAL
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.linkedin.com/company/next-codez/"
                    target="_blank"
                    className="underline"
                    rel="noreferrer noopener"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://twitter.com/NextCodez"
                    target="_blank"
                    className="underline"
                    rel="noreferrer noopener"
                  >
                    Twitter
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.instagram.com/nextcodez/"
                    target="_blank"
                    className="underline"
                    rel="noreferrer noopener"
                  >
                    Instagram
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.facebook.com/nextcodezz"
                    target="_blank"
                    className="underline"
                    rel="noreferrer noopener"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-b-2 md:py-4 border-border my-5">
          </div>
          <div className="flex md:flex-row flex-col-reverse gap-3 justify-between py-2">
            <span className="font-medium">
              &copy; {new Date().getFullYear()} NextCodez. All Rights Reserved.
            </span>
            <a href="#" className="font-semibold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
