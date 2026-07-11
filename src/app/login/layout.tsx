import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - TypeMarket",
  description: "Sign in to your TypeMarket account to manage listings and explore items.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
