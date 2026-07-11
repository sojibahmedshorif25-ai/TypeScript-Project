import Link from "next/link";
import { Mail, MapPin, Phone, Globe, MessageCircle, Code, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <span className="text-xl font-bold text-white">TypeMarket</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your premier marketplace for quality products and services. Built with TypeScript and Next.js.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: MessageCircle, url: "https://facebook.com", label: "Facebook" },
                { icon: Globe, url: "https://twitter.com", label: "Twitter" },
                { icon: Code, url: "https://github.com", label: "GitHub" },
                { icon: Share2, url: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/items", label: "Explore" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/blog", label: "Blog" },
                { href: "/support", label: "Support" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3">
              {["electronics", "fashion", "food", "health", "education"].map((cat) => (
                <li key={cat}>
                  <Link href={`/items?category=${cat}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors capitalize flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              {[
                { icon: Mail, text: "support@typemarket.com" },
                { icon: MapPin, text: "Dhaka, Bangladesh" },
                { icon: Phone, text: "+880 1700-000000" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-400">
                  <Icon className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TypeMarket. All rights reserved. Built with
            <span className="text-blue-400"> TypeScript</span> &amp;
            <span className="text-indigo-400"> Next.js</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
