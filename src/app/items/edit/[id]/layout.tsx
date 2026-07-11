import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Item - TypeMarket",
  description: "Edit your listing on TypeMarket marketplace.",
};

export default function EditItemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
