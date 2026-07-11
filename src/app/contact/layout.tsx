import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - TypeMarket",
  description: "Get in touch with the TypeMarket team. We are here to help with any questions or feedback.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
