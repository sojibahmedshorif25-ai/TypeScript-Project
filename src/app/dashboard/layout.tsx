import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - TypeMarket",
  description: "Platform analytics and management dashboard.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
