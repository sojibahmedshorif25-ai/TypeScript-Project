import { Item } from "../models/Item";
import { ApiError } from "../utils/ApiError";
import type { PaginationQuery } from "../types";

interface QueryOptions {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  sort?: string;
  rating?: string;
  date?: string;
  userId?: string;
}

export async function getItems(query: QueryOptions & PaginationQuery) {
  const page = parseInt(query.page || "1", 10);
  const limit = parseInt(query.limit || "12", 10);
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { shortDescription: { $regex: query.search, $options: "i" } },
      { location: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.location) {
    filter.location = { $regex: query.location, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    const priceFilter: Record<string, number> = {};
    if (query.minPrice) priceFilter.$gte = parseFloat(query.minPrice);
    if (query.maxPrice) priceFilter.$lte = parseFloat(query.maxPrice);
    filter.price = priceFilter;
  }

  if (query.rating) {
    filter.rating = { $gte: parseFloat(query.rating) };
  }

  if (query.date) {
    filter.date = query.date;
  }

  if (query.userId) {
    filter.userId = query.userId;
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };

  switch (query.sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "rating":
      sortOption = { rating: -1 };
      break;
    case "oldest":
      sortOption = { createdAt: 1 };
      break;
    case "name":
      sortOption = { title: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const [items, total] = await Promise.all([
    Item.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email")
      .lean(),
    Item.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getItemById(itemId: string) {
  const item = await Item.findById(itemId).populate("userId", "name email").lean();
  if (!item) {
    throw new ApiError(404, "Item not found");
  }
  return item;
}

export async function createItem(data: {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  priority?: string;
  date?: string;
  images?: string[];
  userId: string;
}) {
  const item = await Item.create({
    title: data.title,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    price: data.price,
    category: data.category,
    location: data.location,
    priority: data.priority || "medium",
    date: data.date || "",
    images: data.images || [],
    userId: data.userId,
  });

  return item;
}

export async function updateItem(itemId: string, userId: string, userRole: string, updateData: Record<string, unknown>) {
  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  if (item.userId.toString() !== userId && userRole !== "admin") {
    throw new ApiError(403, "Not authorized to update this item");
  }

  const allowedFields = [
    "title", "shortDescription", "fullDescription", "price",
    "category", "location", "priority", "date", "images",
  ];

  const sanitized: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      sanitized[field] = updateData[field];
    }
  }

  const updated = await Item.findByIdAndUpdate(itemId, sanitized, {
    new: true,
    runValidators: true,
  });

  return updated;
}

export async function deleteItem(itemId: string, userId: string, userRole: string) {
  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  if (item.userId.toString() !== userId && userRole !== "admin") {
    throw new ApiError(403, "Not authorized to delete this item");
  }

  await Item.findByIdAndDelete(itemId);
}

export async function getDashboardStats() {
  const [totalItems, totalUsers, totalReviews, categoryStats] = await Promise.all([
    Item.countDocuments(),
    (await import("../models/User")).User.countDocuments(),
    (await import("../models/Review")).Review.countDocuments(),
    Item.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  return {
    totalItems,
    totalUsers,
    totalReviews,
    categoryStats,
  };
}
