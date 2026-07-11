import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - TypeMarket",
  description:
    "Learn about TypeMarket's story, mission, and team. We are building the premier TypeScript-powered marketplace.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
