import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Item - TypeMarket",
  description: "List your product or service on TypeMarket marketplace.",
};

export default function AddItemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
