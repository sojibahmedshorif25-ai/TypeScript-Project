import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - TypeMarket",
  description: "TypeMarket terms of service - the terms and conditions for using our marketplace platform.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
