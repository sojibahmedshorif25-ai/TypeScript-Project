import Link from "next/link";
import { Mail, MessageCircle, BookOpen, Shield, HelpCircle, FileText } from "lucide-react";

const supportOptions = [
  {
    title: "FAQ",
    description: "Find answers to commonly asked questions about using TypeMarket.",
    icon: HelpCircle,
    link: "/#faq",
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Contact Support",
    description: "Get in touch with our support team for personalized assistance.",
    icon: Mail,
    link: "/contact",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    title: "Documentation",
    description: "Read our guides and documentation for detailed platform information.",
    icon: BookOpen,
    link: "/blog",
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Privacy Policy",
    description: "Learn how we handle and protect your personal information.",
    icon: Shield,
    link: "/privacy",
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Terms of Service",
    description: "Review the terms and conditions for using TypeMarket.",
    icon: FileText,
    link: "/terms",
    color: "text-orange-600 bg-orange-100",
  },
  {
    title: "Community",
    description: "Join our community forums to connect with other users.",
    icon: MessageCircle,
    link: "#",
    color: "text-teal-600 bg-teal-100",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We are here to help. Find answers, contact support, or explore our resources.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {supportOptions.map((option) => (
              <Link
                key={option.title}
                href={option.link}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${option.color}`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </Link>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Contact Us
              </Link>
              <a
                href="mailto:support@typemarket.com"
                className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
