import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - TypeMarket",
  description: "Insights, tutorials, and updates from the TypeMarket team about TypeScript, Next.js, and web development.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
