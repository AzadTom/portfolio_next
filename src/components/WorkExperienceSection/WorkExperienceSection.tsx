import type { ExperienceItemType } from "@/components/WorkExperienceSection/work-experience";
import { WorkExperience } from "@/components/WorkExperienceSection/work-experience";

const WORK_EXPERIENCE1: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "Paretune",
    companyLogo: "https://www.parentune.com/react/assets/default/logo.png",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Frontend Developer",
        employmentPeriod: "03.2024 — present",
        employmentType: "Full-time",
        icon: "code",
        description: ``,
        skills: [
          "ReactJS",
          "TailwindCss",
          "Responsive design",
          "NextJS",
          "Redux",
          "React Query",
          "Framer motion",
          "Docker",
          "Git",
          "Github"
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
];

const WORK_EXPERIENCE2: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "GeeksForGeeks",
    companyLogo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Trainne-(MERN)",
        employmentPeriod: "12.2024 — 02-2025",
        employmentType: "Trainne",
        icon: "code",
        description:``,
        skills: [
          "ReactJS",
          "TailwindCss",
          "Responsive design",
          "Redux",
          "NodeJS",
          "ExpressJS",
          "MongoDB",
          "Postman",
          "Git",
          "Github"
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
];



const WORK_EXPERIENCE3: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "GeeksForGeeks",
    companyLogo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Trainne-(MERN)",
        employmentPeriod: "12.2024 — 02-2025",
        employmentType: "Trainne",
        icon: "code",
        description: `- Integrated VNPAY-QR for secure transactions.
- Registered the e-commerce site with [online.gov.vn](https://online.gov.vn) for compliance.
- Developed online ordering to streamline purchases.
- Build and maintain ZaDark.com with Docusaurus, integrating AdSense.
- Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox — with 15,000+ active users via Chrome Web Store.`,
        skills: [
          "ReactJS",
          "TailwindCss",
          "Responsive design",
          "Redux",
          "NodeJS",
          "ExpressJS",
          "MongoDB",
          "Postman",
          "Git",
          "Github"
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
];

export function WorkExperienceSection() {
  return (
    <>
      <h2  className="text-3xl font-semibold text-white outfit-600 max-w-[1000px] mx-auto px-4">Experience</h2>
      <WorkExperience
        className="max-w-[1000px] mx-auto rounded-lg outfit-400 text-white"
        experiences={WORK_EXPERIENCE1}
      />
      <WorkExperience
        className="max-w-[1000px] mx-auto rounded-lg outfit-400 text-white"
        experiences={WORK_EXPERIENCE2}
      />
    </>
  );
}
