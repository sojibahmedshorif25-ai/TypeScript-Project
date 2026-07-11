import { z } from "zod";

const categoryEnum = z.enum(["electronics", "fashion", "food", "health", "education", "services", "other"]);
const priorityEnum = z.enum(["low", "medium", "high"]);

export const createItemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(200),
  fullDescription: z.string().min(20, "Full description must be at least 20 characters"),
  price: z.number().positive("Price must be a positive number"),
  category: categoryEnum,
  location: z.string().min(2, "Location is required"),
  priority: priorityEnum.optional().default("medium"),
  date: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
});

export const updateItemSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  shortDescription: z.string().min(10).max(200).optional(),
  fullDescription: z.string().min(20).optional(),
  price: z.number().positive().optional(),
  category: categoryEnum.optional(),
  location: z.string().min(2).optional(),
  priority: priorityEnum.optional(),
  date: z.string().optional(),
  images: z.array(z.string()).optional(),
});
