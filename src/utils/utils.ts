export const skills = [
  { name: 'HTML', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: "ReactJs", logo: "https://assets.chanhdai.com/images/tech-stack-icons/react.svg" },
  { name: "FIgma", logo: "https://assets.chanhdai.com/images/tech-stack-icons/figma.svg" },
  { name: "Docker", logo: "https://assets.chanhdai.com/images/tech-stack-icons/docker.svg" },
  { name: "Shadcn", logo: "https://assets.chanhdai.com/images/tech-stack-icons/shadcn-ui-dark.svg" },
  { name: "TailwindCss", logo: "https://assets.chanhdai.com/images/tech-stack-icons/tailwindcss.svg" },
  { name: 'MySql', logo: 'https://assets.chanhdai.com/images/tech-stack-icons/mysql.svg' },
  { name: 'NextJS', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
  { name: 'Framer Motion', logo: 'https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png' },
  { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux/764ABC' },
  { name: 'React Query', logo: 'https://cdn.simpleicons.org/reactquery/FF4154' },
  { name: 'NodeJS', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: "Git", logo: "https://assets.chanhdai.com/images/tech-stack-icons/git.svg" },

  ,
];

export const socials = [
  {
    href: "mailto:kumarazad2917@gmail.com",
    icon: "/gmail.svg",
    alt: "Gmail",
    username: "kumarazad2917@gmail.com",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/azadkumar93108/",
    icon: "https://assets.chanhdai.com/images/link-icons/liquid-glass/linkedin.webp",
    alt: "LinkedIn",
    username: "azadkumar93108",
    external: true,
  },
  {
    href: "https://github.com/AzadTom?tab=repositories",
    icon: "https://assets.chanhdai.com/images/link-icons/liquid-glass/github.webp",
    alt: "GitHub",
    username: "AzadTom",
    external: true,
  },
  {
    href: "https://x.com/Azadtom2917",
    icon: "https://assets.chanhdai.com/images/link-icons/liquid-glass/x.webp",
    alt: "Twitter/X",
    username: "@Azadtom2917",
    external: true,
  },
];


export const tags = [
  "Frontend",
  "Accessibility",
  "User-Friendly",
  "Responsive Design",
  "Mobile-First",
  "Performance",
  "UI/UX",
  "SEO Optimized",
  "Dark Mode",
];



export const webContent = [
  {
    img: "/img/foodlux.png",
    name: "Foodlux",
    github: "https://github.com/AzadTom/FoodLux",
    live: "https://foodlux.netlify.app/",
  },
  {
    img: "/img/whiteboard.png",
    name: "WhiteBoard",
    github: "https://github.com/AzadTom/WhiteBoard-FrontEnd",
    live: "https://white-board-front-end.vercel.app/",
  },
  {
    img: "/img/gymrecord.jpeg",
    name: "GymRecord",
    live: "https://gymrecord.vercel.app/",
    github: "https://github.com/AzadTom/GYMRecord",
  },
  {
    img: "/img/luxeNust-img.png",
    name: "LuxeNest website",
    github: "https://github.com/AzadTom/RealState-React",
    live: "https://luxenest.netlify.app/",
  },
  {
    img: "/img/notes.png",
    name: "Collabrative Notes",
    github: "https://github.com/AzadTom/NoteTaking-Frontend",
    live: "https://colabrationnotes.netlify.app/",
  },
  {
    img: "/img/ecommerceb.png",
    name: "Ecommerce Webapplication",
    github: "https://github.com/AzadTom/REACT-ECOMMERCE",
    live: "https://boldx.netlify.app/",
  },
  {
    img: "/img/expenses.png",
    name: "Expense website",
    github: "https://github.com/AzadTom/ExpenseTracker",
    live: "https://maintainexpense.netlify.app/",
  },
  {
    img: "/img/neetflix.png",
    name: "Neetflix website",
    github: "https://github.com/AzadTom?tab=repositories",
    live: "https://neetflixo.netlify.app/",
  },
];

export type TListItemType = {
  id:number,
  type:"component" | "blog",
  name:string,
  img:string,
  date:Date,
  link:string,
}

const blogs_components_list:TListItemType[] = [
  {
    id:101,
    type:"component",
    name:"Stepper Component",
    img:"/blog_components/stepper_component_img.png",
    date:new Date("2025-10-05"),
    link:"/work/stepper-component/101",
  },
  {
    id:102,
    type:"component",
    name:"Loader Component",
    img:"/blog_components/loader_component_img.png",
    date:new Date("2025-10-02"),
    link:"/work/loader-component/102",
  },
  {
    id:103,
    type:"component",
    name:"ChatGptInput Component",
    img:"/blog_components/chatgpt_input_img.png",
    date:new Date("2025-09-30"),
    link:"/work/chatgpt-inputcomponent/103",
  },
  {
    id:104,
    type:"blog",
    name:"Space ~ > + in CSS",
    img:"/blog_components/blog_css_selector_img.png",
    date:new Date("2023-11-22"),
    link:"https://medium.com/@kumarazad2917/space-in-css-d37b632bb076"
  },
  {
    id:105,
    type:"component",
    name:"Enter animation & Button interaction",
    date:new Date("2025-12-07"),
    img:"/blog_components/enter-animation-and-buttoninteraction.png",
    link:"/work/enter-animation/104"
  },
  {
    id:106,
    type:"component",
    date:new Date("2025-12-07"),
    img:"/blog_components/clip_path_gradient_border_animation.png",
    link:"/work/craft",
    name:"Clip Path & Gradient border",
  }
];

export const getOnlyComponents = () => {
  return blogs_components_list
    .filter(item => item.type === "component")
    .sort((a:any, b:any) => b.date - a.date);
};


export const getOnlyBlogs = ()=>{
  return blogs_components_list.filter((item)=> item.type === "blog").sort((a:any,b:any)=> b.date -a.date);
}

