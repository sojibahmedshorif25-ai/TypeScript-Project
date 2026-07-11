"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { CATEGORIES } from "@/constants";
import { useCreateItem } from "@/hooks/useItems";
import { PlusCircle, Loader2 } from "lucide-react";

const addItemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(200),
  fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
  price: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  priority: z.enum(["low", "medium", "high"]),
  date: z.string().optional(),
  imageUrl: z.string().optional(),
});

type AddItemFormData = z.infer<typeof addItemSchema>;

function AddItemContent() {
  const router = useRouter();
  const createItem = useCreateItem();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddItemFormData>({
    resolver: zodResolver(addItemSchema),
    defaultValues: { priority: "medium" },
  });

  const onSubmit = async (data: AddItemFormData) => {
    const payload: Record<string, unknown> = {
      title: data.title,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      price: Number(data.price),
      category: data.category,
      location: data.location,
      priority: data.priority,
      date: data.date || new Date().toISOString().split("T")[0],
      images: data.imageUrl ? [data.imageUrl] : [],
    };

    try {
      const result = await createItem.mutateAsync(payload);
      router.push(`/items/${result._id}`);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
              <p className="text-gray-600 mt-1">List your product or service on TypeMarket</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input id="title" {...register("title")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="e.g., Premium Wireless Headphones" />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <input id="shortDescription" {...register("shortDescription")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Brief overview of your item" />
              {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
            </div>

            <div>
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
              <textarea id="fullDescription" {...register("fullDescription")} rows={5} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Detailed description of your item..." />
              {errors.fullDescription && <p className="text-xs text-red-500 mt-1">{errors.fullDescription.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input id="price" type="number" step="0.01" {...register("price")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="99.99" />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select id="category" {...register("category")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select id="priority" {...register("priority")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input id="location" {...register("location")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Dhaka, Bangladesh" />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input id="date" type="date" {...register("date")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
              <input id="imageUrl" {...register("imageUrl")} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://example.com/image.jpg" />
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={createItem.isPending}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {createItem.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {createItem.isPending ? "Publishing..." : "Publish Listing"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemContent />
    </ProtectedRoute>
  );
}
