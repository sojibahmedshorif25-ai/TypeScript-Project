import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TypeMarket",
  description: "TypeMarket privacy policy - learn how we protect and handle your personal information.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
