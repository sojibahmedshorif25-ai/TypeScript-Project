import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Center - TypeMarket",
  description: "Get help and support for TypeMarket. Find answers to common questions and contact our support team.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
