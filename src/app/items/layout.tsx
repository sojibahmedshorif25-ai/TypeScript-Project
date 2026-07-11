import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Items - TypeMarket",
  description: "Browse and discover amazing products and services listed on TypeMarket marketplace.",
};

export default function ItemsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
