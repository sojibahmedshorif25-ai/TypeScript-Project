"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthContext";
import Card from "@/components/Card";
import CardSkeleton from "@/components/CardSkeleton";
import { useItems } from "@/hooks/useItems";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp, Users, Package, Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const chartData = [
  { name: "Electronics", value: 245 },
  { name: "Fashion", value: 189 },
  { name: "Food", value: 156 },
  { name: "Health", value: 98 },
  { name: "Education", value: 134 },
  { name: "Services", value: 212 },
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Software Engineer",
    content: "TypeMarket made it incredibly easy to find quality services. The TypeScript integration is seamless!",
    rating: 5,
  },
  {
    name: "Rafiq Hasan",
    role: "Business Owner",
    content: "I've listed my products here and the response has been amazing. Highly recommended for any business.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Freelancer",
    content: "The filtering and search features are top-notch. Found exactly what I needed in minutes.",
    rating: 4,
  },
];

const stats = [
  { label: "Active Users", value: "12,500+" },
  { label: "Listings", value: "8,200+" },
  { label: "Transactions", value: "45,000+" },
  { label: "Countries", value: "50+" },
];

const faqs = [
  { q: "How do I list an item?", a: "Sign up for an account, navigate to 'Add Item' and fill out the form with your product details." },
  { q: "Is there a fee for listing?", a: "Basic listings are free. Premium features are available with a small fee." },
  { q: "How do I contact sellers?", a: "Each listing has a contact option. You can reach out directly through the platform." },
  { q: "Can I edit my listing?", a: "Yes, you can manage all your listings from the Manage Items page." },
];

export default function HomePage() {
  const { user } = useAuth();
  const [heroSlide, setHeroSlide] = useState(0);

  const { data: itemsData, isLoading } = useItems({ limit: 4, sort: "newest" });

  const heroSlides = [
    {
      title: "Discover Premium Products",
      subtitle: "Curated marketplace for quality goods and services",
      cta: "Explore Now",
      link: "/items",
    },
    {
      title: "Sell With Confidence",
      subtitle: "Reach thousands of customers with your listings",
      cta: "Start Selling",
      link: user ? "/items/add" : "/register",
    },
    {
      title: "Built with TypeScript",
      subtitle: "Full-stack type safety from frontend to backend",
      cta: "Learn More",
      link: "/about",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const items = itemsData?.items || [];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden min-h-[400px] h-[65vh]">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium text-blue-200">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                  Premium Marketplace
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroSlides[heroSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-blue-100/90 mb-8 leading-relaxed">
                {heroSlides[heroSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={heroSlides[heroSlide].link}
                  className="group px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2">
                  {heroSlides[heroSlide].cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/items"
                  className="px-8 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                  Browse All
                </Link>
              </div>
            </motion.div>
            <div className="flex gap-2 mt-10">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setHeroSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === heroSlide ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section {...fadeInUp} className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200/80 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Why Choose TypeMarket</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Our platform provides everything you need to buy and sell with confidence.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "TypeScript Powered", desc: "End-to-end type safety ensures reliability and better developer experience.", icon: Zap },
              { title: "Secure & Fast", desc: "JWT authentication and optimized API routes for blazing fast performance.", icon: Shield },
              { title: "Modern UI/UX", desc: "Responsive design with Tailwind CSS that works beautifully on all devices.", icon: Sparkles },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider">Analytics</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Market Categories</h2>
            <p className="mt-3 text-gray-500">Browse our most popular categories</p>
          </motion.div>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 border border-gray-100">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} maxBarSize={60} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">Listings</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Latest Listings</h2>
              <p className="mt-2 text-gray-500">Recently added items from our community</p>
            </div>
            <Link href="/items"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group">
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : items.map((item) => <Card key={item._id} item={item} />)}
            {!isLoading && items.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No listings yet. Be the first to add one!</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider">Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Our Services</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Comprehensive solutions for buyers and sellers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Verified Listings", desc: "All listings are reviewed to ensure quality and authenticity.", icon: Shield },
              { title: "Secure Payments", desc: "End-to-end encrypted transactions for peace of mind.", icon: Zap },
              { title: "24/7 Support", desc: "Our team is always available to help you.", icon: Users },
              { title: "Analytics Dashboard", desc: "Track your sales, views, and performance metrics.", icon: TrendingUp },
              { title: "Global Reach", desc: "Connect with buyers and sellers from around the world.", icon: Package },
              { title: "Smart Matching", desc: "AI-powered recommendations for better discovery.", icon: Star },
            ].map((service, i) => (
              <motion.div key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 border border-gray-100 rounded-2xl hover:border-blue-100 hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">What Our Users Say</h2>
            <p className="mt-3 text-gray-500">Trusted by thousands of users worldwide</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Frequently Asked Questions</h2>
            <p className="mt-3 text-gray-500">Everything you need to know</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.details key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gray-50 rounded-2xl p-5 cursor-pointer hover:bg-gray-100/60 transition-colors open:bg-blue-50/50 open:ring-1 open:ring-blue-100">
                <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform group-open:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeInUp} className="relative py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100/80 text-lg mb-10 max-w-lg mx-auto">
            Join thousands of users already trading on TypeMarket
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/items/add" : "/register"}
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl">
              {user ? "Add Your First Item" : "Create Free Account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
