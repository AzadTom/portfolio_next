import type { Metadata } from "next";

import { LearningDashboard } from "@/components/learning/learning-dashboard";

export const metadata: Metadata = {
  title: "Learning Tracker | Work",
  description: "A web port of the Expo/React Native learning tracker dashboard.",
};

export default function LearningPage() {
  return <LearningDashboard />;
}

