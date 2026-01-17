export const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
} as const;


export const data = [
  {
    id: "1",
    title: "Create reusable React component",
    description:
      "Build a reusable component using props, default values, and proper TypeScript types.",
    status: STATUS.TODO,
  },
  {
    id: "2",
    title: "Practice DSA problems",
    description:
      "Solve medium-level DSA questions focusing on arrays and binary search.",
    status: STATUS.IN_PROGRESS,
  },
  {
    id: "3",
    title: "Build chat application UI",
    description:
      "Design chat UI with message bubbles, timestamps, and user alignment.",
    status: STATUS.TODO,
  },
  {
    id: "4",
    title: "Develop landing page",
    description:
      "Create a responsive landing page with hero section, features, and call-to-action.",
    status: STATUS.COMPLETED,
  },
  {
    id: "5",
    title: "Complete workout session",
    description:
      "Finish a full workout session focusing on strength training and consistency.",
    status: STATUS.COMPLETED,
  },
];
