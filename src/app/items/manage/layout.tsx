import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Items - TypeMarket",
  description: "View, edit, and manage your listings on TypeMarket.",
};

export default function ManageItemsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
