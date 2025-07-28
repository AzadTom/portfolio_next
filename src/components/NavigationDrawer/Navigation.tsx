import * as React from "react";
import { motion } from "motion/react";
import { GetRedirectIcon } from "@/icon/GetRedirectionIcon";

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
  name: "About",
  link: "/about",
},
{
  id: 2,
  name: "Services",
  link: "/services",
}, {
  id: 3,
  name: "Works",
  link: "/works"
},
{
  id: 4,
  name: "Contact Us",
  link: "/contact-us"
}
];



export const Navigation = () => (

  <motion.ul variants={variantsNavigation} className="absolute  top-[100px] left-4 outfilt-700">
    {links.map((item: LinkType) => (
      <MenuItem item={item} key={item.id} />
    ))}
  </motion.ul>
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


export const MenuItem = ({ item }: { item: LinkType }) => {


  return (
    <motion.li
      variants={variantsMenuItem}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-placeholder text-black ml-4 text-4xl sm:text-6xl font-bold my-4">
        <a className="flex gap-1 items-end hover:border-b hover:border-black " href={item.link}>{item.name} <GetRedirectIcon color="#000000" /></a>
      </div>
    </motion.li>
  );
};

