import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - TypeMarket",
  description: "View your TypeMarket profile, listings, and account settings.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
