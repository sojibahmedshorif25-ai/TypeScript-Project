"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useDashboardStats } from "@/hooks/useItems";
import { PageLoader } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Package, Users, Star, TrendingUp } from "lucide-react";

const COLORS = ["#2563eb", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#f59e0b"];

function DashboardContent() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) return <PageLoader />;

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard Unavailable</h2>
          <p className="text-gray-600">Could not load dashboard statistics.</p>
        </div>
      </div>
    );
  }

  const categoryStats = (stats.categoryStats as Array<{ _id: string; count: number }>) || [];
  const chartData = categoryStats.map((c) => ({ name: c._id.charAt(0).toUpperCase() + c._id.slice(1), value: c.count }));

  const statCards = [
    { label: "Total Items", value: stats.totalItems as number, icon: Package, color: "bg-blue-500" },
    { label: "Total Users", value: stats.totalUsers as number, icon: Users, color: "bg-indigo-500" },
    { label: "Total Reviews", value: stats.totalReviews as number, icon: Star, color: "bg-purple-500" },
    { label: "Categories", value: categoryStats.length, icon: TrendingUp, color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Items by Category</h2>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Category Distribution</h2>
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                    label={({ name, percent }: { name?: string; percent?: number }) =>
                      `${name || ""} ${percent ? (percent * 100).toFixed(0) : "0"}%`}
                    >
                      {chartData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}
