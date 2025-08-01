import { motion } from "motion/react";
import { GetRedirectIcon } from "@/icon/GetRedirectionIcon";
import Image from "next/image";
import Link from "next/link";

const variantsNavigation = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.5 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

type LinkType = {
  id: number;
  name: string;
  link: string;
}

const links: LinkType[] = [{
  id: 0,
  name: "Home",
  link: "/",
}, {
  id: 1,
  name: "About Me",
  link: "#about-me",
}, {
  id: 3,
  name: "Works",
  link: "#works"
},
{
  id: 4,
  name: "Contact Me",
  link: "#contact-me"
}];



export const Navigation = ({toggle}:{toggle:()=>void}) => (

  <>
    <motion.ul variants={variantsNavigation} className="absolute  top-[100px] right-4 left-4 sm:left-12 sm:right-12 outfilt-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {links.map((item: LinkType) => (
        <MenuItem item={item} key={item.id} toggle={toggle} />
      ))}
      <motion.li
        variants={variantsMenuItem}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-full bg-zinc-900 bg-opacity-60 border text-white p-4 rounded-2xl border-zinc-700 backdrop-blur-md shadow-2xl transition-all duration-500">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight capitalize flex gap-4 my-2 mx-4 justify-between items-center">
            {socials.map((item) => (
              <a href={item.href} key={item.alt}>
                <Image src={item.icon} alt={item.alt} width={24} height={24} className="w-full h-full" />
              </a>
            ))}
          </h2>
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
            <span className="text-lg text-white/70 font-medium"></span>
            <GetRedirectIcon color="white" />
          </div>
        </div>
      </motion.li>
    </motion.ul>
  </>
);




const variantsMenuItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};


export const MenuItem = ({ item,toggle }: { item: LinkType,toggle:()=>void}) => {


  return (
    <motion.li
      variants={variantsMenuItem}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-full bg-zinc-900 bg-opacity-60 border text-white p-4 rounded-2xl border-zinc-700 backdrop-blur-md shadow-2xl transition-all duration-500">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight capitalize mb-2">
          {item.name}
        </h2>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
          <span className="text-lg text-white/70 font-medium">Explore more</span>
          <Link
            href={item.link}
            onClick={toggle}
            className="flex items-center gap-2 text-white text-xl font-semibold hover:translate-x-1 transition-transform duration-300"
          >
            Visit <GetRedirectIcon color="white" />
          </Link>
        </div>

      </div>
    </motion.li>
  );
};



const socials = [
  {
    href: "mailto:kumarazad2917@gmail.com",
    icon: "/gmail.svg",
    alt: "Gmail",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/azadkumar93108/",
    icon: "/linkedin.svg",
    alt: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/AzadTom?tab=repositories",
    icon: "/github_white.svg",
    alt: "GitHub",
    external: true,
  },
  {
    href: "https://x.com/Azadtom2917",
    icon: "/x_white.svg",
    alt: "Twitter/X",
    external: true,
  },
];


